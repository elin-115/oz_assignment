// 암호화폐 가격 변동 추적기 만들기
//
// 상기 API에 매초마다 GET요청을 하여 받은 응답을 활용하여 암호화폐 목록을 구성하고 실시간 업데이트를 반영하기(USDT 항목만 반영)
// 암호화폐 검색기능
// LocalStorage를 활용한 관심항목 추가
// 전체보기, 관심항목 보기 탭 분리

const allTab = document.querySelector("#allTab");
const favoritesTab = document.querySelector("#favoritesTab");
const searchInput = document.querySelector("#searchInput");
const loading = document.querySelector("#loading");
const cryptoTable = document.querySelector("#cryptoTable");
const cryptoList = document.querySelector("#cryptoList");
const haltedTab = document.querySelector("#haltedTab")
const API_URL = "https://api4.binance.com/api/v3/ticker/24hr";
// {
//     symbol: "BTCUSDT",            // 심볼
//     lastPrice: "81750.00000000",  // 현재가
//     priceChangePercent: "-1.200", // 24시간 변동률
//     highPrice: "83158.00000000",  // 최고가
//     lowPrice: "81200.00000000",   // 최저가
//     ...
// }
let coins = [];                     // API에서 받아 온 USDT 코인 목록 담을 배열
let favorites = loadFavorites();    // 관심항목 심볼 배열
let currentTab = "all";             // 현재 탭: "all"(전체) 또는 "favorites"(관심)
let isFetching = false;             // 지금 데이터를 받는 중인지 (요청이 겹치지 않게)

// 저장된 관심항목 꺼내기
function loadFavorites() {
    const saved = localStorage.getItem("favorites");
    if (saved === null) {
        return [];               // 처음 열었을 때는 저장된 게 없으니 빈 배열
    }
    return JSON.parse(saved);    // 문자열 → 배열
}
// 관심항목 저장하기
function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));   // 배열 → 문자열
}

// 관심항목 추가 / 해제
function toggleFavorite(symbol) {
    if (favorites.includes(symbol)) {
        // 이미 있으면 → 빼기 (그 심볼이 아닌 것만 남기기)
        favorites = favorites.filter(item => item !== symbol);
    } else {
        // 없으면 → 넣기
        favorites.push(symbol);
    }

    saveFavorites();   // localStorage에 저장
    renderTable();     // 바로 다시 그리기 (★ / ☆ 즉시 반영)
}

// 탭 바꾸기
function changeTab(tab) {
    currentTab = tab;   // 누른 탭 기억

    // 누른 탭만 진한 색(active), 나머지는 빼기
    allTab.classList.toggle("active", tab === "all");
    favoritesTab.classList.toggle("active", tab === "favorites");
    haltedTab.classList.toggle("active", tab === "halted");
    renderTable();      // 바로 다시 그리기
}

// 가격 보기 좋게: 81,750 / 0.00001234
function formatPrice(value){
    return Number(value).toLocaleString("en-US", {maximumFractionDigits: 8});
}

// 변동률
function formatPercent(value){
    const num = Number(value);  // 숫자로 바꾸기
    let sign = "";

    if(num > 0){
        sign = "+";      // 양수면 "+"
    }
    return sign + num.toFixed(2) + "%";
}

// 데이터 가져오기
function fetchPrices(){
    if (isFetching) return;   // 받는 중이면 건너뛰기
    isFetching = true;        // 이제 받기 시작

    fetch(API_URL)                          // 1. 서버에 요청 보내기
        .then(response => response.json())  // 2. 응답을 JSON(자바스크립트 데이터)으로 바꾸기
        .then(data => {                     // 3. 바뀐 데이터 쓰기
            // symbol이 USDT로 끝나고 현재가가 0이 아닌 코인만 남기기 (거래 멈춘 코인 빼기)
            // coins = data.filter(coin => (coin.symbol.endsWith("USDT")) && (Number(coin.lastPrice) !== 0));
            coins = data.filter(coin => coin.symbol.endsWith("USDT"));
            renderTable();
        })
        .catch(error => {
            console.log("시세를 불러오지 못했습니다:", error);   // 실패하면 여기로 옴
        })
        .finally(() => {
            isFetching = false;   // 성공이든 실패든 끝났으면 다시 false
        });
}

