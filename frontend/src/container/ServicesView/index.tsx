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

const servicesData = [
  {
    icon: <ShopOutlined className="text-3xl text-blue-400" />,
    title: "Marketplace Integration",
    description:
      "Connect your store and start selling with our advanced tools.",
    details:
      "We provide tools and support to integrate with platforms like Shopify, Etsy, and WooCommerce. Our team ensures seamless onboarding and helps manage your inventory, payments, and logistics.",
  },
  {
    icon: <RocketOutlined className="text-3xl text-green-400" />,
    title: "Startup Booster",
    description: "Get tailored support to launch your business idea fast.",
    details:
      "We help you validate your idea, prepare MVPs, connect with investors, and understand the competitive landscape to speed up your product’s launch and growth.",
  },
  {
    icon: <SettingOutlined className="text-3xl text-yellow-400" />,
    title: "Automation Tools",
    description: "Automate your daily tasks with our built-in solutions.",
    details:
      "Our automation suite includes scheduling, CRM integration, and marketing automation features. Save hours of routine work and focus on what matters most.",
  },
  {
    icon: <CustomerServiceOutlined className="text-3xl text-pink-400" />,
    title: "24/7 Support",
    description: "Our team is ready to help anytime, anywhere.",
    details:
      "Whether you’re launching a new feature or dealing with unexpected issues, our multilingual support team is always available to assist via chat, email, or phone.",
  },
];

export const ServicesView = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<number | null>(null);

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
