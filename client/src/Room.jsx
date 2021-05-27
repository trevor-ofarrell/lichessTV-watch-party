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
  const [FEN, setFEN] = useState([]);
  const [black, setBlack] = useState("");
  const [white, setWhite] = useState("");
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
        };
      } else {
        source.onmessage = (event) => {
          const parsedData = JSON.parse(event.data);
          //console.log(event.data);
          setFEN([parsedData.d.fen]);
          if (parsedData.d.players) {
            createPlayerNames(parsedData.d.players[0], setWhite);
            createPlayerNames(parsedData.d.players[1], setBlack);
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
      className="ml-auto bg-gray-900 overflow-hidden"
    >
      <div className="h-full max-h-full flex flex-col xl:items-stretch xl:flex-row overflow-hidden">
        <div className="sm:mt-auto overflow-hidden m-auto">
          <div className="font-medium md:text-sm text-xs text-white max-w-70 text-left break-all">
            FEN: {FEN}
          </div>
          <div className="m-auto">
            <div className="font-medium md:text-2xl text-lg my-1 text-white">
              {black}
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
            <div className="font-medium md:text-2xl text-lg my-1 text-white">
              {" "}
              {white}
            </div>
          </div>
        </div>
        <div className="rounded-lg h-full xl:w-2/6 xl:max-h-full max-h-4/12 w-full max-w-full xl:max-w-2/6 pb-14 bg-gray-900 ml-auto">
          <div className="h-full ml-1 mt-1 overflow-y-auto">
            <h1 className="text-lg">Room: {roomId}</h1>
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
                          <div className="font-bold text-primary-400 mr-1">
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
                  className="w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
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
                  className="absolute inset-y-0 h-10 right-0 flex items-center px-4 font-bold text-white bg-purple-800 rounded-r-lg hover:bg-purple-900 focus:bg-purple-900"
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
