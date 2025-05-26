import React, { useState } from "react";

import {
  SettingOutlined,
  CustomerServiceOutlined,
  ShopOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { Typography, Button } from "antd";
import { DefaultLayout } from "components/DefaultLayout";
import { useTranslation } from "react-i18next";

const { Title, Text, Paragraph } = Typography;

export const ServicesView = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<number | null>(null);

  const servicesData = [
  {
    icon: <ShopOutlined className="text-3xl text-blue-400" />,
    title: t("servicesView.titleMarketplace"),
    description:
      t("servicesView.descriptionMarketplace"),
    details:
      t("servicesView.detailsMarketplace"),
  },
  {
    icon: <RocketOutlined className="text-3xl text-green-400" />,
    title: t("servicesView.titleStartup"),
    description: t("servicesView.descriptionStartup"),
    details:
      t("servicesView.detailsStartup"),
  },
  {
    icon: <SettingOutlined className="text-3xl text-yellow-400" />,
    title: t("servicesView.titleAutomation"),
    description: t("servicesView.descriptionAutomation"),
    details:
      t("servicesView.detailsAutomation"),
  },
  {
    icon: <CustomerServiceOutlined className="text-3xl text-pink-400" />,
    title: t("servicesView.titleSupport"),
    description: t("servicesView.descriptionSupport"),
    details:
      t("servicesView.detailsSupport"),
  },
];

  return (
    <DefaultLayout>
      <section className="py-12 px-4">
        <div className="bg-gray-900 p-10 rounded-xl mb-10">
          <Title className="text-white text-center">
            {t("servicesView.title")}
          </Title>
          <Text className="text-gray-400 text-center block mb-6">
            {t("servicesView.subtitle")}
          </Text>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 text-gray-300">
            <div>
              <h3 className="text-white font-semibold mb-1">
                {t("servicesView.businessConsultationsTitle")}
              </h3>
              <p className="text-sm text-gray-400">
                {t("servicesView.businessConsultationsText")}
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">
                {t("servicesView.legalAssistanceTitle")}
              </h3>
              <p className="text-sm text-gray-400">
                {t("servicesView.legalAssistanceText")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                {t("servicesView.itDevelopmentTitle")}
              </h3>
              <p className="text-sm text-gray-400">
                {t("servicesView.itDevelopmentText")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                • {t("servicesView.marketingSupportTitle")}
              </h3>
              <p className="text-sm text-gray-400">
                {t("servicesView.mentorshipProgramsText")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                {t("servicesView.financialGuidanceTitle")}
              </h3>
              <p className="text-sm text-gray-400">
                {t("servicesView.financialGuidanceText")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                {t("servicesView.mentorshipProgramsTitle")}
              </h3>
              <p className="text-sm text-gray-400">
                {t("servicesView.mentorshipProgramsText")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl shadow-md flex items-start gap-4"
            >
              <div>{service.icon}</div>
              <div>
                <Title level={4} className="m-0 text-white">
                  {service.title}
                </Title>
                <Paragraph className="text-gray-300">
                  {service.description}
                </Paragraph>
                {expanded === index && (
                  <Paragraph className="text-gray-400">
                    {service.details}
                  </Paragraph>
                )}
                <Button
                  type="link"
                  className="p-0 text-blue-400"
                  onClick={() => setExpanded(expanded === index ? null : index)}
                >
                  {expanded === index
                    ? t("servicesView.hide")
                    : t("servicesView.learnMore")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
};
