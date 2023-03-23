// Initialize variables to hold the numbers, operator, display value, and flags
const maxDisplayLength = 14;
const precision = 9;
let firstNum = "";
let operator = "";
let secondNum = "";
let displayValue = "0";
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

// Define the clearDisplay function to reset all variables and update the display
const clearDisplay = () => {
  displayValue = '0';
  firstNum = '';
  secondNum = '';
  operator = '';
  evaluated = false;
  lastClickedOperator = false;
  lastClickedEquals = false;
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
const calculate = () => {
  if (operator) {
    if (!lastClickedOperator) {
      lastClickedEquals = true;
      processDisplay();
      firstNum = "";
      lastClickedOperator = false;
      operator = "";
    }
  } 
}

equals.addEventListener("click", calculate);
document.addEventListener("keydown", event  => {
  if (event.key === 'Enter' || event.key === '=') {
    event.preventDefault();
    calculate();
  }
});

// Define processDisplay function to perform calculation and update display and flags
function processDisplay() {
  secondNum = displayValue;
  let result = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
  result = Math.floor(result * Math.pow(10, precision)) / Math.pow(10, precision);
  displayValue = result.toString();
  secondNum="";
  evaluated = true;
  updateDisplay();
}
// Define handleOperatorClick function to handle click event for operator buttons
function handleOperatorClick(op) {
  if (!lastClickedOperator){
    if (firstNum === "") {
      firstNum = displayValue;
      displayValue = "";
    } else {
      processDisplay();
      firstNum = displayValue;
    }
    lastClickedOperator = true;
    lastClickedEquals = false;
  }
  operator = op;
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
    document.addEventListener("keydown", event => {
      switch (event.key) {
        case '+':
          handleOperatorClick(operatorButtons.plus);
          break;
        case '-':
          handleOperatorClick(operatorButtons.minus);
          break;
        case '*':
          handleOperatorClick(operatorButtons.times);
          break;
        case '/':
          handleOperatorClick(operatorButtons.dividedBy);
          break;
      }
    })
}

// Assign click listeners to buttons for each value in the values array
const btns = [btn7, btn8, btn9, btn4, btn5, btn6, btn1, btn2, btn3, btn0, decimal];
const values = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."];
for (let i = 0; i < btns.length; i++) {
    addClickListener(btns[i], values[i]);
}

// Define addClickListener function to add click listener to buttons and update display accordingly
const checkDecimal = (key) => {
  if (displayValue==="0") {
    displayValue = '';
  }
  if (key === '.') {
    if (!displayValue.includes(".")) {
      updateNumbers(key);
    }
  } else if (values.includes(key)) {
      updateNumbers(key);
    }
}

function addClickListener(button, value) {
  button.addEventListener("click", () => checkDecimal(value))
}
document.addEventListener("keydown", (event) => checkDecimal(event.key))

// Update displayed numbers when a digit or decimal point is clicked
function updateNumbers(value) {
  if (value === "0" && displayValue === "0") {
    return;
  }
  if (evaluated) {
    displayValue = "";
    evaluated = false;
  }
  if (value === "." && displayValue === "") {
    displayValue = "0";
  }
  displayValue += value;
  updateDisplay();
  lastClickedOperator = false;
  lastClickedEquals = false;
}

//Updates the calculator display with the current result or input value
function updateDisplay() {
  if (lastClickedEquals) {
    if (parseFloat(displayValue).toFixed(0).length <= maxDisplayLength) {
      if (displayValue==Infinity) {
        display.textContent = "Err: Divide by 0"
      } else {
        displayValue = displayValue.slice(0, maxDisplayLength);
        display.textContent = displayValue;
      }
    } else {
      display.textContent = "Err: Too Large"
    }
  } else {
    displayValue = displayValue.slice(0, maxDisplayLength);
    display.textContent = displayValue;
  }
}

//add backspace function that undo the number in display when clicked the wrong number
const undo = () => {
  if (displayValue === "0."){
    displayValue = "";
    updateDisplay();
  } else {
    if(!lastClickedEquals && displayValue.length > 0){
      displayValue = displayValue.slice(0, -1);
      updateDisplay();
    }
  }
  if (displayValue === "") {
    displayValue = '0';
    updateDisplay();
  }
}
backspace.addEventListener("click", undo);
document.addEventListener("keydown", event => {
  if (event.key === 'Delete' || event.key === 'Backspace' ) undo();
});