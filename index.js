const express = require("express");
const session = require("express-session");
const env = require("dotenv");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");

var corsOptions = {
  origin: "http://localhost:4200"
};

global.basename =path.resolve(__dirname);

class App{

    constructor(){
        this.app=express();
        this.envSetup();
        this.connectToDB().then(db => {
        console.log(`db connected`)
        this.config();
        })
        .catch((err) => {
        console.error(`Error while starting db ${err}`);
    });
       
    }

    connectToDB() {
      const connectionOptions = {  useNewUrlParser: true, useUnifiedTopology: true };
      return mongoose.connect(process.env.MONGOURL || '', connectionOptions);
  }

    envSetup(){

        // Set Process
        let envFilePath = path.join(basename, './config/production.env');
        
        //Set logger
        var log4js = require('log4js');
        log4js.configure(path.join(basename,'./config/log4js.json'));
        global.logger = log4js.getLogger("app");
        logger.level = ("DEBUG");
            if (fs.existsSync(envFilePath)) {
                    env.config({ path: envFilePath });
                } else {
                    logger.error('Killing Process as Env files are missing:', envFilePath);
                    console.error('Killing Process as Env files are missing:', envFilePath);
                    process.exit(1);
                }

      }

      config(){
        this.app.set('trust proxy', 1);
        this.app.disable('x-powered-by')
        this.app.use(session(
            {secret: 'userDemo',
            saveUninitialized: true,
            resave: true, 
            cookie: { maxAge: 1800*1000 }
        }));
          this.app.use(express.json())
          this.app.use(cors(corsOptions));
          this.app.set("view options", {layout: false});
          this.app.use(express.static(__dirname + '/public/'));
          this.app.get('/', function(req, res){
            res.render('/public/index.html');
            });
          this.app.use('/api',require('./router'));
          this.app.get('/**', (req, res) => {
            res.status(404);
          });
      }

      shutdown(){
          logger.info('Application is shutsdown');
      }
}

const application=new App();

let PORT=process.env.PORT || 8081;
application.connect=application.app.listen(PORT, () => {
    console.log('Application is up and running on :' + PORT);
    logger.info('Application is up and running on :' + PORT);
});



process.once('SIGTERM', () => {
    logger.info('Received SIGTERM');
    application.shutdown();
  });
  
process.once('SIGINT', () => {
    logger.info('Received SIGINT');
    application.shutdown();
  });
  
process.once('uncaughtException', err => {
    logger.info('Uncaught exception');
    console.error(err);
    application.shutdown(err);
});
  