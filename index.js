/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

//get user input from input box
//generate new html to put inside boxes
//render new boxes

const errorEl = document.querySelector("#error");
const inputEl = document.querySelector("#main-input");
const unitEl = document.querySelectorAll(".unit-footer");
const btnEl = document.querySelector("#convert-btn");
const unitArr = [["meters", "feet"], ["liters", "gallons"], ["kilograms", "pounds"]]

btnEl.addEventListener("click", function() {
    getInput();
});

function getInput() {
    let input = inputEl.value;
    let inputArr = [];
    if (!input) {
        generateError("Please enter something");
    } else if (Number(input) != input) {
        generateError("Please enter a proper number");
    } else {
        generateError("");
        inputArr.push(convert(input, "length"));
        inputArr.push(convert(input, "volume"));
        inputArr.push(convert(input, "mass"));
        render(input, inputArr);
    }
}

function generateError(message) {
    errorEl.innerHTML = `${message}`
}

function render(value, inputArr) {
    unitEl.forEach((el, index) => {
        el.textContent = `
                ${value} ${unitArr[index][0]} = ${inputArr[index][0]} ${unitArr[index][1]} |
                ${value} ${unitArr[index][1]} = ${inputArr[index][1]} ${unitArr[index][0]}
            `
    })
}

function convert(value, target) {
    switch (target) {
        case "length":
            return [roundTo(value * 3.281, 3), roundTo(value / 3.281, 3)];
        case "volume":
            return [roundTo(value * 0.264, 3), roundTo(value / 0.264, 3)];
        case "mass":
            return [roundTo(value * 2.204, 3), roundTo(value / 2.204, 3)];
    }
}

function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
        n = (n * -1).toFixed(digits);
    }
    return n;
}