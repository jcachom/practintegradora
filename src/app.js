 

const { config } = require("./config/config");

 

const PUERTO = 8080 || config.PORT

const ConnectionMongo = require(".//connection/connectionMongo");
 

const express = require("express");

const session = require("express-session");
// des const sessionFileStore = require("session-file-store");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const handlebars = require("express-handlebars");

 const initializePassportGitHub = require("./passport/github.passport");
 const initializePassportJWT = require("./passport/jwt.passport");
 const initializePassportLocal = require("./passport/local.passport");

const { Server } = require("socket.io");
let { ___dirname } = require("./util");
const path = require("path");

const {addLogger} = require("./utils/logger")


const MONGO_ATLAS_URI =config.MONGO_ATLAS_URI

const app = express();

 
//app.use(addLogger)

app.engine("handlebars", handlebars.engine({ defaultLayout: "index" }));
app.set("views", path.join(__dirname, "views", "hbs"));
app.set("view engine", "handlebars");

app.use(express.static(___dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const  connectionMongoInstance=ConnectionMongo.getInstance();

 
const usersRouter = require("./routers/users.router");
const productsRouter = require("./routers/products.router");
const coursesRouter = require("./routers/courses.router");
 

const cartsRouter = require("./routers/carts.router");
const chatRouter = require("./routers/chat.router");
const viewsRouter = require("./routers/views.router");
const sessionRouter = require("./routers/session.router");
const notificacionRouter = require("./routers/notificacion.router");

 const testRouter =require("./routers/test.router.js")

 const cookiesRouter = require("./routers/cookies.router");
 const sessioncustomRouter = require("./routers/sessioncustom.router");
 const sessionLocalPassportRouter = require("./routers/localpassport.router");
 const sessionjsonwebtoken = require("./routers/jsonwebtoken.router");

//const sessionfilestore = sessionFileStore(session);

app.use(cookieParser("codesecretl"));

 initializePassportJWT();
 initializePassportGitHub();
 initializePassportLocal();
 
 app.use(passport.initialize());

const httpServer = app.listen(PUERTO, () => {
  console.log(`Servidor arriba:http://localhost:${PUERTO}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("Nuevo Cliente conectado");
});

app.use((req, res, next) => {
  req.socketServer = socketServer;
  next();
});


app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/chat", chatRouter);
app.use("/", viewsRouter);

app.use("/api/test/", testRouter);


app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_ATLAS_URI,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 15,
    }),
    secret: "misecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api/sessions", sessionRouter);
app.use("/api/notificacion", notificacionRouter);



//app.use("/api/cookies", cookiesRouter);
//app.use("/api/sessionscustom", sessioncustomRouter);
//app.use("/api/sessionslocalpassport", sessionLocalPassportRouter);
// app.use("/api/jwt", sessionjsonwebtoken);
 

/*

login: http://localhost:8080/login

Vista de productos : http://localhost:8080/
Vista realTime Productos : http://localhost:8080/realtimeproducts
Vista chat : http://localhost:8080/messagechat
Vista productos paginado : http://localhost:8080/products
Vista productos por Cart: http://localhost:8080/carts/1



 


GET:
http://localhost:8080/api/products
http://localhost:8080/api/products/?limit=3
http://localhost:8080/api/products/14

POST:
http://localhost:8080/api/products
{
    "code": "abc200",
    "title": "producto prueba",
     "categoria":"casaca",
    "description": "Este es un producto prueba",
    "price": 200,
    "status": true,
    "stock": 250,
    "thumbnail": [
      "url1",
      "url2"
    ]
  }

PUT:
  http://localhost:8080/api/products/7
  {
    "code": "abc104",
    "title": "produc modif jc-tab.oi-uirddd",
     "categoría" : "casaca",
    "description": "Este es un producto pruebas",
    "price": 200,
    "status": true,
    "stock": 250,
    "thumbnail": [
      "url1",
      "url2"
    ]
  }
DELETE:
  http://localhost:8080/api/products/20


POST:
  http://localhost:8080/api/carts
GET :
  http://localhost:8080/api/carts
  GET:
  http://localhost:8080/api/carts/1
  POST:
  http://localhost:8080/api/carts/1/product/8
 DELETE:
  http://localhost:8080/api/carts/2
*/
