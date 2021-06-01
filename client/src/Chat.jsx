import React, { useRef, useState, useEffect } from "react";
import Room from "./Room";
import JoinChat from "./JoinChat";
import useWindowDimensions from "./hooks/WindowDimensions";

const Chat = (props) => {
  const { height, width } = useWindowDimensions();
  const { roomId } = props.match.params;
  const [name, setName] = useState(props.location.state?.name);

  const updateName = (name) => {
    setName(name);
  };
  return (
    <div
      style={{ height: height, width: width }}
      className="ml-auto bg-gray-900 overflow-hidden fixed"
    >
      {name ? (
        <Room name={name} roomId={roomId} />
      ) : (
        <JoinChat roomId={roomId} onNameUpdate={updateName} />
      )}
    </div>
  );
};

export default Chat;
