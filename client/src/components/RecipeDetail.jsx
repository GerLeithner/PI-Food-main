import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById } from "../actions";
import { NavLink } from "react-router-dom";

export default function RecipeDetail(props) {

    const id = props.match.params.id;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipeById(id));
    }, [dispatch, id]);

    const detail = useSelector(state => state.recipeDetail);

    return (
        <div>
            <span>
                <h2>Título: {detail.name}</h2>
                <h2>Puntos Saludables: {detail.healthScore}</h2>
            </span>
            <img src={detail.image ? detail.image: ""} alt="" width="700px" height="400"/>
            <h4>Tipos de Dieta:</h4>
            { detail.diets?.map((diet, i) => {
                    return <p key={i}>{diet}</p>
                })
            }
            <h4>Tipos de Plato:</h4>
            { detail.dishTypes?.map((dish, i) => {
                    return <p key={i}>{dish}</p>
                })
            }
            <h4>Resumen</h4>
            <p>{detail.summary?.replace(/<[^>]*>/g, '')}</p>
            <h4>Pasos:</h4>
            { detail.steps?.map((step, i) => {
                    return <p key={i}>{step}</p>
                })
            }
            <NavLink to="/home">
                <button>Volver</button>
            </NavLink>
        </div>
    )

}