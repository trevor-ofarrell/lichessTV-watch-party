# Lichess TV watch party

Watch live games being played on lichess.org, and join the live chat to talk to other viewers. Join the featured rooms, or create a custom room for any specific game in play with a lichess game ID.

<p align="center"> 
  <img src="/client/public/mac.gif" alt="My Project GIF" width="auto" height="auto">
</p>

## About
- The apps front-end is a create-react-app, hosted by vercel, and the back-end is an express server.
- Moves and game data is collected from the <a href="https://lichess.org/api">lichess.org API</a>.
- The chatting is websocket based, built using <a href="https://socket.io">socket.io</a>.
- The board is <a href="https://chessboardjsx.com/">chessboardJSX</a>.

## Usage

server:

```
cd server
yarn && node server.js
```

client:

```
cd client
yarn && yarn start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
