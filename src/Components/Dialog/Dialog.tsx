import ActionCable from "actioncable";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useToken } from "../App/useToken";
import { Message } from "../Conversations/Conversation";

export const Dialog = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState();
  const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
  const { id } = useParams();
  const { getToken, getUserId } = useToken();
  let token = getToken();
  let userId = getUserId();

  useEffect(() => {
    const getData = async () => {
      const getMessagesData = async (id: any) =>
        fetch(`${process.env.BASE_URL}/messages?conversation-id=${id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
      const conversationDataResponse = await getMessagesData(id);
      const messagesData = await conversationDataResponse.json();
      setMessages(messagesData);
    };

    getData();
  }, []);
  const createSubscription = (conversationId: string | undefined) => {
    cable.subscriptions.create(
      { channel: "ConversationChannel", conversation: conversationId },
      {
        received(data) {
          setMessages([...messages, data]);
        },
      }
    );
  };
  createSubscription(id);

  const onInput = (event: React.FormEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
  };
  const onSubmit = async () => {
    const resp = await fetch(`${process.env.BASE_URL}/message`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ message: { text: message, conversation_id: id, user_id: userId } }),
    }).then((response) => console.log(response.json()));
  };
  return (
    <div className="">
      Dialog
      <div>{messages.length > 0 ? messages.map((message) => <p key={message.id}>{message.message}</p>) : null}</div>
      <div>
        <input type="text" required placeholder="Enter your message" onChange={onInput}></input>
        <button onClick={onSubmit}>Send message</button>
      </div>
    </div>
  );
};
