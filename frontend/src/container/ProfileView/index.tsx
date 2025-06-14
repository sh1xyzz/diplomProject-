import React, { useEffect, useState } from "react";

import {
  UserOutlined,
  UploadOutlined,
  CloudDownloadOutlined,
  IdcardTwoTone,
  CalendarOutlined,
  SafetyOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Typography, Card, Upload, message } from "antd";
import { DefaultLayout } from "components/DefaultLayout";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

export const ProfileView = () => {
  const [user, setUser] = useState<{
    id: number;
    name: string;
    role: string;
    created_at: string;
    avatar?: string;
    status?: string;
  } | null>(null);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [fileList, setFileList] = useState<any[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser.avatar) {
        setPreviewUrl(`http://localhost:8000/storage/${parsedUser.avatar}`);
      }
    }
  }, []);


  if (!user) {
    return <Paragraph className="text-center">{t("profileView.loading")}</Paragraph>;
  }

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
    const file = fileList[0]?.originFileObj;
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!fileList.length || !user) return;

    const formData = new FormData();
    formData.append("avatar", fileList[0].originFileObj);
    formData.append("user_id", String(user.id));

    try {
      const response = await fetch("http://localhost:8000/api/upload-avatar", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        const updatedUser = { ...user, avatar: data.user.avatar };
        setUser(updatedUser);
        setPreviewUrl(data.avatar_url);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        message.success(t("profileView.messageSuccessAvatar"));
      } else {
        message.error(t("profileView.messageErrorAvatar"));
      }
    } catch (error) {
      console.error(error);
      message.error(t("profileView.messageErrorAvatar"));
    }
  };

  const goToAdminPanel = () => {
    navigate("/admin");
  };

  return (
    <DefaultLayout>
      <section className="py-10 px-4 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-[#1c1c28] via-[#191924] to-[#0f0f1a]">
          <div className="flex items-center gap-4 p-6">
          <Avatar
            size={64}
            src={user.avatar ? `http://localhost:8000/storage/${user.avatar}` : undefined}
            icon={!user.avatar && <UserOutlined />}
          />
            <div>
              <Title level={4} className="m-0">
                {user.name}
              </Title>
              <Text className="text-green-400 block text-sm">{t("profileView.textActive")}</Text>
            </div>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-[#1c1c28] via-[#191924] to-[#0f0f1a] rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className=" items-center gap-6">
              <Text>
                <UserOutlined /> {t("profileView.textAccount")}
              </Text>
              <Divider />
              <div>
                <div className="flex flex-row items-center gap-2">
                  <Button icon={<IdcardTwoTone />} size="large" />
                  <div>
                    <Text className="text-gray-400">{t("profileView.textUserId")}</Text>
                    <Paragraph>{user.id}</Paragraph>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Button icon={<UserOutlined />} size="large" />
                  <div>
                    <Text className="text-gray-400">{t("profileView.textUsername")}</Text>
                    <Paragraph>{user.name}</Paragraph>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Button icon={<CalendarOutlined />} size="large" />
                  <div>
                    <Text className="text-gray-400">{t("profileView.textData")}</Text>
                    <Paragraph>{dayjs(user.created_at).format("DD MMM YYYY")}</Paragraph>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Button icon={<IdcardTwoTone />} size="large" />
                  <div>
                    <Text className="text-gray-400">{t("profileView.textStatus")}</Text>
                    <Paragraph>{t("profileView.paragraphActive")}</Paragraph>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Button icon={<SafetyOutlined />} size="large" />
                  <div>
                    <Text className="text-gray-400">{t("profileView.textRole")}</Text>
                    <Paragraph>{user.role}</Paragraph>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              {/* <Button icon={<CameraOutlined />} type="text" size="large">
                {t("profileView.btnUpdate")}
              </Button> */}
              <Avatar 
                className="bg-gray-800 border-blue-900" 
                src={previewUrl || (user.avatar ? "http://localhost:8000/storage/${user.avatar}" : undefined)}
                icon={!previewUrl && !user.avatar && <UserOutlined style={{ fontSize: 48 }}/>}
                size={180} />
              <Upload
                  name="image"
                  beforeUpload={() => false}
                  onChange={handleUploadChange}
                  fileList={fileList}
                  maxCount={1}
                  accept="image/*"
                >
                <Button icon={<UploadOutlined />} size="large">
                  {t("profileView.btnSelectImage")}
                </Button>
              </Upload>
              <Button className="bg-green-500" onClick={handleUpload} icon={<CloudDownloadOutlined />} size="large">
                {t("profileView.btnUpload")}
              </Button>
            </div>
          </div>

          <Divider className="bg-gray-700 my-6" />

          <div className="flex gap-4 flex-wrap justify-center mb-5">
            {user.role === "admin" && (
              <Button
                type="primary"
                icon={<UserSwitchOutlined />}
                size="large"
                className="w-full bg-purple-700"
                onClick={goToAdminPanel}
              >
                {t("profileView.btnAdmin")}
              </Button>
            )}
          </div>

          <div>
            <Paragraph>
              <span className="text-green-500">{t("profileView.symbol")} </span>{t("profileView.spanLoaded")}
            </Paragraph>
          </div>
          <div>
            <Paragraph>
              <span className="text-green-500">{t("profileView.symbol")} </span>
              {dayjs(user.created_at).format("DD MMM YYYY hh:mm:ss")}
            </Paragraph>
          </div>
          <div>
            <Paragraph>
              <span className="text-green-500">{t("profileView.symbol")} </span>{t("profileView.spanStatus")}
            </Paragraph>
          </div>
        </Card>
      </section>
    </DefaultLayout>
  );
};
