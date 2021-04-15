var more = document.getElementById('more');
var min = document.getElementById('min');
let res = document.getElementsByClassName('result');
let inBtc = document.getElementById('in-btc');
let fr = document.getElementById('fr-btc');

// onClick's logic below:
more.addEventListener('click', function () {
    document.getElementById('calculator').classList.remove('d-none');
    document.getElementById('calculator').style.display = "inline-block";
    more.classList.add('d-none')
    document.getElementById('min').classList.remove('d-none');
    document.getElementById('calculator-input').focus();
    return (true)
});
min.addEventListener('click', function () {
    document.getElementById('calculator').classList.add('d-none');
    min.classList.add('d-none')
    document.getElementById('more').classList.remove('d-none');
    console.log(res);   ``
    for (let i = 0; i < res.length; i++) {
        res[i].classList.add('d-none');
    }
    return (true)
});
let calc = document.getElementById('calculate-button');
calc.addEventListener('click', function () {
    let data = document.getElementById('calculator-input').value;
    let course = {
        usd: document.getElementById('response-usd').innerText,
        rub: document.getElementById('response-rub').innerText
    };
    let resUsd = document.getElementById('result-usd');
    let resRub = document.getElementById('result-rub');
    let resBtc = document.getElementById('result-btc')
    try {
        console.log(inBtc);
        console.log(inBtc.chacked);
        if (document.getElementById('in-btc').checked == true) {
            console.log(document.getElementsByClassName('result-btc-div'));
            document.getElementById('result-btc-div').classList.remove('d-none');
            if (document.getElementById('fr-rub').checked == true) {
                resBtc.innerText = (data/course.rub).toFixed(7);
            } else {
                resBtc.innerText = (data/course.usd).toFixed(7);
            }
            for (let i = 0; i < res.length; i++) {
                res[i].classList.add('d-none');
                }
        }else{
            resRub.innerText = data * course.rub;
            resUsd.innerText = data * course.usd;
            for (let i = 0; i < res.length; i++) {
                res[i].classList.remove('d-none');
            }
            document.getElementById('result-btc-div').classList.add('d-none');
        }

    } catch (error) {
        res.innerText = "Проверьте введенные данные";
        console.log(error);
    }
})
fr.addEventListener('change', function(){
    document.getElementById('radioExt').classList.add('d-none');
});
inBtc.addEventListener('change', function(){
    document.getElementById('radioExt').classList.remove('d-none');
});

