function card(value, name, suit) {
  this.value = value;
  this.name = name;
  this.suit = suit;
}

function deck() {
  this.names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  this.suits = ['hearts', 'diamonds', 'spades', 'clubs'];
  var cards = [];

  for (var s = 0; s < this.suits.length; s++) {
    for (var n = 0; n < this.names.length; n++) {
      cards.push(new card(n + 1, this.names[n], this.suits[s]));
    }
  }

  return cards;
}

function shuffle(deck) {
  let counter = deck.length;

  // While there are cards in the deck
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = deck[counter];
    deck[counter] = deck[index];
    deck[index] = temp;
  }

  return deck;
}

function spreadCards() {
  var stack = document.getElementById('stack');
  var cards = stack.getElementsByTagName('li');

  for (var i = 0; i < cards.length; i++) {
    let card = cards[i];
    card.style.zIndex = -i;
    card.style.left = i * 20 + 'px';
  }
}

function unicodeSuit(suit) {
  let unicode = '';
  switch (suit) {
    case 'spades':
      unicode = '&spades;';
      break;
    case 'diamonds':
      unicode = '&diams;';
      break;
    case 'hearts':
      unicode = '&hearts;';
      break;
    default:
      unicode = '&clubs;';
  }
  return unicode;
}

function display(deck) {
  let html = '<ul id="stack">';
  for (var i = 0; i < deck.length; i++) {
    card = deck[i];
    html += '<li class="' + card.suit + '"><span class="cname">' + card.name +
      '</span><span class="csuit">' + unicodeSuit(card.suit) + '</span></li>';
  }
  html += '</ul>';
  document.getElementById('display').innerHTML = html;
  spreadCards();
}

// deal card from top of cards array, then pushes card to end of array
function dealCard() {
  // shift first card off deck
  let card = cards.shift();
  // display card
  document.getElementById('dealt').setAttribute('data-card', JSON.stringify(card));
  document.getElementById('dealt').innerHTML = '<div class="card ' + card.suit + '"><span class="cname">' +
    card.name + '</span><span class="csuit">' + unicodeSuit(card.suit) + '</span></div>';

}

function resetDealtCard() {
  let card = document.getElementById('dealt').getAttribute('data-card');
  if (card !== "" && card !== null) {
    // push to back of deck
    cards.push(JSON.parse(card));
    document.getElementById('dealt').setAttribute('data-card', '');
  }
  // clear dealt card display
  document.getElementById('dealt').innerHTML = '';
}

function onClickShuffleDeck() {
  resetDealtCard();
  shuffle(cards);
  display(cards);
}

function onClickDealCard() {
  resetDealtCard();
  dealCard();
  display(cards);
}

// shuffle and display a new deck of cards
var cards = new deck();
shuffle(cards);
display(cards);