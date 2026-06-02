// =====================
// STATE
// =====================
let firstNumber = "";
let secondNumber = "";
let operator = null;
let shouldResetDisplay = false;

// =====================
// DISPLAY
// =====================
const display = document.querySelector(".display");

function updateDisplay(value) {
  display.textContent = value;
}

// =====================
// BASIC MATH OPERATIONS
// =====================
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Error";
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Invalid";
  }
}

// =====================
// INPUT HANDLING
// =====================
function appendNumber(value) {
  if (shouldResetDisplay) {
    display.textContent = "";
    shouldResetDisplay = false;
  }

  // prevent multiple decimals
  if (value === "." && display.textContent.includes(".")) return;

  // handle starting decimal
  if (value === "." && display.textContent === "") {
    display.textContent = "0";
  }

  // replace leading zero
  if (display.textContent === "0" && value !== ".") {
    display.textContent = value;
    return;
  }

  display.textContent += value;

  updateDecimalButtonState();
}

// =====================
// OPERATOR HANDLING
// =====================
function setOperator(op) {
  if (display.textContent === "") return;

  // chain calculations
  if (operator && !shouldResetDisplay) {
    calculate();
  }

  firstNumber = display.textContent;
  operator = op;
  shouldResetDisplay = true;
}

// =====================
// CALCULATE
// =====================
function calculate() {
  if (!operator) return;

  if (!shouldResetDisplay) {
    secondNumber = display.textContent;
  }

  if (secondNumber === "") {
    secondNumber = firstNumber;
  }

  let result = operate(operator, firstNumber, secondNumber);

  if (result === "Error") {
    updateDisplay("lol no (÷0)");
    reset();
    return;
  }

  // round long decimals
  result = Math.round(result * 100000) / 100000;

  updateDisplay(result);

  firstNumber = result;
  operator = null;
  shouldResetDisplay = true;

  updateDecimalButtonState();
}

// =====================
// RESET
// =====================
function reset() {
  firstNumber = "";
  secondNumber = "";
  operator = null;
  shouldResetDisplay = false;
  updateDisplay("0");

  updateDecimalButtonState();
}

// =====================
// BACKSPACE
// =====================
function backspace() {
  if (shouldResetDisplay) return;

  display.textContent = display.textContent.slice(0, -1);

  if (display.textContent === "") {
    display.textContent = "0";
  }

  updateDecimalButtonState();
}

// =====================
// DECIMAL BUTTON STATE
// =====================
function updateDecimalButtonState() {
  const decimalButton = document.querySelector(".decimal");
  if (!decimalButton) return;

  decimalButton.disabled = display.textContent.includes(".");
}

// =====================
// EVENT LISTENERS
// =====================

// digits
document.querySelectorAll(".digit").forEach((btn) => {
  btn.addEventListener("click", () => {
    appendNumber(btn.textContent);
  });
});

// operators
document.querySelectorAll(".operator").forEach((btn) => {
  btn.addEventListener("click", () => {
    setOperator(btn.textContent);
  });
});

// equals
document.querySelector(".equals").addEventListener("click", calculate);

// clear
document.querySelector(".clear").addEventListener("click", reset);

// backspace
document.querySelector(".backspace")?.addEventListener("click", backspace);

// decimal
document.querySelector(".decimal")?.addEventListener("click", () => {
  appendNumber(".");
});

// =====================
// KEYBOARD SUPPORT
// =====================
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key)) {
    appendNumber(key);
  }

  if (key === ".") appendNumber(".");

  if (key === "+") setOperator("+");
  if (key === "-") setOperator("-");
  if (key === "*") setOperator("*");
  if (key === "/") setOperator("/");

  if (key === "Enter" || key === "=") {
    e.preventDefault();
    calculate();
  }

  if (key === "Backspace") {
    backspace();
  }

  if (key.toLowerCase() === "c") {
    reset();
  }
});

// initialize
updateDisplay("0");
updateDecimalButtonState();