//Your calculator is going to contain functions for all of the basic math operators you typically find on simple calculators, so start by creating functions for the following items and testing them in your browser’s console.

//A calculator operation will consist of a number, an operator, and another number. For example, 3 + 5. Create three variables for each of the parts of a calculator operation. Create a variable for the first number, the operator, and the second number. You’ll use these variables to update your display later.
let firstNum="";
let operator="";
let secondNum="";
let displayValue = "";

//Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.
function operate(operator, x, y) {
  switch (operator) {
    case "add":
      return x + y;
    case "subtract":
      return x - y;
    case "multiply":
      return x * y;
    case "divide":
      return x / y;
    default:
      return NaN;
  }
}

//Create the functions that populate the display when you click the number buttons. You should be storing the ‘display value’ in a variable somewhere for use in the next step?

// Get references to the calculator buttons
const buttonIds = ["btn7", "btn8", "btn9", "btn4", "btn5", "btn6", "btn1", "btn2", "btn3", "btn0", "equals", "clear", "plus", "minus", "times", "dividedBy"];
const buttons = {};

buttonIds.forEach(id => {
  buttons[id] = document.getElementById(id);
});

let evaluated = false;
let lastClickedOperator = false;

equals.addEventListener("click", () => {
  if (operator){
    if(!lastClickedOperator){
      secondNum = displayValue;
      const result = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
      displayValue = result.toString();
      updateDisplay();
      firstNum="";
      secondNum="";
      evaluated = true;
      lastClickedOperator = false;
      isDecimal = false;
      operator="";
    }
  } 
});

clear.addEventListener("click", () => {
  displayValue = "";
  firstNum = "";
  secondNum = "";
  operator = "";
  evaluated = false;
  lastClickedOperator = false;
  isDecimal = false;
  updateDisplay();
  });

function handleOperatorClick(op) {
  if (!lastClickedOperator){
    if (firstNum === "") {
      firstNum = displayValue;
      displayValue = "";
      lastClickedOperator = true;
      isDecimal = false;
    } else {
      secondNum = displayValue;
      const result = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
      firstNum = result.toString();
      displayValue = result.toString();
      updateDisplay();
      secondNum="";
      evaluated = true;
      lastClickedOperator = true;
      isDecimal = false;
    }
    operator = op;
  } else {
    operator = op;
  }

}

const operatorButtons = {
  plus: "add",
  minus: "subtract",
  times: "multiply",
  dividedBy: "divide"
};

for (const [buttonId, operator] of Object.entries(operatorButtons)) {
    const button = document.getElementById(buttonId);
    button.addEventListener("click", () => handleOperatorClick(operator));
}

let isDecimal = false;

function addClickListener(button, value) {
  button.addEventListener("click", () => {
    if (button == decimal) {
      if (!isDecimal) {
        updateNumbers(value);
        isDecimal = true;}
      } else {
        updateNumbers(value);
      }
  });
}

function updateNumbers(value) {
  if (evaluated) {
    displayValue = "";
    displayValue += value;
    updateDisplay();
    evaluated = false;
    lastClickedOperator = false;
  } else {
    displayValue += value;
    updateDisplay();
    lastClickedOperator = false;
  }
}

const btns = [btn7, btn8, btn9, btn4, btn5, btn6, btn1, btn2, btn3, btn0, decimal];
const values = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."];
for (let i = 0; i < btns.length; i++) {
    addClickListener(btns[i], values[i]);
}

function updateDisplay() {

  let precision = 9;
  
  if (displayValue=="") {
    display.textContent = displayValue;
  } else if (displayValue.includes(".")){
    display.textContent = displayValue;
  } else {
    let num = parseFloat(displayValue)
    displayValue = Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)
    display.textContent = displayValue.toString();
  }
}