import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import CreateRecipe from "./components/CreateRecipe";
import RecipeDetail from "./components/RecipeDetail";
import NavBar from "./components/NavBar";
import Diets from "./components/Diets";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route path={["/home", "/recipe", "/home/:id", "/diets"]} component={NavBar} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path={["/recipe", "/recipe/:id"]} component={CreateRecipe} />
        <Route path="/home/:id" component={RecipeDetail} />
        <Route path="/diets" component={Diets} />
      </div>
    </BrowserRouter>
  );
}

export default App;
