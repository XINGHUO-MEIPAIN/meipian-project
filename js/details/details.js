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
      for (var i = 0; i < data[0].comment.length ; i++) {
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
    
      html+= '<div class="watchAll" id="watchAll" onclick="watchAll()">查看所有评论></div>'
      $('.newComment-detailContent').append(html);
    }
};
  
  //将时间戳转为时间
  Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


function renderDetailHtml(res){
  var header = '<a class="button button-link button-nav pull-left getBackToPage" href="javascript:history.go(-1);">'+
            '<span style="padding-left: 10px">'+
              '<img src="./images/leftBack.png" alt="" style="width:10px;margin-top:14px;">'+
            '</span>'+
          '</a>'+
          '<a href="./myPage.html" class="button button-link button-nav name-center" style="width: 30%;margin-left: 25%;">'+
            '<img src="./images/timg.jpg">'+
            '<span class="button-name">'+ res.data[0].blog.userName +'</span>'+
          '</a>'+
          '<span class="guanzhu">关注</span>'
          
          var text = '<div class="content" id="detailContent">' +
            '<h3>' + JSON.parse(res.data[0].blog.msgContent).text.title + '</h3>' +
            '<div class="detailInfo">' +
            '<span class="time">'+ (new Date(Number(res.data[0].blog.createTime))).format('yyyy-MM-dd hh:mm:ss') +'</span>' +
            '<a href="#">'+ res.data[0].blog.userName +'</a>' +
            //'<span class="readNum">阅读4524</span>' +
            '</div>' +
            '<div class="picture">' +
            '<img src="' + JSON.parse(res.data[0].blog.msgContent).picture[0].pictureUrl + '" alt="" style="width:100%;height:170px;">' +
            '</div>' +
            '<div class="article">' +
            '<p>' + JSON.parse(res.data[0].blog.msgContent).text.msg + '</p>' +
            '  </div>'+
            '  </div>'+
            '</div>'
             var text = text.replace(/<img src='..\/..\/images\/addImg.png'>/g,"<p></p>");
             $("#details .bar-nav").html(header);
             $("#detailContent").html(text);
             $.hideIndicator();
}




function watchAll(){
   $.router.load("./commentDetails.html");
}