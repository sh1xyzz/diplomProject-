import React from "react";

import { ConfigProvider, theme, App as AntdApp } from "antd";
import ReactDOM from "react-dom/client";
import "./i18n/config";

import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#890be0",
          },
        }}
      > 
      <AntdApp>
        <App/>
      </AntdApp>
      </ConfigProvider>
    </React.StrictMode>
  );
}
