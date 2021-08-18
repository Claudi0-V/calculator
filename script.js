const topDisplay = document.querySelector('#top-display');
const bottomDisplay = document.querySelector('#bottom-display');
const funcButtons = document.querySelectorAll('.func-btn');
const numButtons = document.querySelectorAll('.num-buttons');
const clearButton = document.getElementById('clear');
const mathFuncs = ['+', '-', '*', '/'];
const equalButton = document.querySelector('#equal');
const backButton = document.querySelector('#back')

let a = '';
let b = '';
let operation = '';
let topString ='';
let bottomContent = '';
let last

const add = (a, b) => a + b;
const subtract = (a, b) =>  String(a - b);
const multiply = (a, b) => a * bs;
const divide = (a, b) => {	
	if (a === 0 || b === 0 ) {
		return "Infinity"
	}
	return String(a / b);
}

function operate(a, func, b) {
	let val1 = parseFloat(a);
	let val2 = parseFloat(b);
	switch (func) {
		case mathFuncs[0]:
			return add(val1,val2)
		case mathFuncs[1]:
			return subtract(val1,val2)
		case mathFuncs[2]:
			return multiply(val1,val2)
		case mathFuncs[3]:
			return divide(val1,val2)
	}
}


function variablesUpdater(value) {
	let mathAsses = mathFuncs.includes(value)
	if (mathAsses && a && b && operation) {
		a = operate(a,operation,b);
		b = '';
	} else if (!b && !mathAsses && !operation) {
		a += value;
		last = 'a'
	 } else if (mathAsses) {
	 	operation = value;
	 	last = 'operation'
	 } else {
	 	b += value
	 	last = 'b';
	 }
}


function displayUpdate(e) {
	console.log()
	let value = !e ? '' : e;
	topString += mathFuncs.includes(value) ? ` ${value} ` : `${value}`;
	if (mathFuncs.includes(value)) {
		bottomContent  = value;
	} else {
	bottomContent += value;
	}
	bottomDisplay.textContent = bottomContent;
	topDisplay.textContent = ` ${topString} `;
	
}

function clearCall() {
	a = '';
	b = '';
	operation = '';
	topString = '';
	bottomContent = '';
	last = '';
	displayUpdate('');
}

function main(e) {
	const key = e.target.dataset.key;
	variablesUpdater(key);
	displayUpdate(key);
}

function equalCall() {
	topString += ' = ';
	bottomContent = '';
	let result = operate(a,operation,b);
	displayUpdate(result)
}

function backspace() {
	console.log('backspace')
	if (last === 'a') {
		a = a.slice(0,-2);
	} else if (last === 'b') {
		b = b.slice(0,-2);
	} else if (last === 'operation') {
		operation = '';
	}
	topString = topString.slice(0, -1);
	bottomContent = bottomContent.slice(0, -1);
	topDisplay.textContent = ` ${topString} `;	
	bottomDisplay.textContent = bottomContent;
}

backButton.addEventListener('click', backspace)
numButtons.forEach(button => button.addEventListener('click', main))
funcButtons.forEach(button => button.addEventListener('click', main))
clearButton.addEventListener('click',clearCall)
equalButton.addEventListener('click', equalCall)