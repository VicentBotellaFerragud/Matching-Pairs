document.addEventListener('DOMContentLoaded', () => {
  const cardArray = [
    {
      name: 'bear',
      img: 'images/bear.png'
    },
    {
      name: 'bear',
      img: 'images/bear.png'
    },
    {
      name: 'camel',
      img: 'images/camel.png'
    },
    {
      name: 'camel',
      img: 'images/camel.png'
    },
    {
      name: 'cat',
      img: 'images/cat.png'
    },
    {
      name: 'cat',
      img: 'images/cat.png'
    },
    {
      name: 'deer',
      img: 'images/deer.png'
    },
    {
      name: 'deer',
      img: 'images/deer.png'
    },
    {
      name: 'dog',
      img: 'images/dog.png'
    },
    {
      name: 'dog',
      img: 'images/dog.png'
    },
    {
      name: 'fox',
      img: 'images/fox.png'
    },
    {
      name: 'fox',
      img: 'images/fox.png'
    },
    {
      name: 'monkey',
      img: 'images/monkey.png'
    },
    {
      name: 'monkey',
      img: 'images/monkey.png'
    },
    {
      name: 'penguin',
      img: 'images/penguin.png'
    },
    {
      name: 'penguin',
      img: 'images/penguin.png'
    },
    {
      name: 'tiger',
      img: 'images/tiger.png'
    },
    {
      name: 'tiger',
      img: 'images/tiger.png'
    },
    {
      name: 'koala',
      img: 'images/koala.png'
    },
    {
      name: 'koala',
      img: 'images/koala.png'
    },
  ];

  /**
   * Randomly sorts the cards each time the page loads or each time the player refreshes the page.
   */
  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  /**
   * Creates the game board, gives every card an id and makes them (the cards) clickable.
   */
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', 'images/question.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
  }

  /**
   * This function is called every time the player clicks twice on different cards (or on the same card) and checks if he/she has found a pair.
   */
  function checkForMatch() {
    const cards = document.querySelectorAll(('div#grid img'));
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    //If the player clicks twice in a row on the same card...
    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/question.png');//"Flips" the card again.
      cards[optionTwoId].setAttribute('src', 'images/question.png');//"Flips" the card again.
      alert('You have clicked the same image!');
    }
    //If the player finds a pair of cards...
    else if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match')
      cards[optionOneId].setAttribute('src', 'images/square.png');//"Removes" the card from the board.
      cards[optionTwoId].setAttribute('src', 'images/square.png');//"Removes" the card from the board.
      cards[optionOneId].removeEventListener('click', flipCard);//Makes the card unclickable.
      cards[optionTwoId].removeEventListener('click', flipCard);//Makes the card unclickable.
      cardsWon.push(cardsChosen);//"Pushes" the selected cards (as one array) into the "cardsWon" array.
    //If the player doesn't find a pair of cards...
    } else {
      cards[optionOneId].setAttribute('src', 'images/question.png');//"Flips" the card again.
      cards[optionTwoId].setAttribute('src', 'images/question.png');//"Flips" the card again.
    }
    //Resets variables.
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    //If the number of "cardsWon" is half the number of total cards then the player has won the game. This is because each pair of cards stored 
    //in the array "cardsWon" counts as a single element, as opposed to the array "cardArray", in which each card is one element and 
    //therefore twice as many elements as in the array "cardsWon" are contained when the player finds all the pairs.
    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = `You found them all!`;
    }
  }

  /**
   * Flips the card the player clicks on and "pushes" the selected card and its id into the "cardsChosen" and "cardsChosenId" arrays respectively. 
   * When the player chooses 2 cards, the "checkForMatch()" function is called.
   */
  function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }
  createBoard();
});


