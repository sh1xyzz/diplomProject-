import React, { useEffect } from "react";

import { About } from "components/Footer/About";
import { Careers } from "components/Footer/Careers";
import { Help } from "components/Footer/Help";
import { Press } from "components/Footer/Press";
import { Privacy } from "components/Footer/Privacy";
import { Terms } from "components/Footer/Terms";
import { AdminPanelView } from "container/AdminPanelView";
import { CoursesView } from "container/CoursesView";
import {CreateCoursesView} from "container/CoursesView/CreateCoursesView"
import { DetailCoursesView } from "container/CoursesView/DetailCoursesView";
import { MainView } from "container/MainView";
import { ProfileView } from "container/ProfileView";
import { ServicesView } from "container/ServicesView";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage("us");
  }, []);

  return (
    <BrowserRouter>     
        <Routes>
          <Route path="*" element={<MainView />} />
          <Route path="/courses/" element={<CoursesView />} />
          <Route path="/services" element={<ServicesView />} />
          <Route path="/profile/:username" element={<ProfileView />} />
          <Route path="/admin" element={<AdminPanelView/> } />
          
          <Route path="/add-course" element={<CreateCoursesView />} />
          <Route path="/courses/:id" element={<DetailCoursesView/>} />

          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/help" element={<Help />} />
          <Route path="/press" element={<Press />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
