import React, { useRef, useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import tw from "twin.macro";
import useChat from "./useChat";
import useTyping from "./useTyping";

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

const Room = (props) => {
  const { roomId, name } = props;
  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();
  const { height, width } = useWindowDimensions();
  const [newMessage, setNewMessage] = useState("");
  const [gameID, setGameID] = useState("");
  const [FEN, setFEN] = useState([]);
  const [black, setBlack] = useState({});
  const [white, setWhite] = useState({});
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

  const createPlayerNames = (user, setPlayer) => {
    setPlayer({
      name: user.user.name,
      title: user.user.title,
      rating: String(user.rating),
    });
  };

  const selectRandomColor = () => {
    colors = [
      "text-green-400",
      "text-purple-400",
      "text-pink-400",
      "text-red-400",
      "text-blue-400",
      "text-orange-400",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => messageRef.current.scrollIntoView({ behavior: "smooth" }));

  useEffect(() => {
    if (!listening) {
      let source;
      roomId !== "featured"
        ? (source = new EventSource(
            `${process.env.REACT_APP_API_ENDPOINT}/lichesstvcustom/?id=${roomId}`
          ))
        : (source = new EventSource(
            `${process.env.REACT_APP_API_ENDPOINT}/lichesstv`
          ));
      if (roomId !== "featured") {
        source.onmessage = (event) => {
          const parsedData = JSON.parse(event.data);
          //console.log(event.data);
          setFEN([parsedData.fen]);
          if (parsedData.id) {
            setGameID(parsedData.id);
          }
        };
      } else {
        source.onmessage = (event) => {
          const parsedData = JSON.parse(event.data);
          console.log(event.data);
          setFEN([parsedData.d.fen]);
          if (parsedData.d.players) {
            createPlayerNames(parsedData.d.players[0], setWhite);
            createPlayerNames(parsedData.d.players[1], setBlack);
          }
          if (parsedData.d.id) {
            setGameID(parsedData.d.id);
          }
        };
      }
      setListening(true);
    }
  }, [listening, FEN]);

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
          <div className="font-medium md:text-sm md:pl-0 text-xs pl-6 text-gray-400 max-w-50% text-left break-all hidden md:flex">
            FEN: {FEN}
          </div>
          <div className="m-auto">
            <div className="flex font-medium md:text-2xl text-lg my-1 text-white">
              <div className="text-scheme-orange">{black.title}&nbsp;</div>
              <div>{black.name}&nbsp;</div>
              <div className="text-gray-500">{black.rating}</div>
            </div>
            <div className="m-auto">
              <Chessboard
                position={FEN[0]}
                transitionDuration={100}
                showNotation={false}
                calcWidth={(size) =>
                  size.screenWidth < 1440
                    ? (size.screenHeight / 100) * 46
                    : size.screenWidth > 1440
                    ? (size.screenHeight / 100) * 70
                    : (screen.width / 100) * 100
                }
              />
            </div>
            <div className="flex font-medium md:text-2xl text-lg my-1 text-white">
              <div className="text-scheme-orange">{white.title}&nbsp;</div>
              <div>{white.name}&nbsp;</div>
              <div className="text-gray-500">{white.rating}</div>
            </div>
          </div>
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
                  className="absolute inset-y-0 h-10 right-0 flex items-center px-4 font-bold text-white bg-scheme-orange rounded-r-lg hover:bg-blue-500"
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
