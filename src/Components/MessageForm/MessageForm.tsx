import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useToken } from "../App/useToken";

export const MessageForm = () => {
  const [message, setMessage] = useState("");
  const { getToken, getUserId } = useToken();
  let token = getToken();
  let userId = getUserId();
  const { id } = useParams();
  const onSubmit = async () => {
    fetch(`${process.env.BASE_URL}/message`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ message: { text: message, conversation_id: id, user_id: userId } }),
    }).then(() => setMessage(""));
  };
  const onInput = (event: React.FormEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
  };
  return (
    <div>
      <input type="text" required placeholder="Enter your message" onChange={onInput} value={message}></input>
      <button onClick={onSubmit}>Send message</button>
    </div>
  );
};
