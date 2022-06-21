/**
 * Author: Jayson Paul 103182024
 * Target: clickme.html
 * Purpose: Lab 5 Task 1
 * Created: 9/8/2021
 * Last Updated: 6/21/2022
 * Credits: Lab guide pdf
 */

 "use strict"; //prevents the creation of global variables in functions

 /*First written JavaScript to:

 1. Prompt for name input on button click
 2. Display an alert message using input name
 3. Rewrite the message displayed using the rewriteParagraph function.
 4. Make the "anotherOutput" span visible and display written content if the h1 element is clicked.


*/

function promptName() {

    var sName = prompt("Enter your name. \nThis prompt should show up when the \nClick Me button is clicked.", "Your name");
    alert("Hi there " + sName +". Alert boxes are a quick way to check the state\n of your variables when you are developing code.");

    rewriteParagraph (sName);

}

function rewriteParagraph (userName) {
    var message = document.getElementById("message");
    message.innerHTML = "Hi " + userName + ". If you can see this you have successfully overwritten the contents of this paragraph. Congratulations!";

}

function writeNewMessage() {
    var message2 = document.getElementById("anotherOutput");
    message2.textContent = "You have now finished Task 1.";

}
 
 function init() {
 
    var clickMe = document.getElementById("clickme");
    clickMe.onclick = promptName;

    var completeTask = document.getElementsByTagName("h1");
    completeTask[0].onclick = writeNewMessage;
 
 }
 
 window.onload = init;