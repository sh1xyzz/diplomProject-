import React, { useEffect, useState } from "react";

import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Typography, Tag, Button, Input, Pagination } from "antd";
import axios from "axios";
import { CourseCard } from "components/Cards/CourseCard";
import { DefaultLayout } from "components/DefaultLayout";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;

export const CoursesView = () => {
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false)
      }
    };

    fetchCourses();
  })

  const tags = Array.from(new Set(courses.flatMap((c) => c.tags?.map((tag: any) => tag.name)  || [])));

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());

    const tagNames = course.tags?.map((tag: any) => tag.name) || [];
    const matchesTag = activeTag ? tagNames.includes(activeTag) : true;

    return matchesSearch && matchesTag;
  });

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <DefaultLayout>
      <section className="py-12 px-4">
        <div className="bg-gray-900 p-10 rounded-xl mb-10 text-center">
          <Title>
            {t("coursesView.title")}
            <span className="text-green-400">{t("coursesView.varnix")}</span>
          </Title>
          <div className="flex justify-center mb-4 mt-10 gap-5">
            <Search
              placeholder={t("coursesView.searchPlaceholder")}
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xl w-full"
            />
            <Button
              className="bg-green-400"
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => navigate("/add-course")}
            >
              {t("coursesView.addCourse")}
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-2 ">
            {tags.map((tag, index) => (
              <Tag
                key={index}
                className={`cursor-pointer ${
                  activeTag === tag
                    ? "bg-blue-600 text-white"
                    : "bg-blue-900 text-white"
                }`}
                onClick={() => {
                  setActiveTag(activeTag === tag ? null : tag);
                  setCurrentPage(1);
                }}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {paginatedCourses.map((card, index) => (
            <CourseCard
              key={index}
              id={card.id}
              title={card.title}
              subtitle={card.description}
              categories={card.tags?.map((tag: any) => tag.name) || []}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredCourses.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </section>
    </DefaultLayout>
  );
};
