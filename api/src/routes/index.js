const { Router } = require('express');
const recipeRoutes = require("./Recipe_routes");
const dietRoutes = require("./diet_routes");
const dishTypesRoutes = require("./dishTypes_routes");

const router = Router();

router.use("/recipes", recipeRoutes);
router.use("/diets", dietRoutes);
router.use("/dishTypes", dishTypesRoutes);

module.exports = router;
