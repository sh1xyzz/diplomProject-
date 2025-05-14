import React, { useEffect, useState } from "react";

import { SendOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { Form, Input, Button, Select, Typography, message, Divider } from "antd";
import axios from "axios";
import { DefaultLayout } from "components/DefaultLayout";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export const CreateCoursesView: React.FC = () => {
  const [form] = Form.useForm();
  const [tags, setTags] = useState<{id: number, name: string }[]>([]);

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/tags");
        setTags(response.data);
      } catch (error) {
        console.error(t("createCourseView.error"), error);
        message.error(t("createCourseView.errorLoad"));
      }
    };

    fetchTags();
  }, []);

  const onFinish = async (values: any) => {
  try {
    const response = await axios.post("http://localhost:8000/api/courses", values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response:", response.data);
    message.success(t("createCourseView.success"));
    form.resetFields();
  } catch (error: any) {
    console.error("Error creating course:", error);
    message.error(t("createCoursesView.errorCreate"));
  }
};


  return (
    <DefaultLayout>
      <section className="py-12 px-4 max-w-3xl mx-auto">
        <div className="bg-gray-900 p-8 rounded-xl">
          <Title level={2} className="text-center mb-6">{t("createCourseView.addNewCourses")}</Title>

          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label={<span className="text-base">{t("createCourseView.titleCourses")}</span>}
              name="title"
              rules={[{ required: true, message: t("createCoursesView.messageRulesTitle") }]}
            >
              <Input size="large" placeholder={t("createCourseView.placeholderTitle")} />
            </Form.Item>

            <Form.Item
              label={<span className="text-white text-base">{t("createCourseView.descriptionCourses")}</span>}
              name="description"
              rules={[{ required: true, message: t("createCourseView.messageRulesDescriptions") }]}
            >
              <TextArea size="large" placeholder={t("createCourseView.placeholderDescriptions")} rows={4} />
            </Form.Item>

            <Form.Item
              label={<span className="text-base">{t("createCourseView.tagsCourses")}</span>}
              name="tags"
              rules={[{ required: true, message: t("createCourseView.messageRulesTag") }]}
            >
              <Select size="large" mode="multiple" placeholder={t("createCourseView.placeholderTag")} loading={tags.length === 0}>
                {tags.map((tag) => (
                  <Option key={tag.id} value={tag.id}>
                    {tag.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Divider />

            <div>
                <Paragraph className="text-gray-400">
                    <span className="text-green-500"> $ </span>
                    {t("createCourseView.paragraphContent")}
                </Paragraph>
            </div>
            <div>
                <Paragraph className="text-gray-400">
                    <span className="text-green-500"> $ </span>
                    {t("createCourseView.paragraphMedia")}
                </Paragraph>
            </div>
            <div>
                <Paragraph className="text-gray-400">
                    <span className="text-green-500"> $ </span>
                    {t("createCourseView.paragraphSystem")}
                </Paragraph>
            </div>
            <Form.Item>
                <div className="flex gap-4 mt-5">
                    <Button
                        type="text"
                        size="large"
                        icon={<ArrowLeftOutlined />}
                        className="border border-gray-700"
                        onClick={() => navigate(-1)}
                        >
                        {t("createCourseView.btnBack")}
                    </Button>

                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        className="bg-green-500 w-full"
                        icon={<SendOutlined />}
                        >
                        {t("createCourseView.btnPublic")}
                    </Button>
                </div>
            </Form.Item>
          </Form>
        </div>
      </section>
    </DefaultLayout>
  );
};
