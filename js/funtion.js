// 함수 (funtion)
// 입력 -> 처리 -> 출력

// 입력: n1, n2
// 처리: n1 + n2
// 출력: N

// 함수를 정의
function add(n1, n2){
    return n1 + n2
}

// 함수 호출(call) -> 실행
let result = add(2, 4);
console.log(result);

let foo = add;
console.log(foo(4,2));

function runFunction(f, arg1, arg2) {
    return f(arg1, arg2)    // add(4, 2)
}

let result2 = runFunction(add, 4, 2)
console.log(result2);


// 1. 모든 함수는 값을 "반드시" 반환한다.
// 2. 함수를 정의할 때, return 생략
//    a) 생략하면, return undefined
//    b) 파이썬은, return None
function sayHello() {
    console.log("hello");
    // return undefined
}

let hello = sayHello();     // Hello
console.log(hello);         // undefined