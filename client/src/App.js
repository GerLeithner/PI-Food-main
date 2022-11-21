import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import CreateRecipe from "./components/CreateRecipe";
import RecipeDetail from "./components/RecipeDetail";
import NavBar from "./components/NavBar";
// import DietTypes from "./components/DietTypes";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route path={["/home", "/recipe", "/home/:id"]} component={NavBar} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/recipe" component={CreateRecipe} />
        <Route path="/home/:id" component={RecipeDetail} />
      </div>
    </BrowserRouter>
  );
}

export default App;
