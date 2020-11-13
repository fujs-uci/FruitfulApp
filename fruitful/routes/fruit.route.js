const express = require('express');
const router = express.Router();  // router to be exported
const Fruit = require('../models/Fruit.model');

// get all Fruits
router.get('/', async (req, res) => {
    try {
        const fruits = await Fruit.find();
        res.header("Content-Type",'application/json');
        res.type('json').send(
            JSON.stringify(
                fruits,
                null,
                4
            )
        );
    } catch (err) {
        res.json({message: err});
    }
 });

 // get a specic Fruit
router.get('/:fruitName', async (req, res) => {
    try {
        const fruit = await Fruit.find(
            {name: {$regex: req.params.fruitName.toLocaleLowerCase()}}
        );

        if (fruit.length) {
            res.json(fruit)
        } else {
            res.json(
                {error: `No fruits found matching '${req.params.fruitName}'.`}
            )
        }
    } catch (err) {
        res.json({message: err});
    }
});

// add Fruit to database
router.post('/', async (req, res) => {
    console.log(req.body);
    const fruit = new Fruit({
        name: req.body.name,
        weight: req.body.weight,
        image: req.body.image
    });

    try{
        const savedFruit = await fruit.save();
        res.json(savedFruit);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;