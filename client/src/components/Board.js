import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";

const createPlayerNames = (user, setPlayer) => {
  let username = "";
  if (user.user.name) {
    if (user.user.title) {
      username = user.user.title + " " + user.user.name + " " + user.rating;
    } else {
      username = user.user.name + " " + user.rating;
    }
    setPlayer(username);
  }
};

export const Board = (props) => {
  const { roomId } = props;
  const [FEN, setFEN] = useState([]);
  const [black, setBlack] = useState("");
  const [white, setWhite] = useState("");
  const [gameID, setGameID] = useState("");
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
          console.log(pgnData);
          console.log("this is an API req");
          if (pgnData.players.black) {
            createPlayerNames(pgnData.players.white, setWhite);
            createPlayerNames(pgnData.players.black, setBlack);
            console.log("users", pgnData.players.black.user.name);
          }
        }
        source = new EventSource(
          `${process.env.REACT_APP_API_ENDPOINT}/lichesstvcustom/?id=${roomId}`
        );
        source.onmessage = (event) => {
          const parsedData = JSON.parse(event.data);
          //console.log(event.data);
          setFEN([parsedData.fen]);
          if (parsedData.id) {
            setGameID(parsedData.id);
          }
        };
      } else {
        source = new EventSource(
          `${process.env.REACT_APP_API_ENDPOINT}/lichesstv`
        );
        source.onmessage = (event) => {
          const parsedData = JSON.parse(event.data);
          console.log(event.data);
          setFEN([parsedData.d.fen]);
          if (parsedData.d.players) {
            createPlayerNames(parsedData.d.players[0], setWhite);
            createPlayerNames(parsedData.d.players[1], setBlack);
          }
          if (parsedData.d.id) {
            setGameID(parsedData.d.id);
          }
        };
      }
      setListening(true);
    }
  }, [listening, FEN]);

  return (
    <div className="sm:mt-auto overflow-hidden m-auto">
      <div className="font-medium md:text-sm text-xs text-white max-w-70 text-left break-all">
        FEN: {FEN}
      </div>
      <div className="m-auto">
        <div className="font-medium md:text-2xl text-lg my-1 text-white">
          {black}
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
        <div className="font-medium md:text-2xl text-lg my-1 text-white">
          {" "}
          {white}
        </div>
      </div>
    </div>
  );
};
