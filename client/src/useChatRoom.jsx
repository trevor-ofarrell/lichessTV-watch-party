import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_MESSAGE_EVENT = "new-message-event";
const SOCKET_SERVER_URL = "http://localhost:3030";

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
        }
      });
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (messageBody, system) => {
    const userName = [...users].filter(
      (ele) => ele.id === socketRef.current.id
    );
    console.log(userName, users);
    socketRef.current.emit(NEW_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
      userName: userName !== "" ? userName : "",
      system: system,
    });
  };

  const createUser = (name) => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    setUsers(
      (users) => new Set([...users, { name: name, id: socketRef.current.id }])
    );
  };

  return { messages, sendMessage, createUser };
};

export default useChatRoom;
