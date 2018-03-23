function findHobyInload(){
  $('.hobyLeft').on('tap','li',function(){
    $('.hobyLeft').find('li').removeClass('hoby_active');
    $(this).addClass('hoby_active');
  });
  $('.hobyRight').on('tap','li',function(){
    console.log('111')
    $.router.load('/topicDetails.html');
  })
}