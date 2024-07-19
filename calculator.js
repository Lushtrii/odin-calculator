"use strict"
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => b === 0 ? undefined : a / b;

const operate = (a, b, op) => {
    const opCodes = {
        "+": 0,
        "-": 1,
        "*": 2,
        "/": 3,
    };

    switch (opCodes[op]) {
        case 0:
            return add(a, b);
        case 1:
            return subtract(a, b);
        case 2:
            return multiply(a, b);
        case 3:
            let result = divide(a, b);
            if (!result) {
                console.log("You can't divide by 0...");
            }
            return result;
        default:
            console.log("ERROR: This should not be reached");
            return null;
    }
}

const displayCalcState = (calcState) => {
    let displayString = "";

    if (calcState.firstNum) {
        displayString += `${calcState.firstNum}`;
    }
    if (calcState.op) {
        displayString += ` ${calcState.op}`;
    }
    if (calcState.secondNum) {
        displayString += ` ${calcState.secondNum}`;
    }
    if (calcState.answer) {
        displayString += ` = ${calcState.answer}}`
    }
    
    const resultDisplay = document.querySelector("#result-text");
    resultDisplay.textContent = displayString;
}
