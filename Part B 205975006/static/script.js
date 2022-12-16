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

//validation for date exipry - have to be later or equal than today
function validationExipryDate() {
    var dateInput = document.getElementById("exipryDate").value;
    var today = new Date();
    if (new Date(dateInput).getTime() <= today.getTime()){
        alert("The expiry date must be BIGGER or EQUAL to today date");
        return false;
    }
}

//validation for input in declare password page - make sure that the text is similar
function validatePasswordForm() {
    var firstInput = document.forms["passForm"]["firtTypePass"].value;
    var secondInput = document.forms["passForm"]["secondTypePass"].value;
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if (!firstInput.match(passw)){//check if the password has all the requirement
        alert("Password is not complex enought - make sure: that you have 8 charts at least, and you have combination of numbers and letters (capital & small)");
        return false;
    }
    if (firstInput != secondInput) {//check if the confirmation password is match
        alert("Please make sure your passwords match")
        return false;
    }
}
