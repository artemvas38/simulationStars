let fieldWidthInput = document.querySelector("#fieldWidth");
let fieldHeightInput = document.querySelector("#fieldHeight");
let starWidthInput = document.querySelector("#starWidth");
let starHeightInput = document.querySelector("#starHeight");
let confirmFieldSettingsBtn = document.querySelector("#confirmFieldSettingsBtn");
let confirmStarSettingsBtn = document.querySelector("#confirmStarSettingsBtn");
let startSimulationButton = document.querySelector("#startSimulationBtn");
let pauseSimulationButton = document.querySelector("#pauseSimulationBtn");
let resetSimulationButton = document.querySelector("#resetSimulationBtn");
// let showSettingButton = document.querySelector("#showSettingBtn");
let settingsContainer = document.querySelector(".settingsContainer");
let controlSpeedButtons = document.querySelectorAll(".controlSpeedBtn");
let colorPaletteSelect = document.querySelector("#colorPaletteSelect");

let canvas = document.getElementById("canvas");

let ctx = canvas.getContext("2d");

let colorPalettes = [
    [`gray`, `white`, `maroon`, `red`, `purple`, `fuchsia`, `green`, `lime`, `olive`, `yellow`, `navy`, `blue`, `teal`, `aqua`],
    [`SlateGrey`, `LightSlateGray`, `DimGray`, `Gray`, `DarkGray`, `Silver`, `LightGray`, `Gainsboro`],
    [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``]
]

let fillColorPalette = colorPalettes[0] // при запуске впервые будет использована первые цвета

let fieldWidth = 500;
let fieldHeight = 500;

let starWidth = 2;
let starHeight = 2;

let timerSpeed = 1000; // в мс

let stars = [];

fieldWidthInput.value = fieldWidth;
fieldHeightInput.value = fieldHeight;
changingFieldSize();

starWidthInput.value = starWidth;
starHeightInput.value = starHeight;


// showSettingButton.addEventListener("click", function () {
//     if (settingsContainer.classList.contains("visibility-none")) {
//         showSettingButton.textContent = "Скрыть настройки";
//         settingsContainer.classList.remove("visibility-none");
//         settingsContainer.classList.add("visibility");
//         canvas.style.marginTop = "30px"
//     } else if (!settingsContainer.classList.contains("visibility-none")) {
//         showSettingButton.textContent = "Показать настройки";
//         settingsContainer.classList.add("visibility-none");
//         settingsContainer.classList.remove("visibility");
//         canvas.style.marginTop = "-80px"
//     }
// })

confirmFieldSettingsBtn.addEventListener("click", function () {
    if (Number(fieldWidthInput.value) > 0 && Number(fieldHeightInput.value) > 0) {
        fieldWidth = Number(fieldWidthInput.value);
        fieldHeight = Number(fieldHeightInput.value);
        changingFieldSize();
    }
});

document.addEventListener("keyup", function (evt) {
    if (evt.code == "Enter") {
        if (Number(fieldWidthInput.value) > 0 && Number(fieldHeightInput.value) > 0) {
            fieldWidth = Number(fieldWidthInput.value);
            fieldHeight = Number(fieldHeightInput.value);
            changingFieldSize();
        }
    }
})

colorPaletteSelect.addEventListener("change", function () {
    let selectedPalette = colorPaletteSelect.value;
    console.log(selectedPalette);
    switch (selectedPalette) {
        case "1":
            fillColorPalette = colorPalettes[0]
            console.log(fillColorPalette)
            break;
        case "2":
            fillColorPalette = colorPalettes[1]
            console.log(fillColorPalette)
            break;
        case "3":
            fillColorPalette = colorPalettes[2]
            break;
        default:
            break;
    }
})

confirmStarSettingsBtn.addEventListener("click", function () {
    if (Number(starWidthInput.value) > 0 && Number(starHeightInput.value) > 0) {
        starWidth = Number(starWidthInput.value);
        starHeight = Number(starHeightInput.value);
    }
});

let starsTimer;

for (let controlSpeedButton of controlSpeedButtons) {
    controlSpeedButton.addEventListener("click", function (evt) {
        timerSpeed = 1000;
        let target = evt.target.textContent;
        let multiplier = target.slice(0, target.length - 1);
        timerSpeed = timerSpeed / multiplier;
        clearInterval(starsTimer);
        starsTimer = setInterval(() => drawStars(), timerSpeed);
    })
}

startSimulationButton.addEventListener("click", function () {
    if (!starsTimer) {
        starsTimer = setInterval(() => drawStars(), timerSpeed);
        console.log(fillColorPalette)
    }
});

pauseSimulationButton.addEventListener("click", function () {
    clearInterval(starsTimer);
    starsTimer = null;
});

resetSimulationButton.addEventListener("click", function () {
    ctx.fillStyle = "#323232";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    stars = []
    clearInterval(starsTimer);
    starsTimer = null;
});

function changingFieldSize() {
    canvas.width = fieldWidth;
    canvas.height = fieldHeight;
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function drawStars() {
    let x = getRandomInt(0, canvas.width);
    let y = getRandomInt(0, canvas.height);
    let starColor = fillColorPalette[getRandomInt(0, fillColorPalette.length - 1)];
    stars.push({ x: x, y: y, starColor: starColor, starWidth: starWidth, starHeight: starHeight });
    ctx.fillStyle = starColor
    ctx.fillRect(x, y, starWidth, starHeight);
    console.log(stars)
}
