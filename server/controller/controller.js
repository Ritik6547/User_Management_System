var Userdb = require('../model/model');

// create and save new user
const create = async (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({msg:"content can not be empty"});
        return;
    }
    // new user
    try{
        const user = new Userdb({
            name:req.body.name,
            email:req.body.email,
            gender:req.body.gender,
            status:req.body.status
        })
        console.log(user);
        await user.save();
        res.redirect('/add-user');
    }
    catch(err){
        res.status(500).send({msg:err.msg || "some error occured"});
    }          
}

// retrive users
const find = async(req,res)=>{
    try{
        const user = await Userdb.find({});
        if(!user){
            return res.status(404).json({msg : 'user not found'});
        }
        res.status(200).send(user);
    }
    catch (err){
        res.status(500).send({msg:"some error occured"});
    }
}

// retrive single user
const single = async(req,res)=>{
    try{
        const id = req.query.id;
        // console.log(id)
        const user = await Userdb.findOne({_id:id});
        if(!user){
            return res.status(404).send({msg : "user not found"});
        }
        res.status(200).send(user);
    }
    catch(err){
        res.status(500).send({msg:"some error occured"})
    }
}

// update 
const update = async(req,res)=>{

    
    try{
        if(!req.body){
            return res.status(400).send({msg : "cannot be empty"})
        }
        const id = req.params.id;
        const user =await Userdb.findOneAndUpdate({_id:id},req.body,{new:true,runValidators:true})
        

        if(!user){
            return res.status(404).send({msg : "no user found to update"})
        }
        res.status(200).send({user});
    }
    catch(err){
        res.status(500).send({msg:"some error occured"})
    }
}

// delete
const remove = async(req,res)=>{
    try{
        const id = req.params.id;
        const deleteUser = await Userdb.findOneAndDelete({_id:id});
        if(!deleteUser){
            return res.status(400).send({msg:`No user found with id ${id}`})
        }
        const user =await Userdb.find({});
        res.send(user)  
    }
    catch(err){
        res.status(500).send({msg:"error occured"})
    }
}

module.exports = {create,find,update,remove,single};