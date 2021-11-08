const jwt = require('jsonwebtoken');

const auth=async(req,res,next)=>{

   let sess=req.session
    try{

        let authToken=req.header('Authorization').replace('Bearer ','');
        if(sess.token){
            if(sess.token==authToken){
                jwt.verify(authToken,"userDemo");
                next();
            }else{
                // Reauthorize and validate token from db.
            }
        }else{
            res.status(401).send({status:false,message:"Please login again."})
        }
        
    }catch(e){
       logger.error(e)
    }

};

module.exports=auth