import React, { useEffect, useState } from "react";

import { Typography, Tag, Spin, Button, Divider } from "antd";
import img from "assets/image/avatar.jpg"
import { DefaultLayout } from "components/DefaultLayout";
import { useParams, useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

export const DetailCoursesView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockCourse: Course = {
      id: 1,
      title: "Mastering React in 2025",
      description:
        "This course will take you from beginner to advanced in modern React with hooks, context, routing and full application structure.",
      tags: [
        { id: 1, name: "react" },
        { id: 2, name: "frontend" },
        { id: 3, name: "typescript" },
      ],
      created_at: "2025-05-01T12:00:00Z",
      updated_at: "2025-05-12T15:45:00Z",
      image: img,
      teacher: "John Doe",
      goals: [
        "Understand React fundamentals",
        "Work with React Hooks and Context API",
        "Build real-world projects",
        "Type safety with TypeScript",
      ],
    };

    setTimeout(() => {
      setCourse(mockCourse);
      setLoading(false);
    }, 800);
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
        <div className="text-center text-red-500 mt-10">Course not found.</div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <section className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-xl shadow-md mb-[50px]">
        <img
          src={course.image}
          alt={course.title}
          className="rounded-lg mb-6 w-full max-h-[300px] object-cover"
        />

        <div className="mb-4 flex justify-between items-start gap-4 flex-wrap">
          <Title level={2} className="text-white mb-0">{course.title}</Title>
          <div className="flex gap-2 flex-wrap">
            <Button onClick={() => navigate(-1)}>← Back</Button>
            <Button type="primary">Enroll</Button>
          </div>
        </div>

        <Paragraph className="text-gray-300 text-lg mb-6">{course.description}</Paragraph>

        <div className="mb-4">
          <Text className="text-gray-400 mr-2">Tags:</Text>
          {course.tags.map((tag) => (
            <Tag key={tag.id} color="geekblue" className="mb-1">
              {tag.name}
            </Tag>
          ))}
        </div>

        <Divider className="border-gray-700" />

        <div className="mb-4">
          <Text className="text-white font-semibold">Instructor:</Text>{" "}
          <Text className="text-gray-300">{course.teacher}</Text>
        </div>

        <div className="mb-6">
          <Text className="text-white font-semibold block mb-2">What youll learn:</Text>
          <ul className="list-disc list-inside text-gray-300">
            {course.goals.map((goal, i) => (
              <li key={i}>{goal}</li>
            ))}
          </ul>
        </div>

        <div className="text-sm text-gray-500 border-t border-gray-700 pt-4">
          <div>🕒 Created: {new Date(course.created_at).toLocaleString()}</div>
          <div>🛠️ Updated: {new Date(course.updated_at).toLocaleString()}</div>
        </div>
      </section>
    </DefaultLayout>
  );
};
