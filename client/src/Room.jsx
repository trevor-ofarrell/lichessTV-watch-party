import React, { useRef, useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import tw from "twin.macro";
import useChat from "./useChatRoom";

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

const url = `https://${process.env.REACT_APP_API_ENDPOINT}/lichesstv`;

const Room = () => {
  const {
    messages,
    sendMessage,
    createUser,
    loggedIn,
    setLoggedIn,
  } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const [FEN, setFEN] = useState([]);
  const [black, setBlack] = useState("");
  const [white, setWhite] = useState("");
  const [userName, setUserName] = useState("");
  const messageRef = useRef();
  const [listening, setListening] = useState(false);
  const [logged, setLogged] = useState(false);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
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

  useEffect(() => messageRef.current.scrollIntoView({ behavior: "smooth" }));

  useEffect(() => {
    if (!listening) {
      const source = new EventSource(url);
      source.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        setFEN([parsedData.d.fen]);
        if (parsedData.d.players) {
          let whiteUsername = "";
          let blackUsername = "";
          if (parsedData.d.players[0].user.name) {
            if (parsedData.d.players[0].user.title) {
              whiteUsername =
                parsedData.d.players[0].user.title +
                " " +
                parsedData.d.players[0].user.name +
                " " +
                parsedData.d.players[0].rating;
            } else {
              whiteUsername =
                parsedData.d.players[0].user.name +
                " " +
                parsedData.d.players[0].rating;
            }
            setWhite(whiteUsername);
          }
          if (parsedData.d.players[1].user.name) {
            if (parsedData.d.players[1].user.title) {
              blackUsername =
                parsedData.d.players[1].user.title +
                " " +
                parsedData.d.players[1].user.name +
                " " +
                parsedData.d.players[1].rating;
            } else {
              blackUsername =
                parsedData.d.players[1].user.name +
                " " +
                parsedData.d.players[1].rating;
            }
            setBlack(blackUsername);
          }
          sendMessage(
            `${blackUsername} (black) VS. ${whiteUsername} (white)`,
            true
          );
          if (parsedData.d.id) {
            sendMessage(
              `Game in progress at https://lichess.org/${parsedData.d.id}`,
              true
            );
          }
        }
      };
      setListening(true);
    }
  }, [listening, FEN]);

  return (
    <div className="w-screen max-h-screen h-screen bg-gray-900 overflow-hidden">
      <div className="font-medium md:text-sm text-xs text-white max-w-90">
        FEN: {FEN}
      </div>
      <div className="w-fulle max-h-full h-full ml-auto bg-gray-900 flex flex-col lg:items-stretch lg:flex-row overflow-hidden">
        <div className="sm:mt-auto overflow-hidden m-auto">
          <div className="m-auto">
            <div className="font-medium md:text-2xl text-lg my-1 text-white">
              {black}
            </div>
            <div className="m-auto">
              <Chessboard
                position={FEN[0]}
                transitionDuration={100}
                calcWidth={(size) =>
                  size.screenWidth > 600 && size.screenHeight > 400
                    ? (size.screenHeight / 100) * 47.5
                    : (screen.width / 100) * 85
                }
              />
            </div>
            <div className="font-medium md:text-2xl text-lg my-1 text-white">
              {" "}
              {white}
            </div>
          </div>
        </div>

        <div className="shadow-2xl rounded-lg h-full lg:w-2/6 lg:max-h-full max-h-4/12 w-full max-w-full lg:max-w-2/6 pb-14 bg-gray-900 ml-auto">
          <div className="h-full ml-1 mt-1 overflow-y-auto">
            {logged === true ? (
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
                <div className="lg:w-30% px-auto w-99 bottom-0 absolute">
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
            ) : (
              <div className="m-auto">
                <div className="font-bold text-white text-lg px-4">
                  Create a username to join the chat
                </div>
                <div>
                  <div className="w-full overflow-hidden p-4">
                    <input
                      className="w-full h-10 pl-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      id="message"
                      type="text"
                      label="Message"
                      placeholder="enter username"
                      variant="outlined"
                      value={userName}
                      onChange={(event) => setUserName(event.target.value)}
                      onSubmit={() => {
                        createUser(userName);
                        setLogged(true);
                      }}
                    />
                  </div>
                </div>
                <button
                  className="h-12 m-auto flex items-center px-4 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 focus:bg-green-600"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    createUser(userName);
                    setLogged(true);
                  }}
                >
                  Join Chat
                </button>
              </div>
            )}
            <div ref={messageRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
