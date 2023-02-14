const Connection = require('mysql/lib/Connection');
const connection = require('./db');
const sql = require('./db');

//all the functions that include queries
const insertNewUser = (req, res)=>{
    //validation
    if(!req.body){
        res.status(400).send({
            message:"Content can't be empty!!!"
        });
        return;
    }
    //insert input data from body
    const newUser = {
        "email": req.body.email,//the first var in the name of the column in the DB
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "phoneNumber": req.body.phoneNumber,
        "address": req.body.address,
        "secondTypePass": req.body.secondTypePass
    }
    const firtTypePass = req.body.firtTypePass
    console.log(newUser)
    res.cookie("email", req.body.email);
    //run query
    const goodFormat = req.body.goodFormat
    console.log(goodFormat)
    if (firtTypePass == newUser.secondTypePass){
        console.log('firtTypePass == newUser.secondTypePass')
        const Q1 = 'INSERT INTO users SET ?';
        sql.query(Q1, newUser, (err, mysqlres)=>{
            //console.log(mysqlres.length)
            if (err){
                console.log("error is hereeeeeee after insert new user", err);//to the cmd
                //res.status(400).send({error: "error in registration please try again"})//give indicate to the user on client side
                res.json({error : "Sorry, email is already exsits, please try again!"})
                return;
            }
            //res.json({message : "Welcome you create your user successfully!"});
            const selectAllProduct = "select * from offersDish where quantity>0";
            sql.query(selectAllProduct, (err, mysqlres)=>{
                if (err){
                    console.log("error is hereeeeeee", err);//to the cmd
                    res.status(400).send({message: "error in select all offersDish"})//give indicate to the user on client side
                    return;
                };
                console.log("success in selecting all offersDish in new user");
                res.json({message : "Welcome to our platform!!!"})
                return;      
            })
        });
    }
    else{
        res.render('create_new.pug');
        return; 
    }
};  

const insertNewOffer = (req, res)=>{
    //validation
    if(!req.body){
        res.status(400).send({
            message:"Content can't be emapty!!!"
        });
        return;
    }
    //insert input data from body
    const newOffer = {
        "userEmail": req.cookies.email,
        "dishName": req.body.dishName,//the first var in the name of the column in the DB
        "generalDis": req.body.generalDis,
        "foodStyle": req.body.foodStyle,
        "quantity": req.body.quantity,
        "pricePerUnit": req.body.pricePerUnit,
        "pickUpAddress": req.body.pickUpAddress,
        "expiryDate": req.body.expiryDate,
        "pathToPhoto": req.body.pathToPhoto
    }
    console.log(newOffer);
    //run query
    
    console.log(req.body.ifDateGood)
    if (req.body.ifDateGood){
        const Q2 = 'INSERT INTO offersDish SET ?';
    sql.query(Q2, newOffer, (err, mysqlres)=>{
        if (err){
            console.log("error is hereeeeeee", err);//to the cmd
            res.status(400).send({message: "error in newOffer"})//give indicate to the user on client side
            return;
        }
        console.log("create the newOffer: "+ mysqlres);
        res.json({message : "You create a new offer!!!!!"});
        return;
    });
    }
    else{
        //res.json({message : "The expiry date must be BIGGER or EQUAL to today date"});
        res.render('sale_your_dish.pug');
        return;
    }
    
};

const userLogIn = (req, res)=>{
    if (!req.body) {
        console.log("error in getting all user " + err);
        res.status(400).send({message:"error in getting all user " + err})
        return;      
    }
    const userDetail = {
        "email" : req.body.email,
        "secondTypePass" : req.body.pass
    }
    res.cookie("email", req.body.email);
    console.log(userDetail);
    const Q3 = 'select * from users where email = ? and secondTypePass = ?';
    connection.query(Q3, [userDetail.email, userDetail.secondTypePass], (err, mysqlres) =>{
        if (err){
            console.log("error is hereeeeeee", err);//to the cmd
            res.status(400).send({message: "cant find user"})//give indicate to the user on client side
            return;
        }
        if (mysqlres.length>0){
            res.json({message : "Welcome to our platform!!!"})
        }
        else{
            res.json({error : "Sorry, incorrect email/password please try again!"})
        }
    })
 };

 const showAllOffersHome =  (req, res)=>{  
    const selectAllProduct = "select * from offersDish where quantity>0";
    sql.query(selectAllProduct, (err, mysqlres)=>{
        if (err){
            console.log("error is hereeeeeee", err);//to the cmd
            res.status(400).send({message: "error in select all offersDish"})//give indicate to the user on client side
            return;
        };
        console.log("success in selecting all offersDish");
        res.render('home.pug', {
            dishes: mysqlres
        });
        return;       
    })
}

