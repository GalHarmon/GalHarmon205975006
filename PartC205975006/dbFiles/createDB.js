const sql = require('./db');
const path = require('path');
const csv = require("csvtojson");

// users table Q1-4
const createTableUsers = (req,res)=> {
    var Q1 = "CREATE TABLE  if not exists users (email VARCHAR(255) NOT NULL PRIMARY KEY, firstName varchar(255) NOT NULL , lastName varchar(255), phoneNumber varchar(255) NOT NULL, address varchar(255) NOT NULL, secondTypePass varchar(255) default null)";
    sql.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created table');
        res.send("table created");
        return;
    })      
}
const insertUsers = (req,res)=>{
    var Q2 = "INSERT INTO users SET ?";
    const csvFilePath= path.join(__dirname, "users.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "email": element.email,
            "firstName": element.firstName,
            "lastName": element.lastName,
            "phoneNumber": element.phoneNumber,
            "address": element.address,
            "secondTypePass": element.secondTypePass   
        }
        sql.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting user", err);
            }
            console.log("created row sucssefuly - user");
        });
    });
    })
    res.send("data users read");
}; 
const showAllUsers = (req, res)=>{  
    const Q3 = "select * from users";
    sql.query(Q3, (err, mysqlres)=>{
        if (err){
            console.log("error is hereeeeeee", err);//to the cmd
            res.status(400).send({message: "error in select all users"})//give indicate to the user on client side
            return;
        };
        console.log("success in selecting all users");
        res.send(mysqlres);
        return;       
    })
}
const dropTableUsers = (req, res)=>{
    var Q4 = "DROP TABLE users";
    sql.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table users ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped (users)");
        res.send("table drpped");
        return;
    })
}

// offers Dish table Q5-8
const createOffersDish = (req,res)=> {
    var Q5 = "CREATE TABLE if not exists offersDish (userEmail VARCHAR(255), id int NOT NULL AUTO_INCREMENT PRIMARY KEY, dishName VARCHAR(255) NOT NULL, generalDis varchar(1000), foodStyle VARCHAR(255) NOT NULL check (foodStyle in ('Asian', 'Italian', 'Vagan', 'Pizza', 'Sushi', 'Sweets', 'Other')) , quantity int NOT NULL, pricePerUnit int NOT NULL, pickUpAddress VARCHAR(255) NOT NULL,expiryDate date not null,pathToPhoto varchar(10000),foreign key (userEmail) references users (email));";
    sql.query(Q5,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table OffersDish"});
            return;
        }
        console.log('created table OffersDish');
        res.send("table created OffersDish");
        return;
    })      
}
const insertOffersDish = (req,res)=>{
    var Q6 = "INSERT INTO offersDish SET ?";
    const csvFilePath= path.join(__dirname, "offersDish.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "userEmail": element.userEmail,
            "id": element.id,
            "dishName": element.dishName,
            "generalDis": element.generalDis,
            "foodStyle": element.foodStyle,
            "quantity": element.quantity,
            "pricePerUnit": element.pricePerUnit,
            "pickUpAddress": element.pickUpAddress,
            "expiryDate": element.expiryDate,
            "pathToPhoto": element.pathToPhoto

        }
        sql.query(Q6, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting offers", err);
            }
            console.log("created row sucssefuly - offers");
        });
    });
    })
    res.send("data offers read");
}; 
const showAllOffers = (req, res)=>{  
    const Q7 = "select * from offersDish";
    sql.query(Q7, (err, mysqlres)=>{
        if (err){
            console.log("error is hereeeeeee", err);//to the cmd
            res.status(400).send({message: "error in select all offersDish"})//give indicate to the user on client side
            return;
        };
        console.log("success in selecting all offersDish----------");
        res.send(mysqlres);
        return;       
    })
}
const dropTableOffersDish = (req, res)=>{
    var Q8 = "DROP TABLE offersDish";
    sql.query(Q8, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table offersDish ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped (offersDish)");
        res.send("table drpped offersDish");
        return;
    })
}

// cartsPerUser Q9-12
const createCartsPerUser = (req,res)=> {
    var Q9 = "CREATE TABLE if not exists cartsPerUser ( userEmail VARCHAR(255) NOT NULL,dishId int NOT NULL, quantityToBuy int NOT NULL, primary key (userEmail, dishId),foreign key (userEmail) references users (email),foreign key (dishId) references offersDish (id));";
    sql.query(Q9,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table cartsPerUser"});
            return;
        }
        console.log('created table cartsPerUser');
        res.send("table created cartsPerUser");
        return;
    })      
}
const insertCartsPerUser = (req,res)=>{
    var Q10 = "INSERT INTO cartsPerUser SET ?";
    const csvFilePath= path.join(__dirname, "cartsPerUser.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "userEmail": element.userEmail,
            "dishId": element.dishId,
            "quantityToBuy": element.quantityToBuy
        }
        sql.query(Q10, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting cartsPerUser", err);
            }
            console.log("created row sucssefuly - cartsPerUser");
        });
    });
    })
    res.send("data cartsPerUser read");
}; 
const showAllCartsPerUser = (req, res)=>{  
    const Q11 = "select * from cartsPerUser";
    sql.query(Q11, (err, mysqlres)=>{
        if (err){
            console.log("error is hereeeeeee cartsPerUser", err);//to the cmd
            res.status(400).send({message: "error in select all cartsPerUser"})//give indicate to the user on client side
            return;
        };
        console.log("success in selecting all cartsPerUser");
        res.send(mysqlres);
        return;       
    })
}
const dropTableCartsPerUser = (req, res)=>{
    var Q12 = "DROP TABLE cartsPerUser";
    sql.query(Q12, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table cartsPerUser ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped (cartsPerUser)");
        res.send("table drpped cartsPerUser");
        return;
    })
}

module.exports = {createTableUsers, insertUsers, showAllUsers, dropTableUsers,
                    createOffersDish, insertOffersDish, showAllOffers, dropTableOffersDish,
                    createCartsPerUser, insertCartsPerUser, showAllCartsPerUser, dropTableCartsPerUser

};