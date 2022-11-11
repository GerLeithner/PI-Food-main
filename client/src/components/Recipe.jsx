import React from "react";

export default function Recipe({ name, diets, img }) {
    return (
        <div>
            <h3>Titulo: {name}</h3>
            <h5>Tipos de dieta:</h5>
            <ul>
            {
                diets.map(diet => <li>{diet.name}</li>)
            }
            </ul>
            <img src={img} alt="img not found" width="200px" height="250px" />
        </div>
    )
}
