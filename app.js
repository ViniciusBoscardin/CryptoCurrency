const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// CLOCK
const date = () => {
  let date_main = new Date('Dec, 29, 2023 , 11:38:46');
  // console.log(date_main);
  let currentDate = new Date();
  // console.log(currentDate);
  let dateDay = parseInt((date_main - currentDate) / 1000 / 60 / 60 / 24);
  let dateHours = parseInt((date_main - currentDate) / 1000 / 60 / 60) % 24;
  let dateMinutes = parseInt((date_main - currentDate) / 1000 / 60) % 60;
  let dateSeconds = parseInt((date_main - currentDate) / 1000) % 60;
  // console.log(dateSeconds);
  document.getElementsByClassName(
    'time'
  )[0].innerHTML = `<span>${dateDay} <br />
  <h6>DAYS</h6></span>
<h5>:</h5>
<span>${dateHours} <br />
<h6>HOURS</h6></span>
<h5>:</h5>
<span>${dateMinutes} <br />
<h6>MINUTES</h6></span>
<h5>:</h5>
<span>${dateSeconds} <br />
<h6>SECONDS</h6></span>`;
};
// date();
setInterval(date, 1000);

// CRYPTO CONVERTER

let coin_first = document.getElementById('coin_first');
let coin = document.getElementById('coin');
let btc = document.getElementById('btc');

coin.addEventListener('change', () => {
  let a = coin.value;
  coin_first.innerText = a.slice(0, 1);
  if (a === 'Bitcoin') {
    btc.innerText = 'BTC';
  } else if (a === 'Ethereum') {
    btc.innerText = 'ETH';
  } else if (a === 'Tether') {
    btc.innerText = 'USDT';
  } else {
    btc.innerText = 'BNB';
  }
});

let gov_coins = document.getElementById('gov_coins');
let coins = document.getElementById('coins');
let gov_coinss = document.getElementById('gov_coinss');

coins.addEventListener('change', () => {
  let a = coins.value;
  gov_coins.innerText = a.slice(0, 1);
  if (a === 'Dollar') {
    gov_coins.innerText = '$';
    gov_coinss.innerText = 'USD';
  } else if (a === 'Real') {
    gov_coinss.innerText = 'BRL';
    gov_coins.innerText = 'R$';
  } else if (a === 'Euro') {
    gov_coins.innerText = '€';
    gov_coinss.innerText = 'EUR';
  } else {
    gov_coins.innerText = '¥';
    gov_coinss.innerText = 'CNY';
  }
});

fetch('https://blockchain.info/ticker')
  .then((response) => response.json())
  .then((json) => {
    // gov.innerText = json.USD.sell;
    // console.log(json.USD.sell);
    let crypto = document.getElementById('crypto');
    let gov = document.getElementById('gov');

    let bitcoinDollar = json.USD.sell;
    console.log(bitcoinDollar);

    let bitcoinReal = json.BRL.sell;
    console.log(bitcoinReal);

    crypto.addEventListener('change', () => {
      switch ('Bitcoin') {
        case coin.value:
          switch ('Dollar') {
            case coins.value:
              gov.value = crypto.value * bitcoinDollar;
              break;
          }
          switch ('Real') {
            case coins.value:
              gov.value = crypto.value * bitcoinReal;
              break;
          }
      }
    });
  });
