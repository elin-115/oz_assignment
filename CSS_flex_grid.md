# CSS Flexbox & Grid

CSS 레이아웃의 두 축인 Flexbox와 Grid를 정리한 문서입니다.

[← README로 돌아가기](README.md)

## 목차

1. [레이아웃 도구 비교](#1-레이아웃-도구-비교)
2. [Flexbox 기본](#2-flexbox-기본)
3. [Flex Container 속성](#3-flex-container-속성)
4. [Flex Item 속성](#4-flex-item-속성)
5. [Flexbox 활용 예제](#5-flexbox-활용-예제)
6. [Grid 기본](#6-grid-기본)
7. [Grid 열과 행 만들기](#7-grid-열과-행-만들기)
8. [grid-template-areas](#8-grid-template-areas)
9. [Grid 실습 파일](#9-grid-실습-파일)
10. [연습 사이트](#10-연습-사이트)

---

## 1. 레이아웃 도구 비교

아무 레이아웃 속성도 주지 않으면 요소는 **Normal Flow**(Inline은 왼쪽→오른쪽, Block은 위→아래)로 배치됩니다. Normal Flow만으로는 가로 정렬, 가운데 정렬, 간격 맞추기가 어렵기 때문에 아래 도구를 사용합니다.

| 도구 | 차원 | 용도 |
| --- | --- | --- |
| `position` | - | 특정 요소의 위치 조정. 배치 제어는 되지만 레이아웃용은 아님 |
| Flexbox | 1차원 (가로 **또는** 세로) | 한 방향으로 늘어선 요소들의 정렬과 간격 |
| Grid | 2차원 (가로 **와** 세로) | 행과 열로 이루어진 페이지 구조 자체를 설계 |

---

## 2. Flexbox 기본

**Flexbox(Flexible Box Layout)** 는 여러 박스를 한 방향으로 유연하게 배치하기 위한 레이아웃 시스템입니다.

- 요소들을 가로 또는 세로 중 **한 방향**으로 정렬
- 요소의 크기와 간격을 유연하게 조절하고, 남은 공간을 원하는 비율로 분배
- 부모가 자식의 배치와 정렬을 제어
- 반응형 디자인을 구현하는 데 매우 유용

`display: flex`를 주면 부모는 **flex container**, 직계 자식은 **flex item**이 됩니다.

```html
<div class="container">
    <div class="item">A</div>
    <div class="item">B</div>
    <div class="item">C</div>
</div>
```

```css
.container {
    display: flex;
    gap: 10px;          /* 아이템 사이 간격 */
}
.item {
    width: 80px;
    height: 80px;
    background: skyblue;
}
```

### 2.1 주축과 교차축

Flexbox는 두 개의 축을 기준으로 요소를 배치하고 정렬합니다.

| 축 | 의미 | 정렬 속성 |
| --- | --- | --- |
| 주축 (Main Axis) | 요소들이 배치되는 기본 방향 | `justify-content` |
| 교차축 (Cross Axis) | 주축에 수직인 방향 | `align-items` |

```text
flex-direction: row (기본값)           flex-direction: column

  주축 ──────────────▶                   교차축 ──────▶
  ┌───┐ ┌───┐ ┌───┐                     ┌───────────┐  주
  │ A │ │ B │ │ C │  │ 교차축            │     A     │  축
  └───┘ └───┘ └───┘  ▼                   ├───────────┤  │
                                         │     B     │  │
                                         ├───────────┤  ▼
                                         │     C     │
                                         └───────────┘
```

- 요소들이 **가로**로 배치되면 주축은 가로, 교차축은 세로
- 요소들이 **세로**로 배치되면 주축은 세로, 교차축은 가로

`flex-direction`을 `column`으로 바꾸면 `justify-content`와 `align-items`가 담당하는 방향도 함께 바뀝니다.

### 2.2 정렬 순서

정렬할 때는 이 순서로 생각합니다.

1. **주축 방향 결정** — `flex-direction` (기본값 `row`)
2. **주축 정렬 결정** — `justify-content` (기본값 `flex-start`)
3. **교차축 정렬 결정** — `align-items` (기본값 `stretch`)

---

## 3. Flex Container 속성

부모(`display: flex`가 적용된 요소)에 쓰는 속성입니다.

### 3.1 flex-direction — 주축 방향

| 값 | 방향 |
| --- | --- |
| `row` (기본값) | 가로, 왼쪽 → 오른쪽 |
| `row-reverse` | 가로, 오른쪽 → 왼쪽 |
| `column` | 세로, 위 → 아래 |
| `column-reverse` | 세로, 아래 → 위 |

### 3.2 justify-content — 주축 정렬

| 값 | 정렬 |
| --- | --- |
| `flex-start` (기본값) | 시작점에 모음 |
| `center` | 가운데에 모음 |
| `flex-end` | 끝점에 모음 |
| `space-between` | 요소 사이 간격 균일, 양 끝에는 간격 없음 |
| `space-around` | 요소마다 양옆에 같은 간격 (양 끝 간격은 사이 간격의 절반) |
| `space-evenly` | 양 끝과 요소 사이 간격이 모두 같음 |

```text
flex-start     [A][B][C]
center               [A][B][C]
flex-end                   [A][B][C]
space-between  [A]        [B]        [C]
space-around     [A]     [B]     [C]
space-evenly      [A]    [B]    [C]
```

### 3.3 align-items — 교차축 정렬

| 값 | 정렬 |
| --- | --- |
| `stretch` (기본값) | 교차축 방향으로 컨테이너를 꽉 채움 (높이를 지정하지 않았을 때) |
| `flex-start` | 교차축의 시작점 (row일 때 위) |
| `center` | 교차축의 가운데 |
| `flex-end` | 교차축의 끝점 (row일 때 아래) |

`justify-content: center` + `align-items: center` 조합이 가장 많이 쓰는 **가운데 정렬**입니다.

```css
.item {
    display: flex;
    justify-content: center;   /* 가로 가운데 */
    align-items: center;       /* 세로 가운데 */
}
```

### 3.4 flex-wrap — 줄바꿈

| 값 | 동작 |
| --- | --- |
| `nowrap` (기본값) | 넘쳐도 한 줄에 배치 (아이템이 줄어듦) |
| `wrap` | 컨테이너를 넘치면 다음 줄로 줄바꿈 |
| `wrap-reverse` | 줄바꿈하되 줄 순서를 거꾸로 |

### 3.5 flex-flow — 단축 속성

`flex-direction`과 `flex-wrap`을 한 번에 설정합니다.

```css
.box { flex-flow: row wrap; }   /* flex-direction: row; flex-wrap: wrap; */
```

### 3.6 align-content — 여러 줄 사이 간격

`flex-wrap: wrap`으로 **줄이 여러 개**일 때, 줄들을 교차축 방향으로 어떻게 배치할지 정합니다. 한 줄일 때는 효과가 없습니다.

| 값 | 배치 |
| --- | --- |
| `flex-start` | 줄들을 컨테이너의 꼭대기에 정렬 |
| `flex-end` | 줄들을 컨테이너의 바닥에 정렬 |
| `center` | 줄들을 가운데에 정렬 |
| `space-between` | 줄들 사이에 동일한 간격 |
| `space-around` | 줄들 주위에 동일한 간격 |
| `stretch` (기본값) | 줄들을 컨테이너에 맞도록 늘림 |

> `align-items`는 **한 줄 안에서** 아이템을 정렬하고, `align-content`는 **줄 덩어리 전체**를 정렬합니다.

### 3.7 gap — 아이템 사이 간격

```css
.container { gap: 10px; }          /* 가로·세로 간격 모두 10px */
.container { gap: 20px 10px; }     /* 행 간격 20px, 열 간격 10px */
```

---

## 4. Flex Item 속성

자식(flex item)에 쓰는 속성입니다.

### 4.1 flex — 비율 조절

남은 공간을 숫자 비율대로 나눠 갖습니다.

```css
.a { flex: 1; }
.b { flex: 2; }   /* .a의 두 배 */
.c { }            /* flex 값 없음 → 자기 크기만 차지 */
```

- `flex: 1` = 남은 공간을 다 차지하기
- flex 값이 없는 아이템이 있으면, 그 아이템을 뺀 남은 공간을 flex 값이 있는 아이템끼리 비율대로 나눕니다.

### 4.2 align-self — 하나만 따로 정렬

교차축을 따라 **특정 아이템 하나**의 정렬을 지정합니다. 부모의 `align-items`보다 우선합니다.

| 값 | 정렬 |
| --- | --- |
| `flex-start` | 시작점 |
| `center` | 가운데 |
| `flex-end` | 끝점 |

```css
.container { display: flex; align-items: flex-start; }
.item-special { align-self: flex-end; }   /* 이 아이템만 아래로 */
```

### 4.3 order — 보이는 순서 바꾸기

HTML 순서는 그대로 두고 화면에 보이는 순서만 바꿉니다.

- 기본값 `0`, 숫자가 작을수록 앞에 배치
- 양의 정수, 음의 정수, 0 모두 가능 (예: `-1`, `0`, `5`)

```css
.item-last { order: -1; }   /* 맨 앞으로 */
```

---

## 5. Flexbox 활용 예제

### 5.1 연락처 한 줄로 배치

```html
<div class="contact-row">
    <span>j.yeon9919@gmail.com</span>
    <span class="divider">|</span>
    <span>010-1234-5678</span>
    <span class="divider">|</span>
    <a class="github-link" href="https://github.com/elin-115">
        <i class="fa-brands fa-github"></i>GitHub
    </a>
</div>
```

```css
.contact-row {
    display: flex;
    gap: 4px;
    font-size: 0.9rem;
    justify-content: center;
    margin: 16px;
}
```

### 5.2 footer를 화면 아래에 붙이기

`main`이 남은 높이를 모두 가져가서 `footer`가 화면 아래로 밀려납니다.

```css
body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
main {
    flex: 1;
}
```

### 5.3 커머스 페이지 레이아웃

프로젝트 규모가 커질수록 페이지 구조를 먼저 구상하는 것이 중요합니다.

```text
┌──────────────────────────────────────────────┐
│ header : 로고(h1)              nav(ul > li)    │
├──────────────────────────────────────────────┤
│ main   : 카테고리 필터                         │
│          [상품] [상품] [상품] [상품]            │
├──────────────────────────────────────────────┤
│ footer : 서비스 정보   |   연락처(address)      │
└──────────────────────────────────────────────┘
```

```css
/* 헤더: 로고는 왼쪽, 내비게이션은 오른쪽 */
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* 내비게이션: 복합 선택자로 ul만 가로 배치 */
nav ul {
    display: flex;
    list-style: none;
    gap: 20px;
}

/* 카테고리 필터 */
.category-container {
    display: flex;
    align-items: center;
}

/* 상품 목록: 카드를 가로로 */
.product-list {
    display: flex;
    gap: 20px;
}

/* 버튼 */
.product-button {
    background-color: blue;
    color: white;
    border-radius: 5px;
    cursor: pointer;   /* 클릭 가능함을 표시 */
}
```

- 푸터의 연락처는 시맨틱 태그 `<address>`로 감싸고, 이메일 링크는 `href="mailto:주소"`로 작성합니다.

### 5.4 반응형 Navigation Bar

화면이 좁아지면 `flex-direction`을 `column`으로 바꿔 세로로 쌓습니다. 전체 코드는 [CSS.md의 9.2](CSS.md#92-실습-반응형-navigation-bar)에 있습니다.

```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media (max-width: 400px) {
    .navbar {
        flex-direction: column;
        align-items: flex-start;
    }
}
```

---

## 6. Grid 기본

**Grid**는 행(row)과 열(column)을 동시에 제어하는 **2차원** 레이아웃 시스템입니다. 화면 전체 구조를 만들 때 사용합니다.

- **Grid Container**: `display: grid`가 적용된 부모
- **Grid Item**: container의 직계 자식 요소
- 배치는 container(부모) 기준으로 결정됩니다.

```html
<div class="container">
    <div class="item">A</div>
    <div class="item">B</div>
    <div class="item">C</div>
    <div class="item">D</div>
    <div class="item">E</div>
    <div class="item">F</div>
</div>
```

```css
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
.item {
    height: 80px;
    border: 1px solid black;
    display: flex;              /* 칸 안의 글자는 flex로 가운데 정렬 */
    align-items: center;
    justify-content: center;
}
```

> Grid로 큰 틀을 나누고, 칸 안의 정렬은 Flexbox로 하는 조합을 자주 씁니다.

---

## 7. Grid 열과 행 만들기

### 7.1 열 — grid-template-columns

```css
grid-template-columns: 25% 25% 25% 25%;   /* 4열, 각 25% */
grid-template-columns: repeat(4, 25%);    /* 위와 같은 뜻 */
grid-template-columns: 1fr 2fr 1fr;       /* 남은 공간을 1:2:1 비율로 */
```

- `repeat(횟수, 크기)`: 같은 크기를 반복할 때
- `fr` (fraction): 남은 공간을 나눠 갖는 비율 단위. `%`와 달리 `gap`을 뺀 나머지를 나누기 때문에 넘치지 않습니다.

### 7.2 행 — grid-template-rows / grid-auto-rows

```css
grid-template-rows: 80px 80px;   /* 1행, 2행 높이를 직접 지정 */
grid-auto-rows: 80px;            /* 지정하지 않은 행이 자동으로 생길 때의 높이 */
```

### 7.3 gap

```css
gap: 10px;   /* 칸 사이 간격 */
```

> 같은 속성을 여러 번 쓰면 **마지막 줄**이 적용됩니다. 여러 값을 비교해 볼 때는 쓰지 않을 줄을 주석으로 막아 두면 헷갈리지 않습니다.

---

## 8. grid-template-areas

칸마다 이름을 붙여 **지도를 그리듯** 레이아웃을 설계합니다.

1. 부모에 `grid-template-areas`로 칸 배치를 문자열로 적습니다. 따옴표 한 줄이 한 행입니다.
2. 자식에 `grid-area`로 자기가 들어갈 이름을 지정합니다.
3. 같은 이름이 여러 칸에 걸쳐 있으면 그 칸들을 합쳐서 차지합니다. (직사각형 모양이어야 함)

```css
.container {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(4, 200px);
    grid-template-areas:
        "img1 img3 img3"
        "img1 img4 img6"
        "img2 img2 img6"
        "img5 img5 img5";
}

.img1 { grid-area: img1; }
.img2 { grid-area: img2; }
.img3 { grid-area: img3; }
.img4 { grid-area: img4; }
.img5 { grid-area: img5; }
.img6 { grid-area: img6; }
```

```text
┌──────┬──────────────┐
│      │     img3     │
│ img1 ├──────┬───────┤
│      │ img4 │       │
├──────┴──────┤ img6  │
│    img2     │       │
├─────────────┴───────┤
│        img5         │
└─────────────────────┘
```

### 8.1 갤러리 꾸미기

```css
/* 이미지가 칸을 꽉 채우도록 */
.container .item img {
    width: 100%;
    height: 100%;
    object-fit: cover;     /* 비율을 유지하면서 칸을 채우고 넘치는 부분은 잘라냄 */
    transition: 0.5s;
    border-radius: 10px;
}

/* 마우스를 올린 이미지만 남기고 나머지는 흐리게 */
.container:hover .item img:not(:hover) {
    filter: grayscale(1);
    opacity: 0.5;
}
```

갤러리 HTML은 Emmet으로 한 번에 만들 수 있습니다.

```text
.container>.item.img$*6>img[src="" alt="Img$"]
```

---

## 9. Grid 실습 파일

| 파일 | 내용 |
| --- | --- |
| [`html/grid.html`](html/grid.html) | `grid-template-columns`를 `%`, `repeat()`, `fr`로 바꿔 가며 비교. `grid-template-rows: 100px 200px`로 행 높이 지정 |
| [`html/gallery.html`](html/gallery.html) | `grid-template-areas`로 6장 갤러리 배치. hover 시 나머지 이미지를 흑백·반투명 처리 |

`gallery.html`에서 직접 짠 배치입니다. 강의 예제와 다르게 `img2`를 세로로 3칸 길게 썼습니다.

```css
grid-template-areas:
    "img1 img2 img3"
    "img1 img2 img6"
    "img4 img2 img6"
    "img4 img5 img5";
```

```text
┌──────┬──────┬──────┐
│ img1 │      │ img3 │
│      │      ├──────┤
├──────┤ img2 │      │
│      │      │ img6 │
│ img4 ├──────┴──────┤
│      │    img5     │
└──────┴─────────────┘
```

---

## 10. 연습 사이트

| 주제 | 사이트 |
| --- | --- |
| Flexbox | [Flexbox Froggy](https://flexboxfroggy.com/#ko) |
| Grid | [Grid Garden](https://cssgridgarden.com/#ko) |

---

## 참고 자료

- OZ 코딩스쿨 AI 헬스케어 초격차 캠프 — 「HTML & CSS」 강의 자료 (Flexbox, Grid)
- 노션 — Chapter2. 웹 개발 환경 설정 및 기초 지식 (6. Flexbox, 7. 커머스 페이지 만들기)
