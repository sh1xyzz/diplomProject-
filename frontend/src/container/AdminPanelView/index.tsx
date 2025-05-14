import React, { useState } from "react";
import {
  UserOutlined,
  AppstoreOutlined,
  SettingOutlined,
  DashboardOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography } from "antd";
import { DefaultLayout } from "components/DefaultLayout";

const { Title, Paragraph } = Typography;
const { Sider, Content } = Layout;

export const AdminPanelView = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");

  const renderContent = () => {
    switch (selectedKey) {
      case "dashboard":
        return (
          <>
            <Title level={3}>Dashboard</Title>
            <Paragraph>Welcome to the admin panel of the IT teacher`s website.</Paragraph>
          </>
        );
      case "users":
        return (
          <>
            <Title level={3}>Students</Title>
            <Paragraph>Manage your students and their access.</Paragraph>
          </>
        );
      case "ads":
        return (
          <>
            <Title level={3}>Announcements</Title>
            <Paragraph>Create and edit announcements for your classes.</Paragraph>
          </>
        );
      case "courses":
        return (
          <>
            <Title level={3}>Courses</Title>
            <Paragraph>Manage your courses: Scratch, Python, HTML/CSS, and more.</Paragraph>
          </>
        );
      case "settings":
        return (
          <>
            <Title level={3}>Settings</Title>
            <Paragraph>Adjust your profile and system preferences.</Paragraph>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <DefaultLayout>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={220} theme="dark">
          <div style={{ padding: 16, color: "#fff", textAlign: "center", fontWeight: "bold" }}>
            Admin Panel
          </div>
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => setSelectedKey(key)}
          >
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="users" icon={<UserOutlined />}>
              Students
            </Menu.Item>
            <Menu.Item key="ads" icon={<AppstoreOutlined />}>
              Announcements
            </Menu.Item>
            <Menu.Item key="courses" icon={<CodeOutlined />}>
              Courses
            </Menu.Item>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Content style={{ padding: "24px" }}>{renderContent()}</Content>
        </Layout>
      </Layout>
    </DefaultLayout>
  );
};
