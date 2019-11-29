const router = require('express').Router();
const { Request, Run, User ,Message} = require('../db');
const { isAdmin, isUser } = require('../../utils');
const Op=require('sequelize').Op
module.exports=router

router.get('/',isUser,async(req,res,next)=>{
    try{

        const messages= await Message.findAll({
            where:{
                [Op.or]: [
                    {
                      senderId: req.user.id,
                    },
                    {
                      receiverId: req.user.id,
                    },
                  ],
            }
        })
        console.log(messages)
        res.json(messages)
    }catch(err){
        next(err)
    }
})