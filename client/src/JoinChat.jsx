import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import useChat from "./useChat";
import useWindowDimensions from "./hooks/WindowDimensions";

const JoinChat = (props) => {
  const { roomId, onNameUpdate } = props;
  const [name, setName] = useState("");
  const { height, width } = useWindowDimensions();
  const [userName, setUserName] = useState("");
  const messageRef = useRef();
  const history = useHistory();
  const { addUser } = useChat(roomId, name);

  const handleClick = () => {
    if (!roomId.length) {
      history.push({
        pathname: `/featured`,
        state: { name },
      });
    } else {
      history.push({
        pathname: `/${roomId}`,
        state: { name },
      });
    }
  };

  return (
    <div
      style={{ height: height, width: width }}
      className="ml-auto bg-scheme-dark overflow-hidden"
    >
      <div className="h-full max-h-full flex flex-col xl:items-stretch xl:flex-row overflow-hidden">
        <div className="rounded-lg h-full xl:w-2/6 xl:max-h-full max-h-4/12 w-full max-w-full xl:max-w-2/6 pt-20 pb-14 bg-scheme-dark ml-auto">
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
                  handleClick(userName);
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
