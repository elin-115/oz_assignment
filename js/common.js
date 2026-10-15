  // 메뉴 버튼과 사이드바 찾기
  const btnMenu = document.querySelector('.btn_menu');
  const sidebar = document.querySelector('.sidebar');
  const iconMenu = btnMenu.querySelector('i');

  btnMenu.addEventListener('click', function () {
    // sidebar에 on 클래스가 없으면 넣고, 있으면 뺀다
    sidebar.classList.toggle('on');

    // 아이콘도 같이 바꾸기: 메뉴(fa-bars) ↔ X(fa-xmark)
    iconMenu.classList.toggle('fa-bars');
    iconMenu.classList.toggle('fa-xmark');
  });