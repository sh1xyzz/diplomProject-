import React, { useEffect, useState } from "react";

import { Table, Button, Space, Typography, message, Popconfirm } from "antd";
import axios from "axios";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const UsersAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error(t("userCourseView.consoleError"), err);
      message.error(t("userCourseView.messageError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`);
      message.success(t("userCourseView.deleteMessageSuccess"));
      fetchUsers();
    } catch (err) {
      console.error(t("userCourseView.deleteConsoleError"), err);
      message.error(t("userCourseView.deleteMessageError"));
    }
  };

  const handleEdit = async (user: User) => {
    const newRole = prompt(t("userCourseView.newRole"), user.role);
    if (!newRole || newRole.trim() === "") return;

    try {
      await axios.put(`http://localhost:8000/api/users/${user.id}`, { role: newRole.trim() });
      message.success(t("userCourseView.editMessageSuccess"));
      fetchUsers();
    } catch (err) {
      console.error(t("userCourseView.editConsoleError"), err);
      message.error(t("userCourseView.editMessageError"));
    }
  };

  const columns = [
    {
      title: t("userCourseView.columnsName"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("userCourseView.columnsEmail"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("userCourseView.columnsRole"),
      dataIndex: "role",
      key: "role",
    },
    {
      title: t("userCourseView.columnsActions"),
      key: "actions",
      render: (_: unknown, record: User) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            {t("userCourseView.btnEdit")}
          </Button>
          <Popconfirm
            title={t("userCourseView.popconfirmTitle")}
            onConfirm={() => handleDelete(record.id)}
            okText={t("userCourseView.okText")}
            cancelText={t("userCourseView.cancelText")}
          >
            <Button type="link" danger>
              {t("userCourseView.btnDelete")}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Title level={3}>{t("userCourseView.Title")}</Title>
      <Table columns={columns} dataSource={users} loading={loading} rowKey="id" />
    </div>
  );
};
