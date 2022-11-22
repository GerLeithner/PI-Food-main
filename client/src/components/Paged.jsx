import React from "react";
import styles from "../styles/paged.module.css";

export default function Paged({ recipesXPage, allRecipesNumber, paged, currentPage}) {
    const pageNumber = [];

    for(let i = 0; i <= Math.floor(allRecipesNumber / recipesXPage); i++) {
        pageNumber.push(i + 1);
    }

    return (
        pageNumber.length <= 1 ? null : 
        <nav className={styles.container}>
            { pageNumber && pageNumber.map((n, i) => {
                return (
                    <button className={currentPage === n ? styles.currentPage : styles.button} 
                        key={i} onClick={() => paged(n)}
                    >
                        {n}
                    </button>
                )   
            })}
        </nav>
    )
}