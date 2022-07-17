import React from "react";
import { MenuItem } from "../Link/Link";
import "./Menu.style.scss";
//TODO make components as array
export const Menu = () => {
  return (
    <ul className="Menu">
      <MenuItem linkTo="/" text="Contacts" />
      <MenuItem linkTo="/conversations" text="Conversations" />
    </ul>
  );
};
