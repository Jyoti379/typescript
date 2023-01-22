var num1Element = document.getElementById('num1');
var num2Element = document.getElementById('num2');
var buttonElement = document.querySelector('button');
var numResults = [];
var textResults = [];
function add(num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + ' ' + num2;
    }
    return +num1 + +num2;
}
/*function printResults(resultObj:{val:number;timestamp:Date}){
    console.log(resultObj.val)
}*/
/*function printResults(resultObj:Result){
    console.log(resultObj.val)
}*/
function printResults(resultObj) {
    console.log(resultObj.val);
}
buttonElement.addEventListener('click', function () {
    var num1 = num1Element.value;
    var num2 = num2Element.value;
    var result = add(+num1, +num2);
    var stringResult = add(num1, num2);
    printResults({ val: result, timestamp: new Date() });
    console.log(result);
    numResults.push(result);
    console.log(stringResult);
    textResults.push(stringResult);
    console.log(numResults, textResults);
});
