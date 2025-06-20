import React from "react";
import { Typography } from "antd";
import { DefaultLayout } from "components/DefaultLayout";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

export const Help: React.FC = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto p-6 text-gray-200">
        <Typography>
          <Title>{t("help.title")}</Title>
          <Paragraph>{t("help.intro")}</Paragraph>

          <Title level={2}>{t("help.faqTitle")}</Title>
          <Paragraph>
            <strong>{t("help.q1")}</strong><br />
            {t("help.a1")}
          </Paragraph>
          <Paragraph>
            <strong>{t("help.q2")}</strong><br />
            {t("help.a2")}
          </Paragraph>
          <Paragraph>
            <strong>{t("help.q3")}</strong><br />
            {t("help.a3")}
          </Paragraph>

          <Title level={2}>{t("help.contactTitle")}</Title>
          <Paragraph>{t("help.contactText")}</Paragraph>
        </Typography>
      </div>
    </DefaultLayout>
  );
};
