import React, { useEffect, useState } from "react";

import '@ant-design/v5-patch-for-react-19';
import { GlobalOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Avatar, Dropdown, Badge, message } from "antd";
import { LoginWindow } from "components/Login";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const [loginOpen, setLoginOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setUsername(parsedUser.name || "Unknown");
      setUserRole(parsedUser.role || "user");

      const avatarFileName = parsedUser.avatar || "";
      setAvatarUrl(avatarFileName);

      setIsActive(true);
    }
  }, []);

  const handleLogout = () => {
    console.log("Logout success!");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
    setIsActive(false);

    message.success("Success!")
    navigate("/");
  };

  const onLoginSuccess = (userData: any) => {
    console.log("Login success", userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData.user));

    console.log(JSON.parse(localStorage.getItem("user") || "{}"));

    setIsLoggedIn(true);
    setUsername(userData.user.name || "Unknown");
    setUserRole(userData.user.role || "user");
    const avatarFileName = userData.user.avatar || "";
    setAvatarUrl(avatarFileName);
    
    setIsActive(true);

    message.success(t("header.messageSuccess"))
  };

  const menuItems = [
    {
      key: "profile",
      label: <Link to={`/profile/${username}`}>{t("header.menuProfile")}</Link>,
    },
    {
      key: "logout",
      label: (
        <span
          className="text-red-500"
          onClick={() => handleLogout()}>{t("header.menuLogout")}</span>
      ),
    },
  ];

  const languageMenu = {
    items: [
      {
        label: "US",
        key: "us",
        onClick: () => i18n.changeLanguage("us"),
      },
      {
        label: "UK",
        key: "uk",
        onClick: () => i18n.changeLanguage("uk"),
      },
    ],
  };

  return (
    <>
      <header className="bg-[#0e0e13] border-gray-700 border-b shadow-md relative">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold cursor-pointer"><Link to="/">{t("header.title")}</Link></div>

          <nav className="space-x-6 text-lg">
            <Link to="/" className="text-white hover:gray-300">
              {t("header.catalogHome")}
            </Link>
            <Link to="/services/" className="text-white hover:gray-600">
              {t("header.catalogServices")}
            </Link>
            <Link to="/courses" className="text-white hover:gray-300">
              {t("header.catalogCourses")}
            </Link>
          </nav>

          <div className="flex items-center space-x-4 relative">
            <Dropdown menu={languageMenu} trigger={["click"]}>
              <Button type="text" size="large">
                <GlobalOutlined /> {i18n.language.toUpperCase()}
              </Button>
            </Dropdown>

            {isLoggedIn ? (
              <Dropdown
                menu={{ items: menuItems }}
                trigger={["click"]}>
                <div className="flex items-center space-x-2">
                  <div className="flex flex-col items-end">
                    <span className="font-semibold cursor-pointer">{username}</span>
                    <span className="text-sm text-gray-400">{userRole}</span>
                  </div>
                  <Badge dot={isActive} color={isActive ? "green" : "red"}>
                    <Avatar
                      size={48}
                      src={avatarUrl ? `http://localhost:8000/storage/${avatarUrl}` : undefined}
                      icon={<UserOutlined />}
                      className="cursor-pointer translation-all duration-300 hover:scale-105"
                    />
                  </Badge>
                </div>
              </Dropdown>
            ) : (
              <div onKeyDown={(e) => e.stopPropagation()}>
                <Dropdown
                  open={loginOpen}
                  onOpenChange={(open) => setLoginOpen(open)}
                  menu={{ items: [] }}
                  trigger={["click"]}
                  dropdownRender={() => (
                    <LoginWindow
                      isModal={true}
                      setLoginOpen={setLoginOpen}
                      onSuccess={(userData: User) => {
                        if (onLoginSuccess) onLoginSuccess(userData);
                        setLoginOpen(false);
                      }}
                      onClose={() => setLoginOpen(false)}
                    />
                  )}
                >
                  <Button type="primary" className="transition-all duration-300 hover:opacity-80">
                    {t("header.btnLogin")}
                  </Button>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
