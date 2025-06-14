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
      title: t("mainView.titleLessons"),
      subtitle: t("mainView.subtitleLessons"),
      categories: [t("mainView.Presentations"), t("mainView.Assignments"), t("mainView.Quizzes")],
    },
    {
      title: t("mainView.titleSchedule"),
      subtitle: t("mainView.subtitleSchedule"),
      categories: [t("mainView.Classes"), t("mainView.Consultations"), t("mainView.Exams")],
    },
    {
      title: t("mainView.titleNews"),
      subtitle: t("mainView.subTitleNews"),
      categories: [t("mainView.SchoolNews"), t("mainView.Olympiads"), t("mainView.Clubs")],
    },
    {
      title: t("mainView.titleAbout"),
      subtitle: t("mainView.subtitleAbout"),
      categories: [t("mainView.Bio"), t("mainView.Contacts"), t("mainView.Teaching")],
    },
    {
      title: t("mainView.titleExtra"),
      subtitle: t("mainView.subtitleExtra"),
      categories: [t("mainView.YouTube"), t("mainView.Platforms"), t("mainView.Books")],
    },
    {
      title: t("mainView.titleFeedback"),
      subtitle: t("mainView.subtitleFeedback"),
      categories: [t("mainView.Contact"), t("mainView.Questions"), t("mainView.Suggestions")],
    },
  ];


  return (
    <DefaultLayout>
      <section className="py-12 px-4">
        <div className="text-start mb-10 bg-[#1c1c28] p-10 rounded-xl">
          <Title>{t("mainView.titleText")}</Title>
          <Text className="text-gray-400 text-base">{t("mainView.subtitleText")}</Text>
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

        <div className="text-start mb-20 bg-[#171722] p-10 rounded-xl">
          <Title>{t("mainView.subscribeTitle")}</Title>
          <Text className="text-gray-400">
            {t("mainView.subscribeSubtext")}
          </Text>
        </div>
      </section>
    </DefaultLayout>
  );
};