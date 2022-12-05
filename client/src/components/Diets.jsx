import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets } from "../actions";
import styles from "../styles/diets.module.css";
import { NavLink } from "react-router-dom";

export default function DietsTypes() {
    
    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets);

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    function firstLetterUpper (string) {
        const words = string.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        return words.join(" ");
    }

    return (
        <div className={styles.Diets}>
            {diets?.map(diet => {
               return (
                <div className={styles.diet}>
                    <h3>{firstLetterUpper(diet.name)}</h3>
                    <p>{diet.description}</p>
               </div>
               )     
            })}
            <div className={styles.buttons}>
            <NavLink to="/home">
                <button className={styles.button}>{"< Volver"}</button>
            </NavLink>
            </div>

        </div>
    )
}