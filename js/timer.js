const timeInput = document.querySelector("#time-input")
const startBtn = document.querySelector("#start-timer")
const stopBtn = document.querySelector("#stop-timer")
const display = document.querySelector("#timer-display")
let intervalId = null;
let remainingSeconds = 0;   // 남은 시간(초)

// 97초 -> 01:37
function updateDisplay(){
    const min = Math.floor(remainingSeconds / 60)
    const sec = remainingSeconds % 60;

    display.className = "fs-3";
    // zero padding: 한 자리 숫자 앞에 0 채우기
    display.textContent = 
    String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0")
}

// startBtn을 누르면 display에 에서 timeInput받은 
startBtn.addEventListener("click", () => {
    // 문자열로 넘어오므로 - Number 로 변환
    const minutes = Number(timeInput.value);
    if (minutes <= 0){
        alert("1 이상의 시간(분)을 입력하세요.");
        timeInput.value = "";
        return
    }

    clearInterval(intervalId);  // 재시작: 돌고 있던 타이머를 먼저 멈추기 (안 하면 타이머가 두 개 돌아서 2배 빨라짐)
    startBtn.textContent = "재시작"
    remainingSeconds = minutes * 60;
    updateDisplay();

    intervalId = setInterval(
        () => {
            remainingSeconds--;     // 1초마다 시간을 깎음
            updateDisplay()

            // 0초가 되면 멈추기 (안 하면 -1, -2 ... 로 계속 내려감)
            if (remainingSeconds <= 0) {
                clearInterval(intervalId);
                display.textContent = "끝!";
                startBtn.textContent = "시작";
            }
        },
        1000 // 1초마다 
    )
})

// 중지 버튼이 눌렸을때, 타이머 멈추기
stopBtn.addEventListener("click", () => {
    clearInterval(intervalId);
})