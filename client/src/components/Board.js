import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";

const createPlayerObject = (user, setPlayer) => {
  setPlayer({
    name: user.user
      ? user.user.name
      : user.aiLevel
      ? `Stockfish level ${user.aiLevel}`
      : "NN",
    title: user.user ? user.user.title : "",
    rating: user.user ? String(user.rating) : "",
  });
};

export const Board = (props) => {
  const { roomId, handleIdUpdate } = props;
  const [FEN, setFEN] = useState([]);
  const [black, setBlack] = useState({});
  const [white, setWhite] = useState({});
  const [listening, setListening] = useState(false);

  let pgnData = {};
  useEffect(async () => {
    if (!listening) {
      let source;
      if (roomId !== "featured") {
        if (pgnData.id !== roomId) {
          pgnData = await fetch(
            `${process.env.REACT_APP_API_ENDPOINT}/pgn/?id=${roomId}`
          ).then((res) => res.json());
          if (pgnData.players.black) {
            createPlayerObject(pgnData.players.white, setWhite);
            createPlayerObject(pgnData.players.black, setBlack);
          }
          if (pgnData.id) {
            handleIdUpdate(pgnData.id);
          }
        }
        source = new EventSource(
          `${process.env.REACT_APP_API_ENDPOINT}/lichesstvcustom/?id=${roomId}`
        );
        source.onmessage = (event) => {
          const parsedData = JSON.parse(event.data);
          setFEN([parsedData.fen]);
        };
      } else {
        source = new EventSource(
          `${process.env.REACT_APP_API_ENDPOINT}/lichesstv`
        );
        source.onmessage = (event) => {
          const parsedData = JSON.parse(event.data);
          setFEN([parsedData.d.fen]);
          if (parsedData.d.players) {
            createPlayerObject(parsedData.d.players[0], setWhite);
            createPlayerObject(parsedData.d.players[1], setBlack);
          }
          if (parsedData.d.id) {
            handleIdUpdate(parsedData.d.id);
          }
        };
      }
      setListening(true);
    }
  }, [listening, FEN]);

  return (
    <div className="sm:mt-auto overflow-hidden m-auto">
      <div className="font-medium md:text-sm text-xs text-white max-w-70 text-left break-all hidden xl:block">
        FEN: {FEN}
      </div>
      <div className="m-auto">
        <div className="flex font-medium md:text-2xl text-lg my-1 text-white">
          <div className="text-scheme-orange">{black.title}&nbsp;</div>
          <div>{black.name}&nbsp;</div>
          <div className="text-gray-500">{black.rating}</div>
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
        <div className="flex font-medium md:text-2xl text-lg my-1 text-white">
          <div className="text-scheme-orange">{white.title}&nbsp;</div>
          <div>{white.name}&nbsp;</div>
          <div className="text-gray-500">{white.rating}</div>
        </div>
      </div>
    </div>
  );
};
