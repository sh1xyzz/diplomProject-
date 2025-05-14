import React, { useEffect, useState } from "react";

import {
  UserOutlined,
  CameraOutlined,
  UploadOutlined,
  CloudDownloadOutlined,
  IdcardTwoTone,
  CalendarOutlined,
  SafetyOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Typography, Card } from "antd";
import avatar from "assets/image/avatar.jpg";
import { DefaultLayout } from "components/DefaultLayout";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;

export const ProfileView = () => {

  const [user, setUser] = useState<{
     id: number;
    name: string;
    role: string;
    created_at: string;
    status?: string;
  } | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <Paragraph className="text-center text-white">Loading...</Paragraph>;
  }

  return (
    <DefaultLayout>
      <section className="py-10 px-4 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-black via-gray-900 to-blue-900 to-black">
          <div className="flex items-center gap-4 p-6">
            <Avatar size={64} src={avatar} />
            <div>
              <Title level={4} className="text-white m-0">
                {user.name}
              </Title>
              <Text className="text-green-400 block text-sm">Active now</Text>
            </div>
          </div>
        </div>

        <Card className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className=" items-center gap-6">
              <Text>
                <UserOutlined />{" "}
                Account Information
              </Text>
              <Divider />
              <div>
                <div className="flex flex-row items-center gap-2">
                  <Button icon={<IdcardTwoTone />} size="large" />
                  <div>
                    <Text className="text-gray-400">User Id</Text>
                    <Paragraph>{user.id}</Paragraph>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Button icon={<UserOutlined />} size="large" />
                  <div>
                    <Text className="text-gray-400">Username</Text>
                    <Paragraph>{user.name}</Paragraph>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Button icon={<CalendarOutlined />} size="large" />
                  <div>
                    <Text className="text-gray-400">Registration date</Text>
                    <Paragraph>{dayjs(user.created_at).format("DD MMM YYYY")}</Paragraph>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Button icon={<IdcardTwoTone />} size="large" />
                  <div>
                    <Text className="text-gray-400">Account Status</Text>
                    <Paragraph>Active</Paragraph>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Button icon={<SafetyOutlined />} size="large" />
                  <div>
                    <Text className="text-gray-400">Role</Text>
                    <Paragraph>{user.role}</Paragraph>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Button icon={<CameraOutlined />} type="text" size="large">
                Update Avatar
              </Button>
              <Avatar src={avatar} size={128} />
              <Button icon={<UploadOutlined />} size="large">
                Select Image File
              </Button>
              <Button
                className="bg-green-500"
                icon={<CloudDownloadOutlined />}
                size="large"
              >
                Upload Avatar
              </Button>
            </div>
          </div>

          <Divider className="bg-gray-700 my-6" />
          <div className="flex gap-4 flex-wrap justify-center">
            {user.role === "admin" && (
              <Button
                type="primary"
                icon={<UserSwitchOutlined />}
                size="large"
                className="w-full bg-purple-700"
              >
                Admin Panel
              </Button>
            )}
          </div>
          <div>
            <Paragraph>
              <span className="text-green-500"> $ </span>User profile loaded
              successfully
            </Paragraph>
          </div>
          <div>
            <Paragraph>
              <span className="text-green-500"> $ </span>{dayjs(user.created_at).format("DD MMM YYYY hh:mm:ss")}
            </Paragraph>
          </div>
          <div>
            <Paragraph>
              <span className="text-green-500"> $ </span>System status: online |
              Server load: optional
            </Paragraph>
          </div>
        </Card>
      </section>
    </DefaultLayout>
  );
};
