// Bind key events
document.addEventListener("DOMContentLoaded", addListeners);

function addListeners() {
  const keys = document.querySelectorAll(".keypad .key");

  keys.forEach((key) => key.addEventListener("click", onClick));
}

function onClick(e) {
  e.preventDefault();

  const val = e.target.getAttribute("data-val");

  switch (val) {
    // Operations
    case "op-mod":
      return handleOp("%");
    case "op-divide":
      return handleOp("/");
    case "op-mul":
      return handleOp("*");
    case "op-sub":
      return handleOp("-");
    case "op-add":
      return handleOp("+");
    case "op-eqls":
      return handleEquals();
    case "sign":
      return toggleSign();
    case "clear":
      return handleClear();
    case "dot":
      return handleDot();
    default:
      return handleNumIp(val);
  }
}

let userInput = [];
let isLastKeyOp = false;

const inputField = document.querySelector(".text-input");
inputField.addEventListener("keypress", onKeypress);

function onKeypress(e) {
  const charCode = e.charCode;

  // charCode for `0` => 48 and `9` => 57 and `.` => 46
  if (charCode !== 46 && (charCode < 48 || charCode > 57)) {
    e.preventDefault();
  } else if (charCode === 46 && inputField.value.indexOf(".") > -1) {
    e.preventDefault();
  }

  console.log("e =-----> ", e.charCode);
}

function handleClear() {
  userInput = [];
  inputField.value = "";
}

function handleNumIp(val) {
  const match = val.match(/^num-(\d)/);

  if (match) {
    if (isLastKeyOp) {
      isLastKeyOp = false;
      inputField.value = match[1];
    } else {
      if (inputField.value === "0") {
        inputField.value = match[1];
      } else {
        inputField.value += match[1];
      }
    }
  }
}

function handleDot() {
  const val = inputField.value;

  if (isLastKeyOp) {
    isLastKeyOp = false;
    inputField.value = `0.`;
  } else if (val.indexOf(".") === -1) {
    inputField.value = val.length ? `${val}.` : `0.`;
  }
}

function handleOp(op) {
  if (isLastKeyOp) {
    userInput.pop();
  }

  userInput.push(inputField.value);
  userInput.push(op);
  isLastKeyOp = true;
}

function toggleSign() {
  const val = inputField.value;

  if (val && !isNaN(val)) {
    inputField.value = val.startsWith("-") ? val.substr(1) : `-${val}`;
  }
}

function handleEquals() {
  try {
    if (isLastKeyOp) {
      userInput.pop();
    } else {
      userInput.push(inputField.value);
    }

    const res = eval(userInput.join(""));

    if (!isNaN(res)) {
      inputField.value = res;
      userInput = [];
    }
  } catch (e) {
    console.log("Error: =-----> ", e);
  }
}
