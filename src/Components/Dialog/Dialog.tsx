import ActionCable from "actioncable";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useToken } from "../App/useToken";
import { Message } from "../Message/Message";
import "./Dialog.style.scss";

import { MessageForm } from "../MessageForm/MessageForm";

export const Dialog = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [user, setUser] = useState();
  const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
  const { id } = useParams();
  const { getToken, getUserId } = useToken();
  let token = getToken();

  useEffect(() => {
    const getData = async () => {
      const getMessagesData = async (id: any) =>
        fetch(`${process.env.BASE_URL}/messages?conversation-id=${id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
      const conversationDataResponse = await getMessagesData(id);
      const messagesData = await conversationDataResponse.json();
      setMessages(messagesData.reverse());
    };
    if (id) {
      createSubscription(id);
    }
    getData();
  }, []);

  const handleReceivedMessage = (message: any) => {
    setMessages([...messages, message]);
  };
  const createSubscription = (conversationId: string | undefined) => {
    cable.subscriptions.create(
      { channel: "ConversationChannel", conversation: conversationId },
      {
        received: (data) => {
          handleReceivedMessage(data);
        },
      }
    );
  };

  console.log(messages);
  return (
    <div className="dialog">
      <div className="dialog__messages">
        {messages.length > 0
          ? messages.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                id={message.id}
                conversation_id={message.conversation_id}
                user_id={message.user_id}
                created_at={message.created_at}
              />
            ))
          : null}
      </div>
      <MessageForm />
    </div>
  );
};
