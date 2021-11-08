const user=require('../../models/user')
const md5 =require('crypto-js/md5');

class User{


    // Get Specific User
    async getUser(id,by){

        return new Promise((resolve,reject)=>{
        let query={email:id.toLowerCase()};
        if(by){
           query.password= md5(by.password).toString()
        }
      
        user.findOne(query).exec((err, user) => {
          if (!err && user && user.id) {
              resolve(user.toJSON());
          }
          else {
            reject({message:"Invalid email or password"});
          }
      });
       
    })
  }

    // Add User
    async addUser(data){
    return new Promise(async(resolve,reject)=>{
        if (await user.findOne({ email: data.email })) {
          reject({message:`Email ${data.email} is already taken`});
          return;
      }

        data.password=md5(data.password).toString();
        
        let userData = new user(data);
        userData.save((err, savedUser) => {
            if (err) {
                reject('Error while saving user');
            }
            else {
                savedUser = savedUser.toJSON();
                resolve({
                    message: 'User Successfully Saved',
                    email: savedUser.email
                });
            }
        });
      

    });
}

}
module.exports=new User();