// 표 그리기: 탭 → 검색어로 거른 뒤 줄 만들기
function renderTable(){
    let list = coins;           // 전체 목록
    
    // 탭에 따라 거르기
    if (currentTab === "all") {
        list = list.filter(coin => Number(coin.lastPrice) !== 0);       // 거래 중인 코인
    } else if (currentTab === "favorites") {
        list = list.filter(coin => favorites.includes(coin.symbol));    // 관심항목
    } else if (currentTab === "halted") {
        list = list.filter(coin => Number(coin.lastPrice) === 0);       // 거래가 멈춘 코인
    }

    // 검색 거르기
    const search = searchInput.value.toUpperCase();
    if (search !== ""){
        list = list.filter(coin => coin.symbol.includes(search));
    }

    // 보여 줄 게 없을 때 안내 문구
    if (list.length === 0) {
        let message = "검색 결과가 없습니다.";   // 기본 문구

        // 관심항목 탭이고, 항목이 하나도 없으면 
        if (currentTab === "favorites" && favorites.length === 0) {
            message = "관심항목이 없습니다. ☆를 눌러 추가해 보세요.";
        }
        // 거래중지 탭이고, 항목이 하나도 없으면
        if (currentTab === "halted" && search === "") {
            message = "거래가 중지된 코인이 없습니다.";
        }

        cryptoList.innerHTML = `<tr><td colspan="6" class="empty">${message}</td></tr>`;
        return;
    }
    
    let rows = "";
    for (const coin of list){   // 코인 하나씩 꺼내서
        const change = Number(coin.priceChangePercent);
        let changeClass = "";
        if (change > 0){changeClass = "up"} 
        if (change < 0){changeClass = "down"}

        // ★ / ☆ 바꾸기
        let favText = "☆";
        let favClass = "";
        if (favorites.includes(coin.symbol)){   // 관심항목에 이 심볼이 들어 있으면
            favText = "★";                      // 꽉 찬 별
            favClass = "active";                // 노란색 (CSS .fav-btn.active)
        }

        rows += `<tr>
                    <td><button type="button" class="fav-btn ${favClass}" data-symbol="${coin.symbol}">${favText}</button></td>
                    <td>${coin.symbol}</td>
                    <td class="num">${formatPrice(coin.lastPrice)}</td>
                    <td class="num ${changeClass}">${formatPercent(coin.priceChangePercent)}</td>
                    <td class="num">${formatPrice(coin.highPrice)}</td>
                    <td class="num">${formatPrice(coin.lowPrice)}</td>
                </tr>`;
    }
    cryptoList.innerHTML = rows;                        // 다 모은 줄을 tbody 안에 넣기
    loading.classList.add("hidden");                    // 로딩 문구 숨기기
    cryptoTable.classList.remove("hidden");              // 표 보여주기
}

fetchPrices();                                          // 처음 한 번 바로 불러오기
searchInput.addEventListener("input", renderTable);     // 글자를 칠 때마다 표 다시 그리기
cryptoList.addEventListener("click", (event) => {
    const button = event.target.closest(".fav-btn");    // 누른 곳에서 가장 가까운 ☆ 버튼 찾기
    if (button === null) return;                        // ☆ 버튼이 아닌 곳을 눌렀으면 무시

    toggleFavorite(button.dataset.symbol);              // 그 버튼에 붙여 둔 심볼로 추가/해제
});
allTab.addEventListener("click", () => changeTab("all"));
favoritesTab.addEventListener("click", () => changeTab("favorites"));
haltedTab.addEventListener("click", () => changeTab("halted"));
setInterval(fetchPrices, 1000);                         // 그 뒤로 1초마다 다시 불러오기
