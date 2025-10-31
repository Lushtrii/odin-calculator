function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    throw new Error("Cannot divide by 0");
  }

  return num1 / num2;
}

function operate(operator, operand1, operand2) {
  switch (operator) {
    case "+":
      return add(operand1, operand2);
    case "-":
      return subtract(operand1, operand2);
    case "*":
      return multiply(operand1, operand2);
    case "/":
      try {
        return divide(operand1, operand2);
      } catch (e) {
        console.log(e.message);
      }
      break;
    default:
      throw new Error("Unrecognized operation");
  }
}

function main() {
  const display = document.querySelector("#display");
  const numberContainer = document.querySelector("#numbers");
  numberContainer.addEventListener("click", (e) => {
    const buttonVal = e.target.getAttribute("data-val");
    if (!buttonVal) return;

    if (display.textContent === "0") {
      display.textContent = buttonVal;
    } else {
      display.textContent += buttonVal;
    }
  });
}

main();
