const axios = require("axios");
const { Recipe, Diet } = require("../db.js");
const API_KEY = process.env;
const { Op } = require('sequelize');

const limit = 2;
const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=f3a3570d30c54a43b6eb86e31761b485&addRecipeInformation=true&number=${limit}`;

function validatePost({ name, summary, healthScore}) {

    if(!name) throw new Error("debe ingresar un nombre");
    if(!summary) throw new Error("debe ingresar un resumen");

    var regexName = /^[a-zA-Z\s]+$/;
    if(!regexName.test(name)){
        throw new Error("Nombre invalido, no puede contener simbolos, ni numeros");
    }
    
    let regexHealthScore = /^\d+$/;
    if(!regexHealthScore.test(healthScore)) {
        throw new Error("el healthScore debe ser un numero");
    }
    if(healthScore < 0 || healthScore > 100) {
        throw new Error("el healthScore debe estar entre 0 y 100");
    }
}

async function getApiRecipes() {
    let apiData = await axios.get(apiUrl);
    return apiData.data.results.map(recipe => {
        return {
            id: recipe.id,
            name: recipe.title,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            steps: recipe.analyzedInstructions.length ? recipe.analyzedInstructions[0].steps.map(s => {
                return s.step;
            }) : ["not specified"],
            diets: recipe.diets,
            db: false
        }
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
        return {
            id: recipe.id, 
            name: recipe.name,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            diets: recipe.diets.map(diet => diet.name),
            db: true
        }
    })
}

async function getDbRecipesByName(name) {

    let dbRecipesByName = await Recipe.findAll({
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
        where: {
            name: { [Op.like]: `%${name.toLowerCase()}%` }
        }
    })
    return dbRecipesByName.map(recipe => {
        return {
            id: recipe.id, 
            name: recipe.name,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            diets: recipe.diets.map(diet => diet.name),
            db: true
        }
    })
}

async function getApiRecipesByName(name) {
    let apiRecipes = await getApiRecipes();
    return apiRecipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
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
    return {
        id: dbRecipe.id, 
        name: dbRecipe.name,
        summary: dbRecipe.summary,
        healthScore: dbRecipe.healthScore,
        steps: dbRecipe.analyzedInstructions.length ? dbRecipe.analyzedInstructions[0].steps.map(s => {
            return s.step;
        }) : ["not specified"],
        diets: dbRecipe.diets.map(diet => diet.name),
        db: true
    }
}

async function getApiRecipeById(id) {
    console.log("entre al getAPI")
    let apiData = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=f3a3570d30c54a43b6eb86e31761b485`);
    let apiRecipe = apiData.data;
    console.log(apiRecipe)
    return {
        id: apiRecipe.id,
        name: apiRecipe.title,
        summary: apiRecipe.summary,
        healthScore: apiRecipe.healthScore,
        steps: apiRecipe.analyzedInstructions.length ? apiRecipe.analyzedInstructions[0].steps.map(s => {
            return s.step;
        }) : ["not specified"], 
        diets: apiRecipe.diets,
        db: false
    }
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


