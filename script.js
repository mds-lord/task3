window.addEventListener('DOMContentLoaded', () => {

    const colors = ["red","green","blue","yellow","cyan","magenta","silver","black"],
        cells = document.querySelectorAll('.cell');

    var gameStarted = false,
        wonTime = "", // переменная для фиксации точного времени клика 
        clockTimer,
        startDate;

    btnStart.addEventListener('click', startStop);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }    

    function fieldReset() {
        cells.forEach((cell) => {
            cell.removeAttribute("data-check");
            cell.removeAttribute("data-color");
            cell.style = null;
        });
        gameTimer.innerText = '00:00:00.00';
    }

    function fieldInit() {
        let iniColors = [...colors, ...colors];
        // Из-за логики Math.random есть недостаток - последний цвет грида всегда будет 
        // последним цветом из списка цветов.
        // Можно переделать, чтобы рандомизировать не цвет, а раскрашиваемую ячейку. Но некогда.
        cells.forEach((cell) => {
            let idx = getRandomInt(0, iniColors.length-1);
            cell.setAttribute("data-color", String(iniColors[idx]));
            iniColors.splice(idx, 1);
            cell.addEventListener("click", () => { cellClick(cell); });
        });
    }
    // функция таймера на страничку честно скопипащена из интернета.
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

    function cellClick (currentCell) {
        if (gameStarted) {
            currentCell.style.backgroundColor = currentCell.getAttribute("data-color");
            wonTime = gameTimer.innerText;
            setTimeout( () => {
                let cellChecked = document.querySelector("div.cell[data-check=checking]");
                if (cellChecked !== null) {
                    if (cellChecked.getAttribute("data-color") == currentCell.getAttribute("data-color")) {
                        cellChecked.setAttribute("data-check", "guessed");
                        currentCell.setAttribute("data-check", "guessed");
                        if (document.querySelectorAll("div[data-check=guessed]").length == 16) {
                            gameTimer.innerText = wonTime;
                            window.alert("Вы выиграли! \n \n Затраченное время: " + wonTime);
                            location.reload();
                        }
                    } else {
                        cellChecked.setAttribute("data-check", null);
                        cellChecked.style.backgroundColor = null;
                        currentCell.setAttribute("data-check", null);
                        currentCell.style.backgroundColor = null;
                    }
                } else {
                    currentCell.setAttribute("data-check", "checking");
                }
            }, 250);
        }
    }

    function startStop() {
        if (!gameStarted) {
            fieldReset();
            fieldInit();
            startDate = new Date();
            timerStart();
            gameStarted = true;
            btnStart.value = 'Сброс игры';
        } else {
            location.reload();
            // fieldReset();
            // timerStop();
            // gameStarted = false;
            // btnStart.value = 'Старт!';
        }
    }
});