
const fetch = require("node-fetch");
const { Recipe, Diet } = require("../db.js");
const { API_KEY }= process.env;

const limit = 5;
const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${limit}`;


function validatePost({ name, summary, healthScore}) {

    if(!name) throw new Error("debe ingresar un nombre");
    if(!summary) throw new Error("debe ingresar un resumen");

    var regexName = /^[a-zA-Z\s]+$/;
    if(!regexName.test(name)){
        throw new Error("Nombre invalido, no puede contener simbolos, ni numeros");
    }
    
    let regexHealthScore = /^\d+$/;
    if(healthScore === "") healthScore = null;
    if(healthScore && !regexHealthScore.test(healthScore)) {
        throw new Error("el healthScore debe ser un numero");
    }
    if(healthScore < 0 || healthScore > 100) {
        throw new Error("el healthScore debe estar entre 0 y 100");
    }
}

function dataNormalizer(recipe, status) {
    if(status === "db"){
        return {
            id: recipe.id, 
            name: recipe.name,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            steps: recipe.steps.length ? recipe.steps : ["not specified"],
            dishTypes: recipe.dishTypes.length ? recipe.dishTypes : ["not specified"],
            diets: recipe.diets.length ? recipe.diets.map(diet => diet.name) : ["not specified"],
            image: recipe.image,
            status: "db"
        }
    }
    else{
        return {
            id: recipe.id,
            name: recipe.title,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            steps: recipe.analyzedInstructions?.length ? recipe.analyzedInstructions[0].steps.map(s => {
                return s.step;
            }) : ["not specified"],
            dishTypes: recipe.dishTypes.length ? recipe.dishTypes : ["not specified"],
            diets: recipe.diets.length ? recipe.diets : ["not specified"],
            image: recipe.image,
            status: "api"
        }
    }
}

async function getApiRecipes() {

    let apiFetch = await fetch(apiUrl);
    let data = await apiFetch.json();

    return data.results.map(recipe => {
        return dataNormalizer(recipe, "api")
    });
} 

async function getDbRecipes() {
    let dbRecipes = await Recipe.findAll({
        include: [
            {
              model: Diet,
              attributes: ["name"],
              through: {
                raw: true,
                attributes: [],
              },
            },
        ]
    }); // Ajustamos el resultado del findAll para que coincida con la API y facilitar la lectura
    return dbRecipes.map(recipe => {
        return dataNormalizer(recipe, "db");
    })
}

async function getApiRecipesByName(name) {
    let apiRecipes = await getApiRecipes();
    return apiRecipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
}

async function getDbRecipesByName(name) {
    let dbRecipes = await getDbRecipes();
    return dbRecipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
}

async function getApiRecipeById(id) {
    console.log("entre al getAPI")
    let apiFetch = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    let data = await apiFetch.json();
    console.log(data)
    return dataNormalizer(data, "api");
}

async function getDbRecipeById(id) {
    let dbRecipe = await Recipe.findByPk(id, {
        include: [
            {
              model: Diet,
              attributes: ["name"],
              through: {
                raw: true,
                attributes: [],
              },
            },
        ],
    }); 
    return dataNormalizer(dbRecipe, "db");
}

module.exports = {
    validatePost,
    getApiRecipes,
    getDbRecipes,
    getDbRecipesByName,
    getApiRecipesByName,
    getDbRecipeById,
    getApiRecipeById,
};


