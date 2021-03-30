const express   = require('express')
const gameModel = require('../models/game.js')

const router = express.Router()


//
//GET all games
//
router.get('/', async (req, res) => {

    try {
        const games_list = await gameModel.find()

        res.status(200).json(games_list)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})


//
//GET one game
//
//GET by id
router.get('/:id', async (req, res) => {
    console.log(req)

    try {
        const game = await gameModel.findById(req.params.id)

        res.status(200).json(game)
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

//GET by Title
router.get('/getbytitle/:gametitle', async (req, res)=>{
    console.log(req)

    try {
        const game = await gameModel.findOne({ title : req.params.gametitle })

        res.status(200).json(game)
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})


//
//CREATE one game
//
router.post('/', async (req, res)=> {
    console.log(req.body)

    //Business Logic (BL) validations

    const game = new gameModel({
        title :         req.body.title,
        price :         req.body.price,
        description :   req.body.description,
        type :          req.body.type,
        isAvailable :   req.body.isAvailable,
        rating :        req.body.rating
    })

    try{
        const new_game = await game.save()

        console.log(new_game)

        res.status(201).json({'message': `${game.title} was pounded into the DB`})
    } catch (error) {
        console.log(error)
        res.status(400).json({message : error.message})
    }
})


//
//UPDATE one game
//
router.patch('/:id', getGame, async (req, res) => {
    //Get changes from request

    try{
        for (const [key, value] of Object.entries(req.body))
        {
            if(value != null)
                res.game[key] = value
        }


        //Save changes
        await res.game.save()
        res.status(200).json({message: 'game updated successfully'})
    }catch (error) {
        res.status(400).json({message: error.message})
    }
})

//OR

router.put('/:id', getGame, async (req, res) => {
    
    try {
        const game = await gameModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({message: 'game updated successfully'})
    }   catch (error) {
        res.status(500).json({message : error.message})
    }
})


//
//DELETE one game
//
router.delete('/:id', getGame, async (req,res)=>{
    console.log('This game is going byebye')
    try {
        await res.game.remove()
        res.status(200).json({message: 'The game rode into the sunset, never to be seen again.'})

    }catch (error) {
        res.status(500).json({message: error.message})
    }
})


//middleware
async function getGame(req, res, next){
    let game;

    try{
        //get game by id
        game = await gameModel.findById(req.params.id)
        //validate if game was found
        if(!game)
            return res.status(404).json({message: "I couldn't find that game."})

   }catch (error){
       return res.status(500).json({message: error.message})
   }

   res.game = game
   next()
}

module.exports = router