function myPageInfo() {
  //var postUrl = "http://20.95.15.171:8082/blogService/im";
  //var postUrl = "http://172.29.3.43:8082/blogService/im";
  //var postUrl = "http://20.95.15.171:8083/mpService/im";
  //开启加载指示器
  $.showIndicator();
  $(document).on('refresh', '#content', function (e) {
    $.pullToRefreshDone('#content');
  });
  //获取个人信息
  var pramAjaxInfo = {};
  pramAjaxInfo.targetImId = "442000198204228833",
  pramAjaxInfo.imId = selfImId,
  $.ajax({
    url: postUrl + "/getUserInfo",
    type: 'post',
    dataType: 'json',
    data: JSON.stringify(pramAjaxInfo),
    contentType: "application/json;charset=utf-8",
    success: function (res) {
      if (res.code == 200) {
        $('#userName').html(res.data.user.userName);
        $('.attention .attentionNum').html(res.data.blogSize);
        $('.fass .fassNum').html(res.data.attentionList);
      }
    }
  });

  //获取个人相关动态
  var pramAjaxDy = {};
  pramAjaxDy.imId = selfImId,
  pramAjaxDy.backwords = true;
  pramAjaxDy.lastBlogMsgid = 0;
  pramAjaxDy.lastUpdateTime = "0";
  pramAjaxDy.blogNum = 10;
  $.ajax({
    url: postUrl + "/getBlog",
    type: 'post',
    dataType: 'json',
    data: JSON.stringify(pramAjaxDy),
    contentType: "application/json;charset=utf-8",
    success: function (res) {
      if (res.code == 200) {
        myPageUi(res.data); 
      }
    }
  });
  $('.content').scroll(function () {
    var scrollHeight = $('.content').scrollTop();
    if (scrollHeight > 0 && scrollHeight <= 100) {
      $('.topbarShowOrHide').css('opacity', 0.3)
    } else if (scrollHeight > 100) {
      $('.topbarShowOrHide').css('opacity', 1)
    } else {
      $('.topbarShowOrHide').css('opacity', 0);
    }
  });

  //点击美篇动态跳转至详情
  $("#myPageContent").on("click", ".ul_content_active_content", function () {
    $.router.load('/details.html');
    var msg = $(this).attr("msg");
  });

   //模板
   function myPageUi(data) {
    var html = "";
    for (var i = 0; i < data.length; i++) {
      if(data[i].blog != null){
      html += '<li class="ul_content_active_content" msg="' + data[i].blog.msgId + '">' +
        '<p class="infoNameMyPage"><img src="./images/1.jpg"><span>云淡风轻</span></p>' +
        '<div class="active_title">' + JSON.parse(data[i].blog.msgContent).text.title + '</div>' +
        // '<div class="active_article">' + JSON.parse(data[i].blog.msgContent).text.msg + '</div>' +
        '<div class="active_img">' +
        '<img src="' + JSON.parse(data[i].blog.msgContent).picture[0].pictureUrl + '">' +
        '</div>' +
        '<div class="good">' +
        '<div class="good_people">' +
        '<span class="clearfix good_people_span">' +
        '<img src="./images/21.jpg">' +
        '<img src="./images/22.jpg">' +
        '<img src="./images/timg1.jpg">' +
        '<img src="./images/timg.jpg">' +
        '<em><img src="./images/btn_icon_44.png">137</em>' +
        '</span>' +
        '<div class="good_people_right">' +
        '<span><img src="./images/btn_icon_45.png">38</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</li>'
    }
  }
    $('#myPageContent').append(html);
  }

}