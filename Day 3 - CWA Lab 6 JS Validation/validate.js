/**
 * Author: Jayson Paul 103182024
 * Target: register.html
 * Purpose: Lab 6 Task 1
 * Created: 9/20/2021
 * Last Updated: 6/23/2022
 * Credits: Lab guide pdf
 * 
 * 
 * Review:
 * 
 * This was the longest piece of code I'd written up to this point. It consists of quite a few JS functions.
 * 
 * 1. We prefill the form with data stored in session storage.
 * 2. Then we run through all the steps of validation for the various input data forms including expression matching, checking selections made, checking NaN conditions, etc.
 * 
 * 
 * This whole process uses the error message construction that I've always liked:
 * 
 *  if (errMsg != "") {
        alert (errMsg);
    }

    This was quite fun, but did take a while to get done.
 * 
 */

 "use strict"; 

function validate () {

    var errMsg = "";
    var result = true;

    var firstname = document.getElementById("firstname").value;

    if (!firstname.match(/^[a-zA-Z]+$/)){
        errMsg = errMsg + "Your first name must only contain alpha characters\n"
        result = false;
    }

    var lastname = document.getElementById("lastname").value;

    if (!lastname.match(/^[a-zA-Z-]+$/)){
        errMsg = errMsg + "Your last name must only contain alpha characters or hyphens\n"
        result = false;
    }

    var ishuman = document.getElementById("human").checked;
    var isdwarf = document.getElementById("dwarf").checked;
    var iself = document.getElementById("elf").checked;
    var ishobbit = document.getElementById("hobbit").checked;

    if(!(ishuman||isdwarf||iself||ishobbit)){
        errMsg += "Please be something. Thanks.\n";
        result = false;
    }

    var age = document.getElementById("age").value;

    if (isNaN(age)){
        errMsg = errMsg + "Your age must be a number\n"
        result = false;
    }
    else if (age < 18){
        errMsg = errMsg + "Your age must be 18 or older\n"
        result = false;
    }
    else if (age >= 10000){
        errMsg = errMsg + "You must have been born in the last 10 Millenia.\n"
        result = false;
    }
    else {
        var tempMsg = checkSpeciesAge(age);
        if (tempMsg != "") {
            errMsg = errMsg + tempMsg;
            result = false;
        }
    }

    var beard = document.getElementById("beard").value;
    
    var tempMsg2 = checkSpeciesBeard(beard);
    
    if (tempMsg2 != "") {
        errMsg = errMsg + tempMsg2;
        result = false;
    }

    var partysize = document.getElementById("partySize").value;

    if (isNaN(partysize)){
        errMsg = errMsg + "You must give a number here.\n"
        result = false;
    }
        else if (partysize > 100){
        errMsg = errMsg + "We are not clowns, and this is not a clown-car.\nLess people please.\n"
        result = false;
    }
    else if (partysize < 1){
        errMsg = errMsg + "Unless your name is Caspar the Friendly Ghost, there should be at least one person here.\n"
        result = false;
    }

    if(document.getElementById("food").value == "none") {
        errMsg = errMsg + "You must select a food preference\n"
        result = false;
    }

    var is1day = document.getElementById("1day").checked;
    var is4day = document.getElementById("4day").checked;
    var is10day = document.getElementById("10day").checked;

    if(!(is1day||is4day||is10day)){
        errMsg += "Please select at least one trip.\n";
        result = false;
    }


//The result section.

    if (errMsg != "") {
        alert (errMsg);
    }

    if (result) {
        storeBooking(firstname, lastname, age, species, is1day, is4day, is10day, food, partySize);
    };

    return result
}

function storeBooking(firstname, lastname, age, species, is1day, is4day, is10day, food, partySize) {
    var trip = "";
    var food = document.getElementById("food").value;
    var partySize = document.getElementById("partySize").value;
    var species = getSpecies();

    if (is1day) {
        trip = "1day";
    }
    if (is4day) {
        trip += ", 4day";
        }
    if (is10day) {
        trip += ", 10day";
        }
    sessionStorage.trip = trip;
    sessionStorage.firstname = firstname;
    sessionStorage.lastname = lastname;
    sessionStorage.age = age;
    sessionStorage.species = species;
    sessionStorage.food = food;
    sessionStorage.partySize = partySize;

    alert ("Trip stored: " + sessionStorage.trip);
}


 function getSpecies() {

    var speciesName = "Unknown";

    var speciesArray = document.getElementById("species").getElementsByTagName("input");

    for (var i = 0; i < speciesArray.length; i++) {
    if (speciesArray[i].checked)
        speciesName = speciesArray[i].value;
    }
    return speciesName;
 }

 function checkSpeciesAge(age) {

    var errMsg = "";
    var species = getSpecies();
    switch(species) {
        case "Human":
            if (age > 120) {
                errMsg = "You cannot be a Human over 120.\n";
            }
            break;
        case "Dwarf":
        case "Hobbit":
            if (age > 150) {
                errMsg = "You cannot be a " + species + " over 150.\n";
            }
            break;
        case "Elf":
            break;
        default:
            errMsg = "We don't allow your kind on our tours.\n"
    }
    return errMsg;
}

function checkSpeciesBeard(beard) {

    var age = document.getElementById("age").value;
    var errMsg = "";
    var species = getSpecies();
    switch(species) {
        case "Human":
            break;
        case "Dwarf":
            if (age > 30 && beard < 12) {
                errMsg = "You cannot be a Dwarf without a beard at that age!\n";
            }
            break;
        case "Hobbit":
            if (beard > 0) {
                errMsg = "Hey! Hobbits don't have beards!\n";
            }
            break;
        case "Elf":
            if (beard > 0) {
                errMsg = "Hey! Elves don't have beards!\n";
            }
            break;
        default:
            errMsg = "We don't allow your kind on our tours.\n"
    }
    return errMsg;
}

function prefill_form(){

    if(sessionStorage.firstname != undefined){
        document.getElementById("firstname").value = sessionStorage.firstname;
    }
    if(sessionStorage.lastname != undefined){
        document.getElementById("lastname").value = sessionStorage.lastname;
    }
    if(sessionStorage.age != undefined){
        document.getElementById("age").value = sessionStorage.age;
    }
    
    switch (sessionStorage.species) {
            case "Human":
                document.getElementById("human").checked = true;
                break;
            case "Dwarf":
                document.getElementById("dwarf").checked = true;
                break;
            case "Hobbit":
                document.getElementById("hobbit").checked = true;
                break;
            case "Elf":
                document.getElementById("elf").checked = true;
                break;
        }
    
    if(sessionStorage.trip != undefined){
        document.getElementById("trip").value = sessionStorage.trip;
    }

    if(sessionStorage.food != undefined){
        document.getElementById("food").value = sessionStorage.food;
    }
    if(sessionStorage.partySize != undefined){
        document.getElementById("partySize").value = sessionStorage.partySize;
    }
    if(sessionStorage.cost != undefined){
        document.getElementById("cost").value = sessionStorage.cost;
    }

}


 function init() {

    prefill_form();

    var regForm = document.getElementById("regform");
    regForm.onsubmit = validate; 


 
 }
 
 window.onload = init;