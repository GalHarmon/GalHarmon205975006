//create the nav bar - the user will get an indicate regarding the page he is on
var currentPage = window.location.pathname;
console.log(currentPage);
const activePage = document.querySelectorAll(".container a").forEach(
    link =>{
        if (link.href.includes(`${currentPage}`)) {
            link.classList.add("active");
        }
    }
);

//make the "search" component appear only after the user click the search icon
var searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('turn-on');// if visible is set remove it, otherwise add it
}

function userLogIn(){
    document.getElementById("signInForm").addEventListener('submit', (event)=>{
        event.preventDefault();
        const email = document.getElementById('email').value;
        const pass = document.getElementById('secondTypePass').value;
        fetch('/find', {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email, pass
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error){
                alert(data.error);
            }
            else{
                alert(data.message);
                document.location.href = "home.pug"
            }
        })
    })
}

function creatNew(){
    //validation for input in declare password page - make sure that the text is similar
    var firstInput = document.forms["createNewUser"]["firtTypePass"].value;
    var secondInput = document.forms["createNewUser"]["secondTypePass"].value;
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if (!firstInput.match(passw)){//check if the password has all the requirement
        alert("Password is not complex enought - make sure: that you have 8 charts at least, and you have combination of numbers and letters (capital & small)");
        document.location.href = "create_new.pug"
    }
    else if (firstInput != secondInput) {//check if the confirmation password is match
        alert("Please make sure your passwords match")
        document.location.href = "create_new.pug"
    }
    else{

    }
    document.getElementById("createNewUser").addEventListener('submit', (event) =>{
        event.preventDefault();
        const email = document.getElementById('emailNew').value;
        const firstName = document.getElementById('firstNameNew').value;
        const lastName = document.getElementById('lastNameNew').value;
        const phoneNumber = document.getElementById('phoneNumberNew').value;
        const address =  document.getElementById('addressNew').value;
        const firtTypePass =  document.getElementById('firtTypePass').value;
        const secondTypePass = document.getElementById('newsecondTypePass').value;
        const goodFormat = true;
        fetch('/newUser', {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email, firstName, lastName, phoneNumber, address, firtTypePass, secondTypePass, goodFormat
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error){
                alert(data.error);
                document.location.href = "create_new.pug"
            }
            else{
                alert(data.message);
                document.location.href = "home.pug"
            }
        })
    })
    
}

function sendOffer(){
    //validation for date exipry - have to be later or equal than today
    var dateInput = document.getElementById("exipryDate").value;
    var today = new Date();
    var goodDate = false
    if (new Date(dateInput).getTime() <= today.getTime()){
        alert("The expiry date must be BIGGER or EQUAL to today date");
        document.location.href = "sale_your_dish.pug"
    }
    else{
        goodDate = true
        document.getElementById("sendOfferForm").addEventListener('submit', (event)=>{
            event.preventDefault();
            const dishName = document.getElementById('dishNameFrom').value;
            const generalDis = document.getElementById('generalDisFrom').value;
            const foodStyle = document.getElementById('foodStyleFrom').value;
            const quantity = document.getElementById('quantityFrom').value;
            const pricePerUnit = document.getElementById('pricePerUnitFrom').value;
            const pickUpAddress = document.getElementById('pickUpAddressFrom').value;
            const expiryDate = document.getElementById('exipryDate').value;
            const pathToPhoto = document.getElementById('photoFrom').value;
            const ifDateGood = true
            fetch('/sendOffer', {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    dishName, generalDis, foodStyle, quantity, pricePerUnit, pickUpAddress, expiryDate, pathToPhoto, ifDateGood
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.error){
                    alert(data.error);
                    document.location.href = "sale_your_dish.pug"
                }
                else{
                    alert(data.message);
                    document.location.href = "after_send_offer.pug"
                }
            })
        })
    }
    
}

