const topDisplay = document.querySelector('.top-display');
const bottomDisplay = document.querySelector('.bottom-display');
const allButtons = document.querySelectorAll('.buttons');
const mathFuncs = ['+', '-', '*', '/'];

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}

let a = '';
let b = '';
let operation = '';
let topString = '';
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
            if (val1 === 0 || val2 === 0) return "Infinity";
            return String(val1 / val2);
    }
}

const variablesUpdater = (value) => {
    const mathAsses = mathFuncs.includes(value)
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

const displayUpdate = (event) => {
    const value = event ? event : '';
    const isOperation = mathFuncs.includes(value)
    topString += isOperation ? ` ${value} ` : `${value}`;
    if (mathFuncs.includes(value)) bottomContent = "";
    else bottomContent += value;
    bottomDisplay.value = bottomContent;
    topDisplay.textContent = topString;
}

const clearCall = () => {
    a = b = operation = topString = bottomContent = last = '';
    hasEqual = false;
    displayUpdate('');
}

const findKey = (event) => {
    if (event.type === "keydown") {
        const foundKey = document.querySelector(`.buttons[data-key="${event.key}"]`);
        if (!foundKey) return;
        return event.key;
    } else return event.target.dataset.key;
}

const equalCall = () => {
    topString += ' = ';
    bottomContent = '';
    let result = operate(a, b, operation);
    displayUpdate(result);
    hasEqual = true;
}

const backspace = () => {
    if (last === 'a') a = a.slice(0, -2);
    else if (last === 'b') b = b.slice(0, -2);
    else if (last === 'operation') operation = '';
    topString = topString.slice(0, -1);
    bottomContent = bottomContent.slice(0, -1);
    topDisplay.textContent = ` ${topString} `;
    bottomDisplay.value = bottomContent;
}

const main = (event) => {
    let key = findKey(event);
    if (!key) return;
    if (hasEqual) clearCall();
    if (key === 'Backspace') backspace();
    else if (key === '=') equalCall();
    else if (key === 'Escape') clearCall();
    else {
        variablesUpdater(key);
        displayUpdate(key);
    }
}

allButtons.forEach(button => button.addEventListener('click', main))
window.addEventListener('keydown', main)
