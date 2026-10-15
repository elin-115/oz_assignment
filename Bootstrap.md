# Bootstrap

CSS & JavaScript UI 프레임워크인 부트스트랩을 정리한 문서입니다.

[← README로 돌아가기](README.md)

## 목차

1. [부트스트랩이란?](#1-부트스트랩이란)
2. [설치 (CDN)](#2-설치-cdn)
3. [Flex 유틸리티](#3-flex-유틸리티)
4. [Button](#4-button)
5. [Card](#5-card)
6. [Grid 시스템](#6-grid-시스템)
7. [실습 1. 기본 레이아웃](#7-실습-1-기본-레이아웃)
8. [실습 2. Navbar](#8-실습-2-navbar)
9. [실습 3. Modal](#9-실습-3-modal)
10. [v5와 v6의 차이 (실습 파일 기준)](#10-v5와-v6의-차이-실습-파일-기준)
11. [사용 시 주의점](#11-사용-시-주의점)

---

## 1. 부트스트랩이란?

- CSS & JavaScript UI 프레임워크
- 반응형 웹을 빠르게 만들기 위한 도구
- 미리 정의된 **Grid, Component, Utility class** 제공 → 클래스 이름만으로 레이아웃 구성
- 일정한 UI 품질 유지

> "CSS를 직접 안 만들어도 된다"

공식 사이트: https://getbootstrap.com/

## 2. 설치 (CDN)

`<head>`에 CSS를, 모달·내비게이션 접기처럼 동작이 필요한 컴포넌트를 쓰려면 JS도 함께 넣습니다.

```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
      crossorigin="anonymous">

<!-- JS (</body> 바로 앞 또는 head) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
```

- 부트스트랩 JS를 넣으면 별도 JS 코드 없이 정해진 마크업과 `data-bs-*` 속성만으로 UI 동작이 완성됩니다.
- 내 CSS로 부트스트랩 스타일을 덮어쓰려면 내 `<link rel="stylesheet">`를 부트스트랩 **뒤에** 둡니다. (같은 우선순위면 나중 코드가 이김)

## 3. Flex 유틸리티

CSS를 쓰지 않고 클래스만으로 Flexbox를 적용합니다.

```html
<div class="d-flex justify-content-center">
    <div>알림</div>
    <div class="badge bg-danger">5</div>
</div>
```

| 클래스 | 같은 CSS |
| --- | --- |
| `d-flex` | `display: flex` |
| `justify-content-center` | `justify-content: center` |
| `align-items-center` | `align-items: center` |
| `flex-column` | `flex-direction: column` |

## 4. Button

```html
<button class="btn btn-primary">확인</button>
<button class="btn btn-danger">취소</button>
<button class="btn btn-info">보류</button>
```

`btn` 기본 클래스에 색상 클래스(`btn-primary`, `btn-secondary`, `btn-danger`, `btn-info` 등)를 붙입니다.

## 5. Card

```html
<div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">제목</h5>
        <p class="card-text">설명 텍스트</p>
        <a href="#" class="btn btn-primary">이동</a>
    </div>
</div>
```

카드 위에 이미지를 넣을 때는 `card-body` 앞에 `<img class="card-img-top">`을 둡니다.

## 6. Grid 시스템

- 한 줄을 **12칸**으로 나눠서 사용
- `container` → `row` → `col` 구조

```html
<div class="container">
    <div class="row">
        <div class="col-6 bg-primary">왼쪽</div>
        <div class="col-6 bg-secondary">오른쪽</div>
    </div>
</div>
```

| 클래스 | 의미 |
| --- | --- |
| `col-6` | 12칸 중 6칸 (절반) |
| `col-4` | 12칸 중 4칸 (1/3) |
| `col-md-4` | 화면이 md(768px) 이상일 때만 4칸, 그보다 좁으면 한 줄 전체 |

`col-md-*`처럼 화면 크기를 붙이면 Media Query를 직접 쓰지 않아도 반응형이 됩니다.

> CSS의 `display: grid`와는 다른 개념입니다. 부트스트랩 Grid는 Flexbox로 만든 12칸 열 시스템입니다.

## 7. 실습 1. 기본 레이아웃

목표: 카드 3개를 한 줄에 배치

```html
<div class="container mt-5">
    <div class="row">
        <div class="col-md-4">
            <div class="card p-3">카드 1</div>
        </div>
        <div class="col-md-4">
            <div class="card p-3">카드 2</div>
        </div>
        <div class="col-md-4">
            <div class="card p-3">카드 3</div>
        </div>
    </div>
</div>
```

- `mt-5`: margin-top, `p-3`: padding (여백 유틸리티. 숫자가 클수록 넓음)
- 화면이 좁아지면 `col-md-4`가 한 줄씩 세로로 쌓입니다.

## 8. 실습 2. Navbar

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand text-white" href="#">MySite</a>

        <!-- 좁은 화면에서 나타나는 햄버거 버튼 -->
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- 버튼으로 접고 펼치는 메뉴 -->
        <div class="collapse navbar-collapse" id="navMenu">
            <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="#">About</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
            </ul>
        </div>
    </div>
</nav>
```

- `navbar-expand-lg`: lg(992px) 이상에서는 메뉴를 펼쳐 보여 주고, 그보다 좁으면 햄버거 버튼으로 접힘
- `data-bs-toggle="collapse"` + `data-bs-target="#navMenu"`: 버튼을 누르면 `id="navMenu"` 영역을 접고 펼침 (부트스트랩 JS 필요)

## 9. 실습 3. Modal

```html
<!-- 모달을 여는 버튼 -->
<div class="container mt-5 text-center">
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        모달 열기
    </button>
</div>

<!-- 모달 -->
<div class="modal fade" id="exampleModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">확인</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                정말로 삭제하시겠습니까?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                <button class="btn btn-danger">삭제</button>
            </div>
        </div>
    </div>
</div>
```

| 속성 | 역할 |
| --- | --- |
| `data-bs-toggle="modal"` | 클릭하면 모달을 연다 |
| `data-bs-target="#exampleModal"` | 열 모달의 id |
| `data-bs-dismiss="modal"` | 클릭하면 모달을 닫는다 |
| `modal fade` | 열고 닫을 때 서서히 나타나는 효과 |
| `modal-dialog-centered` | 화면 세로 가운데에 표시 |

## 10. v5와 v6의 차이 (실습 파일 기준)

강의 자료는 **v5.3.8**, 내 실습 파일(`html/bootstrap.html`, `html/modal.html`, `resume_v2.html`)은 **v6.0.0-alpha.1**을 사용했습니다. v6에서는 클래스 이름과 모달 구조가 바뀌었습니다.

| 항목 | v5.3.8 (강의) | v6.0.0-alpha.1 (실습) |
| --- | --- | --- |
| 버튼 | `btn btn-primary` | `btn-solid theme-primary` |
| 모달 요소 | `<div class="modal">` 안에 `modal-dialog` → `modal-content` | 브라우저 기본 `<dialog class="dialog">` |
| 모달 영역 | `modal-header` / `modal-body` / `modal-footer` | `dialog-header` / `dialog-body` / `dialog-footer` |
| 열기 / 닫기 | `data-bs-toggle="modal"` / `data-bs-dismiss="modal"` | `data-bs-toggle="dialog"` / `data-bs-dismiss="dialog"` |
| JS 불러오기 | `<script src="...">` | `<script type="module" src="...">` |

v6 실습 코드 (`html/modal.html`):

```html
<button type="button" class="btn-solid theme-primary" data-bs-toggle="dialog" data-bs-target="#exampleDialog">
    Open dialog
</button>

<dialog class="dialog" id="exampleDialog">
    <div class="dialog-header">
        <h1 class="dialog-title">Dialog title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="dialog" aria-label="Close"></button>
    </div>
    <div class="dialog-body">
        <p>This is a native dialog element.</p>
    </div>
    <div class="dialog-footer">
        <button type="button" class="btn-solid theme-secondary" data-bs-dismiss="dialog">Close</button>
        <button type="button" class="btn-solid theme-primary">Save changes</button>
    </div>
</dialog>
```

> v6는 아직 alpha(정식 출시 전) 버전이라 이후 클래스 이름이 다시 바뀔 수 있습니다. 공식 문서를 볼 때 버전을 꼭 맞춰서 확인합니다.

### 실습 파일

| 파일 | 내용 |
| --- | --- |
| [`html/bootstrap.html`](html/bootstrap.html) | 이미지가 들어간 Card 안에 dialog 버튼 배치 |
| [`html/modal.html`](html/modal.html) | `d-flex justify-content-center`로 버튼을 가운데 두고 dialog 열기 |
| [`resume_v2.html`](resume_v2.html) | 프로필 사진에 마우스를 올리면 돋보기 버튼이 나오고, 누르면 dialog로 크게 보기 |

## 11. 사용 시 주의점

- 클래스를 남용하면 HTML 가독성이 떨어짐
- 커스텀 디자인에 한계가 있음
- 실서비스에서는 일부만 사용하거나 Tailwind로 전환하는 경우가 많음

---

## 참고 자료

- OZ 코딩스쿨 AI 헬스케어 초격차 캠프 — 「HTML & CSS」 강의 자료 (부트스트랩)
- Bootstrap 공식 문서 — https://getbootstrap.com/
