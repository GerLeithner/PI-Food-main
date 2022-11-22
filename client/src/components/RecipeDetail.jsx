import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById } from "../actions";
import { NavLink } from "react-router-dom";
import styles from "../styles/recipeDetail.module.css";

export default function RecipeDetail(props) {

    const id = props.match.params.id;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipeById(id));
    }, [dispatch, id]);

    const detail = useSelector(state => state.recipeDetail);

    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <img src={detail.image ? detail.image: ""} alt="" className={styles.image}/>
                <div>
                    <div className={styles.titleContainer}>
                        <h2 className={styles.title}>{detail.name}</h2>
                        <h2 className={styles.title}>{detail.healthScore} Puntos Saludables</h2>
                    </div>
                    <h4>Tipos de Dieta</h4>
                    { detail.diets?.map((diet, i) => {
                            return <p key={i}>{diet}</p>
                        })
                    }
                    <h4>Tipos de Plato</h4>
                    { detail.dishTypes?.map((dish, i) => {
                            return <p key={i}>{dish}</p>
                        })
                    }
                </div>
            </div>
            
            <div>
                <h4>Resumen</h4>
                <p>{detail.summary?.replace(/<[^>]*>/g, '')}</p>
                <h4>Pasos</h4>
                { detail.steps?.map((step, i) => {
                        return <p key={i}>{step}</p>
                    })
                }
                <NavLink to="/home">
                    <button>{"<< Volver"}</button>
                </NavLink>
            </div>
        </div>
    )

}