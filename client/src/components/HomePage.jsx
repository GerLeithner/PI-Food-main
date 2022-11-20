import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    getRecipes, 
    getDiets,
    filterRecipesByDiet, 
    filterRecipesByStatus,
    sortByAlphabeticalOrder,
    sortByHealthScore } from "../actions";
import { NavLink } from "react-router-dom";
import Recipe from "./Recipe";
import Paged from "./Paged";
import SearchBar from "./SearchBar";



export default function Home() {

    const dispatch = useDispatch(); // reemplaza mapDispatch to props

    const allRecipes = useSelector(state => state.recipes); // reemplaza mapStateToProps
    const diets = useSelector(state => state.diets);
    const error = useSelector(state => state.error);

    // paged
    const recipesXPage = 9;
    const [currentPage, setCurrentPage] = useState(1);

    const indexLastRecipe = currentPage * recipesXPage;
    const indexFirstRecipe = indexLastRecipe - recipesXPage;
    const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);

    // sorts
    const [sorted, setSorted] = useState("");

    // al montarse el componente debe traer las recipes y las diets
    useEffect(() => {
        dispatch(getDiets())
        dispatch(getRecipes())
    }, [dispatch]);

    // para poder pasar el set por props
    const paged = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    function handleRefres(e) {
        e.preventDefault();
        dispatch(getRecipes());
        setCurrentPage(1);
    }

    function handleFilterDiet(e) {
        e.preventDefault();
        dispatch(filterRecipesByDiet(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterStatus(e) {
        e.preventDefault();
        dispatch(filterRecipesByStatus(e.target.value));
        setCurrentPage(1);
    }

    function handleAlphabeticSort(e) {
        e.preventDefault();
        dispatch(sortByAlphabeticalOrder(e.target.value));
        setCurrentPage(1);
        setSorted(`sorted by alphabetic ${e.target.value}`);
    }

    function handleHealthScoreSort(e) {
        e.preventDefault();
        dispatch(sortByHealthScore(e.target.value));
        setCurrentPage(1);
        setSorted(`sorted by healthScore ${e.target.value}`);
    }

    return (
        <div>
            <h1>Foodstacular</h1>
            <NavLink to="/recipe">Crear Receta</NavLink>
            <button onClick={e => handleRefres(e)}>Recargar las recetas</button>
            <div>
                <SearchBar paged={paged} />
                <label>Ordenar segun:</label>
                <select name="alphabeticalOrder" onChange={e => handleAlphabeticSort(e)}>
                    <option disabled selected>Orden Alfabetico</option>
                    <option value="asc">ascendente</option>
                    <option value="desc">descendente</option>
                </select>
                <select name="healthScore" onChange={e => handleHealthScoreSort(e)}>
                    <option disabled selected>Health Score</option>
                    <option value="increment">maximo</option>
                    <option value="decrement">minimo</option>
                </select>
                <label>Tipo de Dieta:</label>
                <select name="diets" onChange={e => handleFilterDiet(e)}>
                    <option disabled selected>Seleccionar</option>
                    { diets && diets.map(diet => {
                        return <option value={diet.name} key={diet.id}>{diet.name}</option>
                        })
                    }
                </select>
                <label>Tipo de Receta:</label>
                <select name="status" onChange={e => handleFilterStatus(e)}>
                    <option value ="all">Todas</option>
                    <option value="db">Tus Recetas</option>
                    <option value="api">Existentes</option>
                </select>
            </div>
            { error && <p>{error}</p> }
            {!error && <Paged
                recipesXPage={recipesXPage}
                allRecipesNumber={allRecipes.length}
                paged={paged}
            />}
            <div>
            {!error && currentRecipes && currentRecipes.map(r => {
                    return (<Recipe
                        key={r.id}
                        id={r.id}
                        name={r.name}
                        healthScore={r.healthScore}
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