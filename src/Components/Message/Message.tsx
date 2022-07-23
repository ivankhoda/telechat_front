import React from "react";
import "./Message.style.scss";
export type Message = {
  message: string;
  id: number;
  conversation_id: number;
  user_id: number;
  created_at: string;
};

export const Message = (props: Message) => {
  const { message, id, conversation_id, user_id, created_at } = props;

  return (
    <div key={id} className="message">
      <p>{message}</p>
      <p>from: {user_id}</p>
      <p>at: {created_at}</p>
    </div>
  );
};
