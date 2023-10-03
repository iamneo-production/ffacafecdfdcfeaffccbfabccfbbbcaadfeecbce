const express=require('express');
const menuModel = require('../models/menu');

//adding a menu item
const addMenuItem= async (req,res,next)=>{
    try{
        let{name,category,subCategory,description,imgPath,status,price}=req.body
        if(name && category && status && price){
        await menuModel.insertMany([{
            name,
            category,
            subCategory,
            description,
            imgPath,
            status,
            price
        }])
        res.json({
            error:false,
            message:"menu item has been added successfully",
            data:null
        })
    }
    else{
        res.status(400).json({
            error:true,
            message:"please eneter proper menu detail",           
            data:null
        })
    }
    }catch(err){
        next(err)
    }
}

//editing a menu item
const editMenuItem= async (req,res,next)=>{
    try{
        let {name,category,subCategory,description,imgPath,status,price}= req.body;
        let {_id} = req.params;

        if(name && category && status && price){

        const menuItem= await menuModel.findOne({_id}).lean();
        if(menuItem){
        await menuModel.updateOne(
            {_id},{
                $set:{
                    name,
                    category,
                    subCategory,
                    description,
                    imgPath,
                    status,
                    price
                }
            }
        )
        }
        else{
            res.json({
                error:false,
                message:"menu item not found ",
            })
        }
        res.json(
            {
                error:false,
                message:"menu item has been updated successfully",
                data:null
            }
        )
        }
        else{
            res.status(400).json(
                {
                    error:false,
                    message:"menu item has been updated successfully",
                    data:null
                }
            )

        }
    }catch(err){
        next(err)
    }
}

//getting all menu items
const getAllMenuItems= async (req,res,next)=>{
    try{
       const menuItems= await menuModel.find().lean();
       res.json({
           error:false,
           message:"all menu items",
           data:menuItems
       })
    }catch(err){
        next(err)
    }
}

module.exports = {
    addMenuItem,
    editMenuItem,
    getAllMenuItems
}