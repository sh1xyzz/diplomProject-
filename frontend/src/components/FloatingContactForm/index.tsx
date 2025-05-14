import React, { useState } from "react";

import { MessageOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Card } from "antd";
import { useTranslation } from "react-i18next";

export const FloatingContactForm = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const { t } = useTranslation();

  const handleSend = async (values: any) => {
    try {
      const response = await fetch("http://localhost:8000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        message.success(t("contactForm.success"));
        form.resetFields();
        setOpen(false);
      } else {
        message.error(result.error || t("contactForm.errorResult"));
      }
    } catch (error) {
      console.error(error);
      message.error(t("contactForm.error"));
    }
  };


  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
        size="large"
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          zIndex: 1000,
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        }}
      />

      {open && (
        <Card
          title={
            <div className="flex justify-between items-center">
              <span>{t("contactForm.title")}</span>
              <Button
                type="text"
                size="small"
                icon={<CloseOutlined />}
                onClick={() => setOpen(false)}
              />
            </div>
          }
          style={{
            position: "fixed",
            right: 20,
            bottom: 80,
            width: 300,
            zIndex: 1000,
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          }}
        >
          <Form layout="vertical" form={form} onFinish={handleSend}>
            <Form.Item
              label={t("contactForm.labelName")}
              name="name"
              rules={[{ required: true, message: t("contactForm.rulesName") }]}
            >
              <Input placeholder={t("contactForm.placeholderName")} />
            </Form.Item>
            <Form.Item
              label={t("contactForm.labelEmail")}
              name="email"
              rules={[
                { required: true, message: t("contactForm.rulesEnterEmail") },
                { type: "email", message: t("contactForm.rulesEmail") },
              ]}
            >
              <Input placeholder={t("contactForm.placeholderEmail")} />
            </Form.Item>
            <Form.Item
              label={t("contactForm.labelMessage")}
              name="message"
              rules={[{ required: true, message: t("contactForm.rulesMessage") }]}
            >
              <Input.TextArea placeholder={t("contactForm.placeholderMessage")} rows={3} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {t("contactForm.btnSend")}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </>
  );
};
