function details(){
  currentClickMsgId = currentClickMsgId+"" ;
  console.log(currentClickMsgId)
  $('.newComment-detailContent').html('');
    $('#detaisComment').click(function(){
      $.router.load('./commentDetails.html');
    });
    $('#watchAll').click(function(){
      $.router.load('./commentDetails.html');
    });
    $('.guanzhu').click(function(){
      $(this).remove();
      $.toast('关注成功');
    });
    $.ajax({
      url: postUrl + '/getBlogInfo',
      type: "POST",
      data: '{ "msgId":"' + currentClickMsgId + '","imId":"' + selfImId + '"}',
      contentType: "application/json;charset=utf-8",
      success: function (res) {
        $('.newComment-detailContent').html('');
        console.log(res)
        if (res.code == 200) {
          commentInitUi(res.data);
        }
      }
    });

    function commentInitUi(data){
      html = '';
      for (var i = data[0].comment.length-1; i >=0 ; i--) {
        var msg = JSON.parse(data[0].comment[i].msgContent).text.msg;
        html += '<div class="newComment-detail">'+
        '<div class="newComment-avatar">'+
        '  <img src="./images/timg.jpg">'+
        '</div>'+
        '<div class="newComment-imformation">'+
        '  <div class="newComment-name">'+
        '    <span class="newComment-name1">' +data[0].blog.userName+'</span>'+
        '    <span class="newComment-time">9分钟</span>'+
        '  </div>'+
        '  <span class="newComment-text">'+ msg +'</span>'+
        '</div>'+
      '</div>'
      }
      html+= '<div class="watchAll" id="watchAll">查看所有评论></div>'
      $('.newComment-detailContent').append(html);
    }
}

