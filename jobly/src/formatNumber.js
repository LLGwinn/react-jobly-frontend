function addCommas(num) {
    const stringArr = num.toString().split("");
    const decimalIdx = stringArr.indexOf('.');
    let numBeforeDecimal;
    let numAfterDecimal;
    if (decimalIdx >= 0) {
        numBeforeDecimal = stringArr.slice(0, decimalIdx);
        numAfterDecimal = stringArr.slice(decimalIdx);
    } else {
        numBeforeDecimal = stringArr;
        numAfterDecimal = null
    }
    const arrLength = numBeforeDecimal.length;

    for (let i = arrLength; i > 3; i=i-3) {
        if (numBeforeDecimal[i - 4] !== '-') {
            numBeforeDecimal.splice(i - 3, 0, ',');
        }
    }

    const result = numAfterDecimal !== null ? 
        numBeforeDecimal.join('').concat(numAfterDecimal.join('')) : numBeforeDecimal.join('');
    return result;
}

export default addCommas;