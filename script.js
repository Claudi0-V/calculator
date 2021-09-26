const topDisplay = document.querySelector('#top-display');
const bottomDisplay = document.querySelector('#bottom-display');
const allButtons = document.querySelectorAll('.buttons');
const mathFuncs = ['+', '-', '*', '/'];

let operand1 = '';
let operand2 = '';
let operation = '';
let topString ='';
let bottomContent = '';
let last;
let hasEqual;

const operate = (a, b, func) => {
	const val1 = parseFloat(a);
	const val2 = parseFloat(b);
	switch (func) {
		case mathFuncs[0]:
			return val1 + val2;
		case mathFuncs[1]:
			return val1 - val2;
		case mathFuncs[2]:
			return val1 * val2;
		case mathFuncs[3]:
			return (a === 0 || b === 0 ) ? 
				"Infinity" :  a / b ;
	}
}

const variablesUpdater = value => {
	let mathAsses = mathFuncs.includes(value);
	//if is an operator and the operand1 the operand2, and the operation 
    //aren't empty this means that is a new operation
	if (mathAsses && operand1 && operand2 && operation) {
		operand1 = operate(operand1, operand2, operation);
		operand2 = '';
	} else if (!operand2 && !mathAsses && !operation) {
		operand1 += value;
		last = 'operand1'
	} else if (mathAsses) {
		operation = value;
		last = 'operation'
	} else {
		operand2 += value
		last = 'operand2';
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
	operand1 = operand2 = operation = topString = bottomContent = last = '';
	hasEqual = false;
	displayUpdate('');
}


const findKey = e => {
	let keyfound;
	if (e.type === "keydown") {
		const foundKey = document.querySelector(`.buttons[data-key="${event.key}"]`);
		if (!foundKey) return undefined;
		keyfound = e.key;
	} else keyfound = e.target.dataset.key;
	return keyfound;
}

const equalCall = () => {
	topString += ' = ';
	bottomContent = '';
	let result = operate(operand1,operand2,operation);
	displayUpdate(result);
	hasEqual = true;
}

const backspace = () => {
	if (last === 'a') operand1 = operand1.slice(0,-2);
	else if (last === 'b') operand2 = operand2.slice(0,-2);
	else if (last === 'operation') operation = '';
	topString = topString.slice(0, -1);
	bottomContent = bottomContent.slice(0, -1);
	topDisplay.textContent = ` ${topString} `;	
	bottomDisplay.textContent = bottomContent;
}

const main = e => {
	let key = findKey(e);
	if (!key) return;
	if (hasEqual) clearCall();
	else if (key === 'Backspace') backspace();
	else if (key === '=') equalCall();
	else if (key === 'Escape') clearCall();
	else {
		variablesUpdater(key);
		displayUpdate(key);}
}

allButtons.forEach(button => button.addEventListener('click', main));
window.addEventListener('keydown', main);
