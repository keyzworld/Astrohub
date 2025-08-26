import express from "express";
import GameCategory from "../models/gameCategory.js";

export const getGameCategories = async (req,res)=>{
    const gameCategories = await GameCategory.find()
    return res.status(201).json(gameCategories)
}

export const createGameCategory = async (req,res)=>{
    const {name} = req.body
    const existGameCategory = await GameCategory.findOne({name})
    if(existGameCategory){
        return res.status(401).json({success:false,message:'category already exists'})
    }
    const gameCategory = new GameCategory(req.body)
    await gameCategory.save()
    return res.status(201).json(gameCategory)
}

export const getGameCategoryById = async (req,res)=>{
    const catId = req.params.id
    const category = await GameCategory.findById(catId)
    if(!category){
        res.status(401).json({success:false,message:'Category not found'})
    }
    return res.status(201).json(category)
}

export const updateGameCategory = async (req,res)=>{
    const catId = req.params.id
    const {name, image} = req.body
    const category = await GameCategory.findByIdAndUpdate(catId,{name,image})
    await category.save()
    if(!category){
        res.status(401).json({success:false,message:'Category not found'})
    }
    return res.status(201).json(category)
}

export const deleteGameCategory = async (req,res)=>{
    const catId = req.params.id
    const {name, image} = req.body
    const category = await GameCategory.findByIdAndDelete(catId,{name,image})
    if(!category){
        res.status(401).json({success:false,message:'Category not found'})
    }
    return res.status(201).json({success:true,message:'Category deleted successfully'})
}

