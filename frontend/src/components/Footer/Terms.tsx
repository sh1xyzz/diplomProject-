import React from "react";
import { Typography } from "antd";
import { DefaultLayout } from "components/DefaultLayout";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

export const Terms: React.FC = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto p-6 text-gray-200">
        <Typography>
          <Title>{t("terms.title")}</Title>
          <Paragraph>{t("terms.intro")}</Paragraph>

          <Title level={2}>{t("terms.useTitle")}</Title>
          <Paragraph>{t("terms.useText")}</Paragraph>

          <Title level={2}>{t("terms.accountTitle")}</Title>
          <Paragraph>{t("terms.accountText")}</Paragraph>

          <Title level={2}>{t("terms.privacyTitle")}</Title>
          <Paragraph>{t("terms.privacyText")}</Paragraph>

          <Title level={2}>{t("terms.limitationTitle")}</Title>
          <Paragraph>{t("terms.limitationText")}</Paragraph>

          <Title level={2}>{t("terms.changesTitle")}</Title>
          <Paragraph>{t("terms.changesText")}</Paragraph>

          <Title level={2}>{t("terms.contactTitle")}</Title>
          <Paragraph>{t("terms.contactText")}</Paragraph>
        </Typography>
      </div>
    </DefaultLayout>
  );
};
