const user =require('../../service/user');

// Get info of single user
const get=(req,res)=>{
    res.status(200).send(user.getOne(req.params.id))
}

// Get
const add=(req,res)=>{
    user.addUser(req.body).then((result)=>{
        res.status(200).send({ success:true, data:result, message:"User successfully added" });
    }).catch(err=>{res.status(500).send({ success:false, message:err });})
}


module.exports={get,add}