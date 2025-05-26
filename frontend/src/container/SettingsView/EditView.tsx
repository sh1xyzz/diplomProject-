import React, { FC, useState } from "react";

import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Image, Input, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import { useTranslation } from "react-i18next";

export const EditView: FC = () => {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const { t } = useTranslation();

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row items-start mb-8">
        <div className="flex flex-col items-center mr-8">
          <span className="text-2xl mb-4">{t("editView.spanPublic")}</span>
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
                  {t("editView.btnChange")}
                </Button>
              </Upload>
            </ImgCrop>
            <Button danger onClick={() => setAvatarUrl(null)} size="large">
              {t("editView.btnRemove")}
            </Button>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <span className="text-2xl mb-4">{t("editView.spanGeneral")}</span>
          <Form
            form={form}
            layout="vertical"
            requiredMark="optional"
            onFinish={(values) => {
              message.success(t("editView.messageSuccess"));
            }}
          >
            <Form.Item
              name="displayName"
              label={t("editView.labelDisplay")}
              rules={[{ required: true, message: t("editView.rulesNickname") }]}
            >
              <Input size="large" placeholder={t("editView.placeholderNickname")}/>
            </Form.Item>
            <Form.Item
              name="email"
              label={t("editView.labelEmail")}
              rules={[
                { required: true, message: t("editView.rulesRequiredEmail") },
                { type: "email", message: t("rulesTypeEmail") },
              ]}
            >
              <Input size="large" placeholder={t("editView.placeholderEmail")}/>
            </Form.Item>
            <Form.Item name="bio" label={t("editView.labelAbout")}>
              <Input.TextArea rows={4} maxLength={250} showCount size="large" placeholder={t("editView.placeholderBio")}/>
            </Form.Item>
            <div className="flex gap-4">
              <Button htmlType="submit" type="primary" size="large">
                {t("editView.btnUpdate")}
              </Button>
              <Button
                danger
                size="large"
              >
                {t("editView.btnCancel")}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
