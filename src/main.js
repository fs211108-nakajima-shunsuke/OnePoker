import { out } from "./util.js";
import { TRUMP_SUIT, TRUMP_VALUE } from "./config.js";

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
    name : 'あなた',
    hand : []
};

let cpu = {
    name : 'CPU',
    hand : []
}

const dealCard = (deck, player) => {
    player.hand.push(deck[0]);
    deck.splice(0, 1);
    out(`${player.name}にカードを1枚配りました。`);
    console.log('デッキ残:'+ deck.length);
};

dealCard(deck, you);
dealCard(deck, cpu);
dealCard(deck, you);
dealCard(deck, cpu);

const showHand = (player) => {
  out(`${player.name}の手札`)
  for(let i=0; i<player.hand.length; i++){
    let suit = player.hand[i].suit;
    let value = player.hand[i].value;
    console.log(suit +'の'+ value);
  }
}

showHand(you);