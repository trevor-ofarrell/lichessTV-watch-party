import React, { useRef, useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import tw from "twin.macro";
import useChat from "./useChatRoom";
import clsx from "clsx";
import EventEmitter from "events";

export const Input = tw.input`
  px-4
  py-2
  placeholder-gray-500
  w-auto
  lg:mx-auto
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

const Room = () => {
  const { messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const [FEN, setFEN] = useState([]);
  const [black, setBlack] = useState("");
  const [white, setWhite] = useState("");
  const messageRef = useRef();
  const [listening, setListening] = useState(false);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage !== "") {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      if (newMessage !== "") {
        sendMessage(newMessage);
        setNewMessage("");
      }
    }
  };

  useEffect(() => messageRef.current.scrollIntoView({ behavior: "smooth" }));

  useEffect(() => {
    if (!listening) {
      const source = new EventSource("http://localhost:3030/lichesstv");
      source.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        setFEN([parsedData.d.fen]);
        console.log(parsedData.d);
        if (parsedData.d.players) {
          let whiteUsername = "";
          let blackUsername = "";
          if (parsedData.d.players[0].user.name) {
            if (parsedData.d.players[0].user.title) {
              whiteUsername =
                parsedData.d.players[0].user.title +
                " " +
                parsedData.d.players[0].user.name;
            } else {
              whiteUsername = parsedData.d.players[0].user.name;
            }
            if (parsedData.d.players[0].rating) {
              whiteUsername + " " + parsedData.d.players[0].rating.toString();
              setWhite(whiteUsername);
            }
            setWhite(whiteUsername);
          }
          if (parsedData.d.players[1].user.name) {
            if (parsedData.d.players[1].user.title) {
              blackUsername =
                parsedData.d.players[1].user.title +
                " " +
                parsedData.d.players[1].user.name;
            } else {
              blackUsername = parsedData.d.players[1].user.name;
            }
            if (parsedData.d.players[1].rating) {
              blackUsername + " " + parsedData.d.players[1].rating.toString();
              setBlack(blackUsername);
              console.log(
                blackUsername + " " + parsedData.d.players[1].rating.toString()
              );
            }
            setBlack(blackUsername);
          }
          sendMessage(`${blackUsername} (black) VS. ${whiteUsername} (white)`);
          if (parsedData.d.id) {
            sendMessage(`Game in progress at lichess.org/${parsedData.d.id}`);
          }
        }
      };
      setListening(true);
    }
  }, [listening, FEN]);

  return (
    <div className="ml-auto w-screen max-h-screen bg-gray-900 h-screen flex flex-col lg:items-stretch lg:flex-row overflow-hidden">
      <div className=" pr-20 lg:w-auto w-full  overflow-hidden m-auto">
        <div className="font-medium md:text-md text-xs text-white">
          FEN: {FEN}
        </div>
        <div className="font-medium text-xl my-1 text-white"> {black}</div>
        <div className="m-auto">
          <Chessboard
            position={FEN[0]}
            transitionDuration={100}
            calcWidth={(size) =>
              size.screenWidth > 600 && size.screenHeight > 400
                ? (size.screenHeight / 100) * 60
                : screen.width
            }
          />
        </div>
        <div className="font-medium text-xl my-1 text-white"> {white}</div>
      </div>
      <div className="shadow-2xl rounded-lg h-full lg:w-2/6 lg:max-h-full max-h-3/12 w-full max-w-full lg:max-w-2/6 pb-4 bg-gray-900 ml-auto">
        <div className="h-full ml-1 mt-1 overflow-y-auto">
          <ol>
            {messages.map((message, i) => (
              <li
                key={i}
                /*className={clsx(classes.message, message.isOwner ? classes.owner : classes.guest)}*/
              >
                <span className="text-white text-md">{message.body}</span>
              </li>
            ))}
          </ol>
          <div ref={messageRef}></div>
        </div>
        <div class="lg:w-2/6 w-full bottom-0 absolute overflow-hidden">
          <input
            class="w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
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
            class="absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-green-500 rounded-r-lg hover:bg-green-600 focus:bg-green-600"
            disabled={!newMessage}
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
