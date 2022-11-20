import React from "react";
import { NavLink } from "react-router-dom";

export default function LandingPage() {

    return (
        <div className="">
            <h1>Bienvenido a Foodstacular</h1>
            <NavLink to="/home">
                <button>Ingresar</button>
            </NavLink>
        </div>
    )
};