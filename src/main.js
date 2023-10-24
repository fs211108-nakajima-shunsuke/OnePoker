import { out } from "./util.js";
import { TRUMP_SUIT, TRUMP_VALUE, BIGGEST_DOWN_NUMBER } from "./config.js";

out("こんちには、ゲームを開始します。");

let deck = [];

const makeDeck = () => {
  for (let i = 0; i < TRUMP_SUIT.length; i++) {
    for (let j = 0; j < TRUMP_VALUE.length; j++) {
      deck.push({ suit: TRUMP_SUIT[i], value: TRUMP_VALUE[j] });
    }
  }
  out("デッキを作成しました");
};

makeDeck();

const shuffleDeck = (deck) => {
  let newDeck = [];
  while (deck.length > 0) {
    let leftCards = deck.length;
    let index = Math.floor(Math.random() * leftCards);
    newDeck.push(deck[index]);
    deck.splice(index, 1);
  }
  out("デッキをシャッフルしました");
  return newDeck;
};

deck = shuffleDeck(deck);

let you = {
  name: "あなた",
  hand: [],
};

let cpu = {
  name: "CPU",
  hand: [],
};

const dealCard = (deck, player) => {
  player.hand.push(deck[0]);
  deck.splice(0, 1);
  out(`${player.name}にカードを1枚配りました。`);
  console.log("デッキ残:" + deck.length);
};

dealCard(deck, you);
dealCard(deck, cpu);
dealCard(deck, you);
dealCard(deck, cpu);

let yourSelectCard = {};
let cpuSelectCard = {};

const decideYourCard = (card) => {
  let selectCardEle = document.getElementById('you-selected-card');
  selectCardEle.innerHTML = `${card.suit}の${card.value}`;
};

const decideCpuCard = (cpu) => {
  if(cpu.hand[0].value > cpu.hand[1].value){
    cpuSelectCard = {suit : cpu.hand[0].suit, value : cpu.hand[0].value};
  } else {
    cpuSelectCard = {suit : cpu.hand[1].suit, value : cpu.hand[1].value};
  }
  let selectCardEle = document.getElementById('cpu-selected-card');
  selectCardEle.innerHTML = `${cpuSelectCard.suit}の${cpuSelectCard.value}`;
};

const showHand = (player) => {
  let yourHandElement = document.getElementById("hand");
  let handNameElement = document.createElement("p");
  handNameElement.innerHTML = player.name + "の手札";
  yourHandElement.appendChild(handNameElement);
  for (let i = 0; i < player.hand.length; i++) {
    let suit = player.hand[i].suit;
    let value = player.hand[i].value;

    let btn = document.createElement("button");
    btn.textContent = "選ぶ";
    btn.onclick = () => {
      yourSelectCard = {suit , value};
      decideYourCard(yourSelectCard);
      decideCpuCard(cpu);
    };
    let cardElement = document.createElement("div");
    cardElement.innerHTML = `<p>${suit}の${value} : </p>`;
    cardElement.childNodes[0].appendChild(btn);
    yourHandElement.appendChild(cardElement);
  }
};

const logHand = (player) => {
  out(`${player.name}の手札`);
  for (let i = 0; i < player.hand.length; i++) {
    let suit = player.hand[i].suit;
    let value = player.hand[i].value;
    console.log(suit + "の" + value);
  }
};

showHand(you);
logHand(cpu);

const showUpDown = (player) => {
  const isUpNumber = (number) => {
    if (number > BIGGEST_DOWN_NUMBER || number === 1) {
      return true;
    } else {
      return false;
    }
  };

  let upDownElement = document.getElementById("up-down");
  let upDownNameElement = document.createElement("p");
  upDownNameElement.textContent = player.name + 'の手札';
  upDownElement.appendChild(upDownNameElement);
  for (let i = 0; i < player.hand.length; i++) {
    let value = player.hand[i].value;
    let num = parseValueToNumber(value);
    let newUpDownElement = document.createElement("p");
    if (isUpNumber(num)) {
      newUpDownElement.textContent = "UP";
    } else {
      newUpDownElement.textContent = "DOWN";
    }
    upDownElement.appendChild(newUpDownElement);
  }
};

const parseValueToNumber = (value) => {
  switch (value) {
    case "A":
      return 1;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    default:
      return parseInt(value);
  }
  return 0;
};

showUpDown(cpu);
