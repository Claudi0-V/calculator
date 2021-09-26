const topDisplay = document.querySelector('#top-display');
const bottomDisplay = document.querySelector('#bottom-display');
const allButtons = document.querySelectorAll('.buttons');
const mathFuncs = ['+', '-', '*', '/'];
const inputvalue = document.querySelector('#input-number');
let a = '';
let b = '';
let operation = '';
let topString ='';
let bottomContent = '';
let last;
let hasEqual;

const operate = (a, b, func) => {
	let val1 = parseFloat(a);
	let val2 = parseFloat(b);
	switch (func) {
		case mathFuncs[0]:
			return val1 + val2;
		case mathFuncs[1]:
			val1 - val2;
		case mathFuncs[2]:
			return val1 * val2;
		case mathFuncs[3]:
			return (a === 0 || b === 0 ) ? 
				"Infinity" :  a / b ;
	}
}

const variablesUpdater = value => {
	let mathAsses = mathFuncs.includes(value);
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
		if (!foundKey) return undefined;
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

