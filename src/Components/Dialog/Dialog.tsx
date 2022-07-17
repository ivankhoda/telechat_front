import ActionCable from "actioncable";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Message } from "../Conversations/Conversation";

export const Dialog = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      const getMessagesData = async (id: any) =>
        fetch(`${process.env.BASE_URL}/messages?conversation-id=${id}`, {
          method: "GET",
        });
      const conversationDataResponse = await getMessagesData(id);
      const messagesData = await conversationDataResponse.json();
      setMessages(messagesData);
    };

    getData();
    const createSubscription = () => {
      cable.subscriptions.create(
        { channel: "ConversationChannel", conversation: id },
        {
          received(data) {
            setMessages([...messages, data]);
          },
        }
      );
    };
    createSubscription();
  }, []);

  return (
    <div>
      Dialog
      <div>{messages.length > 1 ? messages.map((message) => <p key={message.id}>{message.message}</p>) : null}</div>
    </div>
  );
};
