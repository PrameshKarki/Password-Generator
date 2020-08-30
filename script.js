//Enabling Strict Mode
"use strict";
//Grabbing elements from the DOM

const passwordLength = document.getElementById('passwordLength');
const showValue = document.querySelector('#showValue');
const generatePasswordBtn = document.getElementById('btn');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const passwordDisplay = document.getElementById('password');
const specialCharacters = document.getElementById('specialCharacters');
const copyBtn = document.getElementById('copy');
const modal = document.getElementsByClassName('modal')[0];

//For possible characters
const uppercaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const lowercaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const possibleNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const possibleSpecialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '='];
// You can also add other special characters as your need


//Add event listener to the passwordLength Range
passwordLength.addEventListener('change', () => {
    showValue.innerText = passwordLength.value;
})

const getInputValue = () => {
    const isUpperCase = uppercase.checked;
    const isLowerCase = lowercase.checked;
    const isNumbers = numbers.checked;
    const isSpecialCharacters = specialCharacters.checked;
    const givenPasswordLength = passwordLength.value;
    validateInput(givenPasswordLength, isUpperCase, isLowerCase, isNumbers, isSpecialCharacters);
}

//Event listening on the Generate Password Btn
generatePasswordBtn.addEventListener('click', getInputValue);


//Function for validating user input
function validateInput(givenPasswordLength, ...options) {
    let choice = '', possibleCombination = [];
    options.forEach((element) => {
        choice += Number(element);
    });
    switch (choice) {
        case "0000":
        case "0001":
        case "0010":
        case "0100":
        case "1000":
            alert('Please check at least two options!!!');
            passwordLength.value = 0;

            break;
        case "0011":
            possibleCombination = [possibleNumbers, possibleSpecialCharacters];
            generatePassword(possibleCombination, givenPasswordLength);
            break;
        case '0101':
            possibleCombination = [lowercaseLetters, possibleSpecialCharacters];
            generatePassword(possibleCombination, givenPasswordLength);
            break;
        case '0110':
            possibleCombination = [lowercaseLetters, possibleNumbers];
            generatePassword(possibleCombination, givenPasswordLength);
            break;
        case '0111':
            possibleCombination = [lowercaseLetters, possibleNumbers, possibleSpecialCharacters];
            generatePassword(possibleCombination, givenPasswordLength);
            break;
        case '1001':
            possibleCombination = [uppercaseLetters, possibleSpecialCharacters];
            generatePassword(possibleCombination, givenPasswordLength);
            break;
        case '1010':
            possibleCombination = [uppercaseLetters, possibleNumbers];
            generatePassword(possibleCombination, givenPasswordLength);
            break;
        case '1011':
            possibleCombination = [uppercaseLetters, possibleNumbers, possibleSpecialCharacters];
            generatePassword(possibleCombination, givenPasswordLength);
            break;
        case '1100':
            possibleCombination = [uppercaseLetters, lowercaseLetters];
            generatePassword(possibleCombination, givenPasswordLength);
            break;
        case '1101':
            possibleCombination = [uppercaseLetters, lowercaseLetters, possibleSpecialCharacters];
            generatePassword(possibleCombination, givenPasswordLength);
            break;
        case '1110':
            possibleCombination = [uppercaseLetters, lowercaseLetters, possibleNumbers];
            generatePassword(possibleCombination, givenPasswordLength);
            break;
        case '1111':
            possibleCombination = [uppercaseLetters, lowercaseLetters, possibleNumbers, possibleSpecialCharacters];
            generatePassword(possibleCombination, givenPasswordLength);
            break;
        default:
            alert("Unknown Error Occurs!");


    }
}

//Function for getting random number with in a range
function getRandomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

//Function for generating Password
function generatePassword(possibleCombination, givenPasswordLength) {
    let password = '';
    for (let index = 0; index < givenPasswordLength; index++) {
        let numberOfSubArray = possibleCombination.length - 1;
        let randomNumbertoGetCombinationArray = getRandomNumber(0, numberOfSubArray);
        let combinationArray = possibleCombination[randomNumbertoGetCombinationArray];
        let randomNumberToGetPossibleCharacters = getRandomNumber(0, (combinationArray.length - 1));
        let possibleCharacters = combinationArray[randomNumberToGetPossibleCharacters];
        password += possibleCharacters;
    }
    displayPassword(password);

}

//Function for displaying Password
function displayPassword(password) {
    passwordDisplay.value = password;
    passwordDisplay.removeAttribute('disabled');
    copyBtn.addEventListener('click', copyPassword);



}

//Function for copy password into the clipboard

function copyPassword() {
    let password = passwordDisplay.value;
    let input = document.createElement('input');
    input.setAttribute('value', password);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    displayModal();

}

//Function for displaying Modal
function displayModal() {
    modal.style.height = '100vh';
    modal.style.opacity = '1';
    setTimeout(() => {
        modal.style.height = 0;
        modal.style.opacity = 0;
    }, 1000);

}


// Pramesh Karki



