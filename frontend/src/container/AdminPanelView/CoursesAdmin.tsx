import React, { useEffect, useState } from "react";

import { Table, Button, Space, message, Popconfirm, Modal, Input, Form } from "antd";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface Course {
  id: string;
  title: string;
  students_count: number;
  image?:string;
}

export const CoursesAdmin: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const { t } = useTranslation();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(t("adminCourseView.consoleError"), err);
      message.error(t("adminCourseView.messageError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/courses/${id}`);
      message.success(t("adminCourseView.deleteMessageSuccess"));
      fetchCourses();
    } catch (err) {
      console.error(t("adminCourseView.deleteConsoleError"), err);
      message.error(t("adminCourseView.deleteMessageError"));
    }
  };

  const showEditModal = (course: Course) => {
    setEditingCourse(course);
    form.setFieldsValue({ title: course.title });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCourse(null);
    form.resetFields();
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      if (!editingCourse) return;

      await axios.put(`http://localhost:8000/api/courses/${editingCourse.id}`, {
        title: values.title,
      });

      message.success(t("adminCourseView.updateMessageSuccess"));
      setIsModalVisible(false);
      setEditingCourse(null);
      fetchCourses();
    } catch (err) {
      console.error(t("adminCourseView.updateConsoleError"), err);
      message.error(t("adminCourseView.updateMessageError"));
    }
  };

  const columns = [
    {
      title: t("adminCourseView.titleCourse"),
      dataIndex: "title",
      key: "title",
    },
    {
      title: t("adminCourseView.studentCourse"),
      dataIndex: "students_count",
      key: "students_count",
    },
    {
      title: t("adminCourseView.actionsCourse"),
      key: "actions",
      render: (_: any, record: Course) => (
        <Space>
          <Button type="link" onClick={() => showEditModal(record)}>{t("adminCourseView.btnEdit")}</Button>
          <Popconfirm
            title={t("adminCourseView.popconfirmDelete")}
            onConfirm={() => handleDelete(record.id)}
            okText={t("adminCourseView.okText")}
            cancelText={t("adminCourseView.cancelText")}
          >
            <Button type="link" danger>{t("adminCourseView.btnDelete")}</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table<Course>
        dataSource={courses}
        columns={columns}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={t("adminCourseView.modalTitleEdit")}
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
        okText={t("adminCourseView.saveText")}
      >
        <Form form={form} layout="vertical" name="edit_course_form">
          <Form.Item
            label={t("adminCourseView.labelTitleCourse")}
            name="title"
            rules={[{ required: true, message: t("adminCourseView.rulesTitleCourse") }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
