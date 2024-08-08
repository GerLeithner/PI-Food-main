const express = require("express");
const { Diet } = require("../db");
const { diets } = require("../services/diet_services");

const router = express();
router.use(express.json());

// GET /diets:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno,
// deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá

router.post("/", async(req, res) => {
    try {
        let diet = req.body;

        let [newDiet, created] = await Diet.findOrCreate({
            where: { name: diet.name },
            default: {
                name: diet.name,
                description: diet.description
            }
        });

        created && res.status(200).send("dieta creada con exito");

    }
    catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
})


router.get("/", async(req, res) => {

    try {
        
        let dietsDb = await Diet.findAll(); // traigo de la base de datos

        if(!dietsDb.length) { // si no haabia nada, los creo con la info de la API
            dietsDb = await Diet.bulkCreate(diets); 
        }
         
        res.status(200).json(dietsDb)
    }
    catch(e) {
        res.status(400).send(e.message)
    }   
});

module.exports = router;