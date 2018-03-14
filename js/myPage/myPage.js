function myPageInfo() {
  //var postUrl = "http://20.95.15.171:8082/blogService/im";
  var postUrl = "http://172.29.3.43:8082/blogService/im";
  //var postUrl = "http://20.95.15.171:8083/mpService/im";
    var pramAjaxInfo = {};
    pramAjaxInfo.targetImId = "txz",
    pramAjaxInfo.imId = "wzw",
    $.ajax({
      url: postUrl + "/getUserInfo",
      type: 'post',
      dataType: 'json',
      data: JSON.stringify(pramAjaxInfo),
      contentType: "application/json;charset=utf-8",
      success: function (res) {
        if (res.code == 200) {
            $('#userName').html(res.data.user.userName);
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
  })
  //开启加载指示器
  $.showIndicator();
  $(document).on('refresh', '#content', function (e) {
    $.pullToRefreshDone('#content');
  });
}