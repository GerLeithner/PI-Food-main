import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  getDiets,
  filterRecipesByDiet,
  filterRecipesByStatus,
  sortByAlphabeticalOrder,
  sortByHealthScore,
  clearRecipes } from "../actions";
import Recipe from "./Recipe";
import Paged from "./Paged";
import SearchBar from "./SearchBar";
import styles from "../styles/homePage.module.css";

export default function Home() {
  const dispatch = useDispatch(); // reemplaza mapDispatch to props

  const allRecipes = useSelector((state) => state.recipes); // reemplaza mapStateToProps
  const diets = useSelector((state) => state.diets);
  const loading = useSelector((state) => state.loading);

  // paged
  const recipesXPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // filters & sorts states

  const indexLastRecipe = currentPage * recipesXPage;
  const indexFirstRecipe = indexLastRecipe - recipesXPage;
  const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);

  // sorts || filters
  const [sorted, setSorted] = useState("");

  // al montarse el componente debe traer las recipes y las diets
  useEffect(() => {
    dispatch(getDiets());
    dispatch(getRecipes());
    return () => dispatch(clearRecipes());
  }, [dispatch]);


  // para poder pasar el set por props
  function paged(pageNumber) {
    setCurrentPage(pageNumber);
  };

  // para defaultear los selects
 const [alphabeticalOrder, setAlphabeticalOrder] = useState("alphabeticalOrder");
 const [healthScore, setHealthScore] = useState("healthScore");
 const [diet, setDiet] = useState("diet");
 const [status, setStatus] =useState("status");


  function handleRefres(e) {
    e.preventDefault();

    dispatch(getRecipes());
    setAlphabeticalOrder("alphabeticalOrder");
    setHealthScore("healthScore");
    setDiet("diet");
    setStatus("status")
    setCurrentPage(1);
  }

  function handleFilterDiet(e) {
    e.preventDefault();
    setDiet(e.target.value);
    setAlphabeticalOrder("alphabeticalOrder");
    setHealthScore("healthScore");
    setStatus("status");
    dispatch(filterRecipesByDiet(e.target.value));
    setCurrentPage(1);
    setSorted(`filtered by diet ${e.target.value}`);
  }

  function handleFilterStatus(e) {
    e.preventDefault();
    setStatus(e.target.value);
    setAlphabeticalOrder("alphabeticalOrder");
    setHealthScore("healthScore");
    setDiet("diet");
    dispatch(filterRecipesByStatus(e.target.value));
    setCurrentPage(1);
    setSorted(`filtered by status ${e.target.value}`);
  }

  function handleAlphabeticSort(e) {
    e.preventDefault();

    dispatch(sortByAlphabeticalOrder(e.target.value));
    setAlphabeticalOrder(e.target.value);
    setHealthScore("healthScore");
    setDiet("diet");
    setStatus("status")
    setCurrentPage(1);
    setSorted(`sorted by alphabetic ${e.target.value}`);
  }

  function handleHealthScoreSort(e) {
    e.preventDefault();

    dispatch(sortByHealthScore(e.target.value));
    setHealthScore(e.target.value);
    setAlphabeticalOrder("alphabeticalOrder");
    setDiet("diet");
    setStatus("status")
    setCurrentPage(1);
    setSorted(`sorted by healthScore ${e.target.value}`);
  }

  return (
    <React.Fragment>
      <div className={styles.sideBar}>
        <SearchBar paged={paged}/>
        <button className={styles.reloadButton} onClick={(e) => handleRefres(e)}>Recargar las recetas</button>

        <div className={styles.sortContainer}>
          <label>Ordenar segun</label>
          <select value={alphabeticalOrder} onChange={(e) => handleAlphabeticSort(e)}>
            <option hidden value="alphabeticalOrder">Orden Alfabetico</option>
            <option value="asc">ascendente</option>
            <option value="desc">descendente</option>
          </select>
          <select value={healthScore} onChange={(e) => handleHealthScoreSort(e)}>
          <option hidden value="healthScore">Puntos de Salud</option>
          <option value="increment">maximo</option>
          <option value="decrement">minimo</option>
          </select>
          <label>Filtrar por</label>
          <div>
            <select value={diet} onChange={(e) => handleFilterDiet(e)}>
            <option hidden value="diet">Tipo de Dieta</option>
            {diets &&
              diets.map((diet) => {
                return (
                  <option value={diet.name} key={diet.id}>
                    {diet.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <select value={status} onChange={(e) => handleFilterStatus(e)}>
            <option hidden value="status">Status</option>
            <option value="all">Todas</option>
            <option value="db">Tus Recetas</option>
            <option value="api">Existentes</option>
            </select>
          </div>
        </div>
      </div>
       {/* DIVISION ENTRE SIDEBAR Y CARDS */} 
      <>
      { loading ? <h3 className={styles.loading}>Cargando...</h3> : 
        <div>
          <div>
          {currentRecipes && (
            <Paged
              currentPage={currentPage}
              recipesXPage={recipesXPage}
              allRecipesNumber={allRecipes.length}
              paged={paged}
            />
          )}
          </div>
      
          <div className={allRecipes.length > 9 ? styles.grid : styles.gridNotPaged } >
            { currentRecipes.length ? 
              currentRecipes.map((r) => {
                return (
                  <Recipe
                    key={r.id}
                    id={r.id}
                    name={r.name}
                    healthScore={r.healthScore}
                    diets={r.diets}
                    dishTypes={r.dishTypes}
                    img={r.image}
                  />
                )
              }) : <h3 className={styles.title}>No hay recetas disponibles...</h3>
            }
          </div>
        </div>
      }
      </>
    </React.Fragment>
  );
}
