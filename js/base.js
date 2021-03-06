// VARIABLES
let count = 0
let countText = document.querySelector('#clicks')
let card1;
let card2;
let matches = 0;
let timer = 0

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

// HIDDING THE TWO CARDS
function hideCards(card1, card2){
  card1.removeClass('show');
  card1.addClass('hidden');
  card2.removeClass('show');
  card2.addClass('hidden');
}

// COUNTING THE TIME
let countingTime = setInterval(function () {
  document.querySelector("#timer").textContent = timer;
  timer += 1;
}, 1000)

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
    if (cardImage.hasClass("hidden")) {
      cardImage.removeClass('hidden');
      cardImage.addClass('show');

      if (count % 2 === 0) {
        card1 = cardImage;
      } else {
        card2 = cardImage;
        freezeScreen();
        setTimeout(function() {
          // IF THE ID'S ARE DIFFERENTS, HIDE THE CARDS
          if (card1[0].id != card2[0].id) {
            hideCards(card1, card2);
          } else {
            matches += 1;
            // IF THERE ARE 8 PAIRS IN THE BOARD, THE GAME IS FINISHED!
            if (matches == 8) {
              clearInterval(countingTime);
              let starRate;
              if (count < 25) {
                starRate = "3 estrelas"
              } else if (count < 31) {
                starRate = "2 estrelas"
              } else if (count < 39) {
                starRate = "1 estrela"
              } else {
                starRate = "0 estrela"
              }
              document.querySelector('#winningText').innerHTML = "Parabéns. Você terminou o jogo com " + count + " movimentos, " + starRate + " e em " + timer + " segundos."
              $('#finalPopUp').modal('show')
            }
          }
          card1 = undefined;
          card2 = undefined;
        }, 1000);
      }
      count += 1
      countText.textContent = count

      if (count >= 25) {
        const star3 = $("#star3");
        star3[0].classList.remove("fa-star");
        star3[0].classList.add("fa-star-o");
      }
      if (count >= 31) {
        const star2 = $("#star2");
        star2[0].classList.remove("fa-star");
        star2[0].classList.add("fa-star-o");
      }
      if (count >= 39) {
        const star1 = $("#star1");
        star1[0].classList.remove("fa-star");
        star1[0].classList.add("fa-star-o");
      }

    }
  })
}

createNewGame()
clickingCard()


$('#replay').on('click', function () {
  $('tbody').remove()
  timer = 0
  matches = 0
  count = 0
  countText.textContent = "0"
  for (i = 1; i <= 3; i++) {
    const star = $("#star" + i);
    star[0].classList.remove("fa-star-o");
    star[0].classList.add("fa-star");
    console.log(star)
  }
  createNewGame();
  clickingCard()
})

$('#playAgain').on('click', function () {
  $('tbody').remove()
  timer = 0
  matches = 0
  count = 0
  countText.textContent = "0"
  for (i = 1; i <= 3; i++) {
    const star = $("#star" + i);
    star[0].classList.remove("fa-star-o");
    star[0].classList.add("fa-star");
    console.log(star)
  }
  let countingTime = setInterval(function () {
    document.querySelector("#timer").textContent = timer;
    timer += 1;
  }, 1000)
  createNewGame();
  clickingCard()
})
