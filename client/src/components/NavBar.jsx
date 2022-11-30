import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/navBar.module.css";

export default function NavBar() {
    


    return (
        <nav className={styles.container}>
            <NavLink to="/home" className={styles.title} >
                Henry Foods
            </NavLink>
            <div className={styles.subContainer}>
                <NavLink to="/recipe" className={styles.subTitle}>
                    Crear Receta
                </NavLink>
                <NavLink to="/diets" className={styles.subTitle}>
                    Tipos de Dietas
                </NavLink>
            </div>
        </nav>
    )

}