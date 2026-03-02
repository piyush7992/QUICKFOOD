const express = require('express');
const router = express.Router();

router.post('/displayData', (req, res) => {
    try {
        console.log("global.fooditems")
        res.send([global.food_items, global.food_catagory]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;