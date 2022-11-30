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

    return (
        <div className={styles.container}>
            {diets?.map(diet => {
               return (
                <div>
                    <h3 className={styles.title}>{diet.name}</h3>
                    <p>{diet.description}</p>
               </div>
               )     
            })}
            <NavLink to="/home">
                <button className={styles.button}>{"< Volver"}</button>
            </NavLink>
        </div>
    )
}