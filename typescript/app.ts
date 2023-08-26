const num1elm = document.getElementById('number1') as HTMLInputElement;
const num2elm = document.getElementById('number2') as HTMLInputElement;
const button = document.querySelector('button')!;
const numberArray: number[] = [];
const stringArray: string[] = [];

type numOrString = number | string;
type Result = { val: number | string; date: Date};

interface resultInf {
    val: numOrString;
    date: Date
}

function add(number1: numOrString, number2: numOrString){
    let result: numOrString;
    if(typeof number1 === 'number' && typeof number2 === 'number'){
         result = number1 + number2;
    }
    else if(typeof number1 === 'string' && typeof number2 === 'string') {
         result = number1 + " " + number2;
    }
    else {
         result = +number1 + +number2;
    }
    return result
    
}

function printResult(object: resultInf) {
    console.log(object.val, object.date);
}

button.onclick = () => {
    const num1 = num1elm.value
    const num2 = num2elm.value
    const result = add(+num1, +num2);
    const stringResult = add(num1, num2)
    printResult({val: result, date: new Date})
    numberArray.push(result as number)
    printResult({val: stringResult, date: new Date})
    stringArray.push(stringResult as string)
}

const promise = new Promise<string>((resolve , reject) => {
    setTimeout(() => {
        resolve("hello")
    }, 1000)   
});

promise.then((res) => {
    console.log(res);
});
