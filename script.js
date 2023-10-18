
const buttons = document.querySelectorAll("button");
const result = document.querySelector(".result");

// Переменные для хранения текущего и предыдущего значений
let currentOperand = "";
let previousOperand = "";
let operation = undefined;

// Функция для обновления дисплея результата
function updateDisplay() {
  result.textContent = currentOperand;
}

// Функция для выполнения операции
function performOperation() {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
      case "+":
        currentOperand = (prev + current).toString();
        break;
      case "-":
        currentOperand = (prev - current).toString();
        break;
      case "x":
        currentOperand = (prev * current).toString();
        break;
      case "/":
        currentOperand = (prev / current).toString();
        break;
      default:
        return;
    }
    operation = undefined;
    previousOperand = "";
  }
  
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonText = button.textContent;
  
      if (buttonText === "=") {
        if (previousOperand && operation && currentOperand) {
          performOperation();
          previousOperand = currentOperand;
          operation = undefined;
          updateDisplay();
        }
      } else if (buttonText === "AC") {
        currentOperand = "";
        previousOperand = "";
        operation = undefined;
        updateDisplay();
      } else if (buttonText === "+/-") {
        currentOperand = (parseFloat(currentOperand) * -1).toString();
        updateDisplay();
      } else if (buttonText === "%") {
        currentOperand = (parseFloat(currentOperand) / 100).toString();
        updateDisplay();
      } else if (["+", "-", "x", "/"].includes(buttonText)) {
        if (previousOperand && currentOperand) {
          performOperation();
          previousOperand = currentOperand;
          operation = buttonText;
          currentOperand = "";
        } else {
          operation = buttonText;
          if (currentOperand) {
            previousOperand = currentOperand;
            currentOperand = "";
          }
        }
      } else if (currentOperand.length < 11) { // Проверка на максимальную длину
        currentOperand += buttonText;
        updateDisplay();
      }
    });
  });

  function updateDisplay() {
    // Проверяем, если результат слишком длинный
    if (currentOperand.length > 11) {
      result.textContent = "Ошибка";
    } else {
      result.textContent = currentOperand;
    }
  }