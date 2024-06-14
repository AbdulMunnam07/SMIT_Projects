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
  return expression.match(/\d+\.?\d*|[+\-*/]/g);
}

// Convert to Reverse Polish Notation (RPN)
function infixToPostfix(tokens) {
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
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
          }
      }
  });

  return stack[0];
}

// Main function to calculate the expression
function calculate(expression) {
  const tokens = tokenize(expression);
  const rpn = infixToPostfix(tokens);
  const result = evaluateRPN(rpn);
  return result;
}
