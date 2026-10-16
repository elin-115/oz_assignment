// 산술 연산자(Arithmetic Operator) : 숫자 계산

let n1 = 10;
let n2 = 3;

console.log(n1 + n2);
console.log(n1 - n2);
console.log(n1 * n2);
console.log(n1 / n2);

// 나머지
console.log(n1 % n2);
// 몫 : 나눗셈을 하고, 몫만 취하고 나머지는 버림
console.log(Math.floor(n1 / n2));


// 비교 연산자 : 값의 크기를 비교 (크다, 같다, 작다)
// 결과 -> boolean
console.log(10 > 5);     // true
console.log(10 >= 5);    // true
console.log(10 < 5);     // false
console.log(10 <= 5);    // false

let result = 10 > 5;
console.log(result)      // true

// 동등 비교 : 두 값이 같은지 비교
console.log(10 == 10);
console.log(10 == "10");    // js는 동등 비교시, 자료형이 다르면 String 취급
// 자료형까지 비교
console.log(10 === "10");


// SQL, 엑셀 -> CONCAT
// concatenate : 연결하다
let first = "Alex";
let lastName = "Kim";

console.log("Hello, " + first + " " + lastName + "!")
console.log(10 + "10")  // 1010

// 논리 연산자
let age = 20;
let hasId = true;

console.log(age >= 19 && hasId);    // AND
console.log(age >= 19 || hasId);    // OR
console.log(!hasId);                // NOT
