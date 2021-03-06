let operator
let firstNum = '';
let secondNum = '';

let displayText = document.getElementById('displayText');

const nums = document.querySelectorAll('#numbers button');
const operators = document.querySelectorAll('#operators button');
const clear = document.getElementById('clear');

nums.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (operator == null) {
            if (!(e.target.classList.contains('inUse'))) {
                firstNum += button.textContent;
                displayText.textContent = firstNum;
            }
        } else if (operator === 'equals' && firstNum !== '') {
            if (!(e.target.classList.contains('inUse'))) {
                firstNum = '';
                operator = undefined;
                firstNum += button.textContent;
                displayText.textContent = firstNum;
            }
        } else {
            if (!(e.target.getAttribute('class') === 'inUse')) {
                secondNum += button.textContent;
                displayText.textContent = secondNum;
            }
        }

        if (button.getAttribute('id') === 'decimal') {
            e.target.classList.add('inUse');
        }
    });
});

operators.forEach((button) => {
    button.addEventListener('click', (e) => {
        for (let i=0; i<operators.length; i++) {
            if (operators[i].getAttribute('class') === 'active') {
                operators[i].classList.remove('active');
            } else {
                continue;
            }
        }
        e.target.classList.add('active');
        if (operator == null || operator === 'equals') {
            operator = button.getAttribute('id');
            document.getElementById('decimal').classList.remove('inUse');
        } else if (button.getAttribute('id') === 'clear') {
            document.getElementById('decimal').classList.remove('inUse');
        } else if (secondNum === '') {
            displayText.textContent = firstNum;
            operator = button.getAttribute('id');
        } else {
            operate(operator, firstNum, secondNum);
            operator = button.getAttribute('id');
            document.getElementById('decimal').classList.remove('inUse');
        }
    });
});

function operate(op, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    switch(op) {
        case 'add':
            firstNum = Number(add(num1,num2).toFixed(8));
            secondNum = '';
            break;
        case 'subtract':
            firstNum = Number(subtract(num1,num2).toFixed(8));
            secondNum = '';
            break;
        case 'multiply':
            firstNum = Number(multiply(num1,num2).toFixed(8));
            secondNum = '';
            break;
        case 'divide':
            if (num2 === 0) {
                firstNum = 'No No No No No, Restart';
                operator = 'equals';
                secondNum = '';
                break;
            } else {
                firstNum = Number(divide(num1,num2).toFixed(8));
                secondNum = '';
                break;
            }
        default:
            break;
    }
    
    displayText.textContent = firstNum;
}

function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    if (b===0) {
        return 'No No No No No No';
    } else {
        return a/b;
    }
}

clear.addEventListener('click', (e) => {
    operator = undefined;
    firstNum = '';
    secondNum = '';
    displayText.textContent = '';
    document.getElementById('clear').classList.remove('active');
});

document.getElementById('equals').addEventListener('click', (e) => {
    document.getElementById('equals').classList.remove('active');
});