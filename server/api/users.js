const router = require('express').Router();
const { User } = require('../db');
const { isAdmin, isUser } = require('../../utils');
module.exports = router;

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put('/lat',async(req,res,next)=>{
  try{
    const user=await User.findOne({
      where:{
       id:req.user.id 
      }
    })
     const {currentLat}=req.body
    const updated=await user.update({
      currentLat:currentLat
    })
    res.json(updated)
  }catch(err){
    next(err)
  }
})

router.put('/long',async(req,res,next)=>{
  try{
    const user=await User.findOne({
      where:{
       id:req.user.id 
      }
    })
     const {currentLong}=req.body
    const updated=await user.update({
      currentLong:currentLong
    })
    console.log('req.body',req.body)
    res.json(updated)
  }catch(err){
    next(err)
  }
})