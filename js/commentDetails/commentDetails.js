function pageCommentDetails() {
  //var postUrl = "http://20.95.15.171:8082/blogService/im";
  var postUrl = "http://172.29.3.43:8082/blogService/im";
  var loadMore = false;
  var addMoreAjAX = false;
  //初始化参数
  var paramaAjaxD = {};
  paramaAjaxD.backwords = true;
  paramaAjaxD.lastId = 0;
  paramaAjaxD.lastUpdateTime = 0;
  paramaAjaxD.imId = 'lzy';
  paramaAjaxD.pageNum = 10;
  $('#uiContentList').html("");
  $('#noMore').hide();
  initDownResh();
  initLoadMore();
  //进入自动触发一次
  $.pullToRefreshTrigger("#commentContent");
  //下拉刷新
  function initDownResh() {
    $(document).on("refresh", "#commentContent", function () {
      // 模拟1s的加载过程
      function callBackFunc() {
        $.pullToRefreshDone("#commentContent"); 
        $.attachInfiniteScroll($('#commentContent'));
      }
      addMoreAjAX = false;
      paramaAjaxD.lastId = 0;
      paramaAjaxD.lastUpdateTime = 0;
      render(callBackFunc);
    });

  }

  function initLoadMore() {
    $(document).on("infinite", "#commentContent", function () {
      // 如果正在加载，则退出
      if (loadMore == true) {
        return;
      }
      if (addMoreAjAX) {
        return;
      }
      loadMore = true;

      function loadMoreCallBack() {
        loadMore = false;
      }
      loadMoreAjax(loadMoreCallBack);
    });
  }
  //加载更多
  function loadMoreAjax(callBackFunc) {
    $.showIndicator();
    $('#noMore').hide();
    $('.infinite-scroll-preloader').show();
    $.ajax({
      url: postUrl + "/getDeptMsgList",
      type: "post",
      dataType: "json",
      data: JSON.stringify(paramaAjaxD),
      contentType: "application/json;charset=utf-8",
      success: function (res) {
        var data = res.data;
        if (data.length != 0) {
          //最后一条的时间和id;
          paramaAjaxD.lastId = data[data.length - 1].msgId;
          paramaAjaxD.lastUpdateTime = data[data.length - 1].updateTime;
        } else {
          $('.infinite-scroll-preloader').hide();
        }
        if (data.length < 10) {
          addMoreAjAX = true;
          $('.infinite-scroll-preloader').hide();
          $('#noMore').show();
        }
        if (res.code == 200 && res.data.length != 0) {
          if (!!callBackFunc) {
            callBackFunc();
          }
          dataHandler(data);
        }
        $.hideIndicator();
      }
    });
  }

  function render(callBackFunc) {
    $('.infinite-scroll-preloader').hide();
    paramaAjaxD.lastId = 0;
    paramaAjaxD.lastUpdateTime = 0;
    //开启加载指示器
    $.showIndicator();
    $.ajax({
      url: postUrl + "/getDeptMsgList",
      type: "post",
      dataType: "json",
      data: JSON.stringify(paramaAjaxD),
      contentType: "application/json;charset=utf-8",
      success: function (res) {
        $.hideIndicator();
         $("#uiContentList").html("");
        if (res.code == 200 && res.data.length != 0) {
          if (!!callBackFunc) {
            callBackFunc();
          }
          if (res.data.length < 10) {
            addMoreAjAX = true;
            $('.infinite-scroll-preloader').hide();
          }
          paramaAjaxD.lastId = res.data[res.data.length - 1].msgId;
          paramaAjaxD.lastUpdateTime = res.data[res.data.length - 1].updateTime;
          dataHandler(res.data);
        } else {
          $("#uiContentList").append("<p>暂时没有消息</p>");
        }
        $('#noMore').show();
      }
    });
  }

  //处理数据到UI
  function dataHandler(data) {
    for (var i = 0; i < data.length; i++) {
      //模板渲染
      uiItemList(data, i);
    }
  }
  //ui模板
  function uiItemList(data, i) {
    var node = '<div class="commentList">';
    node += ' <div class="infoImage">';
    node += '   <img src="./images/timg.jpg" alt="">';
    node += ' </div>';
    node += ' <div class="infoContent">';
    node += '   <div class="infoName">';
    node += '     <span class="userName">晓歌</span>';
    node += '     <span class="praise">';
    node += '       <img src="./images/pic1.png" alt="" class="praiseImg"> <span class="praiseNum">0</span>';
    node += '     </span>';
    node += '   </div>';
    node += '   <div class="infoContentText">';
    node += '     人生如减法,生活要简单.人生如减法,生活要简单. 人生如减法,生活要简单.人生如减法,生活要简单. 人生如减法,生活要简单.';
    node += '   </div>';
    node += '<div class="infoContentReply">';
    node += '<div class="replyList">';
    node += '  <span class="replyText"><span class="infoNameReply">冰心:</span>主要是赶巧.安写幽默小段子多了,在这写点评换换口味.主要是赶巧.安写幽默小段子多了,在这写          点评换换口味主要是赶巧.安写幽默小段子多了';
    node += '</span>';
    node += '</div>';
    node += ' <div class="replyCount">共10条回复></div>';
    node += '</div>';
    node += '   <div class="infoTime">';
    node += '     7分钟前';
    node += '   </div>';
    node += ' </div>';
    node += ' </div>';
    $("#uiContentList").append(node);
  }

  function uiContent(data) {
    var node = '<div class="commentList">';
    node += ' <div class="infoImage">';
    node += '   <img src="./images/timg.jpg" alt="">';
    node += ' </div>';
    node += ' <div class="infoContent">';
    node += '   <div class="infoName">';
    node += '     <span class="userName">晓歌</span>';
    node += '     <span class="praise">';
    node += '       <img src="./images/pic1.png" alt="" class="praiseImg"> <span class="praiseNum">0</span>';
    node += '     </span>';
    node += '   </div>';
    node += '   <div class="infoContentText">';
    node += '     哈哈哈哈哈';
    node += '   </div>';
    node += '   <div class="infoTime">';
    node += '     刚刚';
    node += '   </div>';
    node += ' </div>';
    node += ' </div>';
    $("#uiContentList").prepend(node);
  }

  //点赞
  $('#uiContentList').on('click', '.praiseImg', function (e) {
    var $thumbsUp = $(this).siblings();
    $thumbsUp.addClass('thumb_active');
    var goodCount = $thumbsUp.html();
    goodCount++;
    $thumbsUp.html(goodCount);
    var pramAjax = {};
    pramAjax.blogAuthorImid = "100001";
    pramAjax.blogMsgid = "140922775048028160";
    pramAjax.imId = "100003";
    //备注:此处有bug,
    $.ajax({
      url: postUrl + "/thumbsUp",
      type: 'post',
      dataType: 'json',
      data: JSON.stringify(pramAjax),
      contentType: "application/json;charset=utf-8",
      success: function (res) {
        console.log(res);
      }
    });
  });

  //取消点赞
  // $('#uiContentList').on('click', '.praiseImg', function (e) {
  //   var $thumbsUp = $(this).siblings();
  //   $thumbsUp.removeClass('thumb_active');
  //   var goodCount = $thumbsUp.html();
  //   goodCount--;
  //   $thumbsUp.html(goodCount);
  //   var pramRemmoveAjax = {};
  //   pramRemmoveAjax.msgId = "141156522875944960";
  //   pramRemmoveAjax.blogMsgid = "140922775048028160";
  //   pramRemmoveAjax.imId = "100003";
  //   $.ajax({
  //     url: postUrl + "/cancelThumbsUp",
  //     type: 'post',
  //     dataType: 'json',
  //     data: JSON.stringify(pramAjax),
  //     contentType: "application/json;charset=utf-8",
  //     success: function (res) {
  //       console.log(res);
  //     }
  //   });
  // });


 

  //发送评论
  $('.sendConmment').click(function () {
    var commentText = $.trim($("#commentText").val());
    if (commentText == "") {
      $.toast("请输入评论内容");
      $('#commentText').val("").focus();
      return;
    }
    var pramAjaxSend = {};
    pramAjaxSend.msgContent = {
        "text": {
          "msg": commentText
        }
      },
      pramAjaxSend.blogMsgid = "140921150598283264",
      pramAjaxSend.blogAuthorImid = "100001",
      pramAjaxSend.pimid = "100001",
      pramAjaxSend.pmsgid = "140921150598283264",
      pramAjaxSend.imid = "txz",
      $.ajax({
        url: postUrl + "/makeComments",
        type: 'post',
        dataType: 'json',
        data: JSON.stringify(pramAjaxSend),
        contentType: "application/json;charset=utf-8",
        success: function (res) {
          console.log(res);
          if (res.code == 200) {
            uiContent(res.data);
            $.toast("评论成功");
            $('#commentText').val("");
            //$('#commentText').val("").focus();
            $('.content').scrollTop(0)
          }
        }
      });
  })

  //点击评论跳转到评论详情
  $('#uiContentList').on('click','.infoContentText',function(){
    $.router.load('./allComments.html');
  })
  $('#uiContentList').on('click', '.infoNameReply', function () {
    $.router.load('./myPage.html');
  });
  $('#uiContentList').on('click', '.infoImage', function () {
    $.router.load('./myPage.html');
  });
  $('#uiContentList').on('click', '.userName', function () {
    $.router.load('./myPage.html');
  });

  //时间戳
  function getDateDiff(dateTimeStamp) {
    //解析的时间段
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var result; //最终结果
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
      return "时间错误";
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC >= 1) {
      result = parseInt(monthC) + "个月前";
    } else if (weekC >= 1) {
      result = parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
      result = parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
      result = parseInt(hourC) + "个小时前";
    } else if (minC >= 1) {
      result = parseInt(minC) + "分钟前";
    } else
      result = "刚刚";
    return result;
  }
}