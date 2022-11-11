import React, { useEffect } from "react";
// import { state, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getDiets } from "../actions";
import { NavLink } from "react-router-dom";
import Recipe from "./Recipe";



export default function Home() {

    const dispatch = useDispatch(); // reemplaza mapDispatch to props
    
    const allRecipes = useSelector(state => state.recipes); // reemplaza mapStateToProps
    const diets = useSelector(state => state.diets);

    // al montarse el componente debe renderizar las recetas traidas del estado global
    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    return (
        <div>
            <h1>Foodnacular</h1>
            <NavLink to="/recipe">Crear Receta</NavLink>
            <button onClick={e => handleClick(e)}>Recargar las recetas</button>
            <div>
                <label>Ordenar segun:</label>
                <select>
                    <option value="asc">ascendente</option>
                    <option value="desc">descendente</option>
                </select>
                <select>
                    <option value="increment">maximo score</option>
                    <option value="decrement">minimo score</option>
                </select>
                <label>Tipo de Dieta:</label>
                <select>
                {   
                    diets.map(diet => {
                        return <option value={diet.name}>{diet.name}</option>
                    })
                }
                </select>
                <label>Tipo de Receta:</label>
                <select>
                    <option>Todas</option>
                    <option>Creadas por nosotros</option>
                    <option>Existentes</option>
                </select>
            </div>
            <div>
            {
                allRecipes && allRecipes.map(r => {
                    return <Recipe name={r.name} diets={r.diets} img={r.img}/>
                })
            }
            </div>

        </div>
    )
}