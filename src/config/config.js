const dotenv=require("dotenv")

dotenv.config();


let config ={
    persistencia:process.env.PERSISTENCIA 
}
 

module.exports = {config};

