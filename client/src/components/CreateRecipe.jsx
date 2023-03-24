import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  createRecipe,
  getDiets, 
  getDishTypes, 
  getRecipeById,
  editRecipe,
  clearRecipes  } from "../actions";
import { NavLink, useHistory } from "react-router-dom";
import styles from "../styles/createRecipe.module.css"

export default function CreateRecipe(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const diets = useSelector(state => state.diets);
  const dishTypes = useSelector(state => state.dishTypes);
  
  const id = props.match.params.id;
  const detail = useSelector(state => state.recipeDetail);

  console.log(detail)

  const [input, setInput] = useState({
    name: id ? detail.name : "",
    summary: id ? detail.summary : "",
    healthScore: id ? detail.healthScore : "",
    steps:  id ? detail.steps : [],
    dishTypes: id ? detail.dishTypes : [],
    image: id ? detail.image : "",
    diets: id ? detail.diets : [],
    step: "",
  });


  console.log("input: ",input);

  const [selectedDiets, setSelectedDiets] = useState(id ? detail.diets : []);
  const [errors, setErrors] = useState({});

  console.log("selectedDiets: ",selectedDiets)

  useEffect(() => {
    dispatch(getDiets());
    dispatch(getDishTypes());
    return () => {
      setInput({
        name: "",
        summary: "",
        healthScore: "",
        steps: [],
        dishTypes: [],
        image: "",
        diets: [],
      });
    }
  }, [dispatch]);


  function handleChange(e) {
    e.preventDefault();

    setErrors(validate({ 
      ...input,
      [e.target.name]: e.target.value
     }))
    
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  function handleSelect(e) {
    e.preventDefault();

    if(input[e.target.name].includes(e.target.value)) {
      return alert("Ya has elegido esa opcion");
    }

    setInput({
      ...input,
      [e.target.name]: [...input[e.target.name], e.target.value]
    })
  }

  function handleDelete(e) {
    e.preventDefault();
    
    setInput({
      ...input,
      [e.target.name]: input[e.target.name].filter(element => element !== e.target.value) 
    })
  }

  function handleSteps(e) {
    e.preventDefault();
    if(input.step === "") return alert("Debe describir el paso antes de agregar otro")
    setInput({
      ...input,
      steps: [...input.steps, input.step],
      step: ""
    });

  }

  function handleEnter(e) {
    if (e.key.toLowerCase() === "enter" && !e.shiftKey) {
      const form = e.target.form;
      const index = [...form].indexOf(e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  }

  function handeSubmit(e) {
    e.preventDefault();

    if(Object.values(validate(input)).length) {
      return Object.values(validate(input)).forEach(e => {
        return alert(e);
      })
    }

    if(id) {
      dispatch(editRecipe(input, id));
      alert("Receta editada con exito");
    }
    else {
      dispatch(createRecipe(input));
      alert("Receta creada con exito");
    }

    setInput({
      name: "",
      summary: "",
      healthScore: "",
      steps: [],
      dishTypes: [],
      image: "",
      diets: [],
    });

    history.push("/home"); // me redirige a /home al ejecutarse
  }

  function validate({ name, summary, healthScore}) {
    let errors = {};
    let regexName = /^[a-zA-Z\s]+$/;

    if(name && !regexName.test(name)) errors.name = "*Nombre invalido, no puede contener simbolos, ni numeros";
    if(!name) errors.name = "*Debe ingresar un nombre";
    if(name && name.length > 42 ) errors.name = "*El nombre de tener como máximo 40 caracteres";
    if(!summary) errors.summary = "*Debe ingresar un resumen";
    if(healthScore && (healthScore > 100 || healthScore < 0)) errors.healthScore = "*Los puntos de Salud deben ser menores o iguales a 100";

    return errors;
  }


  return (
    <div className={styles.body}>
    <div className={styles.form}>
      <h1 className={styles.title}>{id ? "Editar Receta" : "Nueva Receta"}</h1>
      <form onSubmit={e => handeSubmit(e)}>
        <div className={styles.titleAndInput}>
          <label className={styles.subTitle}>Nombre</label>
          <input
            className={styles.input}
            onKeyDown={e => handleEnter(e)}
            onChange={e => handleChange(e)}
            name="name"
            type="text"
            value={input.name}
          />
        </div>
        <>
        { errors.name && <p className={styles.error}>{errors.name}</p> }
        </>
        <div className={styles.titleAndInput}>
          <label className={styles.subTitle}>Puntos Saludables</label>
          <input
            className={styles.input}
            max="100"
            min="0"
            onKeyDown={e => handleEnter(e)} 
            name="healthScore" 
            type="number" 
            value={input.healthScore}
            placeholder="De 0 a 100 pts"
            onChange={(e) => handleChange(e)} 
          />
        </div>
        <>
        { errors.healthScore && <p className={styles.error}>{errors.healthScore}</p> }
        </>
        <div className={styles.titleAndInput}>
          <label className={styles.subTitle}>Imagen</label>
          <input
            className={styles.input}
            onKeyDown={e => handleEnter(e)} 
            onChange={(e) => handleChange(e)}
            name="image"
            type="text"
            value={input.image}
            placeholder="URL de la imagen"
          />
        </div>
        <div className={styles.titleAndInput}>
          <label className={styles.subTitle}>Tipos de Dieta</label>
          <select name="diets" onChange={e => handleSelect(e)}>
            <option hidden value="diets">Seleccionar</option>
            { diets?.map(diet => {
              return (
                <option value={diet.name} key={diet.id}>
                  {diet.name}
                </option>
              )})
            }
          </select>
        </div>
        <div>
        { input.diets?.map((diet, i) => {
              return (
                <span key={i} className={styles.p}>
                  {diet}<button name="diets" value={diet} onClick={e => handleDelete(e)} className={styles.buttonX}>x</button>
                </span>
              )})
        }
        </div>
        <div className={styles.titleAndInput}>
          <label className={styles.subTitle}>Tipo de Plato</label>
          <select name="dishTypes" onChange={e => handleSelect(e)}>
            <option hidden>Seleccionar</option>
            { dishTypes && dishTypes.map((dish, i) => {
              return <option value={dish} key={i}>{dish}</option>
              })
            }
          </select>
        </div>
        <div>
        { input.dishTypes?.map((dish, i) => {
              return (
                <span key={i} className={styles.p}>
                  {dish}<button type="button" value={dish} name="dishTypes" onClick={e => handleDelete(e)} className={styles.buttonX}>x</button>
                </span>
              )})
            }
        </div>
        <div className={styles.titleAndText}>
          <label className={styles.subTitle}>Resumen</label>
          <textarea
            className={styles.textarea}
            onKeyDown={e => handleEnter(e)} 
            name="summary"
            type="text"
            rows="4"
            cols="30"
            value={input.summary}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <>
          { errors.summary && <p className={styles.error}>{errors.summary}</p> }
        </>
        <div className={styles.titleAndText}>
          <label className={styles.subTitle}>Pasos</label>
          <textarea
            className={styles.textarea}
            onKeyDown={e => handleEnter(e)}
            name="step"
            type="text"
            rows="4"
            cols="30"
            value={input.step}
            onChange={e => handleChange(e)}
          />
        </div>
        <div>
          { input.steps?.map((step, i) => {
            return (
              <p key={i} className={styles.p}>
                Paso {i + 1}: {step} 
                <button 
                  type="button" 
                  value={step} 
                  name="steps" 
                  onClick={e => handleDelete(e)} 
                  className={styles.buttonX}
                >
                  x
                </button>
              </p>
            )})
          }
        </div>
        <div className={styles.buttons}> 
          <NavLink to={id ? `/home/${id}` : "/home"}>
            <button className={styles.button}>{"< Volver"}</button>
          </NavLink>
          <button type="button" className={styles.button} onClick={e => handleSteps(e)}>
            + Paso
          </button>
          <button className={styles.button} type="submit" disabled={Object.keys(validate(input)).length}>
            {id ? "Guardar Receta" : "Crear Receta"}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

