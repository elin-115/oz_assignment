# Web API

브라우저가 JavaScript에 제공하는 기능(Web API)을 정리한 문서입니다.

[← README로 돌아가기](README.md)

## 목차

1. [Web API의 정의](#1-web-api의-정의)
2. [Web API의 예시](#2-web-api의-예시)
3. [DOM API](#3-dom-api)
4. [Event API](#4-event-api)
5. [Timer API](#5-timer-api)
6. [Storage API](#6-storage-api)
7. [Fetch API](#7-fetch-api)
8. [실습 파일](#8-실습-파일)

---

## 1. Web API의 정의

**Web API**는 브라우저가 JavaScript에 제공하는 기능 모음입니다.

- JavaScript **언어 자체가 아니라** 브라우저 환경이 제공하는 API입니다.
- 웹 페이지가 브라우저 기능과 상호작용하도록 도와줍니다.
- 사용자 이벤트, 화면 제어, 네트워크 통신, 저장 등을 가능하게 합니다.

```text
┌──────────────── 브라우저 ────────────────┐
│                                          │
│   JavaScript 언어                        │
│   (변수, 조건문, 반복문, 배열, 함수 …)     │
│        │                                 │
│        │ 사용                            │
│        ▼                                 │
│   Web API                                │
│   document · addEventListener ·          │
│   setTimeout · localStorage · fetch      │
│                                          │
└──────────────────────────────────────────┘
```

> 그래서 Node.js(브라우저 없이 JS 실행)에서는 `document`, `localStorage`가 없습니다. 반대로 `console.log`, `Math`, `JSON`은 JS 언어에 들어 있어서 어디서나 씁니다.

**API(Application Programming Interface)** 는 "다른 프로그램의 기능을 쓰는 방법(창구)"이라는 뜻입니다. 우리가 직접 만들지 않아도 브라우저가 이미 만들어 둔 기능을 이름만 불러서 쓸 수 있습니다.

---

## 2. Web API의 예시

| 종류 | 대표 기능 | 하는 일 |
| --- | --- | --- |
| [DOM API](#3-dom-api) | `document.querySelector`, `element.textContent` | 화면 요소 찾기 · 바꾸기 |
| [Event API](#4-event-api) | `addEventListener` | 클릭 · 입력 같은 사용자 행동에 반응 |
| [Timer API](#5-timer-api) | `setTimeout`, `setInterval` | 일정 시간 뒤 / 일정 시간마다 실행 |
| [Storage API](#6-storage-api) | `localStorage`, `sessionStorage` | 브라우저에 데이터 저장 |
| [Fetch API](#7-fetch-api) | `fetch` | 서버와 통신 |

---

## 3. DOM API

HTML 문서를 JavaScript가 다룰 수 있게 만든 객체 구조(DOM)를 조작합니다. 자세한 내용은 [DOM_Event.md](DOM_Event.md)에 정리했습니다.

```js
const el = document.querySelector("#msg");   // 요소 찾기
el.textContent = "Hello, Web API";           // 글자 바꾸기
el.style.color = "red";                      // 스타일 바꾸기
el.classList.add("on");                      // 클래스 넣기

const li = document.createElement("li");     // 새 요소 만들기
list.appendChild(li);                        // 넣기
```

| 기능 | 메서드 · 속성 |
| --- | --- |
| 찾기 | `getElementById`, `querySelector`, `querySelectorAll` |
| 내용 | `textContent`, `innerHTML`, `value`(입력칸) |
| 스타일 · 클래스 | `style.속성`, `classList.add / remove / toggle` |
| 만들고 넣기 | `createElement`, `appendChild`, `after` |

---

## 4. Event API

특정 요소에 특정 이벤트가 발생하면 지정한 함수를 실행합니다. 자세한 내용은 [DOM_Event.md](DOM_Event.md)에 정리했습니다.

```js
button.addEventListener("click", () => {
    console.log("클릭됨");
});
```

| 이벤트 | 언제 |
| --- | --- |
| `click` | 클릭 |
| `input` | 입력칸의 값이 바뀔 때마다 |
| `mouseover` / `mouseout` | 마우스를 올림 / 벗어남 |
| `keydown` / `keyup` | 키를 누름 / 뗌 |
| `load`, `DOMContentLoaded` | 페이지 / DOM 로드 완료 |

---

## 5. Timer API

시간을 기준으로 함수를 실행합니다. 시간 단위는 **밀리초**(`1000` = 1초)입니다.

| 함수 | 동작 | 멈추기 |
| --- | --- | --- |
| `setTimeout(함수, 밀리초)` | 일정 시간이 지난 뒤 **한 번** 실행 | `clearTimeout(id)` |
| `setInterval(함수, 밀리초)` | 일정 시간마다 **반복** 실행 | `clearInterval(id)` |

### 5.1 setTimeout

일정 시간이 지난 뒤에 함수를 한 번 실행합니다.

```js
setTimeout(() => {
    console.log("3초 후 실행");
}, 3000);
```

**실습** — 버튼을 누르고 3초 뒤 메시지 표시 (`html/web_api.html`)

```js
const btn = document.querySelector(".btn_g");

btn.addEventListener("click", () => {
    setTimeout(() => {
        const span = document.createElement("span");
        span.textContent = "⏳ 3초가 지났습니다";
        span.style.color = "red";
        btn.after(span);   // btn 바로 뒤에 span 넣기
    }, 3000);
});
```

### 5.2 setInterval

일정 시간마다 함수를 반복 실행합니다.

```js
setInterval(() => {
    console.log("1초마다 실행");
}, 1000);
```

> 함수를 넘길 때 괄호를 붙이지 않습니다. `setInterval(fetchPrices, 1000)` ✓ / `setInterval(fetchPrices(), 1000)` ✗ (지금 한 번 실행하고 결과를 넘겨 버림)

### 5.3 timerId — 타이머 멈추기

`setTimeout` / `setInterval`은 타이머를 구분하는 **번호**를 돌려줍니다. 이 번호로 타이머를 멈춥니다.

```js
const timerId = setInterval(() => {
    console.log("실행");
}, 1000);

clearInterval(timerId);   // 멈추기
```

timerId를 쓰는 이유

- 타이머를 **멈추기** 위해
- 버튼을 여러 번 눌러도 타이머가 **하나만** 돌게 하기 위해

```js
// 이미 돌고 있으면 또 시작하지 않기
if (timerId !== null) return;
```

> `setInterval`을 멈추지 않고 또 시작하면 타이머가 **두 개** 돌아서 1초에 두 번씩 실행됩니다. 다시 시작하기 전에는 `clearInterval`로 먼저 멈춥니다.

### 5.4 실습: 5초 카운트다운

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
    if (timerId !== null) return;   // 이미 돌고 있으면 무시
    timeEl.textContent = time;

    timerId = setInterval(function () {
        time--;
        if (time === 0) {
            timeEl.textContent = "끝";
            clearInterval(timerId);   // 0이 되면 멈추기
            timerId = null;
        } else {
            timeEl.textContent = time;
        }
    }, 1000);
});
```

### 5.5 실습: 뽀모도로 타이머 (`html/timer.html`, `js/timer.js`)

분을 입력하고 시작하면 `MM:SS` 형식으로 1초씩 줄어드는 타이머입니다.

**남은 초 → `MM:SS` 만들기**

```js
// 97초 → 01:37
const min = Math.floor(remainingSeconds / 60);   // 몫 = 분
const sec = remainingSeconds % 60;               // 나머지 = 초

String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
```

- `Math.floor(97 / 60)` → `1`, `97 % 60` → `37`
- `padStart(2, "0")`: 문자열이 2자리가 될 때까지 **앞을 `"0"`으로 채움** (`"1"` → `"01"`, `"37"` → `"37"`)

**시작 / 중지**

```js
let remainingSeconds = 0;   // 남은 시간(초)
let intervalId = null;

startBtn.addEventListener("click", () => {
    const minutes = Number(timeInput.value);   // 입력값은 문자열 → 숫자로
    if (minutes <= 0) {
        alert("1 이상의 시간(분)을 입력하세요.");
        return;
    }

    clearInterval(intervalId);                 // 재시작: 돌고 있던 타이머 먼저 멈추기
    remainingSeconds = minutes * 60;
    updateDisplay();

    intervalId = setInterval(() => {
        remainingSeconds--;                    // 1초마다 1초씩 줄이기
        updateDisplay();

        if (remainingSeconds <= 0) {           // 0이 되면 멈추기
            clearInterval(intervalId);
            display.textContent = "끝!";
        }
    }, 1000);
});

stopBtn.addEventListener("click", () => {
    clearInterval(intervalId);                 // 중지
});
```

**리셋** — 타이머를 멈추고 처음 화면으로 되돌립니다. 중지는 남은 시간을 그대로 두고, 리셋은 전부 지웁니다.

```js
resetBtn.addEventListener("click", () => {
    clearInterval(intervalId);              // 돌고 있던 타이머 멈추기
    remainingSeconds = 0;                   // 남은 시간 초기화
    timeInput.value = "";                   // 입력칸 비우기
    startBtn.textContent = "시작";           // "재시작" → "시작"
    display.className = "fs-3 text-muted";  // 처음 흐린 글자색으로
    display.textContent = "시간을 설정하세요.";
});
```

---

## 6. Storage API

브라우저가 제공하는 **클라이언트 측 저장소**입니다. 서버 없이도 데이터를 브라우저에 저장 · 조회할 수 있습니다.

**특징**

- 키(key) / 값(value) 형태로 저장
- 값은 **문자열(string)로만** 저장
- 페이지를 새로고침해도 유지

| | localStorage | sessionStorage |
| --- | --- | --- |
| 유지 기간 | **영구** (브라우저를 껐다 켜도 남음) | **세션 단위** (탭을 닫으면 삭제) |
| 범위 | 같은 사이트의 모든 탭이 공유 | 같은 사이트라도 **탭마다 따로** |
| 만료 | 없음 | 탭 닫을 때 |
| 용도 | 설정값, 관심항목, 최근 본 목록 | 임시 데이터, 입력 중인 내용 |

### 6.1 사용법

두 저장소 모두 메서드 이름이 같습니다.

```js
localStorage.setItem("name", "Alex");   // 저장
localStorage.getItem("name");           // 꺼내기 → "Alex" (없으면 null)
localStorage.removeItem("name");        // 하나 지우기
localStorage.clear();                   // 전부 지우기

sessionStorage.setItem("name", "Alex"); // 사용법 동일
```

> 저장된 값은 개발자 도구 → Application 탭 → Local Storage / Session Storage에서 볼 수 있습니다.

> 브라우저에 그대로 저장되고 누구나 개발자 도구로 볼 수 있으니, 비밀번호 같은 **민감한 정보는 넣지 않습니다.**

### 6.2 객체 · 배열 저장하기 — JSON

문자열만 저장되므로, 객체나 배열은 **JSON 문자열로 바꿔서** 넣고 꺼낼 때 다시 되돌립니다.

| 함수 | 방향 | 예 |
| --- | --- | --- |
| `JSON.stringify(값)` | 객체 · 배열 → 문자열 (저장할 때) | `["BTCUSDT"]` → `'["BTCUSDT"]'` |
| `JSON.parse(문자열)` | 문자열 → 객체 · 배열 (꺼낼 때) | `'["BTCUSDT"]'` → `["BTCUSDT"]` |

```js
const user = { name: "Alex", age: 20 };

localStorage.setItem("user", JSON.stringify(user));          // 저장
const savedUser = JSON.parse(localStorage.getItem("user"));  // 꺼내기
console.log(savedUser.name);                                 // "Alex"
```

> 그냥 `setItem("user", user)`로 넣으면 `"[object Object]"`라는 글자로 저장되어 내용이 사라집니다.

### 6.3 실습: 입력값 저장

새로고침해도 저장한 이름이 남아 있게 합니다.

```html
<input id="name" placeholder="이름 입력" />
<button id="save">저장</button>
<p id="result"></p>
```

```js
const input = document.querySelector("#name");
const button = document.querySelector("#save");
const result = document.querySelector("#result");

// 페이지가 열릴 때: 저장된 값이 있으면 보여 주기
const savedName = localStorage.getItem("name");
if (savedName) {
    result.textContent = savedName;
}

// 저장 버튼
button.addEventListener("click", function () {
    localStorage.setItem("name", input.value);
    result.textContent = input.value;
});
```

### 6.4 실습: 관심항목 (암호화폐 추적기)

```js
let favorites = loadFavorites();   // 관심항목 심볼 배열

function loadFavorites() {
    const saved = localStorage.getItem("favorites");
    if (saved === null) {
        return [];               // 처음 열었을 때는 저장된 게 없으니 빈 배열
    }
    return JSON.parse(saved);    // 문자열 → 배열
}

function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));   // 배열 → 문자열
}
```

---

## 7. Fetch API

브라우저가 제공하는 **서버 통신용** Web API입니다.

- HTTP 요청(Request)을 보내고 응답(Response)을 받습니다.
- **비동기**로 동작합니다.

### 7.1 비동기(Asynchronous)

오래 걸리는 작업을 **기다리지 않고** 다음 코드를 먼저 실행하는 방식입니다.

- 서버 요청은 시간이 걸리기 때문에, 요청은 보내 두고 다른 작업을 계속 진행합니다.
- `fetch`는 서버에 요청을 보내고, **응답이 오면 그때** 결과를 처리합니다.

```js
console.log("1. 요청 전");
fetch(url).then(() => console.log("3. 응답 도착"));
console.log("2. 요청 후");

// 출력 순서: 1 → 2 → 3
```

> 그래서 응답 데이터를 쓰는 코드는 반드시 `.then()` **안**에 있어야 합니다. 바깥에 쓰면 데이터가 오기 전에 실행되어 `is not defined` 에러가 납니다.

### 7.2 기본 사용법 (GET)

```js
fetch("https://jsonplaceholder.typicode.com/posts")   // 1. 요청 보냄
    .then(response => response.json())                // 2. 응답을 JSON으로 바꿈
    .then(data => {                                    // 3. 실제 데이터 사용
        console.log(data);
    });
```

1. `fetch(url)` → 요청 보냄
2. `response` → 서버 응답
3. `response.json()` → JSON을 JavaScript 데이터로 바꿈
4. `data` → 실제 데이터

`.then().then()`처럼 점으로 이어 붙이는 것을 **메서드 체이닝**이라고 합니다. 앞 단계가 끝나면 그 결과를 다음 `.then`이 받습니다.

### 7.3 에러 처리 — catch, finally

| | 언제 실행 |
| --- | --- |
| `.then()` | 앞 단계가 성공했을 때 |
| `.catch()` | 중간 어디서든 실패했을 때 |
| `.finally()` | 성공이든 실패든 **마지막에 항상** |

```js
fetch(url)
    .then(response => {
        if (!response.ok) {   // 404, 500 같은 응답은 fetch가 실패로 치지 않음 → 직접 확인
            throw new Error("네트워크 응답에 문제가 있습니다.");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Fetch 에러:", error);   // 위에서 난 에러를 전부 여기서 잡음
    })
    .finally(() => {
        isFetching = false;                   // 로딩 끝 표시 같은 마무리
    });
```

- `response.ok`: 응답 상태가 200번대(성공)면 `true`
- `throw new Error(...)`: 에러를 일부러 발생시켜 `.catch`로 보냄

### 7.4 실습: 버튼으로 글 목록 5개씩 불러오기 (`html/web_api.html`)

버튼을 누를 때마다 posts의 title을 **다음 5개씩** 목록에 이어 붙이고, 100개를 다 보여 주면 버튼을 끕니다.

```html
<button id="load">불러오기</button>
<ol id="list"></ol>
```

```js
const button = document.querySelector("#load");
const list = document.querySelector("#list");

let start = 0;   // 이번에 보여 줄 첫 번째 글 번호
let end = 5;     // 이번에 보여 줄 마지막 글 번호 + 1

button.addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => {
            if (!response.ok) {
                throw new Error("네트워크 응답에 문제가 있습니다.");
            }
            return response.json();
        })
        .then(posts => {
            // 이번에 보여 줄 5개: start번부터 end번 직전까지 (0~4 → 5~9 → 10~14 ...)
            for (const post of posts.slice(start, end)) {
                const li = document.createElement("li");
                li.textContent = post.title;
                list.appendChild(li);
            }

            // 다음 클릭 때는 그다음 5개 (응답이 온 뒤에 늘려야 이번 목록이 0번부터 나옴)
            start += 5;
            end += 5;

            // 더 보여 줄 글이 없으면 버튼 끄기
            if (start >= posts.length) {
                button.disabled = true;
            }
        })
        .catch(error => {
            console.error("Fetch 에러:", error);
        });
});
```

- `slice(start, end)`는 배열의 `start`번부터 `end`번 **직전**까지 잘라 새 배열로 돌려줍니다.
- `start`, `end`를 늘리는 코드는 반드시 `.then` **안**에 있어야 합니다. `fetch` 바로 아래(바깥)에 두면 응답이 오기 **전에** 먼저 늘어나서, 첫 클릭부터 0~4번이 아니라 5~9번이 나옵니다(7.1 비동기).
- `button.disabled = true`로 버튼을 끄면 더 눌러지지 않고, CSS의 `button:disabled`로 회색이 됩니다.

### 7.5 POST 요청 — 서버로 데이터 보내기

`fetch`의 두 번째 칸에 옵션을 넣습니다.

```js
fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",                                    // 보내기 (기본은 GET: 받기)
    headers: { "Content-Type": "application/json" },   // 보내는 데이터가 JSON이라고 알림
    body: JSON.stringify({ email: input.value }),      // 보낼 데이터 (객체 → 문자열)
})
    .then(res => res.json())
    .then(data => {
        result.textContent = JSON.stringify(data, null, 2);   // 2 → 들여쓰기 (가독성)
    });
```

| | GET | POST |
| --- | --- | --- |
| 목적 | 데이터 **받기** | 데이터 **보내기** |
| 보낼 데이터 | 없음 (필요하면 주소에) | `body`에 담음 |
| fetch 옵션 | 생략 가능 | `method`, `headers`, `body` |

### 7.6 실습: 암호화폐 가격 변동 추적기

Binance API를 **1초마다** 불러와 USDT 코인 시세를 표로 보여 줍니다. Fetch · Timer · Storage · DOM · Event API를 모두 함께 씁니다. 👉 [실행해 보기](https://elin-115.github.io/oz_assignment/html/cryptocurrency.html)

| 기능 | 쓴 Web API |
| --- | --- |
| 1초마다 시세 받아오기 | Fetch API + Timer API (`setInterval`) |
| 검색 · 탭 · ★ 클릭 | Event API (`input`, `click`, 이벤트 위임) |
| 관심항목 저장 | Storage API (`localStorage` + JSON) |
| 표 그리기 | DOM API (`innerHTML`, `classList`) |

```js
let isFetching = false;   // 지금 데이터를 받는 중인지 (요청이 겹치지 않게)

function fetchPrices() {
    if (isFetching) return;   // 받는 중이면 건너뛰기
    isFetching = true;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            // USDT로 끝나고 현재가가 0이 아닌 코인만
            coins = data.filter(coin => coin.symbol.endsWith("USDT") && Number(coin.lastPrice) !== 0);
            renderTable();
        })
        .catch(error => {
            console.log("시세를 불러오지 못했습니다:", error);
        })
        .finally(() => {
            isFetching = false;   // 성공이든 실패든 끝났으면 다시 false
        });
}

fetchPrices();                    // 처음 한 번 바로
setInterval(fetchPrices, 1000);   // 그 뒤로 1초마다
```

**배운 점**

- **요청 횟수 제한**: 공개 API는 IP당 사용량 제한이 있습니다. 이 API는 1분에 6000까지인데 한 번에 80을 써서, 탭 두 개로 1초마다 부르자 한도를 넘어 잠시 차단(HTTP 418)됐습니다. 차단된 응답에는 허용 헤더가 없어서 콘솔에는 `CORS policy` 에러로 보입니다. 개발 중에는 간격을 늘려 두고, 마지막에 1초로 되돌립니다.
- **요청 겹침**: 응답이 1.9MB라 1초 안에 안 올 때가 있어서 `isFetching`으로 겹치는 요청을 막았습니다. `false`로 되돌리는 건 `.finally`에서 해야 실패했을 때도 풀립니다.
- **이벤트 위임**: 표가 1초마다 새로 그려져서 ★ 버튼마다 이벤트를 붙이면 사라집니다. 바뀌지 않는 `tbody`에 한 번만 붙이고 `event.target.closest(".fav-btn")`으로 누른 버튼을 찾았습니다.

---

## 8. 실습 파일

| 파일 | 내용 | 쓴 API |
| --- | --- | --- |
| [`html/web_api.html`](html/web_api.html) | Web API 예시 목록, 3초 후 메시지, Storage 설명, posts 5개씩 불러오기 | Timer, Storage, Fetch |
| [`html/timer.html`](html/timer.html) + [`js/timer.js`](js/timer.js) | 뽀모도로 타이머 (분 입력 → `MM:SS` 카운트다운, 중지, 리셋) | Timer, Event, DOM |
| [`html/cryptocurrency.html`](html/cryptocurrency.html) + [`js/cryptocurrency.js`](js/cryptocurrency.js) | 암호화폐 가격 변동 추적기 | Fetch, Timer, Storage, Event, DOM |

---

## 참고 자료

- OZ 코딩스쿨 AI 헬스케어 초격차 캠프 — 「Javascript」 강의 자료 (Web API)
- 테스트용 API — https://jsonplaceholder.typicode.com/posts
