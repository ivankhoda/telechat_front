import React from "react";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import "../../style.scss";
import { Blanc } from "../blanc/Blanc";
import { Conversation } from "../Conversations/Conversation";
import { Dialog } from "../Dialog/Dialog";
import { Header } from "../Header/Header";

import { Sidebar } from "../Sidebar/Sidebar";
import { WorkingPanel } from "../WorkingPanel/WorkingPanel";
import "./App.style.scss";

export const App = () => {
  const routes = [
    { path: "/", name: "Orders", Component: <Blanc /> },
    { path: "/conversations", name: "Conversations", Component: <Conversation /> },
    { path: "/conversations/conversation/:id", name: "Conversations", Component: <Dialog /> },
    { path: "/assignees", name: "Assignees", Component: <Blanc /> },
    { path: "/categories", name: "Categories", Component: <Blanc /> },
    { path: "/services", name: "Services", Component: <Blanc /> },
  ];
  console.log(process.env.BASE_URL);
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Sidebar />
        <WorkingPanel>
          <Routes>
            {routes.map(({ path, Component }) => (
              <Route key={path} path={path} element={Component} />
            ))}
          </Routes>
        </WorkingPanel>
      </HashRouter>
    </div>
  );
};
