# JavaScript 기초

JavaScript 기본 문법을 학습하며 정리한 내용입니다.

[← README로 돌아가기](README.md)

## 목차

0. [JavaScript란? / 실행 방법](#0-javascript란--실행-방법)
1. [자료형](#1-자료형)
2. [변수 선언](#2-변수-선언)
3. [연산 방법](#3-연산-방법)
4. [비교 연산](#4-비교-연산)
5. [논리 연산](#5-논리-연산)
6. [문자열 연산](#6-문자열-연산)
7. [조건문](#7-조건문)
8. [반복문](#8-반복문)
9. [배열](#9-배열)
10. [객체 자료형](#10-객체-자료형)
11. [부록: 함수](#11-부록-함수)
12. [실습 파일](#12-실습-파일)

---

## 0. JavaScript란? / 실행 방법

웹 브라우저에서 동작하는 프로그래밍 언어입니다. 버튼 클릭, 입력 처리, 화면 변경을 담당합니다.

> **HTML**: 구조 / **CSS**: 디자인 / **JS**: 동작

| 실행 방법 | 방법 | 용도 |
| --- | --- | --- |
| 개발자 도구 Console | Mac `Option + Command + I` / Windows `F12` → Console 탭 | 문법 연습, 값 확인, 에러 확인 |
| `<script>` 태그 | HTML 안에 `<script> ... </script>` | 브라우저가 HTML을 읽다가 만나면 실행 |
| JS 파일 분리 | `<script src="app.js"></script>` | 코드를 `.js` 파일로 따로 관리 |
| Node.js | 터미널에서 `node app.js` | 브라우저 없이 JS만 실행 |

```html
<script>
    console.log("Hello");
</script>

<script src="../js/app.js"></script>
```

**Node.js 설치**

```bash
brew install node   # macOS
node -v             # 설치 확인
npm -v              # Node.js용 패키지 관리자
```

> `//` 뒤는 한 줄 주석, `/* */` 사이는 여러 줄 주석입니다. `console.log()`는 괄호 안의 값을 콘솔에 출력합니다.

---

## 1. 자료형

| 자료형 | 의미 | 예 |
| --- | --- | --- |
| `number` | 숫자 (정수, 실수 구분 없음) | `10`, `21.5` |
| `string` | 문자열 | `"alex"`, `'Hello'` |
| `boolean` | 참 / 거짓 | `true`, `false` |
| `null` | 값이 **의도적으로** 비어 있음 | `null` |
| `undefined` | 값이 **아직 할당되지 않음** | `let score;` |

### 1.1 number

정수와 실수를 구분하지 않고 모두 `number`입니다.

```js
let a = 10;
let b = 21.5;

console.log(a + b);      // 31.5
console.log(typeof a);   // number
```

### 1.2 string

따옴표로 감싼 값입니다. 큰따옴표 `" "`, 작은따옴표 `' '` 모두 사용할 수 있습니다.

```js
let username = "alex";
let message = 'Hello';

console.log(username);          // alex
console.log(typeof username);   // string
```

### 1.3 boolean

참(`true`) / 거짓(`false`)을 나타내며 조건문에서 주로 사용합니다.

```js
let isStudent = true;
let hasTicket = false;

console.log(isStudent);          // true
console.log(typeof hasTicket);   // boolean
```

### 1.4 null

데이터가 비어 있는 상태입니다. 개발자가 **직접** 설정합니다.

```js
// 로또 추첨 전: 아직 당첨자가 없음
let selectedUser = null;

console.log(selectedUser);          // null
console.log(typeof selectedUser);   // object  ← JS의 오래된 특징 (버그로 남아 있음)
```

### 1.5 undefined

값이 아직 할당되지 않은 상태입니다. JS가 **자동으로** 설정합니다.

```js
let score;   // 선언만 하고 값을 넣지 않음

console.log(score);          // undefined
console.log(typeof score);   // undefined
```

### 1.6 null vs. undefined

| | null | undefined |
| --- | --- | --- |
| 의미 | 비어 있다고 **명시** | 아직 **정해지지 않음** |
| 누가 넣나 | 개발자 | JS (자동) |
| `typeof` | `"object"` | `"undefined"` |

```js
let a = null;
let b;

console.log(a == b);    // true  (값만 비교하면 둘 다 "없음")
console.log(a === b);   // false (타입이 다름)
```

---

## 2. 변수 선언

**변수**는 값을 저장하는 공간입니다. 한 번 저장한 값을 이름으로 다시 꺼내 쓸 수 있습니다.

| 키워드 | 값 변경 | 사용 |
| --- | --- | --- |
| `let` | 가능 | 값이 바뀌는 변수 (반복문 카운터, 점수 등) |
| `const` | 불가 (constant: 상수) | 바뀌지 않는 값. **기본으로 권장** |

### 2.1 let

```js
let age = 20;
console.log(age);   // 20

age = 21;           // 다시 할당 가능
console.log(age);   // 21
```

### 2.2 const

```js
const pi = 3.14;
pi += 1;   // ❌ TypeError: Assignment to constant variable.
```

`const`에 다시 값을 넣으면 에러가 나고, 그 아래 코드는 실행되지 않습니다.

> 일단 `const`로 선언하고, 값을 바꿔야 할 때만 `let`을 씁니다. (`var`는 예전 방식이라 쓰지 않습니다.)

---

## 3. 연산 방법

### 3.1 산술 연산자

| 연산자 | 의미 | `10 ○ 3` 결과 |
| --- | --- | --- |
| `+` | 더하기 | `13` |
| `-` | 빼기 | `7` |
| `*` | 곱하기 | `30` |
| `/` | 나누기 | `3.3333333333333335` |
| `%` | 나머지 | `1` |
| `**` | 거듭제곱 | `1000` |

```js
let n1 = 10;
let n2 = 3;

console.log(n1 + n2);   // 13
console.log(n1 - n2);   // 7
console.log(n1 * n2);   // 30
console.log(n1 / n2);   // 3.3333333333333335
console.log(n1 % n2);   // 1
```

- **`/`는 소수까지 계산합니다.** Python의 `//`(몫) 같은 연산자가 없어서 몫이 필요하면 `Math.floor()`를 씁니다.
- **`%`(나머지)는 짝수·홀수 판별에 자주 씁니다.** `i % 2 === 0`이면 짝수입니다.
- `10 / 0`은 에러가 아니라 `Infinity`, `"abc" * 2`처럼 계산할 수 없으면 `NaN`(Not a Number)이 나옵니다.

### 3.2 복합 대입 / 증감 연산자

```js
let n = 0;
n += 2;   // n = n + 2  → 2
n -= 1;   // n = n - 1  → 1
n *= 10;  // n = n * 10 → 10
n++;      // n = n + 1  → 11
n--;      // n = n - 1  → 10
```

### 3.3 Math 내장 객체

수학 계산용 기능을 모아 둔 내장 객체입니다. 따로 불러오지 않고 바로 씁니다.

| 메서드 | 기능 | 예 → 결과 |
| --- | --- | --- |
| `Math.floor(x)` | 내림 | `Math.floor(10 / 3)` → `3` (몫) |
| `Math.ceil(x)` | 올림 | `Math.ceil(2.1)` → `3` |
| `Math.round(x)` | 반올림 | `Math.round(2.5)` → `3` |
| `Math.trunc(x)` | 소수점 버림 | `Math.trunc(3.9)` → `3` |
| `Math.abs(x)` | 절댓값 | `Math.abs(-7)` → `7` |
| `Math.max(...)` | 최댓값 | `Math.max(1, 5, 3)` → `5` |
| `Math.min(...)` | 최솟값 | `Math.min(1, 5, 3)` → `1` |
| `Math.pow(a, b)` | 거듭제곱 | `Math.pow(2, 10)` → `1024` |
| `Math.sqrt(x)` | 제곱근 | `Math.sqrt(16)` → `4` |
| `Math.random()` | 0 이상 1 미만 난수 | `0.7346...` |

```js
// 몫 : 나눗셈을 하고, 몫만 취하고 나머지는 버림
console.log(Math.floor(10 / 3));   // 3

// 1 ~ 6 주사위
console.log(Math.floor(Math.random() * 6) + 1);
```

> 음수에서는 `Math.floor(-10 / 3)`이 `-4`가 됩니다(더 작은 쪽으로 내림). 소수점만 잘라내려면 `Math.trunc()`를 씁니다.

---

## 4. 비교 연산

비교 결과는 항상 `boolean`(`true` / `false`)입니다.

### 4.1 대소 비교 `<`, `>`, `<=`, `>=`

```js
console.log(10 > 5);    // true
console.log(10 >= 5);   // true
console.log(10 < 5);    // false
console.log(10 <= 5);   // false

let result = 10 > 5;
console.log(result);    // true  ← 비교 결과를 변수에 담을 수 있음
```

### 4.2 `==` 값 비교 (동등 연산자)

두 값의 자료형이 다르면 **자동으로 타입을 바꾼 뒤** 비교합니다. 숫자와 문자열을 비교하면 문자열을 숫자로 바꿉니다.

```js
console.log(10 == 10);     // true
console.log(10 == "10");   // true  ← "10"을 숫자 10으로 바꿔서 비교
console.log(0 == false);   // true  ← false를 0으로 바꿈
console.log("" == 0);      // true  ← 예상하기 어려움
```

### 4.3 `===` 값 + 타입 비교 (일치 연산자)

타입을 바꾸지 않고 **값과 자료형이 모두 같아야** `true`입니다.

```js
console.log(10 === 10);     // true
console.log(10 === "10");   // false ← number와 string
```

| | `==` (동등) | `===` (일치) |
| --- | --- | --- |
| 비교 대상 | 값만 | 값 + 타입 |
| 타입 변환 | 자동으로 일어남 | 일어나지 않음 |
| `10 ○ "10"` | `true` | `false` |
| 권장 | ✗ | **✓ 항상 이쪽** |

> 같지 않음도 같은 규칙입니다: `!=`(값만) / `!==`(값 + 타입). `!==`를 씁니다.

### 4.4 타입 확인 `typeof`

값의 자료형을 **문자열로** 알려 줍니다.

```js
console.log(typeof 10);          // "number"
console.log(typeof 3.14);        // "number"
console.log(typeof "alex");      // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object"  ← 주의
console.log(typeof [1, 2]);      // "object"  ← 배열도 object
console.log(typeof { a: 1 });    // "object"
```

```js
// 조건문에서 자료형 확인
if (typeof result === "string") {
    console.log(`에러 발생: ${result}`);
}
```

---

## 5. 논리 연산

여러 조건을 조합할 때 씁니다.

| 연산자 | 이름 | 결과 |
| --- | --- | --- |
| `&&` | AND | 둘 다 `true`일 때만 `true` |
| `\|\|` | OR | 하나라도 `true`면 `true` |
| `!` | NOT (부정) | `true` ↔ `false` 뒤집기 |

```js
let age = 20;
let hasId = true;

console.log(age >= 19 && hasId);   // true  (AND: 성인이고 신분증도 있음)
console.log(age < 19 || hasId);    // true  (OR: 둘 중 하나만 맞아도 됨)
console.log(!hasId);               // false (NOT: true를 뒤집음)
```

**조합 예제 — 최종 합격 판정**

- 과제를 제출했고(`submitted`)
- 점수 70 이상 **그리고** 출석률 80 이상, **또는** 점수 90 이상이면 합격

```js
let score = 88;
let attendance = 75;
let submitted = true;

if (submitted && ((score >= 70 && attendance >= 80) || score >= 90)) {
    console.log("최종 합격");
} else {
    console.log("불합격");   // ← 출석률 75라 불합격
}
```

> 괄호로 묶으면 어떤 조건끼리 먼저 계산할지가 분명해집니다.

---

## 6. 문자열 연산

### 6.1 `+` 이어붙이기

문자열끼리 `+`를 쓰면 이어 붙입니다. (SQL·엑셀의 CONCAT, concatenate: 연결하다)

```js
let first = "Alex";
let lastName = "Kim";

console.log("Hello, " + first + " " + lastName + "!");   // Hello, Alex Kim!
```

### 6.2 템플릿 리터럴

백틱(`` ` ``)으로 감싸고, 변수는 `${변수명}`으로 넣습니다. 띄어쓰기와 `+`를 신경 쓰지 않아도 되어 읽기 쉽습니다.

```js
let first = "Alex";
let lastName = "Kim";
let age = 20;

console.log(`Hello, ${first} ${lastName}!`);       // Hello, Alex Kim!
console.log(`내년에는 ${age + 1}살입니다.`);        // 내년에는 21살입니다. ← 계산식도 가능
```

- 백틱은 키보드 숫자 `1` 왼쪽 키입니다.
- 엔터로 줄바꿈한 내용이 그대로 들어가서 여러 줄 문자열도 만들 수 있습니다.

### 6.3 number + string — Python과 차이점

JS는 숫자와 문자열을 `+`하면 **숫자를 문자열로 바꿔서 이어 붙입니다.** Python은 에러를 냅니다.

| 코드 | JavaScript | Python |
| --- | --- | --- |
| `10 + "10"` | `"1010"` (문자열) | `TypeError` |
| `"10" + 1` | `"101"` | `TypeError` |
| `"10" - 1` | `9` (숫자) | `TypeError` |
| `"10" * 2` | `20` | `"1010"` (문자열 반복) |

```js
console.log(10 + "10");   // "1010"
console.log("10" - 1);    // 9      ← -는 문자열 연산이 없어서 숫자로 바꿈
console.log(1 + 2 + "3"); // "33"   ← 왼쪽부터: 1+2=3, 3+"3"="33"
console.log("1" + 2 + 3); // "123"  ← "1"+2="12", "12"+3="123"
```

> JS는 타입 변환이 자동으로 일어나서 Python보다 더 주의해야 합니다. 입력값처럼 문자열로 들어온 숫자는 `Number("10")`으로 바꾼 뒤 계산합니다.

---

## 7. 조건문

조건이 `true`일 때만 코드를 실행합니다.

```js
if (조건식) {
    // 조건이 true일 때 실행
} else if (다른 조건식) {
    // 위 조건은 false, 이 조건은 true일 때 실행
} else {
    // 모든 조건이 false일 때 실행
}
```

### 7.1 if / else if / else

```js
let age = 20;

if (age >= 19) {
    console.log("성인입니다.");
} else if (age >= 8) {
    console.log("학생입니다.");
} else {
    console.log("어린이입니다.");
}
```

| Python | JavaScript |
| --- | --- |
| `if 조건:` | `if (조건) { }` |
| `elif 조건:` | `else if (조건) { }` ← **JS에는 `elif`가 없음** |
| `else:` | `else { }` |
| 들여쓰기로 범위 구분 | `{ }` 블록으로 범위 구분 |

- 위에서부터 차례로 검사하고, **처음으로 `true`인 블록 하나만** 실행합니다.
- `else if`, `else`는 필요 없으면 생략할 수 있습니다.

### 7.2 truthy / falsy

조건식에 `boolean`이 아닌 값을 넣으면 `true` 또는 `false`로 취급합니다.

| 구분 | 값 |
| --- | --- |
| **falsy** (false 취급, 6개 고정) | `false`, `0`, `""`, `null`, `undefined`, `NaN` |
| **truthy** (true 취급) | falsy를 제외한 **모든 값** |

```js
let selectedUser = null;

if (selectedUser) {
    console.log("축하합니다. 당첨입니다.");
} else {
    console.log("아쉽네요. 다음 기회에..");   // ← null은 falsy
}
```

> 헷갈리기 쉬운 truthy: 빈 배열 `[]`, 빈 객체 `{}`, 문자열 `"0"`은 모두 **truthy**입니다.

### 7.3 실습: 콘솔 계산기

```js
let a = 10;
let b = 5;
let operator = "+";   // "+", "-", "*", "/"

if (operator === "+") {
    console.log(a + b);
} else if (operator === "-") {
    console.log(a - b);
} else if (operator === "*") {
    console.log(a * b);
} else if (operator === "/") {
    console.log(a / b);
} else {
    console.log("지원하지 않는 연산자입니다");
}
```

---

## 8. 반복문

같은 작업을 여러 번 처리합니다.

### 8.1 for

반복 횟수가 정해져 있을 때 씁니다.

```js
// for (초기값; 조건식; 증가식)
for (let i = 0; i < 10; i++) {
    console.log(i);   // 0 ~ 9
}

// 2씩 증가
for (let j = 0; j < 10; j += 2) {
    console.log(j);   // 0, 2, 4, 6, 8
}
```

1. **초기값** `let i = 0` — 처음 한 번만 실행
2. **조건식** `i < 10` — `true`면 블록 실행, `false`면 종료
3. **증가식** `i++` — 블록이 끝날 때마다 실행 → 다시 2번으로

| Python | JavaScript |
| --- | --- |
| `for i in range(10):` | `for (let i = 0; i < 10; i++) { }` |
| `for i in range(0, 10, 2):` | `for (let j = 0; j < 10; j += 2) { }` |

### 8.2 while

조건이 `true`인 동안 계속 반복합니다. 반복 횟수를 미리 모를 때 씁니다.

```js
let n = 0;

while (n < 3) {
    console.log(n);   // 0, 1, 2
    n++;              // ← 빠뜨리면 n이 계속 0이라 무한 반복
}
```

### 8.3 반복문 핵심 포인트

- 조건이 `false`가 되면 종료
- **무한 루프 주의**: 조건을 언젠가 `false`로 만드는 코드(`n++` 등)가 꼭 필요
- 반복 횟수가 정해져 있으면 `for`, 아니면 `while`

```js
// 1 ~ 20 중 짝수만 출력
for (let i = 1; i <= 20; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}
```

---

## 9. 배열

### 9.1 array 사용법

여러 값을 순서대로 묶은 자료형입니다. 대괄호 `[ ]`로 만들고 쉼표로 구분합니다.

- 순서(index)가 있고, **0부터** 시작합니다.
- 서로 다른 자료형을 함께 담을 수 있습니다.

```js
let numbers = [1, 2, 3, 4, "10", true];

console.log(numbers[0]);       // 1           ← 첫 번째
console.log(numbers.at(-1));   // true        ← 마지막 (음수는 뒤에서부터)
console.log(numbers.length);   // 6           ← 개수
console.log(numbers[10]);      // undefined   ← 없는 위치
```

> `numbers.at(-1)`은 **소괄호**입니다. `numbers.at[-1]`처럼 대괄호로 쓰면 `undefined`가 나옵니다.

### 9.2 배열 순회

| 방법 | 언제 |
| --- | --- |
| `for...of` | 값만 필요할 때 (가장 간단) |
| `for...of` + `entries()` | 인덱스와 값이 둘 다 필요할 때 |
| `for` + 인덱스 | 인덱스를 직접 다뤄야 할 때 |
| `forEach` | 함수로 처리할 때 (중간에 `break` / `continue` 불가) |

```js
let scores = [80, 90, 70];

// for...of
for (const score of scores) {
    console.log(score);
}

// 인덱스 + 값
for (const [i, score] of scores.entries()) {
    console.log(i, score);   // 0 80, 1 90, 2 70
}

// for + index
for (let i = 0; i < scores.length; i++) {
    console.log(scores[i]);
}

// forEach
scores.forEach(score => {
    console.log(score);
});
```

### 9.3 array의 활용

| 메서드 | 기능 | 원본 변경 |
| --- | --- | --- |
| `push(값)` | 맨 뒤에 추가 | O |
| `pop()` | 맨 뒤 꺼내기 (꺼낸 값 반환) | O |
| `unshift(값)` | 맨 앞에 추가 | O |
| `shift()` | 맨 앞 꺼내기 | O |
| `slice(시작, 끝)` | 시작 ~ 끝 **직전**까지 잘라서 새 배열 반환 | X |
| `includes(값)` | 값이 있는지 확인 → boolean | X |
| `indexOf(값)` | 값의 위치 (없으면 `-1`) | X |
| `join(구분자)` | 문자열로 합치기 | X |

```js
let fruits = ["apple", "banana"];

fruits.push("orange");              // ["apple", "banana", "orange"]
fruits.pop();                       // "orange" 꺼냄 → ["apple", "banana"]
console.log(fruits.includes("apple"));   // true
console.log(fruits.join(", "));          // "apple, banana"

let numbers = [1, 2, 3, 4, "10", true];
console.log(numbers.slice(1, 3));   // [2, 3]  ← 원본은 그대로
```

> `slice`는 새 배열을 **돌려줄** 뿐 원본을 바꾸지 않습니다. 결과를 쓰려면 `console.log`로 출력하거나 변수에 담아야 합니다.

**예제 — 배열의 합계와 평균**

```js
let numbers = [10, 20, 30, 40];
let sum = 0;

for (const num of numbers) {
    sum += num;
}
console.log(sum);                     // 100
console.log(sum / numbers.length);    // 25
```

---

## 10. 객체 자료형

### 10.1 object 선언 방법

여러 값을 **이름(key)** 으로 묶은 자료형입니다. 중괄호 `{ }` 안에 `key: value` 쌍을 쉼표로 구분해 적습니다.

```js
let user = {
    name: "alex",
    age: 20,
    email: "alex@test.com",
};
```

| | 배열 | 객체 |
| --- | --- | --- |
| 기호 | `[ ]` | `{ }` |
| 값을 찾는 기준 | 순서(index) | 이름(key) |
| 어울리는 데이터 | 순서가 중요한 목록 | 의미 있는 이름이 중요한 정보 |

### 10.2 object 다루는 방법

**속성 읽기** — 점 표기법 또는 대괄호 표기법

```js
console.log(user.name);      // "alex"
console.log(user["age"]);    // 20
console.log(user.phone);     // undefined ← 없는 속성

// key가 변수에 들어 있을 때는 대괄호만 가능
let key = "email";
console.log(user[key]);      // "alex@test.com"
```

**속성 추가하기** — 없는 key에 값을 넣으면 추가

```js
user.phone = "010-1234-5678";
```

**속성 수정하기** — 있는 key에 값을 넣으면 수정

```js
user.age = 21;
```

**속성 제거하기** — `delete`

```js
delete user.email;
```

**속성이 객체에 존재하는지 확인하기** — `in`

```js
console.log("name" in user);    // true
console.log("email" in user);   // false ← 위에서 삭제함
```

> `const user = { ... }`로 선언해도 속성 추가·수정·삭제는 됩니다. `const`가 막는 건 `user = 다른값`처럼 **변수 자체를 바꾸는 것**뿐입니다.

### 10.3 객체 순회 `for...in`

```js
for (const key in user) {
    console.log(key, user[key]);
}
// name alex
// age 21
// phone 010-1234-5678
```

> 배열은 `for...of`(값), 객체는 `for...in`(key)으로 순회합니다.

---

## 11. 부록: 함수

코드를 묶어서 이름을 붙이고 재사용합니다. **입력 → 처리 → 출력** 구조입니다.

```js
// 함수 정의
function add(n1, n2) {      // 입력: n1, n2 (매개변수)
    return n1 + n2;         // 처리 후 출력(반환)
}

// 함수 호출(call) → 실행
let result = add(2, 4);
console.log(result);        // 6
```

- 함수는 **호출해야** 실행됩니다.
- `return`은 결과를 돌려주고 함수를 끝냅니다.
- 매개변수(`n1`, `n2`)는 함수 안에서만 쓸 수 있습니다.

**함수를 값처럼 다루기**

```js
// 1. 변수에 담기
let foo = add;
console.log(foo(4, 2));     // 6

// 2. 다른 함수의 인자로 넘기기
function runFunction(f, arg1, arg2) {
    return f(arg1, arg2);   // add(4, 2)
}
console.log(runFunction(add, 4, 2));   // 6
```

> `runFunction(add, ...)`는 함수 **자체**를 넘기는 것이고, `runFunction(add(4, 2), ...)`는 함수의 **실행 결과**(6)를 넘기는 것이라 다릅니다.

---

## 12. 실습 파일

| 파일 | 내용 | 관련 장 |
| --- | --- | --- |
| [`js/data_type.js`](js/data_type.js) | number, string, boolean, null, undefined와 `typeof` | [1](#1-자료형) |
| [`js/var.js`](js/var.js) | `let`, `const` 선언과 `const` 재할당 에러 | [2](#2-변수-선언) |
| [`js/operator.js`](js/operator.js) | 산술·비교·동등/일치·문자열·논리 연산자, `Math.floor`로 몫 구하기 | [3](#3-연산-방법)~[6](#6-문자열-연산) |
| [`js/if.js`](js/if.js) | `if` / `else if` / `else`, truthy · falsy | [7](#7-조건문) |
| [`js/loop.js`](js/loop.js) | `for`(1씩 · 2씩 증가), `while` | [8](#8-반복문) |
| [`js/array.js`](js/array.js) | 배열 인덱스, `at()`, `for...of`, `slice()` | [9](#9-배열) |
| [`js/object.js`](js/object.js) | 객체 선언, 점 · 대괄호 표기법 | [10](#10-객체-자료형) |
| [`js/funtion.js`](js/funtion.js) | 함수 정의·호출, 함수를 변수에 담기·인자로 넘기기 | [11](#11-부록-함수) |
| [`js/caculator.js`](js/caculator.js) + [`html/caculator.html`](html/caculator.html) | 콘솔 사칙연산 계산기 (아래 참고) | 종합 |
| [`html/js_script.html`](html/js_script.html) | 외부 JS 파일을 불러와 실행하는 페이지 | [0](#0-javascript란--실행-방법) |

### 콘솔 계산기 (`caculator.html`)

페이지를 열고 개발자 도구 콘솔에 `start()`를 입력하면 계산식을 물어봅니다.

**요구사항**
- 사칙연산(`+`, `-`, `*`, `/`) 계산
- 길이가 긴 계산식도 계산
- 우선순위 적용: `*`, `/`를 `+`, `-`보다 먼저 계산

**동작 순서**

```text
"1+2*3-4/2"
   │ ① 허용 문자 검사: 숫자, 소수점, + - * /, 띄어쓰기 외에는 에러
   │ ② 숫자와 기호로 쪼개기: match(/\d+(\.\d+)?|[+\-*/]/g)
   ▼
["1", "+", "2", "*", "3", "-", "4", "/", "2"]
   │ ③ 1단계: * / 먼저 계산
   ▼
["1", "+", 6, "-", 2]
   │ ④ 2단계: + - 를 왼쪽부터 계산
   ▼
5
```

| 입력 | 결과 |
| --- | --- |
| `1+2*3` | 7 |
| `8/2*4` | 16 (같은 순위는 왼쪽부터) |
| `1+2*3-4/2+5*6-7+8/4*3-9+10*2` | 45 |
| `5/0` | 에러 발생: 0으로 나눌 수 없습니다. |
| `3 x 4` | 에러 발생: 숫자와 사칙연산 기호(+, -, *, /)만 입력할 수 있습니다. |

---

## 참고 자료

- OZ 코딩스쿨 AI 헬스케어 초격차 캠프 — 「Javascript」 강의 자료 (JavaScript 기본 문법)
