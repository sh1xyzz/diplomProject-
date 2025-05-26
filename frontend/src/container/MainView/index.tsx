import React from "react";

import { Typography } from "antd";
import { MainCard } from "components/Cards";
import { DefaultLayout } from "components/DefaultLayout";
import { useTranslation } from "react-i18next";


const { Text, Title } = Typography;

export const MainView = () => {
  const { t } = useTranslation();

  const cardsData = [
    {
      title: "Business Tools",
      subtitle: "All the tools you need to grow",
      categories: ["CRM", "Analytics", "Billing"],
    },
    {
      title: "Community",
      subtitle: "Connect with other founders",
      categories: ["Forum", "Events", "Networking"],
    },
    {
      title: "Learning",
      subtitle: "Educational materials",
      categories: ["Courses", "Webinars", "E-books"],
    },
    {
      title: "Support",
      subtitle: "We're here to help",
      categories: ["FAQ", "Chat", "Contact"],
    },
    {
      title: "Marketplace",
      subtitle: "Sell and promote products",
      categories: ["Services", "Jobs", "Promotions"],
    },
    {
      title: "Profile",
      subtitle: "Your account info",
      categories: ["Settings", "Security", "Preferences"],
    },
  ];

  return (
    <DefaultLayout>
      <section className="py-12 px-4">
        <div className="text-start mb-10 bg-gray-900 p-10 rounded-xl">
          <Title>{t("mainView.titleText")}</Title>
          <Text className="text-gray-400">{t("mainView.subtitleText")}</Text>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {cardsData.map((card, index) => (
            <MainCard
              key={index}
              title={card.title}
              subtitle={card.subtitle}
              categories={card.categories}
            />
          ))}
        </div>

        <div className="text-start mb-20 bg-gray-900 p-10 rounded-xl">
          <Title>{t("mainView.subscribeTitle")}</Title>
          <Text className="text-gray-400">
            {t("mainView.subscribeSubtext")}
          </Text>
        </div>
      </section>
    </DefaultLayout>
  );
};