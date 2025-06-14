import React, { useEffect, useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { Button, Modal, Input, Table, Typography, Space, Popconfirm, message } from "antd";
import { useTranslation } from "react-i18next";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  replies?: { id: number; message: string; from_admin: boolean; created_at?: string }[];
}

export const MessageAdmin = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [currentChatMessages, setCurrentChatMessages] = useState<any[]>([]);
  const [sendingReply, setSendingReply] = useState(false);

  const { Title } = Typography;
  const { t } = useTranslation();

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log("Токен переданий запитом:", token);
      if (!token) {
        throw new Error("Токен відсутній в localStorage");
      }
      const response = await axios.get("http://localhost:8000/api/user/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Відповідь з сервера:", response.data);
      setMessages(response.data.messages);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Помилка загрузки повідомлення:", error.response?.data || error.message);
        message.error(t("messageCourseView.fetchError"));
        if (error.response?.status === 401) {
          console.log("401: Неавторизован, данные ответа:", error.response?.data);
          message.error("Не авторизований: Будь-ласка, війдіть знову.");
          window.location.href = "/login";
        }
      } else {
        console.error("Неизвестная ошибка:", error);
        message.error(t("messageCourseView.fetchError"));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const openReplyModal = (messageId: number) => {
    setCurrentMessageId(messageId);
    setReplyText("");
    setReplyModalVisible(true);
  };

  const openChatModal = (messageData: Message) => {
    setCurrentMessageId(messageData.id);
    
    const chatHistory = [
      {
        id: `original-${messageData.id}`,
        message: messageData.message,
        from_admin: false,
        sender_name: messageData.name,
        timestamp: new Date(),
      },
      ...(messageData.replies || []).map(reply => ({
        ...reply,
        timestamp: reply.created_at ? new Date(reply.created_at) : new Date(),
      })),
    ];
    
    setCurrentChatMessages(chatHistory);
    setChatModalVisible(true);
  };

  const handleReplySend = async () => {
    if (!replyText.trim() || currentMessageId === null) {
      message.warning(t("messageCourseView.emptyReply"));
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Токен отсутствует в localStorage");
      }
      await axios.post(
        `http://localhost:8000/api/messages/${currentMessageId}/reply`,
        { message: replyText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success(t("messageCourseView.replySent"));
      setReplyModalVisible(false);
      fetchMessages();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Ошибка отправки ответа:", error.response?.data || error.message);
        message.error(t("messageCourseView.replyError"));
        if (error.response?.status === 401) {
          message.error("Не авторизован: Пожалуйста, войдите снова.");
          window.location.href = "/login";
        }
      } else {
        console.error("Неизвестная ошибка:", error);
        message.error(t("messageCourseView.replyError"));
      }
    }
  };

  const sendChatReply = async () => {
    if (!replyText.trim() || !currentMessageId) return;

    setSendingReply(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8000/api/messages/${currentMessageId}/reply`,
        { message: replyText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        // Добавляем новое сообщение в чат
        const newReply = {
          id: Date.now(),
          message: replyText,
          from_admin: true,
          timestamp: new Date(),
        };

        setCurrentChatMessages(prev => [...prev, newReply]);
        setReplyText("");
        
        // Обновляем общий список сообщений
        fetchMessages();
        message.success("Ответ отправлен");
      }
    } catch (error) {
      console.error("Ошибка отправки ответа:", error);
      message.error("Ошибка отправки ответа");
    } finally {
      setSendingReply(false);
    }
  };

  const handleDeleteMessage = async (messageId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Токен отсутствует в localStorage");
      }
      await axios.delete(`http://localhost:8000/api/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success(t("messageCourseView.deleteSuccess"));
      fetchMessages();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Ошибка удаления сообщения:", error.response?.data || error.message);
        message.error(t("messageCourseView.deleteError"));
        if (error.response?.status === 401) {
          message.error("Не авторизован: Пожалуйста, войдите снова.");
          window.location.href = "/login";
        }
      } else {
        console.error("Неизвестная ошибка:", error);
        message.error(t("messageCourseView.deleteError"));
      }
    }
  };

  const columns = [
    {
      title: t("messageCourseView.columnsName"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("messageCourseView.columnsEmail"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("messageCourseView.columnsMessage"),
      dataIndex: "message",
      key: "message",
      render: (text: string) => (
        <span>{text.length > 50 ? `${text.substring(0, 50)}...` : text}</span>
      ),
    },
    {
      title: "Відповіді",
      dataIndex: "replies",
      key: "replies",
      render: (replies: any[]) => (
        <span>{replies?.length || 0}</span>
      ),
    },
    {
      title: t("messageCourseView.columnsActions"),
      key: "actions",
      render: (_: any, record: Message) => (
        <Space>
          <Button type="link" onClick={() => openReplyModal(record.id)}>
            {t("messageCourseView.btnReply")}
          </Button>
          <Button type="link" onClick={() => openChatModal(record)}>
            Чат
          </Button>
          <Popconfirm
            title={t("messageCourseView.popconfirmTitle")}
            okText={t("messageCourseView.okText")}
            cancelText={t("messageCourseView.cancelText")}
            onConfirm={() => handleDeleteMessage(record.id)}
          >
            <Button type="link" danger>
              {t("messageCourseView.btnDelete")}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={3}>{t("messageCourseView.Title")}</Title>
      <Table
        columns={columns}
        dataSource={messages}
        loading={loading}
        rowKey="id"
        scroll={{ x: true }}
      />

      <Modal
        title={t("messageCourseView.56")}
        open={replyModalVisible}
        onOk={handleReplySend}
        onCancel={() => setReplyModalVisible(false)}
        okText={t("messageCourseView.btnSend")}
        cancelText={t("messageCourseView.cancelText")}
        styles={{
          body: { backgroundColor: "#121212", color: "#fff" },
        }}
      >
        <Input.TextArea
          rows={4}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder={t("messageCourseView.replyPlaceholder")}
          style={{ backgroundColor: "#222", color: "#fff" }}
        />
      </Modal>

      <Modal
        title="Чат з користувачем"
        open={chatModalVisible}
        onCancel={() => setChatModalVisible(false)}
        footer={null}
        width={500}
        className="admin-chat-modal"
      >
        <div className="chat-container" style={{ height: "450px", display: "flex", flexDirection: "column" }}>
          <div
            className="chat-messages"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "15px",
              backgroundColor: "#f8f9fa",
              borderRadius: "10px",
              marginBottom: "15px",
              border: "1px solid #e9ecef",
            }}
          >
            {currentChatMessages.map((msg, index) => (
              <div
                key={msg.id || index}
                className={`message ${msg.from_admin ? "admin" : "user"}`}
                style={{
                  display: "flex",
                  justifyContent: msg.from_admin ? "flex-start" : "flex-end",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    backgroundColor: msg.from_admin ? "#52c41a" : "#1890ff",
                    color: "white",
                    padding: "10px 15px",
                    borderRadius: msg.from_admin ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
                    maxWidth: "75%",
                    fontSize: "14px",
                    wordWrap: "break-word",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  {msg.sender_name && !msg.from_admin && (
                    <div style={{ fontSize: "12px", opacity: 0.8, marginBottom: "4px" }}>
                      {msg.sender_name}
                    </div>
                  )}
                  {msg.message}
                  <div style={{ fontSize: "11px", opacity: 0.7, marginTop: "4px", textAlign: "right" }}>
                    {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input" style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
            <Input.TextArea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendChatReply();
                }
              }}
              placeholder="Введіть відповідь..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              style={{ flex: 1 }}
            />
            <Button
              type="primary"
              onClick={sendChatReply}
              loading={sendingReply}
              disabled={!replyText.trim()}
              style={{ height: "auto", minHeight: "32px" }}
            >
              Отправить
            </Button>
          </div>
        </div>
      </Modal>

      <style>{`
        .admin-chat-modal .ant-modal-content {
          padding: 20px;
        }
        
        .chat-messages::-webkit-scrollbar {
          width: 8px;
        }
        
        .chat-messages::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        .chat-messages::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }
        
        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>    
    </div>
  );
};