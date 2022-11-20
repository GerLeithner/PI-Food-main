const express = require("express");
const { dishTypes } = require("../services/dishTypes_services");

const router = express();
router.use(express.json());

router.get("/", async(req, res) => {

    try {
        res.status(200).json(dishTypes)
    }
    catch(e) {
        res.status(400).send(e.message)
    }   
});

module.exports = router;