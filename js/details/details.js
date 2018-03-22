function details(){
   currentClickMsgId = currentClickMsgId+"" ;
  console.log(currentClickMsgId)
    $('#detaisComment').click(function(){
      $.router.load('./commentDetails.html');
    });
    $('#watchAll').click(function(){
      $.router.load('./commentDetails.html');
    });
    $('.guanzhu').click(function(){
      $(this).remove();
      $.toast('关注成功');
    })
}

