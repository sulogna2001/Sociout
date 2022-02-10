const bcrypt = require('bcrypt');
const User=require('../models/User')
const router=require('express').Router()

// router.get('/',(req,res)=>{
//     res.send('Hey its user')
// })

// update user
router.put("/:id", async(req,res) =>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt=await bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(req.body.password,salt);
            }
            catch(err){
                return res.status(500).json(err)
            }
        }
        try{
            const user=await User.findByIdAndUpdate(req.params.id , {
                $set:req.body,
            });
            res.status(200).json("Account has been updated")
        }
        catch(err){
            return res.status(500).json(err)

        }
    }
    else{
        return res.status(403).json('ypou can upadte only your account')
    }
})
//delete user
router.delete('/:id' ,async (req,res) =>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user=await User.findByIdAndDelete(req.params.id)
            res.status(200).json('account has been deleted successsfully')
        }
        catch(err){
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json('You can delete only your accoount')
    }
})
//get a user
router.get('/',async(req,res) =>{
    const userId=req.query.userId
    const username=req.query.username
    try{
        const user=  userId ? await User.findById(userId) : await User.findOne({username:username})
        const {password,updatedAt,...other}=user._doc
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
})
//follow a user
router.put("/:id/follow" ,async(req,res) =>{
    if(req.body.userId!==req.params.id){
        try{
            const user=await User.findById(req.params.id)
            const currentUser=await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push :{followers : req.body.userId}})
                await currentUser.updateOne({$push : {followings : req.params.id}})
                res.status(200).json('user has been followed')
            }
            else{
                res.status(403).json('you already follow this user')
            }

        }
        catch(err){
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json('you cnat follow yourself')
    }
})
//unfollow a user
router.put('/:id/unfollow', async (req,res) =>{
   
    if(req.body.userId!==req.params.id)
    {
        try{
            const user=await User.findById(req.body.userId)
            const currentUser=await User.findById(req.params.id)
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({ $pull :{ followers : req.body.userId}})
                await currentUser.updateOne({ $pull :{ followings : req.params.id}})
                res.status(200).json('you successfully unfollowed')
            }
            else{
                res.status(403).json('you dont follow this user')
            }

        }
        catch(err){
            res.status(500).json('')
        }
    }
    else{
        res.status(403).json('you cant unfollow yourself')
    }
})
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
});
module.exports =router