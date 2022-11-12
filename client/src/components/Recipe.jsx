import React from "react";
import { NavLink } from "react-router-dom";

export default function Recipe({ id, name, diets, dishTypes, img }) {
    return (
        <div>
            <NavLink to={`/home/${id}`}>
                <h3>Titulo: {name}</h3>
            </NavLink>
            <img src={img} alt="img not found" width="200px" height="200px" />
            <h5>Tipos de Dieta:</h5>
            {
                diets && diets.map((d, i) => {
                    return <p key={i}>{d}</p>
                })
            }
            <h5>Tipos de Plato:</h5>
            {
                dishTypes && dishTypes.map((d, i) => {
                    return <p key={i}>{d}</p>
                })
            }
        </div>
    )
}
