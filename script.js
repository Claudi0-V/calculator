const topDisplay = document.querySelector('#top-display');
const bottomDisplay = document.querySelector('#bottom-display');
const allButtons = document.querySelectorAll('.buttons');
const mathFuncs = ['+', '-', '*', '/'];

let a = '';
let b = '';
let operation = '';
let topString ='';
let bottomContent = '';
let last;
let hasEqual;

const add = (a, b) => a + b;
const subtract = (a, b) =>  a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {	
	if (a === 0 || b === 0 ) {
		return "Infinity"
	}
	return String(a / b);
}

const operate = (a, b, func) => {
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

const variablesUpdater = value => {
	let mathAsses = mathFuncs.includes(value)
	if (mathAsses && a && b && operation) {
		a = operate(a, b, operation);
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


const displayUpdate = e => {
	let value = !e ? '' : e;
	topString += mathFuncs.includes(value) ? ` ${value} ` : `${value}`;
	if (mathFuncs.includes(value)) bottomContent  = value;
	else bottomContent += value;
	bottomDisplay.textContent = bottomContent;
	topDisplay.textContent = ` ${topString} `;
}

const clearCall = () => {
	a = b = operation = topString = bottomContent = last = '';
	hasEqual = false;
	displayUpdate('');
}


const findKey = e => {
	let keyfound;
	if (e.type === "keydown") {
		const foundKey = document.querySelector(`.buttons[data-key="${event.key}"]`);
		if (!foundKey) return;
		keyfound = e.key;
	} else keyfound = e.target.dataset.key;
	return keyfound;
}

const equalCall = () => {
	topString += ' = ';
	bottomContent = '';
	let result = operate(a,b,operation);
	displayUpdate(result);
	hasEqual = true;
}

const backspace = () => {
	if (last === 'a') a = a.slice(0,-2);
	else if (last === 'b') b = b.slice(0,-2);
	else if (last === 'operation') operation = '';
	topString = topString.slice(0, -1);
	bottomContent = bottomContent.slice(0, -1);
	topDisplay.textContent = ` ${topString} `;	
	bottomDisplay.textContent = bottomContent;
}

const main = e => {
	if (hasEqual) clearCall();
	let key = findKey(e);
	if (!key) return;
	else if (key === 'Backspace') backspace();
	else if (key === '=') equalCall();
	else if (key === 'Escape') clearCall();
	else {
		variablesUpdater(key);
		displayUpdate(key);}
}

allButtons.forEach(button => button.addEventListener('click', main))
window.addEventListener('keydown', main)