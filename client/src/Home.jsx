import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";

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

const Home = (props) => {
  const { height, width } = useWindowDimensions();
  const [room, setRoomName] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();
  const handleClick = () => {
    if (!room.length) {
      history.push({
        pathname: `/featured`,
        state: { name },
      });
    } else {
      history.push({
        pathname: `/${room}`,
        state: { name },
      });
    }
  };

  return (
    <div
      style={{ height: height, width: width }}
      className="ml-auto bg-gray-900 overflow-hidden"
    >
      <div className="xl:w-full w-80 overflow-hidden p-4 m-auto">
        <input
          className="w-full h-10 pl-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
          id="message"
          type="text"
          label="Message"
          placeholder="enter lichess game id"
          variant="outlined"
          value={room}
          onChange={(event) => setRoomName(event.target.value)}
        />
      </div>
      <div className="xl:w-full w-80 overflow-hidden p-4 m-auto">
        <input
          className="w-full h-10 pl-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
          id="message"
          type="text"
          label="Message"
          placeholder="enter username"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <button onClick={() => handleClick(name)}>submit</button>
    </div>
  );
};

export default Home;
