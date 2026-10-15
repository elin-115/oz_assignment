# HTML 기초

HTML 기초 문법을 학습하며 작성한 실습 파일과 정리입니다.

[← README로 돌아가기](README.md)

## 실습 파일 (html 폴더)

| 파일 | 주제 | 주요 내용 |
| --- | --- | --- |
| [`base1.html`](html/base1.html) | HTML 기본 구조 | `<!DOCTYPE html>`, `<html lang>`, `<head>`, `<body>` 기본 뼈대. 제목 태그(`h1`~`h3`)와 문단 태그(`p`), 주석 사용법 |
| [`base2.html`](html/base2.html) | 줄바꿈과 구분선 | `<br>`(줄바꿈), `<hr>`(가로 구분선). Emmet(`!`)으로 기본 템플릿 생성 |
| [`bootstrap.html`](html/bootstrap.html) | 부트스트랩 Card | 부트스트랩 v6 CDN, 이미지 Card와 dialog 버튼. [Bootstrap.md](Bootstrap.md) 참고 |
| [`class.html`](html/class.html) | id와 class | `id`는 문서에서 중복 불가, `class`는 여러 태그에 중복 사용 가능. CSS 선택자의 기반이 되는 속성 |
| [`form.html`](html/form.html) | 입력 폼 | `<form>`, `<input>`, `<label>`, `<button>`. GET 방식(검색창)과 POST 방식(회원가입 폼) 비교, `type="email"`/`"password"`/`"search"`, `placeholder`, `label`의 `for`와 `input`의 `id` 연결 |
| [`gallery.html`](html/gallery.html) | Grid 갤러리 | `grid-template-areas`로 6장 배치, hover 시 흑백 처리. [CSS_flex_grid.md](CSS_flex_grid.md) 참고 |
| [`grid.html`](html/grid.html) | Grid 기초 | `grid-template-columns`(`%`, `repeat()`, `fr`)와 `grid-template-rows`. [CSS_flex_grid.md](CSS_flex_grid.md) 참고 |
| [`image.html`](html/image.html) | 이미지 삽입 | `<img>`의 `src`, `width`, `alt`(대체 텍스트) 속성 |
| [`link.html`](html/link.html) | 하이퍼링크 | `<a href>` 앵커 태그로 외부 사이트(구글)로 이동하는 링크 |
| [`list.html`](html/list.html) | 목록 | `<ul>`(순서 없는 목록), `<ol>`(순서 있는 목록), `<li>`. `type="i"`로 로마 숫자 표기, `start="0"`으로 시작 번호 지정 |
| [`modal.html`](html/modal.html) | 부트스트랩 Modal | v6 `<dialog>` 모달 열고 닫기. [Bootstrap.md](Bootstrap.md) 참고 |
| [`script.html`](html/script.html) | JS 연결 | `<script src>`로 외부 JS(`js/app.js`) 불러오기, `alert`·`console.log` |
| [`semantic.html`](html/semantic.html) | 시맨틱 태그 | 의미 없는 `<div>`와 의미를 가진 `<header>`, `<main>`, `<footer>` 비교 |
| [`table.html`](html/table.html) | 표 | `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`. 가로는 행(row), 세로는 열(column)이라는 개념, `border` 속성 |

## 학습 정리

- **구조**: HTML은 태그로 이루어지며, `head`에는 문서 정보를, `body`에는 화면에 보이는 내용을 작성합니다.
- **속성**: 태그에 `id`, `class`, `src`, `href`, `alt` 같은 속성을 붙여 동작과 의미를 지정합니다.
- **폼 전송**: GET은 입력값이 주소(URL)에 담겨 전송되고, POST는 요청 본문에 담겨 전송됩니다.
- **시맨틱**: `div`만 쓰는 것보다 `header`, `main`, `footer`처럼 역할이 드러나는 태그를 쓰면 구조를 이해하기 쉽습니다.

## 실행 방법

각 `.html` 파일을 브라우저로 열면 바로 확인할 수 있습니다.

```bash
open html/base1.html
```
