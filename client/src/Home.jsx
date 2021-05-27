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
      className="bg-gray-900 overflow-hidden fixed"
    >
      <div className="text-white text-2xl text-center p-2 pb-6">
        lichessTV watch party
      </div>
      <div className="xl:w-full w-80 overflow-hidden p-4 m-auto md:pt-20 pt-10">
        <input
          className="w-full h-10 pl-3 mb-4 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
          id="message"
          type="text"
          label="Message"
          placeholder="create username"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <div className="m-auto text-center text-white mb-8">
          <button
            onClick={() => handleClick("")}
            className="border-white border-1 px-20 py-4 mt-4 rounded-lg"
          >
            join featured room
          </button>
        </div>
        <div className="text-white text-center p-2 pb-8">
          or enter a lichess.org game ID to create a room for a specific game in
          play
        </div>
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
      <div className="m-auto text-center text-white">
        <button
          onClick={() => handleClick(name)}
          className="border-white border-1 px-20 py-4 mt-6 rounded-lg"
        >
          create custom room
        </button>
      </div>
      <div className="text-center fixed w-full bottom-0 border-t-1 text-white p-4 flex">
        <a
          href="https://lichess.org/api"
          className="lg:text-xl text-sm text-white underline m-auto"
        >
          moves streamed using the lichess.org API
        </a>
        <h1 className="md:text-xl text-sm px-2">-</h1>
        <a
          href="https://github.com/trevor-ofarrell/lichessTV-watch-party"
          className="lg:text-xl text-sm text-white underline m-auto"
        >
          check out the source code on my GitHub
        </a>
      </div>
    </div>
  );
};

export default Home;
