const { Router } = require('express');
const recipeRoutes = require("./Recipe_routes");
const dietRoutes = require("./diet_routes");


const router = Router();

router.use("/recipes", recipeRoutes);
router.use("/diets", dietRoutes);

module.exports = router;
