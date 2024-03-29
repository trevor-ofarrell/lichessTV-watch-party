import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";

const useChat = (roomId, name) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [user, setUser] = useState();
  const socketRef = useRef();

  const selectRandomColor = () => {
    const colors = [
      "text-green-500",
      "text-purple-500",
      "text-pink-500",
      "text-red-500",
      "text-red-700",
      "text-blue-500",
      "text-blue-300",
      "text-green-400",
      "text-pink-700",
      "text-primary-500",
      "text-orange-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const fetchUser = () => {
      setUser({ name, color: selectRandomColor() });
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/rooms/${roomId}/users`
      );
      const result = response.data.users;
      setUsers(result);
    };

    fetchUsers();
  }, [roomId]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/rooms/${roomId}/messages`
      );
      const result = response.data.messages;
      setMessages(result);
    };

    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    if (!user) {
      return;
    }
    socketRef.current = socketIOClient(process.env.REACT_APP_API_ENDPOINT, {
      query: { roomId, name: user.name },
    });

    socketRef.current.on("connect", () => {
      console.log(socketRef.current.id);
    });

    socketRef.current.on(USER_JOIN_CHAT_EVENT, (user) => {
      if (user.id === `${socketRef.current.id}${user.name}`) return;
      setUsers((users) => [...users, user]);
    });

    socketRef.current.on(USER_LEAVE_CHAT_EVENT, (user) => {
      setUsers((users) => users.filter((u) => u.id !== user.id));
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser:
          message.senderId === `${socketRef.current.id}${user.name}`,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on(START_TYPING_MESSAGE_EVENT, (typingInfo) => {
      if (typingInfo.senderId !== `${socketRef.current.id}${user.name}`) {
        const user = typingInfo.user;
        setTypingUsers((users) => [...users, user]);
      }
    });

    socketRef.current.on(STOP_TYPING_MESSAGE_EVENT, (typingInfo) => {
      if (typingInfo.senderId !== `${socketRef.current.id}${user.name}`) {
        const user = typingInfo.user;
        setTypingUsers((users) => users.filter((u) => u.name !== user.name));
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, user]);

  const sendMessage = (messageBody, system) => {
    if (!socketRef.current) return;
    if (system === true) {
      socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
        body: messageBody,
        senderId: socketRef.current.id,
        name: user?.name,
        system: system,
      });
    } else {
      socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
        body: messageBody,
        senderId: `${socketRef.current.id}${user.name}`,
        user: user,
        name: user?.name,
        color: user?.color,
        system: system,
      });
    }
  };

  const startTypingMessage = () => {
    if (!socketRef.current) return;
    socketRef.current.emit(START_TYPING_MESSAGE_EVENT, {
      senderId: socketRef.current.id,
      user,
    });
  };

  const stopTypingMessage = () => {
    if (!socketRef.current) return;
    socketRef.current.emit(STOP_TYPING_MESSAGE_EVENT, {
      senderId: socketRef.current.id,
      user,
    });
  };

  const addUser = (name) => {
    const user = { name };
    setUsers((users) => [...users, user]);
  };

  return {
    messages,
    user,
    users,
    typingUsers,
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
    addUser,
  };
};

export default useChat;
