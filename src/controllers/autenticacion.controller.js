 const AutenticacionService = require("../services/autenticacion.service");
 const { ApiResponse } = require("../response");
 

class autenticacionController {
  constructor() {
 
      this.authService=new AutenticacionService();
  }

  login = async (user) => {
  
    let response = await this.authService.login(user.email, user.password);
    
    return response ;

    // if (response.status=="ERROR")
    // return new ApiResponse("ERROR", "Usuario no auntenticado.", null).response();
 
    //let userlogin=response.payload;
/*
   let  userlogin = {
    first_name: user.first_name,
    last_name: user.last_name,
    age: user.age,
    email: user.email,
    rol :user.rol
  };*/
 
 /*
  if (userlogin.email= "adminCoder@coder.com")
 userlogin.rol ="admin"
*/

//return new ApiResponse("OK", "logueado", userlogin).response();

 
  };

  
  loginrecover = async (email , password) => {
    if (!email || !password)
    return new ApiResponse("ERROR", "Valores incompletos", null).response();
 

    let response =await this.authService.loginrecover(email , password);
    return response;

    

  }


  jwtlogin = async (email, password) => {
    if (!email || !password)
      return new ApiResponse("ERROR", "Valores incompletos.", null).response();

    let result = await this.authService.jwtlogin(email, password);
    return result;
  };

  jwtlogincookie = async (email, password) => {
    if (!email || !password)
      return new ApiResponse("ERROR", "Valores incompletos.", null).response();

    let result = await this.authService.jwtlogincookie(email, password);
    return result;
  };


  
}

module.exports = autenticacionController;
