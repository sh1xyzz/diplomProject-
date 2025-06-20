import React from "react";

import { Typography } from "antd";
import { DefaultLayout } from "components/DefaultLayout";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto p-6 text-gray-200">
        <Typography>
          <Title>{t("about.title")}</Title>
          <Paragraph>
            {t("about.intro")}
          </Paragraph>

          <Title level={2}>{t("about.missionTitle")}</Title>
          <Paragraph>
            {t("about.missionText")}
          </Paragraph>

          <Title level={2}>{t("about.valuesTitle")}</Title>
          <Paragraph>
            {t("about.valuesText")}
          </Paragraph>

          <Title level={2}>{t("about.whoTitle")}</Title>
          <Paragraph>
            {t("about.whoText")}
          </Paragraph>

          <Title level={2}>{t("about.offerTitle")}</Title>
          <Paragraph>
            {t("about.offerText")}
          </Paragraph>

          <Title level={2}>{t("about.joinTitle")}</Title>
          <Paragraph>
            {t("about.joinText")}
          </Paragraph>
        </Typography>
      </div>
  </DefaultLayout>
  );
};
