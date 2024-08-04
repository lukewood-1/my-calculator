let num1;
let operator;
let num2;

function add(a, b){
	return +a + +b
};

function subtract(a, b){
	return +a - +b
};

function multiply(a, b){
	return +a * +b
};

function divide(a, b){a
	return +a / +b
};

function operate(num1, operator, num2){
	switch (operator){
		case '+':
			return input.value = add(num1, num2);
		case '-':
			return input.value = subtract(num1, num2);
		case '*':
			return input.value = multiply(num1, num2);
		case '/':
			return input.value = divide(num1, num2);
		default:
			alert("This calculator needs two numbers and an aritmethic operator to work, just like in school math.");
	}
};

//populate buttons and operators
const input = document.querySelector('input');
const btns = document.querySelectorAll('.numbers');
btns.forEach(i => i.addEventListener('click', e => {
	if(input.value.includes('.')) {
		btns[10].disabled = true;
		input.value += e.target.textContent;
		input.focus();
	} else {
		btns[10].disabled = false;
		input.value += e.target.textContent;
		input.focus();
	}
})
);

//clear button
function allClear(){
	input.value = null;
	num1 = null;
	num2 = null;
	operator = null;
	input.placeholder = '';
};

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
	allClear();
	input.focus();
});

// result button
const resultBtn = document.querySelector('.result');
resultBtn.addEventListener('click', e => {
	num2 = +input.value;
	if(Number.isInteger(num2)) num2 = parseFloat(num2).toFixed(2);
	if(num2 === 0){
		alert(`You tried to divide ${num1} by 0? Anything divided by zero equals zero, mate.`);
		allClear();
		input.focus();
	};
	if (e.target.value.includes('.'))btns[10].disabled = true
	else {
		operate(num1, operator, num2);
		input.focus();
	}
});

// add operators function to populate variables
const operators = document.querySelectorAll('.operators');
operators.forEach(i => i.addEventListener('click', e => {
	num1 = +input.value;
	if(!Number.isInteger(num1)) num1 = parseFloat(num1).toFixed(2);
	input.value = null;
	operator = e.target.textContent;
	input.placeholder = num1 + ' ' + operator;
	input.focus();
})
);

// del button
const delBtn = document.querySelector('.del');
delBtn.addEventListener('click', () => {
	input.value = input.value.slice(0, -1);
	input.focus();
});

// Extra credit -  Keyboard support
const numEx = /^[\d\.]$/;
const operatorEx = /[-*+\/]/;
const mouseClick = new PointerEvent('click');

input.addEventListener('keypress', e => {
		if(e.key === '.'){
			if(e.target.value.includes('.'))  e.preventDefault()
				}
		else if(e.key === 'Enter'){
				resultBtn.dispatchEvent(mouseClick);
				e.preventDefault();
		} else if(e.key === ' ') allClear()
		else if(operatorEx.test(e.key)){
			switch(e.key){
				case '*':
					operators[1].dispatchEvent(mouseClick);
					e.preventDefault();
					break;
				case '/':
					operators[0].dispatchEvent(mouseClick);
					e.preventDefault();
					break;
				case '+':
					operators[3].dispatchEvent(mouseClick);
					e.preventDefault();
					break;
				case '-':
					operators[2].dispatchEvent(mouseClick);
					e.preventDefault();
					break;
			};
		} else if(!numEx.test(e.key)){
      e.preventDefault();
    }
});

const container = document.querySelector('.container');
document.addEventListener('DOMContentLoaded', ()=> input.focus());

// prevent multiple dots
input.addEventListener('input', e => {
	if(e.target.value.includes('.'))btns[10].disabled = true;
})
