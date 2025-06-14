import React, { useState, useEffect } from "react";

import {
  MessageOutlined,
  MailOutlined,
  CloseOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Card,
  List,
  Typography,
  Modal,
  Empty,
} from "antd";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface MessageType {
  id: number;
  name: string;
  email: string;
  message: string;
  user_id: number | null;
  recipient_id?: number | null;
  replies?: { id: number; message: string; from_admin: boolean; timestamp: string }[];
}

interface UserType {
  id: number;
  name: string;
  email: string;
}

export const FloatingContactForm = () => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"form" | "inbox">("form");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [chatDialogVisible, setChatDialogVisible] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const token = localStorage.getItem("token");
  const { t } = useTranslation();

  const fetchUserData = async () => {
    if (!token) {
        message.error(t("contactForm.messageErrorLogin"));
        return;
    }

    try {
        const response = await axios.get("http://localhost:8000/api/user", {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log(t("contactForm.consoleLogData"), response.data);
        setUser(response.data);
    } catch (error) {
        console.error(t("contactForm.consoleErrorDataLoad"), error);
        message.error(t("contactForm.messageErrorDataLoad"));
    }
};

  const handleSend = async (values: any) => {
    if (!token || !user) {
      message.error(t("contactForm.messageErrorAuth"));
      return;
    }

    console.log(t("contactForm.consoleSendData"), { message: values.message, token });

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/messages",
        {
          message: values.message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log(t("contactForm.consoleSend"), response.data);

      if (response.data.success) {
        message.success(t("contactForm.successMessageSent"));
        form.resetFields();
        setCurrentMessageId(response.data.messageId);
        setChatMessages([
          {
            id: Date.now(),
            message: values.message,
            from_admin: false,
            timestamp: new Date().toISOString(),
          },
        ]);
        setChatDialogVisible(true);
        setOpen(false);
      } else {
        message.error(response.data.error || t("contactForm.errorSending"));
      }
    } catch (error) {
      console.error(t("contactForm.consoleErrorSendMessage"), error);
      if (axios.isAxiosError(error)) {
        console.error(t("contactForm.Data"), error.response?.data);
        console.error(t("contactForm.Status"), error.response?.status);
      }
      message.error(t("contactForm.error"));
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    if (!token) {
      message.error(t("contactForm.messagePleasLogin"));
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/user/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && Array.isArray(response.data.messages)) {
        setMessages(response.data.messages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error(t("contactForm.consoleErrorMessagePost"), error);
      message.error(t("contactForm.messageErrorMessagePost"));
    } finally {
      setLoading(false);
    }
  };

  const hasUnreadReply = (messageItem: MessageType) => {
    return messageItem.replies?.some((reply) => reply.from_admin) || false;
  };

  const openChat = (messageId: number, existingReplies: any[] = []) => {
    setCurrentMessageId(messageId);
    const selectedMessage = messages.find((msg) => msg.id === messageId);

    const chatHistory = [
      {
        id: `original-${messageId}`,
        message: selectedMessage?.message || "",
        from_admin: false,
        timestamp: new Date().toISOString(),
      },
      ...existingReplies.map((reply) => ({
        ...reply,
      })),
    ];

    setChatMessages(chatHistory);
    setChatDialogVisible(true);
  };

  const sendChatMessage = async () => {
    if (!newMessage.trim() || !currentMessageId || !token) return;

    setSendingMessage(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/messages/${currentMessageId}/reply`,
        { message: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            message: newMessage,
            from_admin: false,
            timestamp: new Date().toISOString(),
          },
        ]);
        setNewMessage("");
        fetchMessages();
      } else {
        message.error(response.data.error || t("contactForm.messageErrorSendMessage"));
      }
    } catch (error) {
      console.error(t("contactForm.consoleErrorSendMessageChat"), error);
      message.error(t("contactForm.messageErrorSendMessageChat"));
    } finally {
      setSendingMessage(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  useEffect(() => {
    if (open && view === "inbox" && token) {
      fetchMessages();
    }
  }, [open, view, token]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (chatDialogVisible && currentMessageId && token) {
      intervalId = setInterval(async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/user/messages", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const currentMessage = response.data.messages?.find(
            (msg: any) => msg.id === currentMessageId
          );
          if (currentMessage) {
            const chatHistory = [
              {
                id: `original-${currentMessageId}`,
                message: currentMessage.message,
                from_admin: false,
                timestamp: new Date().toISOString(),
              },
              ...(currentMessage.replies || []).map((reply: any) => ({
                ...reply,
                timestamp: new Date(reply.timestamp).toISOString(),
              })),
            ];
            setChatMessages(chatHistory);
          }
        } catch (error) {
          console.error(t("contactForm.consoleErrorUpdateChat"), error);
        }
      }, 10000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [chatDialogVisible, currentMessageId, token]);

  const unreadCount = messages.filter((msg) => hasUnreadReply(msg)).length;

  return (
    <>
      <div className="fixed right-5 bottom-5 z-[1000]">
        <Button
          type="primary"
          shape="circle"
          icon={<MessageOutlined />}
          size="large"
          onClick={() => setOpen(!open)}
          className="shadow-lg relative"
        />
        {token && unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}
      </div>

      {open && (
        <>
          <div className="fixed right-[330px] bottom-[450px] z-[1001] flex flex-col gap-2">
            <Button
              icon={<MessageOutlined />}
              type={view === "form" ? "primary" : "default"}
              size="large"
              onClick={() => setView("form")}
            />
            {token && (
              <Button
                icon={<MailOutlined />}
                type={view === "inbox" ? "primary" : "default"}
                size="large"
                onClick={() => setView("inbox")}
              />
            )}
          </div>

          <Card
            className="fixed right-5 bottom-20 w-[300px] h-[460px] z-[1000] shadow-2xl overflow-auto"
            title={
              <div className="flex justify-between items-center">
                <span>
                  {view === "form"
                    ? t("contactForm.title")
                    : t("contactForm.inboxTitle")}
                </span>
                <Button
                  type="text"
                  size="small"
                  icon={<CloseOutlined />}
                  onClick={() => setOpen(false)}
                />
              </div>
            }
          >
            {view === "form" ? (
              <Form layout="vertical" form={form} onFinish={handleSend}>
                <Typography.Text type="secondary" style={{ marginBottom: 8 }}>
                  {t("contactForm.toAdmin")}
                </Typography.Text>
                <Form.Item
                  label={t("contactForm.labelMessage")}
                  name="message"
                  rules={[{ required: true, message: t("contactForm.rulesMessage") }]}
                >
                  <Input.TextArea
                    placeholder={t("contactForm.placeholderMessage")}
                    rows={5}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                    disabled={!token || !user}
                  >
                    {t("contactForm.btnSend")}
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <List
                loading={loading}
                dataSource={messages}
                locale={{ emptyText: <Empty description={t("contactForm.descriptionNullMessage")} /> }}
                renderItem={(item) => (
                  <List.Item>
                    <div style={{ width: "100%" }}>
                      <div className="flex justify-between items-start">
                        <div
                          className="flex-1"
                          onClick={() => openChat(item.id, item.replies)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="flex items-center gap-2">
                            <Typography.Text strong>{item.name}:</Typography.Text>
                            {hasUnreadReply(item) && (
                              <div
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  backgroundColor: "#ff4d4f",
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                          </div>
                          <div style={{ fontSize: "13px", color: "#666", marginTop: "2px" }}>
                            {item.message.length > 60 ? `${item.message.substring(0, 60)}...` : item.message}
                          </div>
                        </div>
                        <Button
                          type="link"
                          size="small"
                          icon={<MessageOutlined />}
                          onClick={() => openChat(item.id, item.replies)}
                        />
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            )}
          </Card>
        </>
      )}

      <Modal
        title={t("contactForm.chatTitle")}
        open={chatDialogVisible}
        onCancel={() => setChatDialogVisible(false)}
        footer={null}
      >
        <div className="h-[400px] flex flex-col overflow-y-auto p-2 mb-2">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 p-2 rounded ${
                  msg.from_admin ? "flex-start" : "flex-end"
                }`}
              >
                <div className="text-sm">{msg.message}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-[8px]">
            <Input.TextArea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("contactForm.placeholderChat")}
              autoSize={{ minRows: 1, maxRows: 3 }}
              size="large"
            />
            <Button
              type="primary"
              size="large"
              icon={<SendOutlined />}
              onClick={sendChatMessage}
              loading={sendingMessage}
              disabled={!newMessage.trim()}
            />
          </div>
      </Modal>
    </>
  );
};