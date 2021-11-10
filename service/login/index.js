const User = require('../user')
const jwt = require('jsonwebtoken')

class Login {
    async authenticate (data,req){
        return new Promise((resolve,reject)=>{
            User.getUser(data.email,data).then((response)=>{

                let user = response;
                    if(response && user.role){
                        delete response.password;
                        let session=response;
                        const token = jwt.sign(session, 'userDemo', { 'expiresIn': 1800});
                        resolve({success:true,token:token,message:"Successfully login."});
                    }else if(response.status && user.role && (user.role=='User')){
                        resolve({success:false,message:"Only admin allowed to login."});
                    }

            }).catch(err=>{logger.error(err);reject({success:false,message:"Invalid User or Password."});})
        });
    }
}

module.exports=new Login();