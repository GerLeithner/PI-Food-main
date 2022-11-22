const express = require("express");
const { Recipe } = require("../db");
const { 
    validatePost,
    getApiRecipes,
    getDbRecipes,
    getDbRecipesByName,
    getApiRecipesByName,
    getDbRecipeById,
    getApiRecipeById,
} = require("../services/recipes_services");

const router = express();
router.use(express.json());

router.post("/", async(req, res) => {

    try {
        let { name, summary, healthScore, steps, dishTypes, image, diets } = req.body; // diet es un array de IDs de dietas

        validatePost(req.body);

        let newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            dishTypes,
            image,
        });
        
        diets && await newRecipe.setDiets(diets);

        res.status(200).send("receta creada correctamente"); 
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
        // ESTO ESTÁ PARA NO AGOTAR LOS INTENTOS DE LA API
        if(!name) {
            recipes = await getDbRecipes(); 
            res.status(200).json(recipes);
        }
        // ESTE ES EL CODIGO REAL!
        // if(!name) {
        //     let apiRecipes = await getApiRecipes();
        //     let dbRecipes = await getDbRecipes();
        //     if(apiRecipes.length && dbRecipes.length) {
        //         recipes = [...apiRecipes, ...dbRecipes]
        //     }
        //     else if(!apiRecipes.length) recipes = dbRecipes;
        //     else recipes = apiRecipes;  
        //     res.status(200).json(recipes); 
        // }

        // ESTO ESTÁ PARA NO AGOTAR LOS INTENTOS DE LA API
        else {
            recipes = await getDbRecipesByName(name);
            if(!recipes.length) throw new Error("No se ha encontrado coincidencia");
            res.status(200).json(recipes);
        }
        // ESTE ES EL CODIGO REAL
        // else {
        //     let apiRecipesByName = await getApiRecipesByName(name);
        //     let dbRecipesByName = await getDbRecipesByName(name);
        //     if(apiRecipesByName.length && dbRecipesByName.length) {
        //         recipes = [...apiRecipesByName, ...dbRecipesByName]
        //     }
        //     else if(!apiRecipesByName.length && !dbRecipesByName.length) {
        //         throw new Error("No se ha encontrado coincidencia");
        //     }
        //     else if(!apiRecipesByName.length && dbRecipesByName.length)
        //         recipes = dbRecipesByName;
        //     else recipes = apiRecipesByName;
            
        //     res.status(200).json(recipes);
        // }
    }
    catch(e) {
        res.status(400).send(e.message);
    }
})

router.get("/:id", async(req, res) => {
    const regexId = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
    let { id } = req.params;
    let recipe;

    try {
        if(regexId.test(id)){
            recipe = await getDbRecipeById(id);
            if(!recipe) throw new Error("No se ha encontrado la receta");
        }
        else {
            recipe = await getApiRecipeById(id);
            if(!recipe) throw new Error("No se ha encontrado la receta");
        }

        res.status(200).json(recipe)  
    }
    catch(e) {
        console.log(e)
        res.status(400).send(e.message);
    }  
});
    


module.exports = router;

// {
//     "name": "receta 1",
//     "summary": "resumen de receta",
//     "healthScore": 75,
//     "steps": ["paso 1", "paso 2"],
//     "dishTypes": ["default"],
//     "diet": [1, 2],
//     "image": "imgUrl"
// }