const showAllOffersHomeAfterSearch = (req, res)=>{
    if (!req.body) {
        console.log("error in getting all offers " + err);
        res.status(400).send({message:"error in getting all offers " + err})
        return;      
    }
    const foodStyle = req.query.dishStyle;
    console.log(foodStyle);
    const Q = 'select * from offersDish where foodStyle = ? and quantity>0';
    connection.query(Q, [foodStyle], (err, mysqlres) =>{
        if (err){
            console.log("error is hereeeeeee", err);//to the cmd
            res.status(400).send({message: "cant find food"})//give indicate to the user on client side
            return;
        }
        console.log(mysqlres);
        res.render('home.pug', {
            dishes: mysqlres
        });
        return;
    })
 };

 const addToCartFunction = (req, res) =>{
    if (!req.body) {
        console.log("error in getting all offers " + err);
        res.status(400).send({message:"error in getting all offers " + err})
        return;      
    }
    const userDetail = {
        "email" : req.cookies.email,
        "itemForCart" : req.query.itemForCart
    }
    console.log(userDetail);
    const Q = 'select * from cartsPerUser where userEmail=? and dishId=?'
    connection.query(Q, [userDetail.email, userDetail.itemForCart], (err, mysqlres) =>{
        console.log(mysqlres);
        if (err){
            console.log("error is hereeeeeee", err);//to the cmd
            res.status(400).send({message: "error in select from cartsPerUser"})//give indicate to the user on client side
            return;
        }
        else if (mysqlres.length>0){//if we need to +1 to the qnt
            const addPlus1 = 'UPDATE cartsPerUser SET quantityToBuy = quantityToBuy+1 WHERE userEmail=? and dishId=?;';
            connection.query(addPlus1, [userDetail.email, userDetail.itemForCart], (err, mysqlres) =>{
                if (err){
                    console.log("error is hereeeeeee", err);//to the cmd
                    res.status(400).send({message: "error in update cartsPerUser"})//give indicate to the user on client side
                    return;
                }
                console.log("update record cartsPerUser");
            })
        }
        else{
            const insertIntoCart = 'INSERT INTO cartsPerUser set ?'
            const forInsert = {
                "userEmail":userDetail.email,
                "dishId": userDetail.itemForCart,
                "quantityToBuy":1
            }
            connection.query(insertIntoCart, forInsert, (err, mysqlres) =>{
                if (err){
                    console.log("error is hereeeeeee", err);//to the cmd
                    res.status(400).send({message: "error in insert cartsPerUser"})//give indicate to the user on client side
                    return;
                }
                console.log("insert record to cartsPerUser");
            })
        }
        const updateAmountOfDishesInOffers = 'UPDATE offersDish SET quantity = quantity-1 WHERE id=?;';
        connection.query(updateAmountOfDishesInOffers, [userDetail.itemForCart], (err, mysqlres) =>{
            if (err){
                console.log("error is hereeeeeee UPDATE offersDish", err);//to the cmd
                res.status(400).send({message: "error in update offersDish -1"})//give indicate to the user on client side
                return;
            }
        })
        const shoppingCart = ' select * from  offersDish join cartsPerUser on offersDish.id=cartsPerUser.dishId where cartsPerUser.userEmail=?;';
        connection.query(shoppingCart, [userDetail.email], (err, mysqlres) =>{
            var total = 0;
            for(var i = 0; i < mysqlres.length; i++){
                for (var j = 0; j < mysqlres[i].quantityToBuy; j++){
                    console.log(mysqlres[i].pricePerUnit)
                    total +=mysqlres[i].pricePerUnit
                }
            }
            res.render('shopping_cart.pug', {
                itemsInCart: mysqlres,
                totalToPay: total
            });
            return;
        }) 
    })
 }

 const deleteItemFromCart = (res,req)=>{
    console.log(req.body);
    if (!req.body) {
        console.log("error in deleteItemFromCart ");
        res.status(400).send({message:"error in deleteItemFromCart "})
        return;      
    }
    const userDetail = {
        "email" : req.cookies.email,
        "itemToDel" : req.query.itemToDel
    }
    console.log(userDetail);
    //
    const Q = 'select * from cartsPerUser where userEmail=? and dishId=?';
    connection.query(Q, [userDetail.email, userDetail.itemToDel], (err, mysqlres) =>{
        console.log(mysqlres);
        if (err){
            console.log("error is hereeeeeee", err);//to the cmd
            res.status(400).send({message: "error in select from cartsPerUser"})//give indicate to the user on client side
            return;
        }
        else if (mysqlres.length>0){//delete thin item and add the quentity to the offers
            const qntToDelete = 0
            const QToQntToDel = 'select quantityToBuy from cartsPerUser WHERE userEmail=? and dishId=?;'
            connection.query(QToQntToDel, [userDetail.email, userDetail.itemToDel], (err, mysqlres)=>{
                if (err){
                    console.log("error is hereeeeeee select quantityToBuy", err);//to the cmd
                    res.status(400).send({message: "error select quantityToBuy"})//give indicate to the user on client side
                    return;
                }
                qntToDelete = mysqlres
                console.log("qntToDelete")
                console.log(qntToDelete);
            })
            //delete the dish from the relevant cart of the user
            const deletItemFromCart = 'delete from cartsPerUser WHERE userEmail=? and dishId=?;';
            connection.query(deletItemFromCart, [userDetail.email, userDetail.itemToDel], (err, mysqlres) =>{
                if (err){
                    console.log("error is hereeeeeee in delete row", err);//to the cmd
                    res.status(400).send({message: "error in delete row"})//give indicate to the user on client side
                    return;
                }
                console.log("delete record cartsPerUser");
            })
            //add the qnt that was deleted from the cart to the offers
            const addBackToOffers = 'UPDATE offersDish SET quantity = quantity+? WHERE id=?;'
            connection.query(addBackToOffers, [qntToDelete, userDetail.itemToDel], (err, mysqlres) =>{
                if (err){
                    console.log("error is hereeeeeee in UPDATE offersDish", err);//to the cmd
                    res.status(400).send({message: "error in UPDATE offersDish"})//give indicate to the user on client side
                    return;
                }
                console.log("update record offersDish");
            })
        }
        //update the total to pay for the cart of the user
        const shoppingCart = ' select * from  offersDish join cartsPerUser on offersDish.id=cartsPerUser.dishId where cartsPerUser.userEmail=?;';
        connection.query(shoppingCart, [userDetail.email], (err, mysqlres) =>{
            var total = 0;
            for(var i = 0; i < mysqlres.length; i++){
                for (var j = 0; j < mysqlres[i].quantityToBuy; j++){
                    console.log(mysqlres[i].pricePerUnit)
                    total +=mysqlres[i].pricePerUnit
                }
            }
            res.render('shopping_cart.pug', {
                itemsInCart: mysqlres,
                totalToPay: total
            });
            return;
        }) 
    })
 } 

 const showShoppingCart = (req, res)=>{  
    const email = req.cookies.email
    const myCart = " select * from  offersDish join cartsPerUser on offersDish.id=cartsPerUser.dishId where cartsPerUser.userEmail=?;";
    sql.query(myCart, [email], (err, mysqlres)=>{
        if (err){
            console.log("error is hereeeeeee in show cart", err);//to the cmd
            res.status(400).send({message: "error in show cart"})//give indicate to the user on client side
            return;
        };
        var total = 0;
            for(var i = 0; i < mysqlres.length; i++){
                for (var j = 0; j < mysqlres[i].quantityToBuy; j++){
                    console.log(mysqlres[i].pricePerUnit)
                    total +=mysqlres[i].pricePerUnit
                }
            }
        console.log("success in show cart");
        res.render('shopping_cart.pug', {
            itemsInCart: mysqlres,
            totalToPay:total
        });
        return;       
    })
}

