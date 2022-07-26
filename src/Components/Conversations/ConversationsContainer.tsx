import ActionCable from "actioncable";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { useToken } from "../App/useToken";
import { ConversationComponent, ConversationProps } from "./ConversationComponent";
import "./ConversationsContainer.style.scss";

export const ConversationsContainer = () => {
  const [conversations, setConversations] = useState<ConversationProps[]>([]);
  const { getToken } = useToken();
  let token = getToken();
  const navigate = useNavigate();

  const conversationPerPage = 10;
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * conversationPerPage;

  const pageCount = Math.ceil(conversations.length / conversationPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const cable = ActionCable.createConsumer("ws://localhost:3000/cable");

  console.log(cable.subscriptions);
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
    // createSubscription();
  }, []);

  const onClick = async (item: ConversationProps) => {
    navigate(`conversation/${item.id}`);
  };
  const handleDelete = async (item: ConversationProps) => {
    await fetch(`${process.env.BASE_URL}/conversation/${item.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    }).then((response) => {
      const newArray = conversations?.filter((conversation) => conversation.id !== item.id);
      setConversations(newArray);
    });
  };
  const displayConversations = conversations
    .slice(pagesVisited, pagesVisited + conversationPerPage)
    .map((conversation) => {
      return (
        <ConversationComponent
          key={conversation.id}
          name={conversation.name}
          item={conversation}
          id={conversation.id}
          getMessages={() => onClick(conversation)}
          deleteConversation={() => handleDelete(conversation)}
          created_at={conversation.created_at}
        />
      );
    });

  return (
    <>
      <div className="conversations-container">
        <ul>{displayConversations}</ul>
        <ReactPaginate
          className="conversations-paginate"
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </>
  );
};
