let count = 0
let countText = document.querySelector('#clicks')

// CREATING A LIST WITH 8 DIFFERENT NUMBES TWICE
function makeNewList() {
  // MAKING A RANDOM LIST OF 8 NUMBER
  function createList (list) {
    while (list.length != 8) {
      num = Math.floor(Math.random() * 8)
      if (list.indexOf(num) === -1){
        list.push(num)
      };
    };
  };

  // CREATING TWO RANDOM LISTS AND CONCATENETING THEM
  const list1 = []
  const list2 = []
  createList(list1);
  createList(list2);
  let finalList = list1.concat(list2)

  // SHUFFLING THE ARRAY
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
      }
  }
  shuffleArray(finalList)
  return(finalList)
}

// CREATE A BOARD WITH DIFFERENT SET OF CARDS
function createNewGame() {
  const list = makeNewList()
  let indexCount = 0
  const board = document.querySelector('.board');
  for (i = 0; i < 4; i++) {
    const row1 = document.createElement('tbody');
    for (j = 0; j < 4; j++) {
      const col = document.createElement('td');
      const card = document.createElement('div');
      const image = document.createElement('img');
      image.setAttribute('class', 'color-image hidden')
      image.setAttribute('id', 'card'+list[indexCount])
      card.setAttribute('class', 'card')
      card.appendChild(image)
      col.appendChild(card)
      row1.appendChild(col)
      board.appendChild(row1)
      indexCount += 1
    }
  }
}
let card1;
let card2;

// HIDDING THE TWO CARDS
function hideCards(card1, card2){
  card1.removeClass('show');
  card1.addClass('hidden');
  card2.removeClass('show');
  card2.addClass('hidden');
}

// FREEZING THE SCREEN SO THAT NOTHING IS CLICKABLE
function freezeScreen() {
  const blocker = document.createElement('div');
  const screen = $('main');
  blocker.setAttribute('class', 'blocker');
  screen.append(blocker);
  setTimeout(function(){
    blocker.remove()
  }, 1000)
};

function clickingCard () {
  $('.card').on('click', function (){
    const cardImage = $(this).children();
    cardImage.removeClass('hidden');
    cardImage.addClass('show');

    if (count % 2 === 0) {
      card1 = cardImage;
    } else {
      card2 = cardImage;
      freezeScreen();
      setTimeout(function() {
        hideCards(card1, card2);
      }, 1000)

    }


    // CHECAR SE O ID DA card1 É IGUAL AO ID DA card2. SE NÃO, AMBAS TEREM DISPLAY HIDDEN, SE SIM, BORDA MUDA DE COR

    // CHECAR SE A cardImage CONTEM A CLASSE show, SE NÃO:
    count += 1
    countText.textContent = count
  })
}

createNewGame()

clickingCard()

// RESETING THE GAME
$('#replay').on('click', function(){
  $('tbody').remove()
  count = 0
  countText.textContent = "0"
  createNewGame();
  clickingCard()
})
