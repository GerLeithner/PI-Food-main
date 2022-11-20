import React from "react";

export default function Paged({ recipesXPage, allRecipesNumber, paged}) {
    const pageNumber = [];

    for(let i = 0; i <= Math.floor(allRecipesNumber / recipesXPage); i++) {
        pageNumber.push(i + 1);
    }

    return (
        pageNumber.length <= 1 ? null : 
        <nav>
            { pageNumber && pageNumber.map((n, i) => {
                return  <button key={i} onClick={() => paged(n)}>{n}</button>  
            })}
        </nav>
    )
}