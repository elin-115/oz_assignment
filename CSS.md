# CSS 기초

CSS 기초 문법을 학습하며 정리한 내용입니다.

[← README로 돌아가기](README.md)

## 목차

1. [CSS란?](#1-css란)
2. [CSS 적용 방법 3가지](#2-css-적용-방법-3가지)
3. [셀렉터(Selector)](#3-셀렉터selector)
4. [박스 모델](#4-박스-모델)
5. [자주 쓰는 속성](#5-자주-쓰는-속성)
6. [Inline vs. Block-level](#6-inline-vs-block-level)
7. [position](#7-position)
8. [Flexbox](#8-flexbox)
9. [반응형 디자인과 Media Query](#9-반응형-디자인과-media-query)
10. [Grid](#10-grid)
11. [연습 사이트](#11-연습-사이트)

---

## 1. CSS란?

**CSS(Cascading Style Sheets)** 는 HTML 요소의 모양과 배치를 정하는 언어입니다.

- 글자 색, 크기, 폰트
- 여백, 정렬, 위치
- 레이아웃(Flex, Grid): 화면에 요소를 어떻게 배치할지
- 반응형 디자인: 화면 크기에 따라 레이아웃이 자동으로 바뀌는 디자인

**기본 구조**

```css
selector { property: value; }
```

```css
p { color: red; }
```

## 2. CSS 적용 방법 3가지

| 방법 | 작성 위치 | 특징 |
| --- | --- | --- |
| 인라인 스타일 (Inline style) | 태그의 `style` 속성 | 그 요소 하나에만 적용. 같은 스타일을 반복해서 써야 함 |
| 내부 스타일 시트 (Internal CSS) | `<head>` 안의 `<style>` | 한 문서 안에서 셀렉터로 여러 요소에 적용 |
| 외부 스타일 시트 (External CSS) | 별도의 `.css` 파일 | 여러 문서가 같은 스타일을 공유. 관리하기 가장 좋음 |

### 2.1 인라인 스타일

```html
<p style="font-size: x-large; font-weight: bold; text-align: center;">Kim ji yeon</p>
<p style="font-size: medium; text-align: center;">Web Publisher in Seoul</p>
<p style="font-size: xx-small; text-align: center;">Copyright &#169; Kim ji yeon</p>
```

공통 스타일은 부모 요소에 한 번만 적으면 자식에게 적용됩니다.

```html
<div style="text-align: center;">
    <p style="font-size: x-large; font-weight: bold;">Kim ji yeon</p>
    <p style="font-size: medium;">Web Publisher in Seoul</p>
    <p style="font-size: xx-small;">Copyright &#169; Kim ji yeon</p>
</div>
```

### 2.2 내부 스타일 시트

```html
<head>
    <style>
        div {text-align: center;}
        header {font-size: x-large; font-weight: bold;}
        main {font-size: medium;}
        footer {font-size: xx-small;}
    </style>
</head>
```

### 2.3 외부 스타일 시트

```html
<link rel="stylesheet" href="style.css">
```

## 3. 셀렉터(Selector)

어떤 HTML 요소에 스타일을 적용할지 지정하는 규칙입니다.

### 3.1 기본 셀렉터

| 셀렉터 | 표기 | 대상 |
| --- | --- | --- |
| 전체 | `*` | 모든 요소 |
| 태그 | `div` | 해당 태그 전부 |
| 클래스 | `.class` | 해당 class를 가진 요소 |
| ID | `#id` | 해당 id를 가진 요소 |

### 3.2 결합자(관계) 셀렉터

| 셀렉터 | 표기 | 대상 |
| --- | --- | --- |
| 자손 | `div p` | div 안에 있는 모든 p (깊이 상관없음) |
| 자식 | `div > p` | div의 바로 아래 자식 p만 |
| 인접 형제 | `div + p` | div 바로 다음에 오는 p 하나 |
| 일반 형제 | `div ~ p` | div 뒤에 오는 모든 형제 p |

### 3.3 속성 셀렉터

- `a[href]`: href 속성을 가진 a 태그
- `input[type="text"]`: type 속성이 "text"인 input 태그

### 3.4 가상 클래스 셀렉터

요소의 **상태**를 기준으로 선택합니다.

| 셀렉터 | 상태 |
| --- | --- |
| `:hover` | 마우스를 요소 위에 올렸을 때 |
| `:focus` | 요소가 포커스를 가졌을 때 |
| `:active` | 요소를 클릭하고 있는 순간 |
| `:nth-child()` | 부모 기준으로 n번째 자식 요소 |

### 3.5 우선순위

위에 있을수록 우선합니다.

1. `!important`
2. 인라인 스타일 (`style=""`)
3. ID 선택자 (`#id`)
4. 클래스 / 속성 / 가상 클래스 (`.class`, `[type]`, `:hover`)
5. 태그 선택자 (`div`, `p`)
6. 전체 선택자 (`*`)

> **id > class > tag**, 우선순위가 같으면 나중에 쓴 코드가 적용됩니다.

## 4. 박스 모델

모든 HTML 요소를 '사각형 박스'로 보고 크기와 여백을 계산하는 규칙입니다. 바깥에서 안쪽 순서로 네 가지로 구성됩니다.

```text
┌─────────────── margin (바깥 여백) ───────────────┐
│  ┌──────────── border (테두리) ───────────────┐  │
│  │  ┌───────── padding (안쪽 여백) ────────┐  │  │
│  │  │            content (내용)            │  │  │
│  │  └──────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

```html
<div class="wrapper">
    <div class="box">BOX</div>
</div>
```

```css
.wrapper {
    background: orange;
    border: 5px dotted black;
}
.box {
    margin: 20px;
    border: 5px solid black;
    padding: 50px;
    width: 100px;
    background-color: skyblue;
}
```

### 4.1 box-sizing

`width`는 기본적으로 **content만의 크기**입니다. (기본값 `box-sizing: content-box`)

위 `.box`가 실제 화면에서 차지하는 가로 크기:

```text
100 (width) + 50 × 2 (padding) + 5 × 2 (border) = 210px
```

가로를 100으로 기대했지만 실제로는 210이 됩니다. `border-box`로 바꾸면 `width`에 padding과 border가 포함되어 계산이 쉬워집니다.

```css
*, *::before, *::after {
    box-sizing: border-box;
}
```

전체 요소와 가상 요소까지 같은 박스 모델 기준으로 계산되도록 맨 위에 적어 둡니다.

## 5. 자주 쓰는 속성

### 5.1 글자

| 속성 | 설명 | 예 |
| --- | --- | --- |
| `font-size` | 글자 크기 | `x-large`, `medium`, `xx-small`, `1.2rem` |
| `font-weight` | 글자 굵기 | `bold` |
| `font-family` | 글꼴 | `'Times New Roman', Times, serif` |
| `text-align` | 정렬 | `center` |
| `color` | 글자 색 | `gray` |
| `text-decoration` | 밑줄 등 | `none`, `underline` |

`font` 한 줄로 줄여 쓸 수 있습니다. 순서는 `font-weight → font-size → font-family` 이고, `font-size`와 `font-family`는 반드시 포함해야 합니다.

```css
header {
    font: bold x-large 'Times New Roman', Times, serif;
}
```

### 5.2 배경과 여백

```css
header {
    background-color: red;
    margin-top: 20px;
    border: 2px solid blue;
}
main {
    background-color: green;
    padding: 50px;
}
```

### 5.3 링크 꾸미기

```html
<a class="github-link" href="https://github.com/elin-115">My GitHub</a>
```

```css
.github-link {
    font-size: small;
    color: gray;
    text-decoration: none;
}
.github-link:hover {
    text-decoration: underline;
}
```

### 5.4 아이콘 (Font Awesome)

웹에서 쓰는 아이콘을 글꼴처럼 제공하는 라이브러리입니다. (https://fontawesome.com/)

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" />
```

```html
<a class="github-link" href="https://github.com/elin-115">
    <i class="fa-brands fa-github"></i>GitHub
</a>
```

### 5.5 구글 폰트

https://fonts.google.com/ 에서 폰트를 고르고, 안내되는 `<link>` 태그를 `<head>`에 넣은 뒤 `font-family`로 지정합니다.

```css
body {
    font-family: "Archivo Black", sans-serif;
}
```

## 6. Inline vs. Block-level

화면에서 공간을 차지하는 방식에 따라 나뉩니다.

| | Inline | Block-level |
| --- | --- | --- |
| 공간 | 내용만큼만 차지 | 한 줄 전체를 차지 |
| 배치 | 같은 줄에 나란히 | 항상 새 줄에서 시작 |
| 예 | `<span>`, `<a>`, `<strong>`, `<em>` | `<div>`, `<p>`, `<h1>`~`<h6>`, `<section>`, `<article>` |

### 6.1 display 속성

요소의 기본 성질을 바꿀 수 있습니다.

| 값 | 동작 |
| --- | --- |
| `display: block` | 한 줄 전체를 차지 |
| `display: inline` | 내용만큼만 차지. `width`, `height`가 적용되지 않음 |
| `display: inline-block` | 같은 줄에 나란히 놓이면서 `width`, `height`도 적용됨 |

```html
<div style="background-color: skyblue;">Block1</div>
<div style="display: inline; width: 100px; background-color: orange;">Inline1</div>
<div style="display: inline-block; width: 100px; background-color: orange;">Inline2</div>
<div style="background-color: skyblue;">Block2</div>
```

### 6.2 Normal Flow

레이아웃 속성을 아무것도 적용하지 않았을 때 브라우저가 요소를 자동으로 배치하는 기본 규칙입니다.

1. Inline 요소: 왼쪽에서 오른쪽으로, 줄이 차면 다음 줄로 이동
2. Block-level 요소: 위에서 아래로, 한 줄씩 차지하며 배치

Normal Flow만으로는 가로 정렬, 가운데 정렬, 간격 맞추기가 어렵습니다. 그래서 `position`, Flexbox, Grid를 사용합니다.

## 7. position

요소를 **어디에, 무엇을 기준으로** 배치할지 정하는 속성입니다. `top` / `left` / `right` / `bottom`과 함께 사용합니다.

| 값 | Normal Flow | 기준 | 용도 |
| --- | --- | --- | --- |
| `static` (기본값) | 유지 | 없음 (top, left 적용 안 됨) | 일반적인 문서 흐름 |
| `relative` | 유지 | 자기 원래 위치 | 살짝 이동, absolute의 기준점 |
| `absolute` | 제거 | 가장 가까운 position이 있는 조상 요소. 없으면 viewport처럼 동작 | 아이콘, 배지, 모달 내부 요소 |
| `fixed` | 제거 | viewport. 스크롤해도 위치 고정 | 고정 헤더, 플로팅 버튼 |

### 7.1 실습

```html
<div class="container">
    <div class="box">BOX</div>
</div>
```

```css
.container {
    width: 200px;
    height: 200px;
    border: 3px solid #333;
    margin-bottom: 40px;
}
.box {
    width: 100px;
    height: 100px;
    background: #4caf50;
}
```

**relative** — 자기 원래 위치를 기준으로 이동합니다. `margin`으로 옮기면 다른 요소도 같이 밀리지만, `position`으로 옮기면 다른 요소 배치에는 영향이 없습니다.

```css
.box {
    position: relative;
    top: 30px;
    left: 30px;
}
```

**absolute** — Normal Flow에서 빠집니다. 부모에 `position: relative`를 주면 그 부모를 기준으로 배치됩니다.

```css
.container {
    position: relative;
}
.box {
    position: absolute;
    top: 0px;
    left: 0px;
}
```

**fixed** — viewport 기준이라 스크롤해도 제자리에 있습니다.

```css
.container {
    height: 20000px;
}
.box {
    position: fixed;
}
```

### 7.2 활용: 화면 오른쪽 위에 링크 두기

```html
<a class="korean-link" href="">한글 이력서</a>
```

```css
.korean-link {
    position: absolute;
    top: 10px;
    right: 10px;
    color: darkcyan;
    font-size: small;
}
```

## 8. Flexbox

**Flexbox(Flexible Box Layout)** 는 여러 박스를 한 방향으로 유연하게 배치하기 위한 레이아웃 시스템입니다.

- 1차원 레이아웃 (가로 또는 세로)
- 부모가 자식의 배치와 정렬을 제어
- 정렬과 간격 설정이 직관적

`display: flex`를 주면 부모는 **flex container**, 자식은 **flex item**이 됩니다.

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
    gap: 10px;
}
.item {
    width: 80px;
    height: 80px;
    background: skyblue;
    /* 박스 안의 글자를 가운데로 */
    display: flex;
    justify-content: center;
    align-items: center;
}
```

### 8.1 주축과 교차축

Flexbox는 축을 기준으로 요소를 배치하고 정렬합니다.

| 축 | 기본 방향 | 정렬 속성 | 기본값 |
| --- | --- | --- | --- |
| 주축 (Main axis) | 가로 | `justify-content` | `flex-start` |
| 교차축 (Cross axis) | 세로 | `align-items` | `stretch` |

정렬할 때는 이 순서로 생각합니다.

1. 주축 방향 결정: `flex-direction` (기본값 `row`)
2. 주축 정렬 결정: `justify-content`
3. 교차축 정렬 결정: `align-items`

`flex-direction: column`으로 바꾸면 주축이 세로가 되고, `justify-content`와 `align-items`의 방향도 함께 바뀝니다.

### 8.2 활용: 연락처 한 줄로 배치

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
.contact-row a {
    color: inherit;
    text-decoration: none;
}
.contact-row a:hover {
    text-decoration: underline;
}
```

### 8.3 활용: footer를 화면 아래에 붙이기

`flex: 1`은 남은 공간을 다 차지한다는 뜻입니다. `main`이 남은 높이를 모두 가져가서 `footer`가 아래로 밀려납니다.

```css
body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
main {
    flex: 1;
}
footer {
    margin-bottom: 2rem;
}
```

> 정렬 속성 전체(`flex-wrap`, `align-content`, `align-self`, `order` 등)와 활용 예제는 [CSS_flex_grid.md](CSS_flex_grid.md)에 정리했습니다.

## 9. 반응형 디자인과 Media Query

**반응형 디자인(Responsive Design)** 은 화면 크기와 환경에 따라 레이아웃과 스타일이 자연스럽게 변하는 디자인 방식입니다. 데스크톱, 태블릿, 모바일, 가로/세로 회전처럼 사용자 환경이 다양해서 하나의 화면 크기만으로는 모두를 만족시킬 수 없습니다.

**핵심 요소**

| 요소 | 수단 |
| --- | --- |
| 유연한 레이아웃 | Flexbox, Grid |
| 유연한 크기 단위 | `%`, `vw`, `vh`, `rem` |
| 조건부 스타일 | Media Query |

### 9.1 Media Query

"화면이 이 조건이면, 이 스타일을 써라"는 규칙입니다.

```html
<div class="container">
    <div class="box">A</div>
    <div class="box">B</div>
    <div class="box">C</div>
</div>
```

```css
.container {
    display: flex;
}
.box {
    background-color: skyblue;
    border: 1px solid black;
    flex: 1;
}

/* 화면이 300px 이하일 때 */
@media (max-width: 300px) {
    .container {
        flex-direction: column;
    }
    .box {
        background: orange;
    }
}
```

브라우저 개발자 도구의 반응형 모드에서 화면 폭을 줄여 가며 확인합니다.

### 9.2 실습: 반응형 Navigation Bar

```html
<nav class="navbar">
    <div class="navbar__logo">
        <i class="fa-brands fa-dev"></i>
        <a href="#">elin-115</a>
    </div>
    <ul class="navbar__menu">
        <li><a href="">About</a></li>
        <li><a href="resume.html">Resume</a></li>
        <li><a href="">Gallery</a></li>
    </ul>
    <ul class="navbar__icons">
        <li><i class="fa-brands fa-github"></i></li>
        <li><i class="fa-brands fa-x-twitter"></i></li>
    </ul>
</nav>
```

```css
body {
    margin: 0;
}
a {
    text-decoration: none;
    color: black;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: beige;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}
.navbar__logo {
    font-size: 1.4rem;
}
.navbar__menu {
    display: flex;
    list-style: none;
    padding: 0;
}
.navbar__menu li {
    padding: 8px 12px;
}
.navbar__menu li:hover {
    background-color: white;
    border-radius: 8px;
}
.navbar__icons {
    list-style: none;
    display: flex;
    padding: 0;
}
.navbar__icons li {
    padding: 8px 4px;
}

/* 화면이 400px 이하일 때: 세로로 쌓기 */
@media (max-width: 400px) {
    .navbar {
        flex-direction: column;
        align-items: flex-start;
        padding: 16px;
    }
    .navbar__menu {
        flex-direction: column;
        width: 100%;
        text-align: center;
    }
    .navbar__icons {
        justify-content: center;
        width: 100%;
    }
}
```

## 10. Grid

**Grid**는 행(row)과 열(column)을 동시에 제어하는 **2차원** 레이아웃 시스템입니다. 화면 전체 구조를 만들 때 사용합니다.

| 도구 | 용도 |
| --- | --- |
| `position` | 배치 제어는 되지만 레이아웃용은 아님 |
| Flexbox | 한 방향(1차원) 정렬에 최적 |
| Grid | 페이지 구조 자체를 설계 (2차원) |

- **Grid Container**: `display: grid`가 적용된 부모
- **Grid Item**: container의 직계 자식 요소
- 배치는 container(부모) 기준으로 결정됩니다.

### 10.1 열과 행 만들기

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

    /* 열 만들기: 아래 셋 중 하나 */
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-columns: repeat(4, 25%);   /* 위와 같은 뜻 */
    grid-template-columns: 1fr 2fr 1fr;      /* 남은 공간을 1:2:1 비율로 */

    /* 행 만들기 */
    grid-template-rows: 80px 80px;   /* 1행, 2행 높이 지정 */
    grid-auto-rows: 80px;            /* 자동으로 생기는 행의 높이 */

    gap: 10px;                       /* 칸 사이 간격 */
}
```

`fr`은 남은 공간을 나눠 갖는 비율 단위입니다.

### 10.2 실습: 갤러리 만들기

`grid-template-areas`로 칸에 이름을 붙이고, 각 아이템이 차지할 영역을 `grid-area`로 지정합니다.

```html
<div class="container">
    <div class="item img1"><img src="" alt="Img1"></div>
    <div class="item img2"><img src="" alt="Img2"></div>
    <div class="item img3"><img src="" alt="Img3"></div>
    <div class="item img4"><img src="" alt="Img4"></div>
    <div class="item img5"><img src="" alt="Img5"></div>
    <div class="item img6"><img src="" alt="Img6"></div>
</div>
```

위 구조는 Emmet으로 한 번에 만들 수 있습니다.

```text
.container>.item.img$*6>img[src="" alt="Img$"]
```

```css
.container {
    padding: 10%;
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

/* 이미지가 칸을 꽉 채우도록 */
.container .item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.5s;
    border-radius: 10px;
}

/* 마우스를 올린 이미지만 남기고 나머지는 흐리게 */
.container:hover .item img:not(:hover) {
    filter: grayscale(1);
    opacity: 0.5;
}
```

> `grid-template-areas`와 실습 파일 설명은 [CSS_flex_grid.md](CSS_flex_grid.md)에 정리했습니다.

## 11. 연습 사이트

| 주제 | 사이트 |
| --- | --- |
| Selector | [CSS Diner](https://flukeout.github.io/) |
| Flexbox | [Flexbox Froggy](https://flexboxfroggy.com/#ko) |
| Grid | [Grid Garden](https://cssgridgarden.com/#ko) |

---

## 참고 자료

- OZ 코딩스쿨 AI 헬스케어 초격차 캠프 — 「HTML & CSS」 강의 자료 (CSS 기초)
