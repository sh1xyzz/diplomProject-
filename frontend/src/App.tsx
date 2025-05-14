import React, { useEffect } from "react";

import { AdminPanelView } from "container/AdminPanelView";
import { CoursesView } from "container/CoursesView";
import {CreateCoursesView} from "container/CoursesView/CreateCoursesView"
import { DetailCoursesView } from "container/CoursesView/DetailCoursesView";
import { MainView } from "container/MainView";
import { ProfileView } from "container/ProfileView";
import { ServicesView } from "container/ServicesView";
import { SettingsView } from "container/SettingsView";
import { EditView } from "container/SettingsView/EditView";
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
          <Route path="/settings" element={<SettingsView />} />
          <Route path="/settings/edit/" element={<EditView />} />
          <Route path="/admin" element={<AdminPanelView/> } />
          
          <Route path="/add-course" element={<CreateCoursesView />} />
          <Route path="/courses/:id" element={<DetailCoursesView/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
