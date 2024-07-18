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
    }
}
