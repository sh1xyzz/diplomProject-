import React from "react";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0e0e13] border-t border-gray-700 pt-10 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-2">{t("footer.logoText")}</h2>
          <p className="text-gray-400">{t("footer.aboutText")}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Company</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/about" className="text-gray-400 hover:text-white">
                {t("footer.linkAbout")}
              </Link>
            </li>
            <li>
              <Link to="/careers" className="text-gray-400 hover:text-white">
                {t("footer.linkCareers")}
              </Link>
            </li>
            <li>
              <Link to="/press" className="text-gray-400 hover:text-white">
                {t("footer.linkPress")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">
            {t("footer.linkSupport")}
          </h3>
          <ul className="space-y-1">
            <li>
              <Link to="/help" className="text-gray-400 hover:text-white">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-gray-400 hover:text-white">
                {t("footer.linkTerms")}
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-gray-400 hover:text-white">
                {t("footer.linkPrivacy")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">
            {t("footer.linkContact")}
          </h3>
          <p className="flex items-center gap-2 text-gray-400">
            <MailOutlined /> support@MySite.com
          </p>
          <p className="flex items-center gap-2 text-gray-400">
            <PhoneOutlined /> +380 98 38 62 461
          </p>
          <p className="flex items-center gap-2 text-gray-400">
            <EnvironmentOutlined /> 123 Main Street, City, Country
          </p>
        </div>
      </div>

      {/* Social Icons */}
      <div className="mt-10 flex justify-center gap-6 text-2xl">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          <FacebookOutlined />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-sky-400"
        >
          <TwitterOutlined />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400"
        >
          <InstagramOutlined />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400"
        >
          <LinkedinOutlined />
        </a>
      </div>

      <div className="mt-6 text-center text-gray-500 text-sm">
        {t("footer.copyText")}
      </div>
    </footer>
  );
};
