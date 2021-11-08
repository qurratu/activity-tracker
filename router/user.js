const express=require('express');
const routes= express.Router();
const user=require('../controller/user');
const auth=require('../controller/login/auth')

routes.route('/user').post(auth,user.add);

module.exports=routes;