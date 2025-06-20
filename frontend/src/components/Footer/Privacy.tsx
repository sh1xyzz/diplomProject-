import React from "react";
import { Typography } from "antd";
import { DefaultLayout } from "components/DefaultLayout";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

export const Privacy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto p-6 text-gray-200">
        <Typography>
          <Title>{t("privacy.title")}</Title>
          <Paragraph>{t("privacy.intro")}</Paragraph>

          <Title level={2}>{t("privacy.dataCollectionTitle")}</Title>
          <Paragraph>{t("privacy.dataCollectionText")}</Paragraph>

          <Title level={2}>{t("privacy.dataUsageTitle")}</Title>
          <Paragraph>{t("privacy.dataUsageText")}</Paragraph>

          <Title level={2}>{t("privacy.dataProtectionTitle")}</Title>
          <Paragraph>{t("privacy.dataProtectionText")}</Paragraph>

          <Title level={2}>{t("privacy.yourRightsTitle")}</Title>
          <Paragraph>{t("privacy.yourRightsText")}</Paragraph>

          <Title level={2}>{t("privacy.contactTitle")}</Title>
          <Paragraph>{t("privacy.contactText")}</Paragraph>
        </Typography>
      </div>
    </DefaultLayout>
  );
};
