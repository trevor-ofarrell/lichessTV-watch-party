import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import { Toggle } from "./Toggle";

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
  const [sfEval, setSfEval] = useState("");
  const [wHeight, setWHeight] = useState(50);
  const [black, setBlack] = useState({});
  const [white, setWhite] = useState({});
  const [listening, setListening] = useState(false);
  const [checked, setChecked] = useState(false);

  const convertEvaluation = (ev, turn) => {
    if (turn === "b" && !ev.startsWith("M")) {
      if (ev.startsWith("-")) {
        ev = ev.substring(1);
        ev = Math.abs(parseFloat(ev) / 100).toFixed(1);
      } else {
        ev = Math.abs(parseFloat(ev) / 100).toFixed(1);
        ev = -Math.abs(ev).toFixed(1);
      }
    } else if (turn === "w" && !ev.startsWith("M")) {
      ev = Math.abs(parseFloat(ev) / 100).toFixed(1);
    } else {
      ev = Math.abs(parseFloat(ev) / 100).toFixed(1);
    }
    return ev;
  };

  const evaluateFunc = (x) => {
    if (x === 0) {
      return 0;
    } else if (x < 7) {
      return -(0.322495 * Math.pow(x, 2)) + 7.26599 * x + 4.11834;
    } else {
      return (8 * x) / 145 + 5881 / 145;
    }
  };

  const onToggle = (toggle) => {
    setChecked(!toggle);
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
          if (event.data.startsWith(`info depth`)) {
            let message = event.data.split(" ");
            const turn = FEN.slice(-1);
            const evaluation = convertEvaluation(
              message[message.indexOf("cp") + 1],
              turn
            );
            setSfEval(evaluation);
            const evaluated = evaluateFunc(evaluation);
            if (Math.sign(evaluation) === -1) setWHeight(50 - evaluated);
            else setWHeight(50 + evaluated);
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
          if (event.data.startsWith(`info depth`)) {
            let message = event.data.split(" ");
            const turn = FEN.slice(-1);
            const evaluation = convertEvaluation(
              message[message.indexOf("cp") + 1],
              turn
            );
            setSfEval(evaluation);
            const evaluated = evaluateFunc(evaluation);
            if (Math.sign(evaluation) === -1) setWHeight(50 - evaluated);
            else setWHeight(50 + evaluated);
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
          {checked === true && (
            <div className="md:w-10 w-8 h-auto">
              <div
                style={{ height: `${100 - wHeight}%` }}
                className="w-full bg-black transition ease-in-out duration-700 text-center"
              >
                <span className="text-sm">{wHeight < 50 ? sfEval : ""}</span>
              </div>
              <div
                style={{ height: `${wHeight}%` }}
                className="w-full bg-white transition ease-in-out duration-700 text-center"
              >
                <div style={{ flex: "1" }} />
                <span className="text-sm">{wHeight >= 50 ? sfEval : ""}</span>
              </div>
            </div>
          )}
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
      <Toggle check={checked} onUpdate={onToggle} />
    </div>
  );
};
