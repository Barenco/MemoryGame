$('.card').on('click', function (){
  $(this).find('.color-image').css('display', 'block')
})

$('#replay').on('click', function(){
  $('.color-image').css('display','none')
})
