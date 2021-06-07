import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import "./index.css";
import VerifyLoggedIn from "./VerifyLoggedIn";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:roomId" component={VerifyLoggedIn} />
      </Switch>
    </Router>
  );
}

export default App;
