import React from "react";

import { AppstoreOutlined } from "@ant-design/icons";
import { Typography, Tag } from "antd";

const { Title, Text } = Typography;

export const MainCard: React.FC<MainCardProps> = ({
  title,
  subtitle,
  categories,
}) => {

  return (
    <div className="bg-[#171722] rounded-xl shadow-md overflow-hidden relative p-6">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 rounded-t-md" />

      <div className="flex items-center justify-between mt-4">
        <Title level={4} className="mb-0">
          {title}
        </Title>
        <AppstoreOutlined className="text-xl" />
      </div>

      <Text className="text-gray-300 block pt-2 mb-4">{subtitle}</Text>

      <div className="flex flex-wrap gap-2 pt-5">
        {categories.map((cat, index) => (
          <Tag
            color="blue"
            key={index}
            className="bg-blue-800 border-none"
          >
            {cat}
          </Tag>
        ))}
      </div>
    </div>
  );
};
