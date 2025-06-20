import React from "react";
import { Typography } from "antd";
import { DefaultLayout } from "components/DefaultLayout";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

export const Press: React.FC = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto p-6 text-gray-200">
        <Typography>
          <Title>{t("press.title")}</Title>
          <Paragraph>{t("press.intro")}</Paragraph>

          <Title level={2}>{t("press.latestNews")}</Title>
          <Paragraph>{t("press.latestNewsText")}</Paragraph>

          <Title level={2}>{t("press.mediaKit")}</Title>
          <Paragraph>{t("press.mediaKitText")}</Paragraph>

          <Title level={2}>{t("press.contactTitle")}</Title>
          <Paragraph>{t("press.contactText")}</Paragraph>
        </Typography>
      </div>
    </DefaultLayout>
  );
};
