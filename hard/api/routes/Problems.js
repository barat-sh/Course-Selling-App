const express = require("express")
const router = express.Router()

// importing database  -> problems
const {Problems:Problems,sequelize} = require("../models")

router.get("/",async (req,res)=>{
    const listofProblems = await Problems.findAll();
    res.json(listofProblems)
})

router.post("/add",async(req,res)=>{
    const newProblem = req.body;
    const alreadyExists = await Problems.findOne({where:{title:newProblem.title}});
    if (!alreadyExists){
        try{
            await Problems.create({
                title:newProblem.title,
                difficulty:newProblem.difficulty,
                link:newProblem.link
            })
            res.status(200).json({message:"Problem added...:)"})
        }catch(error){
            res.status(404).json({message:"something went wrong...!"})
        }
        
    }
})

module.exports = router