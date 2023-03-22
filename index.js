// Initialize variables to hold the numbers, operator, display value, and flags
let firstNum = "";
let operator = "";
let secondNum = "";
let displayValue = "";
let isDecimal = false;
let evaluated = false;
let lastClickedOperator = false;
let lastClickedEquals = false;

// Define the operate function to perform arithmetic operations
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

// Initialize the buttons object and assign the button elements to their respective keys
const buttons = {};
const buttonIds = ["btn7", "btn8", "btn9", "btn4", "btn5", "btn6", "btn1", "btn2", "btn3", "btn0", "equals", "clear", "backspace", "plus", "minus", "times", "dividedBy", "display"];
buttonIds.forEach(id => {
  buttons[id] = document.getElementById(id);
});

// // // Add a keyboard support to enter numbers, operations (+, -, /, *), equals, decimal, backspace and escape(clear)
document.addEventListener("keydown", function(event) {
  console.log(event);
});
//1. Handle numbers and decimals


// Define the clearDisplay function to reset all variables and update the display
const clearDisplay = () => {
  displayValue = '';
  firstNum = '';
  secondNum = '';
  operator = '';
  evaluated = false;
  lastClickedOperator = false;
  lastClickedEquals = false;
  isDecimal = false;
  updateDisplay();
};

// Add a click listener to the clear button to call the clearDisplay function
clear.addEventListener('click', clearDisplay);
document.addEventListener("keydown", event => {
  if (event.key === 'Escape') {
    clearDisplay();
  }
});

// Add a click listener to the equals button to process the calculation
equals.addEventListener("click", () => {
  if (operator) {
    if (!lastClickedOperator) {
      processDisplay();
      firstNum = "";
      lastClickedOperator = false;
      operator = "";
      lastClickedEquals = true;
    }
  } 
});

// Define processDisplay function to perform calculation and update display and flags
function processDisplay() {
  let precision = 9;
  secondNum = displayValue;
  let result = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
  result = Math.floor(result * Math.pow(10, precision)) / Math.pow(10, precision);
  displayValue = result.toString();
  secondNum="";
  evaluated = true;
  isDecimal = false;
  updateDisplay();
}
// Define handleOperatorClick function to handle click event for operator buttons
function handleOperatorClick(op) {
  if (!lastClickedOperator){
    if (firstNum === "") {
      firstNum = displayValue;
      displayValue = "";
      lastClickedOperator = true;
      lastClickedEquals = false;
      isDecimal = false;
    } else {
      processDisplay();
      firstNum = displayValue;
      lastClickedOperator = true;
      lastClickedEquals = false;
    }
    operator = op;
  } else {
    operator = op;
  }

}

// Add click event listener to each operator button to call the handleOperatorClick function
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

// Define addClickListener function to add click listener to buttons and update display accordingly
function addClickListener(button, value) {
  button.addEventListener("click", () => {
    if (button == decimal) {
      if (!isDecimal) {
        updateNumbers(value);
        isDecimal = true;}
      } else {
        updateNumbers(value);
      }
    lastClickedEquals = false;
  });
}

// Update displayed numbers when a digit or decimal point is clicked
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

// Assign click listeners to buttons for each value in the values array
const btns = [btn7, btn8, btn9, btn4, btn5, btn6, btn1, btn2, btn3, btn0, decimal];
const values = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."];
for (let i = 0; i < btns.length; i++) {
    addClickListener(btns[i], values[i]);
}

//Updates the calculator display with the current result or input value
function updateDisplay() {
    display.textContent = displayValue;
}

//add backspace function that undo the number in display when clicked the wrong number
const undo = () => {
  if(!lastClickedEquals && displayValue.length > 0){
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
  }
}

backspace.addEventListener("click", undo);
document.addEventListener("keydown", event => {
  if (event.key === 'Delete' || event.key === 'Backspace' ) undo();
});