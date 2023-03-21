//Your calculator is going to contain functions for all of the basic math operators you typically find on simple calculators, so start by creating functions for the following items and testing them in your browser’s console.

//A calculator operation will consist of a number, an operator, and another number. For example, 3 + 5. Create three variables for each of the parts of a calculator operation. Create a variable for the first number, the operator, and the second number. You’ll use these variables to update your display later.
let firstNum="";
let operator="";
let secondNum="";
let displayValue = "";

//Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.
function operate(operator, x, y) {
  switch (operator) {
    case add:
      return x + y;
    case subtract:
      return x - y;
    case multiply:
      return x * y;
    case divide:
      return x / y;
    default:
      return NaN;
  }
}

//Create the functions that populate the display when you click the number buttons. You should be storing the ‘display value’ in a variable somewhere for use in the next step?

// Get references to the calculator buttons
const btn7 = document.getElementById("btn-7");
const btn8 = document.getElementById("btn-8");
const btn9 = document.getElementById("btn-9");
const btn4 = document.getElementById("btn-4");
const btn5 = document.getElementById("btn-5");
const btn6 = document.getElementById("btn-6");
const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");
const btn0 = document.getElementById("btn-0");
const equalsBtn = document.getElementById("equals");
const clearBtn = document.getElementById("clear");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");
const timesBtn = document.getElementById("times");
const dividedByBtn = document.getElementById("divided-by");

equalsBtn.addEventListener("click", function() {
secondNum = displayValue;
displayValue = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
updateDisplay();
firstNum="";
secondNum="";
});

plusBtn.addEventListener("click", function() {
if (firstNum === "") {
    firstNum = displayValue;
    operator = add;
    displayValue = "";
} else {
    secondNum = displayValue;
    const result = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
    firstNum = result.toString();
    console.log(firstNum)
    console.log(secondNum)
    operator = add;
    displayValue = "";
    updateDisplay();
}
});

minusBtn.addEventListener("click", function() {
if (firstNum === "") {
    firstNum = displayValue;
    operator = subtract;
    displayValue = "";
} else {
    secondNum = displayValue;
    const result = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
    firstNum = result.toString();
    operator = subtract;
    displayValue = "";
    updateDisplay();
}
});

timesBtn.addEventListener("click", function() {
if (firstNum === "") {
    firstNum = displayValue;
    operator = multiply;
    displayValue = "";
} else {
    secondNum = displayValue;
    const result = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
    firstNum = result.toString();
    operator = multiply;
    displayValue = "";
    updateDisplay();
}
});

dividedByBtn.addEventListener("click", function() {
if (firstNum === "") {
    firstNum = displayValue;
    operator = divide;
    displayValue = "";
} else {
    secondNum = displayValue;
    const result = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
    firstNum = result.toString();
    operator = divide;
    displayValue = "";
    updateDisplay();
}
});

clearBtn.addEventListener("click", function() {
displayValue = "";
firstNum = "";
secondNum = "";
operator = "";
updateDisplay();
});

btn7.addEventListener("click", function() {
displayValue += "7";
updateDisplay();
})
btn8.addEventListener("click", function() {
displayValue += "8";
updateDisplay();
})
btn9.addEventListener("click", function() {
displayValue += "9";
updateDisplay();
})
btn4.addEventListener("click", function() {
displayValue += "4";
updateDisplay();
})
btn5.addEventListener("click", function() {
displayValue += "5";
updateDisplay();
})
btn6.addEventListener("click", function() {
displayValue += "6";
updateDisplay();
})
btn1.addEventListener("click", function() {
displayValue += "1";
updateDisplay();
})
btn2.addEventListener("click", function() {
displayValue += "2";
updateDisplay();
})
btn3.addEventListener("click", function() {
displayValue += "3";
updateDisplay();
})
btn0.addEventListener("click", function() {
displayValue += "0";
updateDisplay();
})

function updateDisplay() {
display.textContent = displayValue;
// console.log(operator);
// console.log(firstNum);
// console.log(secondNum);
}