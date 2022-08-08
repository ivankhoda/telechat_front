import moment from "moment";
import React from "react";
import { useToken } from "../App/useToken";
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
  const { getUserId } = useToken();
  console.log(getUserId());
  const date = moment(created_at).format("YYYY/MM/DD HH:mm:ss");

  console.log();
  return (
    <div key={id} className="message">
      <p className="message__text">{message}</p>
      <p className="message__from">from: {user_id}</p>
      <p className="message__date">at: {date}</p>
    </div>
  );
};
