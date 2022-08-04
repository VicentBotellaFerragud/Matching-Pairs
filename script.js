document.addEventListener('DOMContentLoaded', () => {
//Fires as soon as the DOM hierarchy has been fully constructed (when the document has been completely loaded and parsed).
  
  //Global variables:
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
  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  cardArray.sort(() => 0.5 - Math.random()); //Sorts the cards randomly each time the game loads.

  /**
   * Creates the game board, gives every card an id and makes them (the cards) clickable.
   */
  function createBoard() {

    for (let i = 0; i < cardArray.length; i++) {

      const card = document.createElement('img');

      card.setAttribute('src', 'images/question.png');
      card.setAttribute('data-id', i); //The card id corresponds to its index in the cardArray (which is different every time the game starts).
      card.addEventListener('click', flipCard); //The flipCard function is called when the player clicks on a card.
      grid.appendChild(card);

    }

  }

  /**
   * Checks if the player has found a pair.
   */
  function checkForMatch() {

    const cards = document.querySelectorAll(('div#grid img'));
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    //If the player clicks twice in a row on the same card...
    if (optionOneId == optionTwoId) {

      //The card is flipped again.
      cards[optionOneId].setAttribute('src', 'images/question.png');
      cards[optionTwoId].setAttribute('src', 'images/question.png');

      alert('You have clicked the same image!');

    }

    //If the player finds a pair of cards...
    else if (cardsChosen[0] === cardsChosen[1]) {

      alert('You found a match');

      //Both cards are "removed" (they are actually made invisible) from the game board, made unclickable...
      cards[optionOneId].setAttribute('src', 'images/square.png');
      cards[optionTwoId].setAttribute('src', 'images/square.png');
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
      
      //And pushed as one array into the cardsWon array.
      cardsWon.push(cardsChosen);

    //If the player doesn't find a pair of cards...
    } else {

      //Both cards are flipped again.
      cards[optionOneId].setAttribute('src', 'images/question.png');
      cards[optionTwoId].setAttribute('src', 'images/question.png');

    }

    //Variables are reset.
    cardsChosen = [];
    cardsChosenId = [];

    resultDisplay.textContent = cardsWon.length;

    //If the length of cardsWon is half the length of cardArray...
    if (cardsWon.length === cardArray.length / 2) {

      //Then the player has won the game*.
      resultDisplay.textContent = `You found them all!`;

      /**
       * *This is because each pair of cards stored in the cardsWon array counts as a single element, as opposed to the cardArray array,
       * in which each card is one element and therefore twice as many elements as in the cardsWon array are contained when the player 
       * finds all the pairs.
       */

    }
  
  }

  /**
   * Flips the card the player clicks on and pushes the selected card and its id into the cardsChosen and cardsChosenId arrays 
   * respectively. When the player chooses 2 cards, the checkForMatch function is called.
   * IMPORTANT! --> "this" refers to the "card" on which this function is called.
   */
  function flipCard() {

    let cardId = this.getAttribute('data-id'); //cardId equals the id of the clicked "card".

    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);

    this.setAttribute('src', cardArray[cardId].img); //Displays the image corresponding to the clicked "card".

    if (cardsChosen.length === 2) {

      setTimeout(checkForMatch, 500);

    }

  }

  createBoard();

});