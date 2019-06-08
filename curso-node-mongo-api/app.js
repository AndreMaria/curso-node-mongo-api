const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // para poder utilizar o req.body
app.use(cookieParser());

//pacote que implementa o protocolo JSON Web Token;
const jwt = require('jsonwebtoken');
//variaveis de ambiente relaciona os arquivos.env
require('dotenv-safe').load();

const MongoClient = require('mongodb').MongoClient;
const routePoke = require('./app/routes/routes-pokemon');
const routeLogin = require('./app/routes/routes-login');

//exemplo : https://blog.fullstacktraining.com/sharing-a-mongodb-connection-in-node-js-express/
MongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true}).then(client =>{
    dbClient = client;
    //The app.locals object has properties that are local variables within the application.
    app.locals.collection = client.db('pokemon').collection('pokemons');
    app.listen(3000,(req,res)=>{
        console.log(`Start Project`);
    });
    //The app.locals object has properties that are local variables within the application.
    app.locals.jwt = jwt;
    routeLogin(app);
    routePoke(app);
}).catch(err=>{
    console.log(`[error]:${new Date()} : ${err}`);
});

//We can verify that a new connection is made by starting up the API and making a request against both of the endpoints 
//and take a look at the number of active connections in MongoDB (via its CLI):
//db.serverStatus().connections;

process.on('SIGINT', () => {
    dbClient.close();
    process.exit();
});