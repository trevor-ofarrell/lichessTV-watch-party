import React, { useRef, useState, useEffect } from "react";
import Room from "./Room";
import JoinChat from "./JoinChat";
import useWindowDimensions from "./hooks/useWindowDimensions";

const VerifyLoggedIn = (props) => {
  const { height, width } = useWindowDimensions();
  const { roomId } = props.match.params;
  const [name, setName] = useState(props.location.state?.name);

  const updateName = (name) => {
    setName(name);
  };
  return (
    <div>
      {name ? (
        <Room name={name} roomId={roomId} />
      ) : (
        <JoinChat roomId={roomId} onNameUpdate={updateName} />
      )}
    </div>
  );
};

export default VerifyLoggedIn;
