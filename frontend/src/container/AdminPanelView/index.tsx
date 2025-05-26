import React, { useState } from "react";

import {
  UserOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography } from "antd";
import { DefaultLayout } from "components/DefaultLayout";
import { CoursesAdmin } from "container/AdminPanelView/CoursesAdmin";
import { UsersAdmin } from "container/AdminPanelView/UsersAdmin";
import { useTranslation } from "react-i18next"

const { Title } = Typography;
const { Sider, Content } = Layout;

export const AdminPanelView = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");

  const { t } = useTranslation();

  const renderContent = () => {
    switch (selectedKey) {
      case "users":
        return <UsersAdmin />;
      case "courses":
        return <CoursesAdmin />;
      default:
        return null;
    }
  };

  return (
    <DefaultLayout>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={220} theme="dark" className="rounded-lg">
          <div style={{ padding: 16, textAlign: "center", fontWeight: "bold" }}>
            <Title level={4}>{t("adminView.title")}</Title>
          </div>
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => setSelectedKey(key)}
          >
            <Menu.Item key="users" icon={<UserOutlined />}>{t("adminView.students")}</Menu.Item>
            <Menu.Item key="courses" icon={<CodeOutlined />}>{t("adminView.courses")}</Menu.Item>
            {/* <Menu.Item key="ads" icon={<AppstoreOutlined />}>Announcements</Menu.Item> */}
          </Menu>
        </Sider>

        <Layout>
          <Content style={{ padding: "24px" }}>{renderContent()}</Content>
        </Layout>
      </Layout>
    </DefaultLayout>
  );
};
