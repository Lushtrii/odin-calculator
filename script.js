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

function handleNumButtonClick(e, calculatorState) {
  const numButtonVal = e.target.getAttribute("data-val");
  if (!numButtonVal) return;

  if (calculatorState.operator === "") {
    calculatorState.operand1 =
      calculatorState.operand1 === "0"
        ? numButtonVal
        : calculatorState.operand1 + numButtonVal;
  } else {
    calculatorState.operand2 =
      calculatorState.operand2 === "0"
        ? numButtonVal
        : calculatorState.operand2 + numButtonVal;
  }
  updateDisplay(calculatorState);
}

function handleOperatorButtonClick(e, calculatorState) {
  const operatorButtonVal = e.target.getAttribute("data-val");
  if (!operatorButtonVal) return;
  switch (operatorButtonVal) {
    case "clear":
      clearCalculatorState(calculatorState);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      if (calculatorState.operand2 !== "") {
        calculatorState.operand1 = operate(
          calculatorState.operator,
          +calculatorState.operand1,
          +calculatorState.operand2,
        ).toString();
        calculatorState.operator = operatorButtonVal;
        calculatorState.operand2 = "";
      } else {
        calculatorState.operator = operatorButtonVal;
      }
      break;
    case "=":
      calculatorState.operand1 = operate(
        calculatorState.operator,
        +calculatorState.operand1,
        +calculatorState.operand2,
      ).toString();
      calculatorState.operator = "";
      calculatorState.operand2 = "";
  }
  updateDisplay(calculatorState);
}

function updateDisplay(calculatorState) {
  const display = document.querySelector("#display");
  display.textContent = calculatorState.operand1;
  if (calculatorState.operator) {
    display.textContent += ` ${calculatorState.operator}`;
  }
  if (calculatorState.operand2) {
    display.textContent += ` ${calculatorState.operand2}`;
  }
}

function clearCalculatorState(calculatorState) {
  calculatorState.operand1 = "0";
  calculatorState.operand2 = "";
  calculatorState.operator = "";
}

function main() {
  const calculatorState = {
    operand1: "",
    operand2: "",
    operator: "",
  };
  const numberContainer = document.querySelector("#numbers");
  numberContainer.addEventListener("click", (e) =>
    handleNumButtonClick(e, calculatorState),
  );
  const operatorContainer = document.querySelector("#operators");
  operatorContainer.addEventListener("click", (e) =>
    handleOperatorButtonClick(e, calculatorState),
  );
}

main();
