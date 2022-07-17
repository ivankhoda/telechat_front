import React, { PropsWithChildren } from "react";
import "./WorkingPanel.style.scss";

interface WorkingPanelProps {
  children: any;
}
export const WorkingPanel: React.FC<PropsWithChildren<WorkingPanelProps>> = ({ children }) => {
  return <div className="WorkingPanel">{children}</div>;
};
