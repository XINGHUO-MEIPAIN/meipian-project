function details(){
    $('#detaisComment').click(function(){
      $.router.load('./commentDetails.html');
    });
    $('#watchAll').click(function(){
      $.router.load('./commentDetails.html');
    });
    $('.guanzhu').click(function(){
      $(this).remove();
      $.toast('¹Ø×¢³É¹¦');
    })
}

