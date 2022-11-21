import React from "react";
import { Link } from "react-router-dom";

export default function Recipe({ id, name, diets, dishTypes, img, healthScore }) {
    return (
        <div id={id}>
            <Link to={`/home/${id}`}>
                <h3>{name}</h3>
            </Link>
            <img src={img} alt="img not found" width="200px" height="200px" />
            <h4>Puntos de salud: {healthScore}</h4>
            <h4>Tipos de Dieta:</h4>
            { diets?.map((d, i) => {
                    return <p key={i}>{d}</p>
                })
            }
            <h4>Tipos de Plato:</h4>
            { dishTypes?.map((d, i) => {
                    return <p key={i}>{d}</p>
                })
            } 
        </div>
    )
}
