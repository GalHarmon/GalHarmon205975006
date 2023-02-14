const mySQL = require('mysql2'); 
const DBconfig = require('./db.config');

//create connection
const connection = mySQL.createConnection({
    host: DBconfig.HOST,
    user: DBconfig.USER,
    password: DBconfig.PASSWORD,
    database: DBconfig.DB
});

//connect using the connection 
connection.connect(error =>{
    if (error){
        console.log("problem with connect to DB");
        throw error
    }
    console.log("connection to DB!!!!!!!!!!");
});

//export the connection
module.exports = connection;