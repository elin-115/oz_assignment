function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function calculate(formula) {
    // 숫자, 소수점, 사칙연산 기호, 띄어쓰기 말고 다른 글자가 있으면 에러
    if (/[^0-9.+\-*/\s]/.test(formula)) {
        return "숫자와 사칙연산 기호(+, -, *, /)만 입력할 수 있습니다.";
    }

    // 숫자(소수 포함)와 사칙연산 기호를 골라내서 배열로 만든다 → 띄어쓰기와 상관없이 계산 가능
    const tokens = formula.match(/\d+(\.\d+)?|[+\-*/]/g) || [];
    if (tokens.length < 3 || tokens.length % 2 === 0) {
        return "잘못된 계산식이 입력되었습니다.";
    }

    // 1단계: 곱셈과 나눗셈 먼저 처리
    const intermediateTokens = [];
    let i = 0;
    while (i < tokens.length) {
        const token = tokens[i];
        if (token === "*" || token === "/") {
            const left = Number(intermediateTokens.pop());
            const operator = token;
            const right = Number(tokens[i + 1]);

            if (isNaN(left) || isNaN(right)) return "잘못된 숫자가 입력되었습니다.";

            let res;
            if (operator === "*") {
                res = multiply(left, right);
            } else {
                if (right === 0) return "0으로 나눌 수 없습니다.";
                res = divide(left, right);
            }
            intermediateTokens.push(res);
            i += 2; // 연산자와 오른쪽 피연산자 건너뜀
        } else {
            intermediateTokens.push(token);
            i++;
        }
    }

    // 2단계: 덧셈과 뺄셈 처리
    let result = Number(intermediateTokens[0]);
    if (isNaN(result)) return "잘못된 숫자가 입력되었습니다.";

    for (let j = 1; j < intermediateTokens.length; j += 2) {
        const operator = intermediateTokens[j];
        const nextValue = Number(intermediateTokens[j + 1]);

        if (isNaN(nextValue)) return "잘못된 숫자가 입력되었습니다.";

        if (operator === "+") {
            result = add(result, nextValue);
        } else if (operator === "-") {
            result = subtract(result, nextValue);
        } else {
            return `예외 발생: ${operator}`;
        }
    }
    return result;
}


// button Event
// togglePower       (ON/OFF)
// clearDisplay      (C)
// appendOperator    (/, *, -, +)
// appendNumber      (0 ~ 9 , .)
// performCalculate  (Enter)

const display = document.querySelector("#display");
const powerButton = document.querySelector(".on-off");  // ON/OFF 버튼
let isOn = true;    // 켜진 상태로 시작

function appendNumber(num) {
    if (!isOn) return;   // 꺼져 있으면 아무것도 안 하고 끝내기

    // 화면이 Error면 → 처음부터 새로 시작 ("0"으로 돌려놓고 아래 규칙대로 진행)
    if (display.value === "Error"){
        display.value = "0";
    }

    // 점을 눌렀는데, 지금 입력 중인 숫자에 이미 점이 있으면 → 아무것도 안 하고 끝내기
    if (num === "."){
        const lastNumber = display.value.split(/[+\-*/]/).at(-1);
        if (lastNumber.includes(".")) {
            return;
        }
    }

    // 화면이 "0"이고, 누른 버튼이 "."이 아니면 → 바꾸기
    if (display.value === "0" && num !== ".") {
        display.value = num;
    } else {
        // 그 외에는 전부 뒤에 붙이기 (0 다음 "."도 여기로 와서 "0."이 됨)
        display.value += num;
    }
}

function appendOperator(op) {
    if (!isOn) return;   // 꺼져 있으면 아무것도 안 하고 끝내기

    if (display.value === "Error"){
        display.value = "0";
    }

    // 화면의 마지막 글자 꺼내기
    const lastChar = display.value.at(-1);

    // 마지막 글자가 기호(+ - * /) 중 하나인지 확인
    if ("+-*/".includes(lastChar)) {
        // 기호면 → 마지막 글자를 잘라내고 새 기호 붙이기
        display.value = display.value.slice(0, -1) + op;
    } else {
        // 기호가 아니면(숫자면) → 그냥 붙이기
        display.value += op;
    }
}

function clearDisplay() {
    if (!isOn) return;   // 꺼져 있으면 아무것도 안 하고 끝내기
    display.value = "0"
}

function performCalculate() {
    if (!isOn) return;   // 꺼져 있으면 아무것도 안 하고 끝내기
    const result = calculate(display.value)

    // calculate()는 계산이 안 되면 에러 문장(문자열)을 돌려줌
    if (typeof result === "string"){
        console.log(`에러 발생: ${result}`);   // 자세한 이유는 콘솔애
        display.value = "Error";             // 화면에는 짧게
    } else {
        display.value = result;
    }
}

function togglePower() {
    // true ↔ false 뒤집기
    isOn = !isOn;

    powerButton.classList.toggle("on");

    // 켜지면 0, 꺼지면 화면 비우기
    if(isOn){
        display.value = "0";
    } else {
        display.value = "";
    }
}