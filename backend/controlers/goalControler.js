const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

const getGoals = asyncHandler(async (req, res)=>{
    // w goals mamy wszyskie goale z naszej bazy danych
    const goals = await Goal.find({})
    res.status(200).json(goals)
    // res.status(200).json({message: 'connected'})
})
const setGoals = asyncHandler(async (req, res)=>{
    if(!req.body.text) { 
        res.status(400)
        throw new Error('please add a textfield')
    }
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
    // res.status(200).json({message: 'created'})
    // console.log(req.body)
    
})
const updateGoals = asyncHandler(async (req, res)=>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('goal notfound')
    }
    // tworzymy zupdejtowany goal
    // https://mongoosejs.com/docs/api/model.html#model_Model-findByIdAndUpdate
    // [options.new=false] «Boolean» if true, return the modified document rather than the original
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal)
    // res.status(200).json({message: `updated ${req.params.id}`})
})
const deleteGoals = asyncHandler(async (req, res)=>{
    const goal = await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
    // res.status(200).json({message: `deleted ${req.params.id}`})
})
module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}