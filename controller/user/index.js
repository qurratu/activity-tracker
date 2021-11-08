const user =require('../../service/user');

// Get info of single user
const get=(req,res)=>{
    res.status(200).send(user.getOne(req.params.id))
}

// Get
const add=(req,res)=>{
    user.addUser(req.body).then((result)=>{
        res.status(200).send(result);
    }).catch(err=>{res.status(500).send(err);})
}


module.exports={get,add}