import React from "react";
import Sign from "../signup/signUp.js";
import Main from "../main/main";
import Login from "../login/LogIn.js";
import Landing from "../landing/landing.js";
import Edit from "../edit/edit.js";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/signup" component={Sign} />
            <Route path="/main/:uid" component={Main} />
            <Route path="/Login" component={Login} />
            <Route path="/edit/:uid" component={Edit} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
