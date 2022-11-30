import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/recipe.module.css"

export default function Recipe({ id, name, diets, dishTypes, img, healthScore }) {
    return (
        <div id={id} className={styles.container} >
            <Link to={`/home/${id}`} className={styles.title}>
                <img src={img} alt="" className={styles.image} />
                {name}
            </Link>
            <h4 className={styles.subTitle}>{healthScore} Puntos de salud</h4>
            <h4 className={styles.subTitle}>Tipos de Dieta</h4>
            { diets && <p className={styles.p}>{diets.join(", ")}</p> }
            <h4 className={styles.subTitle}>Tipos de Plato</h4>
            { dishTypes && <p className={styles.p}>{dishTypes.join(", ")}</p> }
        </div>
    )
}
