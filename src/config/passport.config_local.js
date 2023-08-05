const passport = require("passport");
const local = require("passport-local");

const userModel = require("../dao/mongodb/models/user.model");
const { createHash, isValidPassword } = require("../response");

const localStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;

        try {
          let user = await userModel.findOne({ email: username });
          if (user) return done(null, false);

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          const result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("error al obtener el resultado" + error);
        }
      }
    )
  );



passport.serializeUser((user,done)=>{
    done(null,user._id)
})
passport.deserializeUser(async (id,done)=>{
    let user = await userModel.findOne(id);
    done(null, user);
})

 passport.use('login',new localStrategy({usernameField:'email'},async (username, password,done)=>{

    try {
        const user=await userModel.findOne({email:username});
        if (!user) return done(null,false)

        if (!isValidPassword(user,password)) return done(null,false);
        return done(null,user)
    } catch (error) {
        return done(error)
    }

}))


};


module.exports = initializePassport;
 

 

/*
router.post("/register", async (req, res) => {
    try {
      const { first_name, last_name, email, age, password } = req.body;
      if (!first_name || !last_name || !email || !age || !password)
        return res.send({ status: "error", message: "Valores incompletos" });
  
      const exists = await userModel.findOne({ email });
      if (exists)
        return res.send({ status: "error", message: "Usuario ya existe." });
   
     
  
      const result = await userModel.create({
        first_name,
        last_name,
        email,
        age,
        password:createHash(password) 
      });
      res.send({ status: "succes", message: "ok", payload: result });
    } catch (error) {
      res.send({ status: "error", message: error, payload: [] });
    }
  });
  */
