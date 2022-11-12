import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getDiets } from "../actions";
import { NavLink } from "react-router-dom";
import Recipe from "./Recipe";
import Paged from "./Paged";



export default function Home() {

    const dispatch = useDispatch(); // reemplaza mapDispatch to props

    const allRecipes = useSelector(state => state.recipes); // reemplaza mapStateToProps
    const diets = useSelector(state => state.diets); // reemplaza mapStateToProps

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesXPage, setRecipesXPage] = useState(9);
    const indexLastRecipe = currentPage * recipesXPage;
    const indexFirstRecipe = indexLastRecipe - recipesXPage;
    const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);

    const paged = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

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
            <h1>Foodstacular</h1>
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
                    diets && diets.map(diet => {
                        return <option value={diet.name} key={diet.id}>{diet.name}</option>
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
            <Paged
                recipesXPage={recipesXPage}
                allRecipesNumber={allRecipes.length}
                paged={paged}
            />
            <div>
            {
                currentRecipes && currentRecipes.map(r => {
                    return (<Recipe
                        key={r.id}
                        id={r.id}
                        name={r.name}
                        diets={r.diets}
                        dishTypes={r.dishTypes} 
                        img={r.image} 
                    />)
                })
            }
            </div>

        </div>
    )
}