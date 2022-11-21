import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, getDiets, getDishTypes  } from "../actions";
import { NavLink, useHistory } from "react-router-dom";

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const history = useHistory();

  const diets = useSelector(state => state.diets);
  const dishTypes = useSelector(state => state.dishTypes);

  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: "",
    step: "",
    steps: [],
    dishTypes: [],
    image: "",
    diets: [],
  });

  const [selectedDiets, setSelectedDiets] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getDiets());
    dispatch(getDishTypes());
  }, [dispatch]);


  function handleChange(e) {
    e.preventDefault();

    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleSelect(e) {
    e.preventDefault();

    if(input[e.target.name].includes(e.target.value)) {
      return alert("Ya has elegido esa opcion");
    }

    if(e.target.name === "diets") {
      let diet = getDiet(e.target.value);
      setSelectedDiets([...selectedDiets, diet]);
    }

    setInput({
      ...input,
      [e.target.name]: [...input[e.target.name], e.target.value]
    })

    e.target.value ="tu vieja";
  }

  function handleDelete(e) {
    e.preventDefault();

    if(e.target.name === "diets") {
      setSelectedDiets(selectedDiets.filter(diet => parseInt(diet.id) !== parseInt(e.target.value)))
    }

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

  function handeSubmit(e) {
    e.preventDefault();
    
    if(Object.values(validate(input)).length) {
      return Object.values(validate(input)).forEach(e => {
        return alert(e);
      })
    }

    dispatch(createRecipe(input));
    alert("Receta creada con exito");
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

  function handleEnter(e) {
    if (e.key.toLowerCase() === "enter" && !e.shiftKey) {
      const form = e.target.form;
      const index = [...form].indexOf(e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  }

  function getDiet(id) {
    let selectedDiet = diets.find(diet => parseInt(diet.id) === parseInt(id));
    return selectedDiet;
  }

  function validate({ name, summary, healthScore}) {
    let errors = {};
    let regexName = /^[a-zA-Z\s]+$/;

    if(!regexName.test(name)) errors.name = "Nombre invalido, no puede contener simbolos, ni numeros";
    if(!name) errors.name = "Debe ingresar un nombre";
    if(!summary) errors.summary = "Debe ingresar un resumen";
    if(healthScore > 100 || healthScore < 0) errors.healthScore = "Los puntos de Salud deben ser menores o iguales a 100";

    return errors;
  }


  return (
    <div>
      <h1>Crea tu propia receta</h1>
      <form onSubmit={e => handeSubmit(e)}>
        <div>
          <label>Nombre: </label>
          <input

            onKeyDown={e => handleEnter(e)}
            onChange={e => handleChange(e)}
            name="name"
            type="text"
            value={input.name}
          />
        </div>
        <div>
          <label>Resumen: </label>
          <textarea

            onKeyDown={e => handleEnter(e)} 
            name="summary"
            type="text"
            rows="4"
            cols="30"
            value={input.summary}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Puntos Saludables: </label>
          <input
            max="100"
            min="0"
            onKeyDown={e => handleEnter(e)} 
            name="healthScore" 
            type="number" 
            value={input.healthScore}
            onChange={(e) => handleChange(e)} 
          />
        </div>
        <div>
          <label>Imagen: </label>
          <input
            onKeyDown={e => handleEnter(e)} 
            onChange={(e) => handleChange(e)}
            name="image"
            type="text"
            value={input.image}
            placeholder="URL de la imagen"
          />
        </div>
        <div>
          <label>Tipo de Dieta: </label>
          <select name="diets" onChange={e => handleSelect(e)}>
            <option hidden>Seleccionar</option>
            { diets?.map(diet => {
              return <option key={diet.id} value={diet.id}>{diet.name}</option>
              })
            }
          </select>
          <div />
            { selectedDiets?.map(diet => {
              return (
                <span key={diet.id}>
                  {diet.name} <button name="diets" value={diet.id} onClick={e => handleDelete(e)}>x</button>
                </span>
              )})
            }
          <div />
        </div>
        <div>
          <label>Tipo de Plato: </label>
          <select name="dishTypes" onChange={e => handleSelect(e)}>
            <option hidden>Seleccionar</option>
            { dishTypes && dishTypes.map((dish, i) => {
              return <option value={dish} key={i}>{dish}</option>
              })
            }
          </select>
          <div>
            { input.dishTypes.map((dish, i) => {
              return (
                <span key={i}>
                  {dish} <button type="button" value={dish} name="dishTypes" onClick={e => handleDelete(e)}>x</button>
                </span>
              )})
            }
          </div>
        </div>
        <div>
          <label>Pasos: </label>
          <textarea
            onKeyDown={e => handleEnter(e)}
            name="step"
            type="text"
            rows="4"
            cols="30"
            value={input.step}
            onChange={e => handleChange(e)}
          />
          <br />
          <button type="button" onClick={e => handleSteps(e)}>Agregar nuevo paso</button> 
          { input.steps.map((step, i) => {
            return (
              <div key={i}>
                Paso {i + 1}: {step} <button type="button" value={step} name="steps" onClick={e => handleDelete(e)}>x</button>
              </div>
            )})
          }
        </div>
        <button type="submit">Crear Receta</button>
      </form>
      <NavLink to="/home">
        <button>Volver</button>
      </NavLink>
    </div>
  );
}

