const getEval = (fen) => {
  const convertEvaluation = (ev, fen) => {
    console.log(fen);
    const chess = new Chess(`${fen}`);

    const turn = chess.turn();

    if (turn === "b" && !ev.startsWith("M")) {
      if (ev.startsWith("-")) {
        ev = ev.substring(1);
      } else {
        ev = `-${ev}`;
      }
    }
    return ev;
  };
  const stockfish = new Worker("/stockfish.js");
  stockfish.postMessage("uci");
  stockfish.postMessage("ucinewgame");
  stockfish.postMessage("position fen " + fen);
  stockfish.postMessage("go depth 10");

  stockfish.onmessage = (event) => {
    console.log(event.data);
    if (event.data.startsWith(`info depth`)) {
      let message = event.data.split(" ");
      const positionEval = convertEvaluation(
        message[message.indexOf("cp") + 1],
        fen
      );
      console.log(Math.abs(parseFloat(positionEval) / 100));
    }
  };
};
getEval(fen);
