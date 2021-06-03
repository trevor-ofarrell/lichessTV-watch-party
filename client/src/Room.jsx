import React, { useRef, useState, useEffect } from "react";
import useChat from "./useChat";
import useTyping from "./useTyping";
import useWindowDimensions from "./hooks/WindowDimensions";
import { Board } from "./components/Board";

const Room = (props) => {
  const { roomId, name } = props;
  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();
  const { height, width } = useWindowDimensions();
  const [newMessage, setNewMessage] = useState("");
  const [gameID, setGameID] = useState("");
  const messageRef = useRef();
  const {
    messages,
    user,
    users,
    typingUsers,
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
  } = useChat(roomId, name);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    cancelTyping();
    if (newMessage !== "") {
      sendMessage(newMessage, false);
      setNewMessage("");
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      if (newMessage !== "") {
        sendMessage(newMessage, false);
        setNewMessage("");
      }
    }
  };

  const handleIdUpdate = (id) => {
    setGameID(id);
  };

  useEffect(() => messageRef.current.scrollIntoView({ behavior: "smooth" }));

  useEffect(() => {
    if (isTyping) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping]);

  return (
    <div
      style={{ height: height, width: width }}
      className="ml-auto bg-scheme-dark overflow-hidden"
    >
      <div className="h-full max-h-full flex flex-col xl:items-stretch xl:flex-row overflow-hidden">
        <a
          href="/"
          className="md:left-4 md:top-4 left-2 top-2 absolute md:pr-6 hidden md:flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="md:h-10 md:w-10 h-8 w-8 text-scheme-orange"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </a>
        <div className="sm:mt-auto overflow-hidden m-auto mt-0">
          <div className="flex md:mt-2 text-gray-400">
            <div className="flex mr-auto p-2 pl-0">
              <h1 className="md:text-xl text-sm pr-1">game:</h1>
              <a
                href={`https://lichess.org/${gameID}`}
                className="md:text-xl text-sm underline  "
              >
                lichess.org/{gameID}
              </a>
            </div>
            <h1 className="md:text-xl text-sm p-2 ml-auto">room: {roomId}</h1>
          </div>
          <Board roomId={roomId} handleIdUpdate={handleIdUpdate} />
        </div>
        <div className="rounded-lg h-full xl:w-2/6 xl:max-h-full max-h-4/12 w-full max-w-full xl:max-w-2/6 pb-14 bg-scheme-dark ml-auto">
          <div className="h-full ml-1 mt-1 overflow-y-auto">
            <>
              <ol>
                {messages.map((message, i) => (
                  <li key={i}>
                    {message.system === true ? (
                      <div className="text-center text-gray-500 text-sm">
                        {message.body}
                      </div>
                    ) : (
                      <span className="text-left text-white text-sm flex">
                        {message.name ? (
                          <div
                            className={`font-bold ${message.user.color} mr-1`}
                          >
                            {message.name}:
                          </div>
                        ) : (
                          <>{""}</>
                        )}
                        {message.body}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
              <div className="xl:w-30% px-auto w-99 bottom-1 absolute">
                <input
                  className="w-full h-10 pl-3 pr-8 text-base placeholder-white-600 text-gray-500 border bg-scheme-light rounded-lg"
                  id="message"
                  type="text"
                  label="Message"
                  placeholder="enter message here"
                  variant="outlined"
                  value={newMessage}
                  onChange={handleNewMessageChange}
                  onKeyUp={handleKeyUp}
                />
                <button
                  className="absolute inset-y-0 h-10 right-0 flex items-center px-4 font-bold text-white bg-scheme-orange rounded-r-lg"
                  disabled={!newMessage}
                  variant="contained"
                  color="primary"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </>
            <div ref={messageRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
