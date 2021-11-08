const User = require('../user')
const jwt = require('jsonwebtoken')

class Login {
    async authenticate (data,req){
        return new Promise((resolve,reject)=>{
            User.getUser(data.email,data).then((response)=>{

                let user = response.data;
                    if(response.status && user.role && (user.role=='Admin')){
                        delete response.data.password;
                        let session={id:user.id,email:user.email,name:user.name};
                        const token = jwt.sign(session, 'userDemo', { 'expiresIn': 1800});
                        resolve({status:true,token:token,message:"Successfully login."});
                    }else if(response.status && user.role && (user.role=='User')){
                        resolve({status:false,message:"Only admin allowed to login."});
                    }

            }).catch(err=>{console.log(err);reject({status:false,message:"Invalid User or Password."});})
        });
    }
}

module.exports=new Login();