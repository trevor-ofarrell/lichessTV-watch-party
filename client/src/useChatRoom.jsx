import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_MESSAGE_EVENT = "new-message-event";
const SOCKET_SERVER_URL = `https://${process.env.REACT_APP_API_ENDPOINT}`;

const useChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState(new Set());
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    socketRef.current.on(NEW_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        isOwner: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });
    socketRef.current.on("disconnect", () => {
      users.forEach((ele) => {
        if (ele.id === socketRef.current.id) {
          users.delete(ele);
          setUsers(users);
          setMessages((messages) => [
            ...messages,
            {
              body: `${socketRef.current.name} disconnected`,
              senderId: socketRef.current.id,
              name: "",
              system: true,
            },
          ]);
        }
      });
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (messageBody, system) => {
    let userName = Array.from(users).filter(
      (ele) => ele.id === socketRef.current.id
    );
    if (userName.length) {
      userName = userName[0];
    }
    socketRef.current.emit(NEW_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
      name: userName.name,
      system: system,
    });
  };

  const createUser = (name) => {
    setUsers(
      (users) => new Set([...users, { name: name, id: socketRef.current.id }])
    );
    setMessages((messages) => [
      ...messages,
      {
        body: `${name} just joined the party! Welcome!`,
        senderId: socketRef.current.id,
        name: "",
        system: true,
      },
    ]);
  };

  return { messages, sendMessage, createUser };
};

export default useChatRoom;
