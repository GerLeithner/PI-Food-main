import React from "react";
import { Link } from "react-router-dom";

export default function Recipe({ id, name, healthScore, diets, dishTypes, img }) {
    return (
        <div>
            <Link to={`/home/${id}`}>
                <h3>{name}</h3>
            </Link>
            <img src={img} alt="img not found" width="200px" height="200px" />
            { healthScore && <h5>Health Score: {healthScore}</h5> }
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
