const express = require("express");
const { Recipe, Diet } = require("../db");
const { 
    validatePost,
    getApiRecipes,
    getDbRecipes,
    getDbRecipesByName,
    getApiRecipesByName,
    getDbRecipeById,
    getApiRecipeById,
} = require("../services/recipes_services");
const { getDietId } = require("../services/diet_services");

const router = express();
router.use(express.json());


router.post("/", async(req, res) => {

    try {

        validatePost(req.body);

        let { name, summary, healthScore, steps, dishTypes, image, diets} = req.body;

        let newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            dishTypes,
            image,
        });
        
        if(diets.length) {
            let idDiets = await Promise.all(diets.map(diet => getDietId(diet)));
            idDiets && await newRecipe.setDiets(idDiets);
        }

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
        //     if(apiRecipesByName && dbRecipesByName.length) {
        //         recipes = [...apiRecipesByName, ...dbRecipesByName]
        //     }
        //     else if(!apiRecipesByName && !dbRecipesByName.length) {
        //         throw new Error("No se ha encontrado coincidencia");
        //     }
        //     else if(!apiRecipesByName && dbRecipesByName.length)
        //         recipes = dbRecipesByName;
        //     else recipes = apiRecipesByName;
            
        //     res.status(200).json(recipes);
        // }
    }
    catch(e) {
        console.log(e);
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

router.delete("/:id", async(req, res) => {
    const regexId = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
    let { id } = req.params;

    try {
        if(!regexId.test(id)) throw new Error("Id invalido");

        let recipe = await Recipe.findByPk(id);
        if(recipe) {
            await recipe.destroy();
            res.status(200).send("Receta eliminada correctamente");
        }
        else throw new Error("la id no pertenece a una receta guardada");
    }
    catch(e) {
        console.log(e);
        res.status(400).send(e.message);
    }
});

router.put("/:id", async(req, res) => {
    const regexId = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
    
    let { id } = req.params;
    let { name, summary, healthScore, steps, dishTypes, image, diets} = req.body;

    try {
        if(!regexId.test(id)) throw new Error("Id invalido");
        validatePost(req.body);

        let recipe = await Recipe.findByPk(id, {
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

        if(recipe) {
            await recipe.update({
                name, 
                summary, 
                healthScore, 
                steps, 
                dishTypes, 
                image, 
            });

            if(diets.length) {
                let idDiets = await Promise.all(diets.map(diet => getDietId(diet)));
                idDiets && await recipe.setDiets(idDiets);
            }
            // else {
            //     recipe.update({
            //         diets: []
            //     })
            // }

            res.status(200).send("Receta actualizada correctamente");
        }
        else throw new Error("la id no pertenece a una receta guardada");
    }
    catch(e) {
        console.log(e);
        res.status(400).send(e.message);
    }   
})
    


module.exports = router;

// api id 716426
// db id da180ddb-a83a-4dda-9edb-998867648199

// {
//     "name": "receta 1",
//     "summary": "resumen de receta",
//     "healthScore": 75,
//     "steps": ["paso 1", "paso 2"],
//     "dishTypes": ["default"],
//     "diet": [1, 2],
//     "image": "imgUrl"
// }