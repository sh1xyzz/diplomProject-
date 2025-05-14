import React, { useState } from "react";

import { CloseOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import { Registration } from "components/Registration";
import { useTranslation } from "react-i18next";

export const LoginWindow: React.FC<LoginWindowProps> = ({ onSuccess, onClose }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const [isRegistration, setIsRegistration] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!agree) {
      setError(t("loginWindow.agreeError"));
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.status === "ok") {
        onSuccess(data);
        onClose();
      } else {
        setError(data.message || t("loginWindow.loginFailed"));
      }
    } catch (err) {
      setError(t("loginWindow.serverError"));
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-md w-96 shadow-lg relative">
        <Button
          onClick={onClose}
          type="link"
          className="absolute top-2 right-2 text-white text-xl font-bold hover:text-red-500"
          aria-label="Close"
        >
          <CloseOutlined />
        </Button>

        {isRegistration ? (
          <>
            <Registration onSuccess={onSuccess} onClose={onClose} />
            <div className="mt-4 text-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsRegistration(false);
                }}
                className="text-blue-400 text-sm hover:underline"
              >
                {t("loginWindow.backToLoginLink")}
              </a>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-white">{t("loginWindow.title")}</h2>
            <form onSubmit={handleLogin}>
              <Input
                type="email"
                placeholder={t("loginWindow.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mb-3"
              />
              <Input.Password
                placeholder={t("loginWindow.passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mb-3"
              />

              <Checkbox checked={agree} onChange={() => setAgree(!agree)} className="mb-3">
                {t("loginWindow.agreeText")}{" "}
                <a href="/terms" className="underline hover:text-blue-400">
                  {t("loginWindow.termsLink")}
                </a>
              </Checkbox>

              {error && <div className="text-red-500 mb-3">{error}</div>}

              <div className="flex justify-between items-center mb-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsRegistration(true);
                  }}
                  className="text-blue-400 text-sm hover:underline"
                >
                  {t("loginWindow.registerLink")}
                </a>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="default" onClick={onClose} className="px-4 py-2">
                  {t("loginWindow.cancelButton")}
                </Button>
                <Button type="primary" htmlType="submit" className="px-4 py-2">
                  {t("loginWindow.loginButton")}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
