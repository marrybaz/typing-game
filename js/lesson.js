// resenje sa casa
// let niz = [];
//     for (let i = 1; i <= 26; i++) {
//     niz.push(i);
//     }
// let broj;
// let inervalId;
// let a = id => document.getElementById(id);
// let htmlPoljSlova =document.querySelectorAll()

// function izabrani() {
//     let index = Math.floor(Math.random() * niz.length);
//     niz.splice(niz[index], 1);
//     console.log(niz[index]);
//     a('number').innerHTML = niz[index];

// }


// a('start').addEventListener('click', function () {

//     izabrani();
// })

// window.addEventListener('keypress', function(e){

//     let slovo = e.key.toUpperCase();
//     let karakter = slovo.charCodeAt(0)-64;

// })



// TODO: kad nista nije taknuto da se zacrveni i da se poveca miss
// dodati stop

// TODO: dodati stop
const s = id => document.getElementById(id);
const radioButtons = document.querySelectorAll('input[type="radio"]');
const poljaSlova = document.querySelectorAll('.grid div');
let numbers = [];
let speed = document.querySelector('input[type="radio"]:checked').value;
let intervalId;
let randomBroj;
let taknuto = false;

/* FUNKCIJE */

function random() {
    if (numbers.length === 0) {
        clearInterval(intervalId);
    }
    const index = Math.floor(Math.random() * numbers.length);
    const izbaceno = numbers.splice(index, 1);
    s('number').innerText = randomBroj = izbaceno[0]; // precica
    // s('number').innerText = izbaceno[0];
    // randomBroj = izbaceno[0];
}

function gameLoop() {
    if (randomBroj && !taknuto) {
        poljaSlova[randomBroj - 1].style.color = 'red';
        s('miss').innerText = Number(s('miss').innerText) + 1;
    }
    if (numbers.length) {
        random();
        s('left').innerText = numbers.length;
    } else {
        clearInterval(intervalId);
        s('number').innerText = "Igra je završena";
        s('start').value = "Start game";
    }
    taknuto = false;
}

function handleSpeedChange() {
    speed = document.querySelector('input[type="radio"]:checked').value;
}

function init() {
    if (s('start').value !== 'Stop') {
        numbers = [];
        for (let i = 1; i <= 26; i++) {
            numbers.push(i);
            poljaSlova[i - 1].style.color = '#bdc5cc'; // setuje default boju
        }
        s('hit').innerText = s('miss').innerText = 0; // precica, videti gore
        s('left').innerText = numbers.length;
        s('number').innerText = "Pripremi se!";
        clearInterval(intervalId);
        intervalId = setInterval(gameLoop, speed);
        s('start').value = "Stop";
    } else {
        clearInterval(intervalId);
        s('start').value = "Start game";
        s('number').innerText = "Igra je prekinuta";

    }
}

function handleUserInput(e) {
    if (taknuto) return;

    const slovo = e.key.toUpperCase();
    const karakterBroj = slovo.charCodeAt();

    if (randomBroj + 64 === karakterBroj) {
        poljaSlova[randomBroj - 1].style.color = 'green';
        s('hit').innerText = Number(s('hit').innerText) + 1;
    } else {
        poljaSlova[randomBroj - 1].style.color = 'red';
        s('miss').innerText = Number(s('miss').innerText) + 1;
    }

    taknuto = true;
}

/* DOGADJAJI */

for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('change', handleSpeedChange);
}

s('start').addEventListener('click', init);

window.addEventListener('keypress', handleUserInput);