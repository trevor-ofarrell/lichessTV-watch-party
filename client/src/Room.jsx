import React, { useRef, useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
const https = require("https");
import tw from "twin.macro";
import useChat from "./useChatRoom";
import clsx from "clsx";
import EventEmitter from "events";

export const Input = tw.input`
  px-4
  py-2
  placeholder-gray-500
  w-auto
  md:mx-auto
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
      console.log("using effect");
      source.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        setFEN([parsedData.d.fen]);
        console.log(parsedData.d);
      };
      setListening(true);
    }
  }, [listening, FEN]);

  return (
    <div className="ml-auto w-screen bg-gray-700 h-screen flex items-stretch">
      <div className="ml-20 pr-20 w-50% my-auto">
        <Chessboard
          position={FEN[0]}
          transitionDuration={100}
          calcWidth={(size) =>
            size.screenWidth > 600 && size.screenHeight > 600
              ? 600
              : Math.min(size.screenWidth, size.screenHeight)
          }
        />
      </div>
      <div className="shadow-lg rounded-lg h-11.5/12 w-full overflow-x-scroll mb-6 bg-gray-600">
        <div className="h-11/12">
          <div>FEN:{FEN}</div>

          <ol>
            {messages.map((message, i) => (
              <li
                key={i}
                /*className={clsx(classes.message, message.isOwner ? classes.owner : classes.guest)}*/
              >
                <span>{message.body}</span>
              </li>
            ))}
          </ol>
          <div ref={messageRef}></div>
        </div>
        <div className="bottom-0 absolute pt-4">
          <InputTextLeft
            id="message"
            type="text"
            label="Message"
            placeholder="enter message here"
            variant="outlined"
            value={newMessage}
            onChange={handleNewMessageChange}
            onKeyUp={handleKeyUp}
          />
          <PrimaryButton
            disabled={!newMessage}
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
          >
            Send
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Room;
