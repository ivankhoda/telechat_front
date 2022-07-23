import React from "react";
import { Link } from "react-router-dom";
import "./ConversationComponent.style.scss";

export type ConversationProps = {
  name: string;
  id: number;
  created_at: string;
  item: ConversationProps;
  getMessages: (item: ConversationProps) => void;
  deleteConversation: (id: number) => void;
};

export const ConversationComponent = (props: ConversationProps) => {
  const { id, name, item, getMessages, created_at, deleteConversation } = props;

  return (
    <>
      <div className="conversation-wrapper">
        <div className="conversation" key={id} onClick={() => getMessages(item)}>
          <Link to={"/conversations/:id"} className="conversation__name">
            Conversation with: {name}
          </Link>
        </div>
        <button onClick={() => deleteConversation(id)} className="conversation__delete">
          Delete
        </button>
      </div>
    </>
  );
};
