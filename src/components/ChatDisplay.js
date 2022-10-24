import axios from "axios";
import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";

// pass in the currently logged in user, and the matched user that has been clicked on in order to retrieve the messages between the 2.
const ChatDisplay = ({ user, clickedUser }) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [userMessages, setUserMessages] = useState(null);
  const [clickedUserMessages, setClickedUserMessages] = useState(null);

  const getUserMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/messages", {
        params: { userId: userId, correspondingUserId: clickedUserId },
      });
      setUserMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getClickedUserMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/messages", {
        params: { userId: clickedUserId, correspondingUserId: userId },
      });
      setClickedUserMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserMessages();
    getClickedUserMessages();
  }); // Removed dependency array

  const messages = [];

  // added name, timestamp, and avatar next to chat messages
  userMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = user?.first_name;
    formattedMessage["img"] = user?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  });

  clickedUserMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = clickedUser?.first_name;
    formattedMessage["img"] = clickedUser?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  });

  const descendingOrderMessages = messages?.sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );

  return (
    <>
      <Chat descendingOrderMessages={descendingOrderMessages} />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUserMessages={getUserMessages}
        getClickedUserMessages={getClickedUserMessages}
      />
    </>
  );
};

export default ChatDisplay;
