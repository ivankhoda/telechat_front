import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../App/useToken";
import { ConversationComponent, ConversationProps } from "./ConversationComponent";

export const Conversation = () => {
  const [conversations, setConversations] = useState<ConversationProps[]>([]);
  const { getToken } = useToken();
  let token = getToken();

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const conversationsData = await fetch(`${process.env.BASE_URL}/conversations`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      const conversationDataResponse = await conversationsData.json();
      setConversations(conversationDataResponse);
    };

    getData();
  }, []);

  const onClick = async (item: ConversationProps) => {
    navigate(`conversation/${item.id}`);
  };

  return (
    <>
      <ul className="Menu">
        {conversations.map((conversation) => (
          <ConversationComponent
            key={conversation.id}
            name={conversation.name}
            item={conversation}
            id={conversation.id}
            getMessages={() => onClick(conversation)}
            created_at={conversation.created_at}
          />
        ))}
      </ul>
    </>
  );
};
