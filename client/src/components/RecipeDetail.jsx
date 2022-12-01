import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById, clearDetail, deleteRecipe } from "../actions";
import { NavLink, useHistory } from "react-router-dom";
import styles from "../styles/recipeDetail.module.css";

export default function RecipeDetail(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getRecipeById(id)); // component did mount: get recipe detail
    return () => dispatch(clearDetail()); // component will unmount: clear recipe detail
  }, [dispatch, id]);

  const detail = useSelector((state) => state.recipeDetail);

  async function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteRecipe(id));
    alert("Receta eliminada correctamente");
    history.push("/home"); // me redirige a /home al ejecutarse
  }

  return (
    <div className={styles.recipeDetail}>
      <div className={styles.imageAndInfoContainer}>
        <img
          src={detail.image ? detail.image : ""}
          alt=""
        />
        <div className={styles.sideInfo}>
          <div>
            <h2 className={styles.title}>{detail.name}</h2>
            <h2 className={styles.title}>
              {detail.healthScore} Puntos Saludables
            </h2>
          </div>
          <div>
            <div>
              <h4 className={styles.subTitle}>Tipos de Plato</h4>
              {detail.dishTypes && <p>{detail.dishTypes.join(", ")}</p>}
            </div>
            <div>
              <h4 className={styles.subTitle}>Tipos de Dieta</h4>
              {detail.diets && <p>{detail.diets.join(", ")}</p>}
            </div>
          </div>
          <div>
            <h4 className={styles.subTitle}>Resumen</h4>
            <p>{detail.summary?.replace(/<[^>]*>/g, "")}</p>
          </div>
        </div>
      </div>
      {/* <div className={styles.steps}>
        <h4 className={styles.subTitle}>Pasos</h4>
        {detail.steps?.map((step, i) => {
          return (
            <div key={i}>
              <h3>
                {detail.steps.length > 1
                  ? `Paso ${i + 1}: `
                  : "Procedimiento: "}
              </h3>
              <p>{step}</p>
            </div>
          );
        })}
      </div>
      <div className={styles.buttons}>
        <NavLink to="/home">
          <button className={styles.button}>{"< Volver"}</button>
        </NavLink>
        {detail.status === "db" && (
          <NavLink to={`/recipe/${id}`}>
            <button className={styles.button}>{"Editar"}</button>
          </NavLink>
        )}
        {detail.status === "db" && (
          <button onClick={(e) => handleDelete(e)} className={styles.button}>
            Borrar
          </button>
        )}
      </div> */}
    </div>
  );
}
