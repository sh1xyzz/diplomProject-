import React from "react";

import { FloatingContactForm } from "components/FloatingContactForm";
import { Footer } from "components/Footer";
import { Header } from "components/Header";

import style from "./DefaultLayout.module.css";


export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className={style.headerBlockContainer}>
      <Header />
      <div className={style.mainBlock}>{children}</div>
      <FloatingContactForm />
      <Footer />
    </div>
  );
};
