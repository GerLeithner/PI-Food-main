import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
// import DietTypes from "./components/DietTypes";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={HomePage} />
        {/* <Route path="/diets" component={DietTypes} /> */}
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
