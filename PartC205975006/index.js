const express = require('express');//import the exspress pack
const app = express();//init the exspress pack
const path = require('path');
const bodyParser = require('body-parser');
const { strictEqual } = require('assert');
const SQL = require('./dbFiles/db');
const connection = require('./dbFiles/db');
const createDB = require('./dbFiles/createDB');
const CSVToJSON = require('csvtojson');
const { parse } = require("csv-parse");
const stringify = require('csv-stringify').stringify;
const CRUD =require('./dbFiles/CRUD');
const { ppid } = require('process');
const port = 3000;
const cookieParser = require('cookie-parser')

app.use(express.static('static'));
app.use(bodyParser.json());// יש יכולת לפרסר url
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'pug');
app.use(cookieParser());
//app.set('views', path.join(__dirname, 'views'));

//create database
app.get('/createTableUsers', createDB.createTableUsers);
app.get('/insertUsers', createDB.insertUsers);
app.get('/showAllUsers', createDB.showAllUsers);
app.get('/dropTableUsers', createDB.dropTableUsers);

app.get('/createOffersDish', createDB.createOffersDish);
app.get('/insertOffersDish', createDB.insertOffersDish);
app.get('/showAllOffers', createDB.showAllOffers);
app.get('/dropTableOffersDish', createDB.dropTableOffersDish);

app.get('/createCartsPerUser', createDB.createCartsPerUser);
app.get('/insertCartsPerUser', createDB.insertCartsPerUser);
app.get('/showAllCartsPerUser', createDB.showAllCartsPerUser);
app.get('/dropTableCartsPerUser', createDB.dropTableCartsPerUser);

//interaction with the client
app.get('/home.pug', CRUD.showAllOffersHome);
app.get('/addToCart', CRUD.addToCartFunction);
app.get('/shopping_cart.pug', CRUD.showShoppingCart)
app.get('/home_after_search', CRUD.showAllOffersHomeAfterSearch);

app.post('/deletItemFromCart', CRUD.deleteItemFromCart);//still dont work!!!!!
app.post('/checkOutTheCart', CRUD.checkOutTheCart);
app.post('/newUser', CRUD.insertNewUser);
app.post('/sendOffer', CRUD.insertNewOffer);
app.post('/find', CRUD.userLogIn);

app.get('/', (req,res)=>{
    res.redirect("/user.pug");
})

app.get('/home_after_search.pug', (req,res)=>{
    res.render(path.join(__dirname, "views/home_after_search.pug"));
});

app.get('/about.pug', (req,res)=>{
    if (req.cookies.email = ''){
        res.redirect("/user.pug");
    }
    else{
        res.render(path.join(__dirname, "views/about.pug"));
    } 
});

app.get('/after_send_offer.pug', (req,res)=>{
    res.render(path.join(__dirname, "views/after_send_offer.pug"));
});

app.get('/after_checkout.pug', (req, res)=>{
    res.render(path.join(__dirname, "views/after_checkout.pug"));
})

app.get('/create_new.pug', (req,res)=>{
    res.cookie('email', req.cookies.email);
    res.render(path.join(__dirname, "views/create_new.pug"));
});

app.get('/declare_password.pug', (req,res)=>{
    res.render(path.join(__dirname, "views/declare_password.pug"));
});

app.get('/reviews.pug', (req,res)=>{
    res.render(path.join(__dirname, "views/reviews.pug"));
});

app.get('/sale_your_dish.pug', (req,res)=>{
    res.render(path.join(__dirname, "views/sale_your_dish.pug"));
});



app.get('/user.pug', (req,res)=>{
    res.cookie('email', req.cookies.email);
    res.render(path.join(__dirname, "views/user.pug"));
});

app.get('/after_send_offer.pug', (req,res)=>{
    res.render(path.join(__dirname, "views/after_send_offer.pug"));
});

app.get('/declare_password.pug', (req,res)=>{
    res.render(path.join(__dirname, "views/declare_password.pug"));
});

app.listen(port, ()=>{
    console.log("server is runninggggg", port);
});

