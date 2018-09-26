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
var list1 = []
var list2 = []
createList(list1);
createList(list2);
var finalList = list1.concat(list2)

// SHUFFLING THE ARRAY
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
    }
}
shuffleArray(finalList)

// CREATING A CARD ELEMENT IN THE
function createNewGame() {
  let indexCount = 0
  const board = document.querySelector('.board');
  for (i = 0; i < 4; i++) {
    const row1 = document.createElement('tbody');
    for (j = 0; j < 4; j++) {
      const col = document.createElement('td');
      const card = document.createElement('div');
      card.setAttribute('class', 'card')
      card.setAttribute('id', 'card'+finalList[indexCount])
      col.appendChild(card)
      row1.appendChild(col)
      board.appendChild(row1)
      indexCount += 1
    }
  }
}

createNewGame()

// CHANGING DISPLAY OF THE CLICKED CARD
$('.card').on('click', function (){
  $(this).find('.color-image').css('display', 'block')
})

// RESETING THE GAME
$('#replay').on('click', function(){
  $('.color-image').css('display','none')
})
