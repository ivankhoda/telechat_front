import React from "react";

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
    <div key={id}>
      <p>{message}</p>
      <p>from: {user_id}</p>
      <p>at: {created_at}</p>
    </div>
  );
};
