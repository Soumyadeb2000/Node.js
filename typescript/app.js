var num1elm = document.getElementById('number1');
var num2elm = document.getElementById('number2');
var button = document.querySelector('button');
var numberArray = [];
var stringArray = [];
function add(number1, number2) {
    var result;
    if (typeof number1 === 'number' && typeof number2 === 'number') {
        result = number1 + number2;
    }
    else if (typeof number1 === 'string' && typeof number2 === 'string') {
        result = number1 + " " + number2;
    }
    else {
        result = +number1 + +number2;
    }
    return result;
}
function printResult(object) {
    console.log(object.val, object.date);
}
button.onclick = function () {
    var num1 = num1elm.value;
    var num2 = num2elm.value;
    var result = add(+num1, +num2);
    var stringResult = add(num1, num2);
    printResult({ val: result, date: new Date });
    numberArray.push(result);
    printResult({ val: stringResult, date: new Date });
    stringArray.push(stringResult);
};
var promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve("hello");
    }, 1000);
});
promise.then(function (res) {
    console.log(res);
});
