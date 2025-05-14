import React, { useState } from "react";

import { ProfileOutlined, SecurityScanOutlined } from "@ant-design/icons";
import { Menu, Typography, Divider } from "antd";
import { DefaultLayout } from "components/DefaultLayout";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { EditView } from "./EditView";

const { Title, Paragraph } = Typography;

const items = [
  {
    key: "edit",
    label: "Edit Profile",
    icon: <ProfileOutlined />,
    to: "/settings/edit",
  },
  {
    key: "security",
    label: "Security",
    icon: <SecurityScanOutlined />,
    to: "/settings/security",
  },
];

export const SettingsView = () => {
  const { t } = useTranslation();
  const [section, setSection] = useState("edit");

  const renderContent = () => {
    switch (section) {
      case "edit":
        return <EditView />;
      case "security":
        return (
          <div className="text-white">
            <Title level={3} className="text-white mb-2">
              Security Settings
            </Title>
            <Paragraph className="text-gray-400">
              Change your password, set up 2FA, and manage sessions.
            </Paragraph>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DefaultLayout>
      <section className="py-12 px-4">
        <div className="bg-gray-900 p-6 rounded-xl shadow-md flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 border-r border-gray-700 pr-4 mb-6 md:mb-0">
            <Title level={4} className="text-white">
              {t("settings.title") || "Settings"}
            </Title>
            <Divider className="border-gray-700" />
            <Menu
              theme="dark"
              mode="vertical"
              selectedKeys={[section]}
              onClick={(item) => setSection(item.key)}
              className="bg-transparent"
            >
              {items.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.to}>{item.label}</Link>{" "}
                </Menu.Item>
              ))}
            </Menu>
          </div>

          {/* Main content */}
          <div className="w-full md:w-3/4 pl-0 md:pl-6">{renderContent()}</div>
        </div>
      </section>
    </DefaultLayout>
  );
};
