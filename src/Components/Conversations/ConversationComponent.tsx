import React from "react";
import { MenuItem } from "../Link/Link";

export type ConversationProps = {
  name: string;
  id: number;
  created_at: string;
  item: ConversationProps;
  getMessages: (item: ConversationProps) => void;
};

export const ConversationComponent = (props: ConversationProps) => {
  const { id, name, item, getMessages, created_at } = props;

  return (
    <div key={id} onClick={() => getMessages(item)}>
      <MenuItem linkTo={"/conversations/:id"} text={name} />
    </div>
  );
};
