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
      className="bg-scheme-dark overflow-hidden fixed h-full max-h-full"
    >
      <div className="text-scheme-orange text-3xl text-center p-2 pb-6">
        lichessTV watch party
      </div>
      <form>
        <div className="md:w-3/5 md:mt-20 max-w-xl overflow-hidden p-4 mt-6 m-auto">
          <input
            className="w-full h-10 pl-3 mb-4 text-base bg-scheme-light placeholder-gray-500 text-gray-500 border rounded-lg focus:shadow-outline"
            id="message"
            type="text"
            label="Message"
            placeholder="create username"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <div className="m-auto text-center text-white mb-6">
            <button
              onClick={() => handleClick("")}
              className="border-scheme-orange border-1 px-20 py-4 mt-4 rounded-lg"
            >
              join featured room
            </button>
          </div>
          <div className="text-scheme-orange text-center p-2 pb-8">
            or enter a lichess.org game ID to create a room for a specific game
            in play
          </div>
          <input
            className="w-full h-10 pl-3 mb-4 text-base bg-scheme-light placeholder-gray-500 text-gray-500 border rounded-lg focus:shadow-outline"
            id="message"
            type="text"
            label="Message"
            placeholder="enter lichess game id"
            variant="outlined"
            value={room}
            onChange={(event) => setRoomName(event.target.value)}
          />
          <div className="m-auto text-center text-white">
            <button
              onClick={() => handleClick(name)}
              className="border-scheme-orange border-1 px-20 py-4 mt-6 rounded-lg"
            >
              create custom room
            </button>
          </div>
        </div>
      </form>
      <footer className="text-center fixed w-full bottom-0 text-scheme-orange p-4 flex">
        <a
          href="https://lichess.org/api"
          className="lg:text-xl text-sm  underline m-auto"
        >
          moves streamed using the lichess.org API
        </a>
        <a
          href="https://github.com/trevor-ofarrell/lichessTV-watch-party"
          className="lg:text-xl text-sm underline m-auto"
        >
          check out the source code on GitHub
        </a>
      </footer>
    </div>
  );
};

export default Home;