const checkOutTheCart = (req, res)=>{
    if(!req.body){
        res.status(400).send({
            message:"Content can't be empty!!!"
        });
        return;
    }
    const userDetail = {
        "userEmail" : req.cookies.email
    }
    const QCheckAddresses = ' select * from  offersDish join cartsPerUser on offersDish.id=cartsPerUser.dishId where cartsPerUser.userEmail=?;';
    var pickUpPerDish = '';
    sql.query(QCheckAddresses, [userDetail.userEmail], (err, mysqlres)=>{
        if (err){
            console.log("error is hereeeeeee QCheckAddresses", err);//to the cmd
            res.status(400).send({message: "error in QCheckAddresses"})//give indicate to the user on client side
            return;
        }
        else{
            pickUpPerDish = mysqlres
            const deleteFromCartsPerUser = 'delete from cartsPerUser where userEmail=?;';
            sql.query(deleteFromCartsPerUser, [userDetail.userEmail], (err, mysqlres)=>{
                if (err){
                    console.log("error is hereeeeeee deleteFromCartsPerUser", err);//to the cmd
                    res.status(400).send({message: "error in deleteFromCartsPerUser"})//give indicate to the user on client side
                    return;
                };
                res.render('after_checkout.pug', {
                    addressPerDish: pickUpPerDish
                });
                return; 
            })
        }
    })
    
}


module.exports = {insertNewUser, insertNewOffer, userLogIn, showAllOffersHome, showAllOffersHomeAfterSearch, 
    addToCartFunction, deleteItemFromCart, showShoppingCart, checkOutTheCart};