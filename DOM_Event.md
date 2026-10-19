# DOM과 이벤트

JavaScript로 화면을 바꾸고 사용자 행동에 반응하는 방법을 정리한 문서입니다.

[← README로 돌아가기](README.md)

## 목차

1. [DOM이란?](#1-dom이란)
2. [DOM 선택하기](#2-dom-선택하기)
3. [DOM 내용 · 스타일 · 속성 변경](#3-dom-내용--스타일--속성-변경)
4. [요소 만들고 넣기](#4-요소-만들고-넣기)
5. [이벤트(Event)](#5-이벤트event)
6. [이벤트 리스너](#6-이벤트-리스너)
7. [화살표 함수](#7-화살표-함수)
8. [호이스팅](#8-호이스팅)
9. [setTimeout · setInterval](#9-settimeout--setinterval)
10. [실습: dom.html](#10-실습-domhtml)
11. [실습: 버튼 계산기 v2](#11-실습-버튼-계산기-v2)
12. [자주 하는 실수](#12-자주-하는-실수)

---

## 1. DOM이란?

**DOM(Document Object Model)** 은 HTML 문서를 JavaScript가 다룰 수 있게 만든 **객체 구조**입니다.

- 브라우저는 HTML을 읽어서 **트리 구조**의 DOM을 만듭니다.
- JavaScript는 HTML 파일을 직접 고치는 것이 아니라 **DOM 객체를 조작해서** 화면을 바꿉니다.

```text
document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1#msg          "Hello, DOM & Event"
        └── div.mt20
            ├── h3
            └── button.btn_g
```

> 새로고침하면 DOM은 HTML 파일 내용으로 다시 만들어집니다. JS로 바꾼 화면은 저장되지 않습니다.

---

## 2. DOM 선택하기

화면의 요소를 바꾸려면 먼저 그 요소를 **찾아서 변수에 담아야** 합니다.

| 메서드 | 찾는 기준 | 반환 | 없으면 |
| --- | --- | --- | --- |
| `document.getElementById("text")` | id (`#` 없이) | 요소 1개 | `null` |
| `document.querySelector("#text")` | CSS 선택자 | **첫 번째** 요소 1개 | `null` |
| `document.querySelectorAll(".item")` | CSS 선택자 | 요소 **여러 개** (NodeList) | 빈 NodeList |

```html
<h1 id="text">Hello</h1>
```

```js
const el = document.getElementById("text");
console.log(el.textContent);   // "Hello"
```

`querySelector`는 CSS에서 쓰던 선택자를 그대로 씁니다.

```js
document.querySelector("#text");      // id
document.querySelector(".item");      // class (첫 번째 것만)
document.querySelector("p");          // 태그 (첫 번째 것만)
document.querySelector(".box > p");   // 자식 선택자도 가능
```

여러 개를 모두 다루려면 `querySelectorAll` + `forEach`를 씁니다.

```js
const items = document.querySelectorAll(".item");
items.forEach(el => {
    console.log(el.textContent);
});
```

> 선택 결과가 `null`인데 그 뒤에 `.textContent` 같은 걸 쓰면 `Cannot read properties of null` 에러가 납니다. 선택자 철자, `#`·`.` 빠짐, 스크립트 위치(요소보다 먼저 실행됐는지)를 확인합니다.

---

## 3. DOM 내용 · 스타일 · 속성 변경

### 3.1 내용 바꾸기

| 속성 | 동작 |
| --- | --- |
| `textContent` | **글자만** 바꾸기. 태그를 넣어도 글자로 보임 |
| `innerHTML` | **HTML 포함**해서 바꾸기. 태그가 실제로 만들어짐 |

```js
el.textContent = "Hello JavaScript";
el.innerHTML = "<strong>Hello</strong>";   // 굵은 글씨로 보임
```

> 사용자가 입력한 값을 넣을 때는 `textContent`를 씁니다. `innerHTML`에 입력값을 넣으면 그 안의 태그나 스크립트가 실행될 수 있습니다.

### 3.2 입력값 읽기 · 쓰기 — `value`

`<input>`에 입력된 글자는 `textContent`가 아니라 **`value`** 로 다룹니다.

```js
const input = document.querySelector("#name-input");

console.log(input.value);   // 입력된 글자 읽기
input.value = "";           // 입력칸 비우기
```

> `value`는 숫자를 입력해도 항상 **문자열**입니다. 숫자로 계산하려면 `Number(input.value)`로 바꿉니다.

### 3.3 스타일 바꾸기 — `style`

CSS 속성 이름의 `-`를 빼고 다음 글자를 대문자로 씁니다(카멜 표기법).

```js
el.style.color = "red";
el.style.fontSize = "20px";          // font-size
el.style.backgroundColor = "orange"; // background-color
```

### 3.4 클래스 바꾸기 — `classList`

스타일을 JS에 직접 쓰는 대신, CSS에 클래스를 만들어 두고 JS로 클래스만 넣었다 뺐다 하는 방법이 더 깔끔합니다.

| 메서드 | 동작 |
| --- | --- |
| `classList.add("on")` | 클래스 추가 |
| `classList.remove("on")` | 클래스 제거 |
| `classList.toggle("on")` | 없으면 추가, 있으면 제거 |
| `classList.contains("on")` | 있는지 확인 → `true` / `false` |

```js
sidebar.classList.toggle("on");   // resume_v2.html 메뉴 버튼, 계산기 ON/OFF 버튼에서 사용
```

### 3.5 속성 바꾸기

```js
const link = document.querySelector("a");
link.href = "https://google.com";

const img = document.querySelector("img");
img.src = "../images/JUH04316.jpg";
```

---

## 4. 요소 만들고 넣기

### 4.1 새로 만들기 — `createElement`

```js
const p = document.createElement("p");   // <p></p>
p.textContent = "3초가 지났습니다";        // <p>3초가 지났습니다</p>
```

만들기만 하면 화면에 안 나옵니다. **어디에 넣을지** 정해야 합니다.

### 4.2 넣는 위치

| 메서드 | 넣는 위치 |
| --- | --- |
| `부모.appendChild(새요소)` | 부모 **안의 맨 끝** |
| `부모.prepend(새요소)` | 부모 **안의 맨 앞** |
| `기준.after(새요소)` | 기준 요소 **바로 다음** |
| `기준.before(새요소)` | 기준 요소 **바로 앞** |

```js
document.body.appendChild(p);   // 페이지 맨 아래에 붙음
btn.after(p);                   // 버튼 바로 밑에 붙음
btn.parentElement.appendChild(p); // 버튼이 들어 있는 div 안 맨 끝
```

### 4.3 새로 만들기 vs. 이미 있는 자리에 글자 넣기

| 방법 | 여러 번 실행하면 | 언제 |
| --- | --- | --- |
| `createElement` + `appendChild`/`after` | 요소가 **하나씩 늘어남** | 메시지를 쌓아 보여 줄 때 |
| HTML에 자리를 미리 만들고 `textContent`만 변경 | 한 개가 **글자만 바뀜** | 결과 한 줄만 보여 줄 때 |

```html
<p>이름 : <span class="name_t"></span></p>
```

```js
const name_t = document.querySelector(".name_t");
name_t.textContent = input.value;   // "이름 : 홍길동"
```

> 같은 `<p>`를 한 번만 만들어 두고 여러 번 `appendChild`하면 새로 생기지 않고 **자리만 옮겨집니다.** 매번 새 줄이 필요하면 `createElement`를 이벤트 함수 **안**에서 실행합니다.

### 4.4 비우기

```js
result.innerHTML = "";   // 안에 있던 요소를 모두 지우기
```

---

## 5. 이벤트(Event)

웹 페이지에서 발생하는 모든 동작이나 상태 변화입니다.

| 구분 | 이벤트 | 언제 |
| --- | --- | --- |
| 마우스 | `click` | 클릭 |
| | `mouseover` / `mouseout` | 요소 위에 올림 / 벗어남 |
| 입력 | `input` | 입력칸의 값이 바뀔 때마다 (글자 하나 칠 때마다) |
| | `change` | 값이 바뀌고 입력칸을 벗어났을 때 |
| 키보드 | `keydown` / `keyup` | 키를 누름 / 뗌 |
| 폼 | `submit` | 폼 전송 |
| 화면 | `scroll` | 스크롤 |
| 브라우저 | `load` | 페이지(이미지 포함) 로드 완료 |
| | `DOMContentLoaded` | HTML을 다 읽어 DOM 완성 |
| | `resize` | 창 크기 변경 |

---

## 6. 이벤트 리스너

특정 요소에 특정 이벤트가 발생하면 **지정한 함수를 실행**하도록 등록하는 것입니다.

```js
요소.addEventListener("이벤트이름", 실행할함수);
```

```js
const btn = document.querySelector("button");

btn.addEventListener("click", function () {
    console.log("클릭됨");
});
```

**왜 쓰나?**

- 사용자의 행동을 감지해서 상호작용(interaction)을 구현
- 정적인 페이지를 동적인 웹 애플리케이션으로 바꿈
- 화면(UI)과 로직을 연결

### 6.1 함수를 미리 만들어 두고 연결하기

```js
function buttonAlert() {
    alert("버튼이 클릭됨");
}

btn.addEventListener("click", buttonAlert);     // ✓ 함수를 전달
btn.addEventListener("click", buttonAlert());   // ✗ 바로 실행되고, 결과(undefined)가 전달됨
```

괄호 `()`를 붙이면 **지금 실행**하라는 뜻이라, 클릭하기도 전에 실행됩니다. 이벤트 리스너에는 함수 **이름만** 넘깁니다.

### 6.2 HTML `onclick` 속성과 비교

```html
<!-- HTML 속성으로 연결 (calculator_v2.html 방식) -->
<button onclick="appendNumber('7')">7</button>
```

```js
// JS에서 연결 (dom.html 방식)
btn.addEventListener("click", () => appendNumber("7"));
```

| | `onclick` 속성 | `addEventListener` |
| --- | --- | --- |
| 작성 위치 | HTML | JS |
| 같은 이벤트에 함수 여러 개 | 불가 (마지막 하나만) | 가능 |
| 권장 | 간단한 실습용 | **실무 권장** (HTML과 JS 분리) |

### 6.3 입력값 처리 + 조건문

사용자 입력에 따라 화면과 동작을 다르게 처리합니다.

```js
button.addEventListener("click", function () {
    if (input.value.trim() === "") {   // trim(): 앞뒤 공백 제거 → 띄어쓰기만 입력한 경우도 막음
        alert("이름을 입력하세요");
        return;                        // 함수 끝내기
    }

    const p = document.createElement("p");
    p.textContent = "환영합니다, " + input.value + " 님";
    result.appendChild(p);
});
```

---

## 7. 화살표 함수

`function` 키워드 대신 `=>`로 짧게 함수를 만드는 문법입니다. 이벤트 리스너 같은 **콜백 함수**에 주로 씁니다.

```js
// 일반 함수
function add(a, b) {
    return a + b;
}

// 화살표 함수
const add = (a, b) => {
    return a + b;
};

// 한 줄이면 { }와 return 생략 가능
const add = (a, b) => a + b;
```

이벤트 리스너에서는 이렇게 줄어듭니다.

```js
btn.addEventListener("click", function () {
    console.log("클릭됨");
});

btn.addEventListener("click", () => {
    console.log("클릭됨");
});

btn.addEventListener("click", () => console.log("클릭됨"));
```

**인자가 필요한 함수 연결하기**

```js
function changeColor(color) {
    span_hover.style.backgroundColor = color;
}

span_hover.addEventListener("mouseover", () => changeColor("#003c82"));
span_hover.addEventListener("mouseout",  () => changeColor("#880f7e"));
```

`changeColor("#003c82")`를 바로 넘기면 6.1처럼 즉시 실행돼 버립니다. 그래서 `() =>`로 한 번 감싸서 "**이벤트가 나면** 이걸 실행해"라고 넘깁니다.

---

## 8. 호이스팅

코드를 실행하기 전에 전체를 한 번 훑어서 **선언(변수 · 함수)을 먼저 처리**하는 동작 방식입니다.

```js
span_hover.addEventListener("mouseover", () => changeColor("skyblue"));   // 아래에 있는 함수를 씀

function changeColor(color) {   // ← 아래에 선언해도 됨
    span_hover.style.backgroundColor = color;
}
```

- `function` 선언은 통째로 끌어올려져서 **위에서 호출해도** 됩니다.
- `const` / `let`으로 만든 변수(화살표 함수 포함)는 선언 줄 **이전에 쓰면 에러**가 납니다.

```js
sayHi();                   // ✓ 동작
function sayHi() { console.log("hi"); }

sayBye();                  // ✗ ReferenceError
const sayBye = () => console.log("bye");
```

---

## 9. setTimeout · setInterval

브라우저가 제공하는 **타이머 Web API**입니다.

| 함수 | 동작 | 멈추기 |
| --- | --- | --- |
| `setTimeout(함수, 밀리초)` | 지정한 시간 뒤 **한 번** 실행 | `clearTimeout(id)` |
| `setInterval(함수, 밀리초)` | 지정한 시간마다 **반복** 실행 | `clearInterval(id)` |

시간 단위는 밀리초입니다. `1000` = 1초.

```js
setTimeout(() => {
    console.log("3초 후 실행");
}, 3000);

const timerId = setInterval(() => {
    console.log("1초마다 실행");
}, 1000);

clearInterval(timerId);   // 반복 멈추기
```

`setTimeout` / `setInterval`은 타이머를 구분하는 번호(**timerId**)를 돌려줍니다. 이 번호로 타이머를 멈추거나, 버튼을 여러 번 눌러도 타이머가 하나만 돌게 막을 수 있습니다.

**예제 — 5초 카운트다운**

```html
<button id="start">카운트다운 시작</button>
<p id="result"></p>
```

```js
const startBtn = document.querySelector("#start");
const timeEl = document.querySelector("#result");
let time = 5;
let timerId = null;

startBtn.addEventListener("click", function () {
    if (timerId !== null) return;   // 이미 돌고 있으면 또 시작하지 않음
    timeEl.textContent = time;

    timerId = setInterval(function () {
        time--;
        if (time === 0) {
            timeEl.textContent = "끝";
            clearInterval(timerId);
            timerId = null;
        } else {
            timeEl.textContent = time;
        }
    }, 1000);
});
```

---

## 10. 실습: dom.html

[`html/dom.html`](html/dom.html) — 네 가지 이벤트 예제를 한 페이지에 모았습니다.

### 10.1 3초 후 메시지 노출 — `click` + `setTimeout` + `after`

```html
<button type="button" class="btn_g">눌러보세요</button>
```

```js
const btn = document.querySelector(".btn_g");

btn.addEventListener("click", () => {
    // setTimeout : 일정 시간이 지난 후에, 어떤 함수를 실행하는 함수
    setTimeout(() => {
        const p = document.createElement("p");
        p.textContent = "3초가 지났습니다";
        p.style.color = "red";
        btn.after(p);   // btn 바로 뒤에 p를 넣기
    }, 3000);
});
```

- 클릭할 때마다 3초 뒤에 빨간 문장이 버튼 밑에 하나씩 쌓입니다.
- `document.body.appendChild(p)`였을 때는 페이지 맨 아래에 붙었는데, `btn.after(p)`로 바꿔서 버튼 바로 밑에 나옵니다.

### 10.2 이름 입력 — `click` + `value` + `textContent`

```html
<input type="text" id="name-input">
<button type="button" class="btn_check">확인</button>
<p>이름 : <span class="name_t"></span></p>
```

```js
const input = document.querySelector("#name-input");
const btn_check = document.querySelector(".btn_check");
const name_t = document.querySelector(".name_t");

btn_check.addEventListener("click", () => {
    if (input.value === "") {
        alert("이름을 입력하세요.");
        return;
    }

    name_t.textContent = input.value;   // span 안 글자를 입력값으로 바꾸기
    input.value = "";                   // 입력칸 비우기
});
```

- 빈칸이면 `alert`로 알리고 `return`으로 멈춥니다.
- 미리 만들어 둔 `<span>`에 글자만 넣어서, 여러 번 입력해도 줄이 늘지 않고 이름만 바뀝니다.

### 10.3 비밀번호 검사 — `input` 이벤트

```html
<input type="password" id="pw-input" placeholder="비밀번호 입력">
<p id="txt_help"></p>
```

```js
const inp_pw = document.querySelector("#pw-input");
const txt_help = document.querySelector("#txt_help");

inp_pw.addEventListener("input", () => {   // 글자를 입력하거나 지울 때마다 실행
    if (inp_pw.value.length < 4) {
        txt_help.textContent = "4자리 이상 입력하세요.";
        txt_help.style.color = "red";
    } else {
        txt_help.textContent = "사용 가능한 비밀번호 입니다.";
        txt_help.style.color = "green";
    }
});
```

- `click`이 아니라 `input` 이벤트라서 버튼 없이 **치는 순간마다** 검사합니다.
- `.length`는 문자열의 글자 수입니다.

### 10.4 마우스 이벤트 — `mouseover` / `mouseout`

```html
<span class="evt_hover">마우스를 올려보세요.</span>
```

```js
const span_hover = document.querySelector(".evt_hover");

function changeColor(color) {
    span_hover.style.backgroundColor = color;
}

span_hover.addEventListener("mouseover", () => changeColor("#003c82"));
span_hover.addEventListener("mouseout",  () => changeColor("#880f7e"));
```

- 올리면 파란색, 벗어나면 원래 보라색으로 돌아옵니다.
- 같은 동작을 하는 코드를 `changeColor` 함수 하나로 묶고, 색만 다르게 넘겼습니다.

---

## 11. 실습: 버튼 계산기 v2

[`html/calculator_v2.html`](html/calculator_v2.html) + [`js/calculator_v2.js`](js/calculator_v2.js) + [`css/calculator.css`](css/calculator.css)

콘솔 계산기(v1)의 `calculate()`를 그대로 쓰고, 화면 버튼과 DOM으로 입력·출력을 바꿨습니다. 👉 [실행해 보기](https://elin-115.github.io/oz_assignment/html/calculator_v2.html)

### 11.1 버튼과 함수 연결

| 버튼 | 함수 | 동작 |
| --- | --- | --- |
| `0`~`9`, `.` | `appendNumber(num)` | 화면에 숫자 붙이기 |
| `+ - * /` | `appendOperator(op)` | 화면에 기호 붙이기 |
| `C` | `clearDisplay()` | 화면을 `0`으로 |
| `Enter` | `performCalculate()` | 계산해서 결과 표시 |
| `ON/OFF` | `togglePower()` | 전원 켜고 끄기 |

```js
const display = document.querySelector("#display");      // 계산기 화면 (input)
const powerButton = document.querySelector(".on-off");   // ON/OFF 버튼
let isOn = true;                                         // 켜진 상태로 시작
```

화면이 `<input readonly>`라서 글자는 `display.value`로 읽고 씁니다.

### 11.2 입력 규칙

| 상황 | 처리 | 쓴 문법 |
| --- | --- | --- |
| 화면이 `0`일 때 숫자 | `0`을 지우고 숫자로 **바꾸기** | `display.value === "0" && num !== "."` |
| 화면이 `0`일 때 `.` | `0.`으로 붙이기 | 위 조건의 `num !== "."` |
| 지금 숫자에 이미 `.`이 있을 때 `.` | 무시 | `split(/[+\-*/]/).at(-1).includes(".")` |
| 마지막 글자가 기호일 때 기호 | 마지막 기호를 **바꾸기** | `"+-*/".includes(lastChar)`, `slice(0, -1)` |
| 화면이 `Error`일 때 숫자·기호 | `0`으로 돌리고 새로 시작 | `display.value === "Error"` |
| 전원이 꺼져 있을 때 | 모든 버튼 무시 | 함수 첫 줄 `if (!isOn) return;` |

```js
function appendOperator(op) {
    if (!isOn) return;                 // 꺼져 있으면 끝

    if (display.value === "Error") {   // Error면 새로 시작
        display.value = "0";
    }

    const lastChar = display.value.at(-1);    // 마지막 글자

    if ("+-*/".includes(lastChar)) {
        display.value = display.value.slice(0, -1) + op;   // 기호 바꾸기
    } else {
        display.value += op;                               // 그냥 붙이기
    }
}
```

> `if (!isOn) return;`은 반드시 함수 **첫 줄**에 둡니다. 맨 아래에 두면 이미 입력·계산을 다 한 뒤에 끝나서 아무것도 막지 못합니다.

### 11.3 계산과 에러 표시

```js
function performCalculate() {
    if (!isOn) return;
    const result = calculate(display.value);   // v1의 계산 함수 재사용

    // calculate()는 계산이 안 되면 에러 문장(문자열)을 돌려줌
    if (typeof result === "string") {
        console.log(`에러 발생: ${result}`);   // 자세한 이유는 콘솔에
        display.value = "Error";               // 화면에는 짧게
    } else {
        display.value = result;
    }
}
```

### 11.4 ON/OFF

```js
function togglePower() {
    isOn = !isOn;                          // true ↔ false 뒤집기
    powerButton.classList.toggle("on");    // 버튼 색 (CSS .on-off.on = 초록)

    if (isOn) {
        display.value = "0";
    } else {
        display.value = "";
    }
}
```

### 11.5 확인 결과

| 누른 순서 | 화면 |
| --- | --- |
| `1` `+` `2` `*` `3` Enter | `7` |
| `8` `/` `2` `*` `4` Enter | `16` |
| `6` `7` `.` `8` `.` | `67.8` |
| `5` `+` `*` `3` Enter | `15` |
| `5` `/` `0` Enter | `Error` |
| `Error` 다음 `7` | `7` |
| 끈 상태에서 아무 버튼 | 빈 화면 그대로 |

---

## 12. 자주 하는 실수

실습하면서 실제로 겪은 것들입니다.

| 증상 | 원인 | 해결 |
| --- | --- | --- |
| 비밀번호를 쳐도 반응이 없음 | 이벤트를 `"click"`으로 등록 | 입력할 때마다면 `"input"` |
| 비밀번호 칸인데 다른 칸 글자 수로 검사됨 | 2번 섹션의 `input` 변수를 씀 | 해당 칸 변수(`inp_pw`)로 |
| 2번의 이름이 1번 버튼 밑에 생김 | 2번에서 `btn.after(p)` — `btn`은 1번 버튼 | `btn_check.after(p)` |
| 버튼을 눌러도 아무 일 없음, 콘솔에 404 | `<script src>` 파일 이름 오타 (`calculatorv2.js`) | 실제 파일 이름과 맞추기 |
| `Cannot read properties of null` | 선택자가 요소를 못 찾음 / 요소보다 스크립트가 먼저 실행 | 선택자 확인, `<script>`를 `</body>` 앞에 두거나 `defer` |
| 처음 `0`이 안 지워짐 | `display.value === 0` (숫자와 비교) | `display.value`는 문자열 → `=== "0"` |

> 한 페이지 안의 `<script>`들은 **변수를 같이 씁니다.** 2번 스크립트에서 1번의 `btn`, `input`이 그대로 보여서 에러 없이 엉뚱한 요소를 집습니다. 섹션마다 `btn_timer`, `btn_check`처럼 **구분되는 이름**을 쓰면 실수했을 때 바로 에러로 알 수 있습니다.

---

## 참고 자료

- OZ 코딩스쿨 AI 헬스케어 초격차 캠프 — 「Javascript」 강의 자료 (DOM과 이벤트, Web API: Timer)
