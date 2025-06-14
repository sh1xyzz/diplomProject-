import React, { useEffect, useState } from "react";

import { Typography, Tag, Spin, Button } from "antd";
import { DefaultLayout } from "components/DefaultLayout";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

interface Course {
  id: number;
  title: string;
  description: string;
  detail: string;
  tags: { id: number; name: string }[];
  created_at: string;
  updated_at: string;
  teacher?: string;
  goals?: string[];
  image?: string;
}

export const DetailCoursesView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/courses/${id}`);
        if (!response.ok) throw new Error(t("detailCourse.notFound"));
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error(t("detailCourse.consoleError"), error);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center min-h-[300px]">
          <Spin size="large" />
        </div>
      </DefaultLayout>
    );
  }

  if (!course) {
    return (
      <DefaultLayout>
        <div className="text-center text-red-500 mt-10">{t("detailCourse.courseNotFound")}</div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <section className="max-w-4xl mx-auto p-6 bg-[#1c1c28] rounded-xl shadow-md mb-[50px]">
        {course.image && (
          <img
            src={`http://localhost:8000${course.image}`}
            alt={course.title}
            className="rounded-lg mb-6 w-full max-h-[300px] object-cover"
          />
        )}

        <div className="mb-4 flex justify-between items-start gap-4 flex-wrap">
          <Title level={2} className="text-white mb-0">{course.title}</Title>
          <div className="flex gap-2 flex-wrap">
            <Button onClick={() => navigate(-1)}>{t("detailCourse.btnBack")}</Button>
          </div>
        </div>
        

        <Paragraph className="text-gray-300 text-lg mb-6">{course.description}</Paragraph>

        {course.tags.length > 0 && (
          <div className="mb-4">
            <Text className="text-gray-400 mr-2">{t("detailCourse.textTags")}</Text>
            {course.tags.map((tag) => (
              <Tag key={tag.id} color="geekblue" className="mb-1">
                {tag.name}
              </Tag>
            ))}
          </div>
        )}

        <Paragraph className="text-gray-400 text-lg mb-6">{course.detail}</Paragraph>

        {course.teacher && (
          <div className="mb-4">
            <Text className="font-semibold">{t("detailCourse.textInstructor")}</Text>{" "}
            <Text className="text-gray-300">{course.teacher}</Text>
          </div>
        )}

        {course.goals && (
          <div className="mb-6">
            <Text className="font-semibold block mb-2">{t("detailCourse.textWhat")}</Text>
            <ul className="list-disc list-inside text-gray-300">
              {course.goals.map((goal, i) => (
                <li key={i}>{goal}</li>
              ))}
            </ul>
          </div>
        )}



        <div className="text-sm text-gray-500 border-t border-gray-700 pt-4">
          <div>{t("detailCourse.createdCourse")} {new Date(course.created_at).toLocaleString()}</div>
          <div>{t("detailCourse.updateCourse")} {new Date(course.updated_at).toLocaleString()}</div>
        </div>
      </section>
    </DefaultLayout>
  );
};
