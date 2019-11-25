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
    const user=await User.findAll({
      where:{
       id:req.user.id 
      }
    })
    const {currentLat}=req.body
    const updated=await user.updated({
      currentLat
    })
    res.json(updated)
  }catch(err){
    next(err)
  }
})

router.put('/long',async(req,res,next)=>{
  try{
    const user=await User.findAll({
      where:{
       id:req.user.id 
      }
    })
    const {currentLong}=req.body
    const updated=await user.updated({
      currentLong
    })
    res.json(updated)
  }catch(err){
    next(err)
  }
})