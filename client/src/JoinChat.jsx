import React, { useRef, useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import tw from "twin.macro";
import useChat from "./useChat";
import useTyping from "./useTyping";
import { Board } from "./components/Board";

export const Input = tw.input`
  px-4
  py-2
  placeholder-gray-500
  w-auto
  lg:mx-auto
  focus:ring-primary-100
  focus:border-primary-500
  border-gray-400
  border-width[1px]
  border-solid
  rounded-md
  shadow-xs
`;

export const InputTextLeft = tw(Input)`text-left py-2`;

export const PrimaryButton = ({ className = "", children, ...rest }) => {
  return (
    <Button
      className={`bg-primary-500 hover:bg-primary-300 text-white`}
      {...rest}
      data-testid="btn"
    >
      {children}
    </Button>
  );
};

export const Button = ({ className = "", children, ...rest }) => {
  return (
    <button
      className={`py-2 px-4 focus:outline-none ring-opacity-75 ring-primary-400 focus:ring text-lg rounded-md`}
      {...rest}
      data-testid="btn"
    >
      {children}
    </button>
  );
};

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

const JoinChat = (props) => {
  const { roomId, onNameUpdate } = props;
  const [name, setName] = useState("");
  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();
  const { height, width } = useWindowDimensions();
  const [newMessage, setNewMessage] = useState("");
  const [FEN, setFEN] = useState([]);
  const [black, setBlack] = useState("");
  const [white, setWhite] = useState("");
  const [userName, setUserName] = useState("");
  const messageRef = useRef();
  const [listening, setListening] = useState(false);
  const {
    messages,
    user,
    users,
    typingUsers,
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
    addUser,
  } = useChat(roomId, name);

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      if (newMessage !== "") {
        sendMessage(newMessage, false);
        setNewMessage("");
      }
    }
  };

  const createPlayerNames = (user, setPlayer) => {
    let username = "";
    if (user.user.name) {
      if (user.user.title) {
        username = user.user.title + " " + user.user.name + " " + user.rating;
      } else {
        username = user.user.name + " " + user.rating;
      }
      setPlayer(username);
    }
  };

  useEffect(() => messageRef.current.scrollIntoView({ behavior: "smooth" }));

  return (
    <div
      style={{ height: height, width: width }}
      className="ml-auto bg-scheme-dark overflow-hidden"
    >
      <div className="h-full max-h-full flex flex-col xl:items-stretch xl:flex-row overflow-hidden">
        <Board roomId={roomId} />
        <div className="rounded-lg h-full xl:w-2/6 xl:max-h-full max-h-4/12 w-full max-w-full xl:max-w-2/6 pb-14 bg-scheme-dark ml-auto">
          <div className="h-full ml-1 mt-1 overflow-y-auto">
            <h1 className="text-xl p-4 text-center text-white">
              Room: {roomId}
            </h1>
            <div className="m-auto xl:pt-12">
              <div className="font-bold text-white text-center text-lg px-4">
                Create a username to join the chat
              </div>
              <div>
                <div className="xl:w-full w-80 overflow-hidden p-4 m-auto">
                  <input
                    className="w-full h-10 pl-3 text-base bg-scheme-light placeholder-gray-500 border rounded-lg focus:shadow-outline"
                    id="message"
                    type="text"
                    label="Message"
                    placeholder="enter username"
                    variant="outlined"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                  />
                </div>
              </div>
              <button
                className="h-12 m-auto flex items-center px-4 font-bold text-white bg-scheme-orange rounded-lg"
                variant="contained"
                color="primary"
                onClick={() => {
                  setName(userName);
                  onNameUpdate(userName);
                  addUser(userName);
                }}
              >
                Join Chat
              </button>
            </div>
            <div ref={messageRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinChat;
