import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
    
    return (
        <nav>
            <h1>Foodstacular</h1>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/recipe">Crear Receta</NavLink>
            <NavLink to="/diets">Tipos de Dietas</NavLink>
        </nav>
    )

}