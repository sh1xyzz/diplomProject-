import React, { FC, useEffect, useState } from "react";

import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Image, Input, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";

export const EditView: FC = () => {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState({
    displayName: "John Doe",
    email: "john@example.com",
    bio: "Hi! I'm John.",
  });

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, []);

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row items-start mb-8">
        <div className="flex flex-col items-center mr-8">
          <span className="text-2xl mb-4">Public Avatar</span>
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              className="w-32 h-32 rounded-full mb-4"
              alt="avatar"
            />
          ) : (
            <Avatar size={128} icon={<UserOutlined />} className="mb-4" />
          )}
          <div className="flex gap-4 mt-4">
            <ImgCrop rotationSlider quality={1}>
              <Upload
                accept=".jpg,.jpeg,.png,.webp"
                showUploadList={false}
                customRequest={({ file, onSuccess }) => {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setAvatarUrl(e.target?.result as string);
                    if (onSuccess !== undefined) onSuccess("ok");
                  };
                  reader.readAsDataURL(file as Blob);
                }}
              >
                <Button icon={<UploadOutlined />} size="large">
                  Change Avatar
                </Button>
              </Upload>
            </ImgCrop>
            <Button danger onClick={() => setAvatarUrl(null)} size="large">
              Remove Avatar
            </Button>
          </div>
        </div>

        {/* Инфо */}
        <div className="flex flex-col w-full">
          <span className="text-2xl mb-4">General Info</span>
          <Form
            form={form}
            layout="vertical"
            requiredMark="optional"
            onFinish={(values) => {
              setInitialValues(values);
              message.success("Profile updated successfully");
            }}
          >
            <Form.Item
              name="displayName"
              label="Display Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item name="bio" label="About You">
              <Input.TextArea rows={4} maxLength={250} showCount size="large" />
            </Form.Item>
            <div className="flex gap-4">
              <Button htmlType="submit" type="primary" size="large">
                Update
              </Button>
              <Button
                danger
                size="large"
                onClick={() => form.setFieldsValue(initialValues)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
