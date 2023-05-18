const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // console.log(entry);
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
  const dateMinutesFormatter =
    dateMinutes <= 9 ? `0${dateMinutes}` : dateMinutes;
  const dateSecondsFormatter =
    dateSeconds <= 9 ? `0${dateSeconds}` : dateSeconds;

  // console.log(dateSeconds);
  document.getElementsByClassName(
    'time'
  )[0].innerHTML = `<span>${dateDay} <br />
  <h6>DAYS</h6></span>
<h5>:</h5>
<span>${dateHours} <br />
<h6>HOURS</h6></span>
<h5>:</h5>
<span>${dateMinutesFormatter} <br />
<h6>MINUTES</h6></span>
<h5>:</h5>
<span>${dateSecondsFormatter} <br />
<h6>SECONDS</h6></span>`;
};
// date();
setInterval(date, 1000);

// CRYPTO CONVERTER

const currencyOneEl = document.querySelector('[data-js="currency-one"]');
const currencyTwoEl = document.querySelector('[data-js="currency-two"]');
const currenciesEl = document.querySelector('[data-js="currencies-container"]');
const url =
  'https://v6.exchangerate-api.com/v6/ec6ed636b9c066a236e61761/latest/USD';

const getErrorMessage = (errorType) =>
  ({
    'unsupported-code': 'A moeda não existe em nosso banco de dados.',
    'malformed-request':
      "when some part of your request doesn't follow the structure shown above.",
    'invalid-key': 'when your API key is not valid.',
    'inactive-account': "if your email address wasn't confirmed.",
    'quota-reached':
      'when your account has reached the the number of requests allowed by your plan.',
  }[errorType] || 'Não foi possível obter as informações.');

const fetchExchangeRate = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        'Sua conexão falhou. Não foi possível obter as informações'
      );
    }

    const exchangeRateData = await response.json();

    if (exchangeRateData.result === 'error') {
      throw new Error(getErrorMessage(exchangeRateData['error-type']));
    }

    return exchangeRateData;
  } catch (err) {
    const div = document.createElement('div');
    const button = document.createElement('button');

    div.textContent = err.message;
    div.classList.add('alert', 'warning');
    div.setAttribute('role', 'alert');
    button.classList.add('btn-close');
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', 'Close');

    button.addEventListener('click', () => {
      div.remove();
    });

    div.appendChild(button);
    currenciesEl.insertAdjacentElement('afterend', div);

    //     <div class="alert warning" role="alert">
    //   Mensagem do erro.
    //   <button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>
    // </div>
  }
};

const init = async () => {
  const exchangeRateData = await fetchExchangeRate();

  console.log();

  const options = Object.keys(exchangeRateData.conversion_rates)
    .map((currency) => `<option>${currency}</option>`)
    .join('');

  console.log(options);
  currencyOneEl.innerHTML = options;
  currencyTwoEl.innerHTML = options;
};

init();

// console.log(currencyOneEl, currencyTwoEl);

// MUDAR ÍCONE CRIPTO
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
let B = '';

coins.addEventListener('change', () => {
  let a = coins.value;
  let B = coins.value;

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

//  fetch('https://blockchain.info/ticker')
//   .then((response) => response.json())
//   .then((json) => {
// gov.innerText = json.USD.sell;
// console.log(json.USD.sell);
// let crypto = document.getElementById('crypto');
// let gov = document.getElementById('gov');

// let bitcoinDollar = json.USD.sell;
// console.log(bitcoinDollar);

// let bitcoinReal = json.BRL.sell;
// console.log(bitcoinReal);

// coin.addEventListener('change', (e) => {
//   const cryptoCoin = e.target.value;
//   console.log(cryptoCoin, B);
//   switch (cryptoCoin) {
//     case 'Bitcoin':
//       switch (coins.value) {
//         case 'Dollar':
//           gov.value = crypto.value * bitcoinDollar;
//           break;
//         case 'Real':
//           gov.value = crypto.value * bitcoinReal;
//           break;
//         default:
//           gov.value = 0;
//       }
//   }
// });

// coin.addEventListener('change', (e) => {
//   console.log(e.target.value);
//   switch ('Bitcoin') {
//     case coin.value:
//       switch ('Dollar') {
//         case coins.value:
//           gov.value = crypto.value * bitcoinDollar;
//           break;
//       }
//       switch ('Real') {
//         case coins.value:
//           gov.value = crypto.value * bitcoinReal;
//           break;
//       }
//   }
// });
// });
