// Append number to the result display
function appendNumber(number) {
  const result = document.getElementById('result');
  result.value += number;
}

// Append operator to the result display
function appendOperator(operator) {
  const result = document.getElementById('result');
  result.value += ` ${operator} `;
}

// Clear the result display
function clearResult() {
  document.getElementById('result').value = '';
}

// Calculate the result
function calculateResult() {
  const expression = document.getElementById('result').value;
  const result = calculate(expression);
  document.getElementById('result').value = result;
}

// Tokenize the input
function tokenize(expression) {
  return expression.match(/\d+\.?\d*|[+\-*/^]|sqrt|sin|cos|tan|log|ln|!|\(|\)/g);
}

// Convert to Reverse Polish Notation (RPN)
function infixToPostfix(tokens) {
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
  const output = [];
  const operators = [];

  tokens.forEach(token => {
      if (!isNaN(token)) {
          output.push(token);
      } else if (token in precedence) {
          while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
              output.push(operators.pop());
          }
          operators.push(token);
      } else if (token === '(') {
          operators.push(token);
      } else if (token === ')') {
          while (operators.length && operators[operators.length - 1] !== '(') {
              output.push(operators.pop());
          }
          operators.pop();
      } else {
          while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
              output.push(operators.pop());
          }
          operators.push(token);
      }
  });

  while (operators.length) {
      output.push(operators.pop());
  }

  return output;
}

// Evaluate the RPN expression
function evaluateRPN(tokens) {
  const stack = [];

  tokens.forEach(token => {
      if (!isNaN(token)) {
          stack.push(parseFloat(token));
      } else {
          const b = stack.pop();
          const a = stack.pop();
          switch (token) {
              case '+':
                  stack.push(a + b);
                  break;
              case '-':
                  stack.push(a - b);
                  break;
              case '*':
                  stack.push(a * b);
                  break;
              case '/':
                  stack.push(a / b);
                  break;
              case '^':
                  stack.push(Math.pow(a, b));
                  break;
              case 'sqrt':
                  stack.push(Math.sqrt(b));
                  break;
              case 'sin':
                  stack.push(Math.sin(b));
                  break;
              case 'cos':
                  stack.push(Math.cos(b));
                  break;
              case 'tan':
                  stack.push(Math.tan(b));
                  break;
              case 'log':
                  stack.push(Math.log10(b));
                  break;
              case 'ln':
                  stack.push(Math.log(b));
                  break;
              case '!':
                  stack.push(factorial(b));
                  break;
          }
      }
  });

  return stack[0];
}

// Calculate factorial
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
      result *= i;
  }
  return result;
}

// Main function to calculate the expression
function calculate(expression) {
  const tokens = tokenize(expression);
  const rpn = infixToPostfix(tokens);
  const result = evaluateRPN(rpn);
  return result;
}

// Scientific functions
function calculateSquareRoot() {
  const result = document.getElementById('result');
  result.value += ' sqrt ';
}

function calculatePower() {
  const result = document.getElementById('result');
  result.value += ' ^ ';
}

function calculateTrig(func) {
  const result = document.getElementById('result');
  result.value += ` ${func} `;
}

function calculateLog() {
  const result = document.getElementById('result');
  result.value += ' log ';
}

function calculateLn() {
  const result = document.getElementById('result');
  result.value += ' ln ';
}

function calculateFactorial() {
  const result = document.getElementById('result');
  result.value += ' ! ';
}
