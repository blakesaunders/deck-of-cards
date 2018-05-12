function card (value, name, suit) {
  this.value = value
  this.name = name
  this.suit = suit
}

function deck () {
  this.names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  this.suits = ['hearts', 'diamonds', 'spades', 'clubs']
  var cards = []

  for (var s = 0; s < this.suits.length; s++) {
    for (var n = 0; n < this.names.length; n++) {
      cards.push(new card(n + 1, this.names[n], this.suits[s]))
    }
  }

  return cards
}

function shuffle (deck) {
  let counter = deck.length
  console.log('Shuffling cards...')

  // While there are cards in the deck
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter)
    // Decrease counter by 1
    counter--
    // And swap the last element with it
    let temp = deck[counter]
    deck[counter] = deck[index]
    deck[index] = temp
  }
  console.log(deck)
  return deck
}

function unicodeSuit (suit) {
  let unicode = ''
  switch (suit) {
    case 'spades':
      unicode = '&spades;'
      break
    case 'diamonds':
      unicode = '&diams;'
      break
    case 'hearts':
      unicode = '&hearts;'
      break
    default:
      unicode = '&clubs;'
  }
  return unicode
}

function spreadCards () {
  var stack = document.getElementById('stack')
  var cards = stack.getElementsByTagName('li')
  for (var i = 0; i < cards.length; i++) {
    let card = cards[i]
    card.style.zIndex = -i
    card.style.left = i * 20 + 'px'
  }
}

function display (deck) {
  let html = '<ul id="stack">'
  for (var i = 0; i < deck.length; i++) {
    let card = deck[i]
    html += '<li class="' + card.suit + '"><span class="cname">' + card.name +
      '</span><span class="csuit">' + unicodeSuit(card.suit) + '</span></li>'
  }
  html += '</ul>'
  document.getElementById('display').innerHTML = html
  spreadCards()
}

function dealCard () {
  const elem = document.getElementById('dealt')
  // shift top card off deck
  let card = cards.shift()
  console.log('Dealing new card...')
  console.log(card)
  console.log(cards)
  // place dealt card in html element
  elem.setAttribute('data-card', JSON.stringify(card))
  elem.innerHTML = '<div class="card ' + card.suit + '"><span class="cname">' +
    card.name + '</span><span class="csuit">' + unicodeSuit(card.suit) + '</span></div>'
}

function resetDealtCard () {
  const elem = document.getElementById('dealt')
  const json = elem.getAttribute('data-card')
  if (json !== '' && json !== null) {
    // push dealt card to back of deck
    const dealtCard = JSON.parse(json)
    cards.push(new card(dealtCard.value, dealtCard.name, dealtCard.suit))
    elem.setAttribute('data-card', '')
  }
  // clear dealt card display
  elem.innerHTML = ''
}

function onClickShuffleDeck () {
  resetDealtCard()
  shuffle(cards)
  display(cards)
}

function onClickDealCard () {
  resetDealtCard()
  dealCard()
  display(cards)
}

function onClickReset () {
  console.log('Resetting deck...')
  resetDealtCard()
  cards = new deck()
  console.log(cards)
  display(cards)
}

// display a new deck of cards
var cards = new deck()
display(cards)
