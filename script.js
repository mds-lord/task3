window.addEventListener('DOMContentLoaded', () => {

const colors = ["red","green","blue","yellow","cyan","magenta","slateblue","slategray"],
    cells = document.querySelectorAll('.cell');
var gameStarted = false,
    clockTimer,
    startDate;

btnStart.addEventListener('click', startStop);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}    

function fieldInit() {
    let iniColors = [...colors, ...colors];
    cells.forEach((cell) => {
        let idx = getRandomInt(0, iniColors.length-1);
        cell.setAttribute("data-color", String(iniColors[idx]));
        iniColors.splice(idx, 1);
        cell.addEventListener('click', null);
    });
    gameTimer.innerText = '00:00:00.00';
}

function timerStart() {
    let currentDate = new Date();
    let time = currentDate.getTime() - startDate.getTime();
    let ms = time % 1000;
    time -= ms;
    ms = Math.floor(ms/10);
    time = Math.floor (time / 1000);
    let s = time % 60;
    time -= s;
    time = Math.floor(time / 60);
    let m = time % 60;
    time -= m;
    time = Math.floor(time / 60);
    let h = time % 60;
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    if (ms < 10) ms = '0' + ms;
    if (gameStarted) gameTimer.innerText = h + ':' + m + ':' + s + '.' + ms;
    window.clockTimer = setTimeout(timerStart, 10);
}

function timerStop() {
    clearTimeout(window.clocktimer);
}

function startStop() {
    if (!gameStarted) {
        fieldInit();
        startDate = new Date();
        timerStart();
        gameStarted = true;
        btnStart.value = 'Сброс игры';
    } else {
        timerStop();
        gameStarted = false;
        btnStart.value = 'Старт!';
    }
}

});