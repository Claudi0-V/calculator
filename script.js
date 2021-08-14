const add = (a, b) => a + b;
const subt = (a, b) =>  a - b;
const mult = (a, b) => a * b;
const divide = (a, b) => {	
	if (a === 0 || b === 0 ) {
		return 
	}
	return a / b;
}
const operate = (func, a, b) => func(a,b);
