import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/landingPage.module.css"

export default function LandingPage() {

    return (
        <div className={styles.body}>
            <div className={styles.container}>
            <h1 className={styles.title}>Bienvenido a Henry-Food</h1>
            <NavLink to="/home">
                <button className={styles.reloadButton}>Ingresar</button>
            </NavLink>
            </div>
        </div>
    )
};