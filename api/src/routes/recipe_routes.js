const express = require("express");
const { Recipe, Diet } = require("../db");
const { 
    validatePost,
    getApiRecipes,
    getDbRecipes,
    getDbRecipesByName,
    getApiRecipesByName,
} = require("../services/recipes_services");

const router = express();
router.use(express.json());

router.post("/", async(req, res) => {

    try {
        let { name, summary, healthScore, steps, diets } = req.body; // diet es un array de IDs de dietas

        validatePost(req.body);

        let newRecipe = await Recipe.create({
            name: name,
            summary: summary,
            healthScore,
            steps
        });
        
        diets && await newRecipe.setDiets(diets);

        res.status(200).send("Receta creada correctamente"); // agregar el get con las diets
    }
    catch(e) {
        console.log(e)
        res.status(400).send(e.message);
    }
});

router.get("/", async(req,res) => {
    try{
        let { name } = req.query;
        let recipes;
        if(!name) {
            let apiRecipes = await getApiRecipes();
            let dbRecipes = await getDbRecipes();
            if(apiRecipes.length && dbRecipes.length) {
                recipes = [...apiRecipes, ...dbRecipes]
            }
            else if(!apiRecipes.length) recipes = dbRecipes;
            else recipes = apiRecipes;

            res.status(200).json(recipes);
        }
        else {
            let apiRecipesByName = await getApiRecipesByName(name);
            let dbRecipesByName = await getDbRecipesByName(name);
            if(apiRecipesByName.length && dbRecipesByName.length) {
                recipes = [...apiRecipesByName, ...dbRecipesByName]
            }
            else if(!apiRecipesByName.length && !dbRecipesByName.length) {
                throw new Error("No se ha encontrado coincidencia");
            }
            else if(!apiRecipesByName.length && dbRecipesByName.length)
                recipes = dbRecipesByName;
            else recipes = apiRecipesByName;
            
            res.status(200).json(recipes);
        }
    }
    catch(e) {
        console.log(e);
        res.status(400).send(e.message);
    }
})


module.exports = router;

// {
    // "name": "receta 1",
    // "summary": "resumen de receta",
    // "healthScore": 75,
    // "steps": ["paso 1", "paso 2"],
    // "diet": [1, 2]
// }