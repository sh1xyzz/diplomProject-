import React from "react";
import { Typography } from "antd";
import { DefaultLayout } from "components/DefaultLayout";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

export const Careers: React.FC = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto p-6 text-gray-200">
        <Typography>
          <Title>{t("careers.title")}</Title>
          <Paragraph>{t("careers.intro")}</Paragraph>

          <Title level={2}>{t("careers.whyJoin")}</Title>
          <Paragraph>{t("careers.whyJoinText")}</Paragraph>

          <Title level={2}>{t("careers.openPositions")}</Title>
          <Paragraph>{t("careers.openPositionsText")}</Paragraph>

          <Title level={2}>{t("careers.culture")}</Title>
          <Paragraph>{t("careers.cultureText")}</Paragraph>

          <Title level={2}>{t("careers.howToApply")}</Title>
          <Paragraph>{t("careers.howToApplyText")}</Paragraph>
        </Typography>
      </div>
    </DefaultLayout>
  );
};
