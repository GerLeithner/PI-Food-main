import React from "react";

export default function Paged({ recipesXPage, allRecipesNumber, paged}) {
    const pageNumber = [];

    for(let i=0; i <= Math.floor(allRecipesNumber / recipesXPage); i++) {
        pageNumber.push(i + 1);
    }

    return (
        <nav>
            { pageNumber && pageNumber.map(n => {
                return  <button onClick={() => paged(n)}>{n}</button>  
            })}
        </nav>
    )
}