let d = id => document.getElementById(id);
let c = id => document.getElementsByClassName(id);

let niz;
let tajmer;
let pritisnuto = false;

d('start').addEventListener('click', function () {
    // d('start').setAttribute('disabled', 'disabled');
    if (d('start').value === 'Start game') {
        d('start').value = "Stop";
        let ms = document.querySelector('input[name=difficulty]:checked').value;
        d('easy').setAttribute('disabled', 'disabled');
        d('medium').setAttribute('disabled', 'disabled');
        d('hard').setAttribute('disabled', 'disabled');
        initData();
        pickNumber();
        tajmer = setInterval(function () {
            pickNumber();
        }, ms);
    } else {
        clearInterval(tajmer);
        alert("Igra je prekinuta");
        d('start').value === 'Start game'
        d('left').innerHTML = 0;
        d('start').removeAttribute('disabled');
        d('easy').removeAttribute('disabled');
        d('medium').removeAttribute('disabled');
        d('hard').removeAttribute('disabled');
    }


})

d('letter').addEventListener('keypress', function (e) {
    if (pritisnuto) {
        return;
    }
    pritisnuto = true;
    let key = e.key.toUpperCase();
    let idx = key.charCodeAt(0) - 64;
    let num = parseInt(d('number').innerText);
    d('letter').setAttribute('readonly', 'readonly');
    d('letter').value = '';
    console.log('pritisnuto je ' + key + ' sto je kod ' + idx);
    if (idx === num) {
        // pogodio
        d('hit').innerText = (parseInt(d('hit').innerText) + 1);
        d(num).classList.add('hit');
    } else {
        //pogresio
        d('miss').innerText = (parseInt(d('miss').innerText) + 1);
        d(num).classList.add('miss');
    }
})

function initData() {
    niz = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
    d('left').innerHTML = 26;
    d('miss').innerHTML = 0;
    d('hit').innerHTML = 0;
    d('letter').focus();
    for (let i = 1; i <= 26; i++) {
        d(i).classList.remove('miss');
        d(i).classList.remove('hit');
        d(i).classList.remove('pass');
    }
}
function pickNumber() {
    if (pritisnuto) {
        pritisnuto = false;
    } else {
        let num = parseInt(d('number').innerText);
        if (num) {
            //nije reagovao
            d('miss').innerText = (parseInt(d('miss').innerText) + 1);
            d(num).classList.add('pass');
        }
    }
    d('letter').removeAttribute('readonly');
    let selIdx = Math.floor(Math.random() * niz.length);
    let selVal = niz[selIdx];
    d('number').innerHTML = selVal;
    niz.splice(selIdx, 1);
    d('left').innerHTML = niz.length;
    console.log('izabani index/vrednost ' + selIdx + '/' + selVal + ' duzina niza ' + niz.length);

    //akcije koje ce biti izvrsene kad igica dodje do kraja
    if (niz.length === 0) {
        clearInterval(tajmer);
        alert('Game over, procenat uspesnosti ' + Math.round(parseInt(d('hit').innerText) / 26 * 100) + "%");
        d('left').innerHTML = 0;
        d('start').removeAttribute('disabled');
        d('easy').removeAttribute('disabled');
        d('medium').removeAttribute('disabled');
        d('hard').removeAttribute('disabled');
        d('start').value = "Start game";
    }
}

