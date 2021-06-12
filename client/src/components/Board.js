import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
const Chess = require("chess.js");

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

let stockfish = new Worker("/stockfish.js");

export const Board = (props) => {
  const { roomId, handleIdUpdate } = props;
  const [FEN, setFEN] = useState("");
  const [turn, setTurn] = useState("");
  const [sfEval, setSfEval] = useState("");
  const [black, setBlack] = useState({});
  const [white, setWhite] = useState({});
  const [listening, setListening] = useState(false);

  const convertEvaluation = (ev, turn) => {
    //fix fen string issue
    console.log("turn, and score", turn, ev);
    if (turn === "b" && !ev.startsWith("M")) {
      if (ev.startsWith("-")) {
        ev = ev.substring(1);
        ev = Math.abs(parseFloat(ev) / 100);
      } else {
        ev = Math.abs(parseFloat(ev) / 100);
        if (ev !== 0) {
          ev = `-${ev}`;
        }
      }
    } else if (turn === "w" && !ev.startsWith("M")) {
      ev = Math.abs(parseFloat(ev) / 100);
    }
    return ev;
  };

  let pgnData = {};
  useEffect(async () => {
    let FEN = "";
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
        stockfish.terminate();
        stockfish = new Worker("/stockfish.js");
        stockfish.postMessage("uci");
        stockfish.postMessage("ucinewgame");
        source.onmessage = (event) => {
          const parsedData = JSON.parse(event.data);
          stockfish.postMessage("position fen " + parsedData.fen);
          stockfish.postMessage("go depth 20");
          setFEN(parsedData.fen);
          FEN = parsedData.fen;
        };
        stockfish.onmessage = (event) => {
          console.log(event.data);
          if (event.data.startsWith(`info depth`)) {
            let message = event.data.split(" ");
            const turn = FEN.slice(-1);
            console.log(message[message.indexOf("cp") + 1]);
            setSfEval(
              convertEvaluation(message[message.indexOf("cp") + 1], turn)
            );
          }
        };
      } else {
        source = new EventSource(
          `${process.env.REACT_APP_API_ENDPOINT}/lichesstv`
        );
        stockfish.terminate();
        stockfish = new Worker("/stockfish.js");
        stockfish.postMessage("uci");
        stockfish.postMessage("ucinewgame");
        source.onmessage = (event) => {
          const parsedData = JSON.parse(event.data);
          stockfish.postMessage("position fen " + parsedData.d.fen);
          stockfish.postMessage("go depth 20");
          setFEN(parsedData.d.fen);
          FEN = parsedData.d.fen;
          if (parsedData.d.players) {
            createPlayerObject(parsedData.d.players[0], setWhite);
            createPlayerObject(parsedData.d.players[1], setBlack);
          }
          if (parsedData.d.id) {
            handleIdUpdate(parsedData.d.id);
          }
        };
        stockfish.onmessage = (event) => {
          console.log(event.data);
          if (event.data.startsWith(`info depth`)) {
            let message = event.data.split(" ");
            const turn = FEN.slice(-1);
            console.log(message[message.indexOf("cp") + 1]);
            setSfEval(
              convertEvaluation(message[message.indexOf("cp") + 1], turn)
            );
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
      <div className="font-lg md:text-xl text-md text-white max-w-70 text-left break-all hidden xl:block">
        eval: {sfEval}
      </div>
      <div className="m-auto">
        <div className="flex font-medium md:text-2xl text-lg my-1 text-white">
          <div className="text-scheme-orange">{black.title}&nbsp;</div>
          <div>{black.name}&nbsp;</div>
          <div className="text-gray-500">{black.rating}</div>
        </div>
        <div className="m-auto flex">
          <div className="w-6 h-auto bg-white">
            <div
              style={{ height: `${100 - wHeight}%` }}
              className={styles.barBlack}
            >
              <span>{wHeight < 50 ? printEvaluation() : ""}</span>
            </div>
            <div style={{ height: `${wHeight}%` }} className={styles.barWhite}>
              <div style={{ flex: "1" }} />
              <span>{wHeight >= 50 ? printEvaluation() : ""}</span>
            </div>
          </div>
          <Chessboard
            position={FEN}
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
