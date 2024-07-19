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
    
    let result = 0;
    switch (opCodes[op]) {
        case 0:
            return add(a, b);
        case 1:
            return subtract(a, b);
        case 2:
            result = multiply(a, b);
            return parseFloat(result.toFixed(8));
        case 3:
            result = divide(a, b);
            if (!result) {
                console.log("You can't divide by 0...");
                return null;
            }
            return parseFloat(result.toFixed(8));
        default:
            console.log("ERROR: This should not be reached");
            return null;
    }
}

const displayCalcState = (calcState) => {
    let displayString = "";

    if (Object.hasOwn(calcState, "answer") && !(calcState.answer)) {
        displayString = "Nice try. You can't divide by 0."
    }
    else {
        if (Object.hasOwn(calcState, "firstNum")) {
            displayString += `${calcState.firstNum}`;
        }
        if (Object.hasOwn(calcState, "op")) {
            displayString += ` ${calcState.op}`;
        }
        if (Object.hasOwn(calcState, "secondNum")) {
            displayString += ` ${calcState.secondNum}`;
        }
        if (Object.hasOwn(calcState, "answer")) {
            displayString += ` = ${calcState.answer}`;
        }
    }
    
    const resultDisplay = document.querySelector("#result-text");
    resultDisplay.textContent = displayString;
}

const updateCalcState = (calcState, input) => {
    const ops = ["+", "-", "*", "/"];
    if (input === "Clear") {
        for (let key in calcState) {
            delete calcState[key];
        }
    }
    else if (input === "=") {
        let answer = operate(Number(calcState.firstNum), Number(calcState.secondNum), calcState.op);
        calcState.answer = answer;
    }
    else if (Object.hasOwn(calcState, "secondNum") && ops.includes(input)) {
        calcState.firstNum = operate(Number(calcState.firstNum), Number(calcState.secondNum), calcState.op);
        calcState.op = input;
        delete calcState.secondNum;
    }
    else if (Object.hasOwn(calcState, "op")) {
        calcState.secondNum = calcState.secondNum ? `${calcState.secondNum}${input}` : `${input}`;
    }
    else {
        if (isNaN(input)) {
            calcState.op = input;
        }
        else {
            calcState.firstNum = calcState.firstNum ? `${calcState.firstNum}${input}` : `${input}`;
        }
    }
}

const isInputValid = (calcState, input) => {

    if (input === "Clear") return true;

    if (Object.hasOwn(calcState, "answer")) return false;

    if (input === "=" && !Object.hasOwn(calcState, "secondNum")) {
        return false;
    }

    return true;
}

const addCalcListeners = () => {
    const calcState = {};
    const keys = [...document.querySelectorAll(".number-key"), ...document.querySelectorAll(".op-key")];
    for (let key of keys) {
        key.addEventListener("click", e => {
            const target = e.target;
            const input = target.textContent;
            if (isInputValid(calcState, input)) {
                updateCalcState(calcState, input); 
                displayCalcState(calcState);
            }
        })
    }
}

addCalcListeners();
