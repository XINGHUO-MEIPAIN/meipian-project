function pageIndeLoad(data) {
  var selfImId = '442000198204228833';
  var pageIndex = GetQueryString("page");
  var pageMainMsg = GetQueryString("msgId");
  //当前点击头像的imid
  var clickHeadImid;
  //存放后退的相关参数
  var jumpPageArr = [];
  //判断是否停止加载
  var isOverLoad = false;
  //var postUrl = "http://20.95.15.171:8082/blogService/im";
 // var postUrl = "http://172.29.3.43:8082/blogService/im";
 var postUrl = "http://20.95.15.171:8083/mpService/im";
  //拉取美篇的参数
  var parmaData = {};
  var currentPageNum = 1;
  parmaData.backwords = true;
  parmaData.lastBlogMsgid = 0;
  parmaData.lastUpdateTime = "0";
  parmaData.blogNum = 10;
  parmaData.imId = selfImId;
  //当前请求postURL
  // var currentPostUrl = "/getBlog";
  //触摸是否开始
  var isStop = false;
  //保存是在那个tab页跳转到其他页面，回到主页时恢复那个页面
  var whichTab = 0;
  //是否从主页调回来不刷新
  var isResultPage = true;
  //是否在需要滑动的开关，
  var isNeedScroll = true;
  //提示的开关
  var messPromptFlag = 0;
  var tabflag = 1;
  var isOpenBorside = 0;
  //当前点击tab的id
  var currentClickId = "tabflag1"
  //获取带过来的参数
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  //开启上拉刷新  下拉加载更多
  function openUpAndDown() {
    topRefreshTab1();
    bottomloadMoreTab1();
  }
  
  //定义内容区
  var currentTabBlock = $("#content_block_tab");
  
  function clearTabs() {
    $("#tab1").html("");
    $("#tab4").html("");
    $("#tab5").html("");
    $("#tab6").html("");
  }
  
  //热点
  function tab1Click(callBack) {
    console.log('点击tab1')
    if (!!callBack) {
      callBack();
    }
    clearTabs();
    whichTab = 1;
    isOpenBorside = 0;
    initParam();
    currentPostUrl = "/getBlog";
    currentTabBlock.appendTo($("#tab1"));
    $.pullToRefreshTrigger($("#tab1Content"));
  }
  
  //关注
  function tab2Click(callBack) {
    if (!!callBack) {
      callBack();
    }
    whichTab = 2;
    isOpenBorside = 0;
  }
  
  //我的
  function tab3Click(callBack) {
    if (!!callBack) {
      callBack();
    }
    whichTab = 3;
    isOpenBorside = 0;
  }
  
  //初始化请求参数
  function initParam() {
    parmaData = {}
    differentParam = false;
    parmaData.backwords = true;
    parmaData.lastBlogMsgid = 0;
    parmaData.lastUpdateTime = "0";
    parmaData.blogNum = 10;
    parmaData.imId = selfImId;
  }
  
  //获取登录信息
  var pramAjaxInfo = {};
  pramAjaxInfo.targetImId = selfImId,
    pramAjaxInfo.imId = "442000198204228833",
    $.ajax({
      url: postUrl + "/getUserInfo",
      type: 'post',
      dataType: 'json',
      data: JSON.stringify(pramAjaxInfo),
      contentType: "application/json;charset=utf-8",
      success: function (res) {
        if (res.code == 200) {
          $('#myInfoName').html(res.data.user.userName);
          $('#myloginState').html("已登录")
        }
      }
    });
  
  //下拉刷新的ajax
  function downResh(callBack) {
    //开启加载指示器
    $.showIndicator();
    $.ajax({
      url: postUrl + currentPostUrl,
      type: "POST",
      data: JSON.stringify(parmaData),
      contentType: "application/json;charset=utf-8",
      success: function (res) {
        $.hideIndicator();
        if (res.code == 200) {
          //清空列表
          $("#cardContent").html("");
          dataHandlerData(res.data);
          slideHot();
          //获取最后的数据填充参数以便回调
          // getLastData(res.data);
          //是否有回调
          if (!!callBack) {
            callBack();
          }
        }
      },
      error: function (msg) {
        $.toast("网络错误");
      }
    });
  }
  //重新拼接好参数
  function getLastData(datas) {
    if (datas.length == 0) {
      return;
    }
    var lastData = datas[datas.length - 1].blog;
    parmaData.lastBlogMsgid = lastData.blogMsgId;
    parmaData.lastUpdateTime = lastData.updateTime;
  }
  //数据处理
  function dataHandlerData(data) {
    //判断是否有数据，无数据就显示没有更多
    if (data.length == 0) {
      isOverLoad = true;
      $("#noMore").show();
      $("#loadMoreloding").hide();
      return;
    }
    //当数据小于十个的时候不显示加载更多
    if (data.length < 10) {
      $("#loadMoreloding").hide();
      $("#noMore").show();
      $.detachInfiniteScroll($('#tab1Content'));
    }
    if (currentClickId == "tabflag1") {
      initLunboUI(data);
    } else {
      //topicUiComment(data);
    }
    commentUi(data);
  }
  
  //滚动数据处理
  function dataHandlerDataBottom(data) {
    //判断是否有数据，无数据就显示没有更多
    if (data.length == 0) {
      isOverLoad = true;
      $("#noMore").show();
      $("#loadMoreloding").hide();
      return;
    }
    //当数据小于十个的时候不显示加载更多
    if (data.length < 10) {
      $("#loadMoreloding").hide();
      $("#noMore").show();
      $.detachInfiniteScroll($('#tab1Content'));
    }
    commentUi(data);
  }
  
  function getBootomAjax(callBack) {
    //开启加载指示器
    $.showIndicator();
    $.ajax({
      url: postUrl + currentPostUrl,
      type: "POST",
      data: JSON.stringify(parmaData),
      contentType: "application/json;charset=utf-8",
      success: function (res) {
        $.hideIndicator();
        if (res.code == 200) {
          isOverLoad = true;
          $("#noMore").show();
          $("#loadMoreloding").hide();
          dataHandlerDataBottom(res.data);
          //获取最后的数据填充参数以便回调
          getLastData(res.data);
          //是否有回调
          if (!!callBack) {
            callBack();
          }
        }
      },
      error: function (msg) {
        $.toast("网络请求超时！！！")
      }
    });
  }
  
  //下拉刷新
  function topRefreshTab1() {
    // 添加'refresh'监听器
    $(document).on('refresh', '#tab1Content', function (e) {
      $(".content").scrollTop(0);
      parmaData.lastBlogMsgid = 0;
      parmaData.lastUpdateTime = "0";
      parmaData.blogNum = 10;
      downResh(closeUpRefrsh);
  
      function closeUpRefrsh() {
        setTimeout(() => {
          isOverLoad = false;
          $.pullToRefreshDone('#tab1Content');
          $.attachInfiniteScroll($('#tab1Content'));
        }, 0);
      };
    });
  }
  var loadMore = false;
  var addMoreAjAX = false;
  initLoadMore();
  function initLoadMore() {
    $(document).on("infinite", '#tab1Content', function () {
      console.log('滚动刷新')
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
      getBootomAjax(loadMoreCallBack);
    });
  }

  //滚动加载更多
  function bottomloadMoreTab1() {
    var loading = false;
    $(document).on('infinite','#tab1Content', function () {
      console.log('滚动加载更多')
      if (!isNeedScroll)
        return;
      // 如果正在加载，则退出
      if (loading) return;
      // 设置flag
      loading = true;
      $('#noMore').hide();
      $('#loadMoreloding').show();
      //模拟1s的加载过程
      getBootomAjax(stopLoad);
      function stopLoad() {
        // 重置加载flag
        loading = false;
        if (isOverLoad) {
          isOverLoad = false;
          return;
        }
        //容器发生改变,如果是js滚动，需要刷新滚动
        $.refreshScroller();
      };
    });
  }
  
  //轮播模板渲染
  function initLunboUI(data) {
    var html = '';
    html += '<div class="swiper-container">' +
      '<div class="swiper-wrapper">' +
      '<div class="swiper-slide" >' +
      '<img src="./images/timg.jpg" alt="" style="width:100%; height:100px">' +
      '</div>' +
      '<div class="swiper-slide" >' +
      '<img src="./images/timg1.jpg" alt="" style="width:100%; height:100px">' +
      '</div>' +
      '<div class="swiper-slide" >' +
      '<img src="./images/timg2.jpg" alt="" style="width:100%; height:100px">' +
      '</div>' +
      '</div>' +
      '<div class="swiper-pagination"></div>' +
      '</div>' +
      '</div>'
    $('#cardContent').append(html);
  }
  
  //公共ui模板
  function commentUi(data) {

    var html = "";
    for (var i = 0; i < data.length; i++) {
      //模板渲染
      html += '<li class="ul_content_active_content" msg="'+data[i].blog.msgId+'">' +
        '<p class="infoNameMyPage"><img src="./images/1.jpg"><span>云淡风轻</span></p>' +
        '<div class="active_title">'+JSON.parse(data[i].blog.msgContent).text.title+'</div>' +
        '<div class="active_article">'+JSON.parse(data[i].blog.msgContent).text.msg+'</div>' +
        '<div class="active_img">' +
        '<img src="'+JSON.parse(data[i].blog.msgContent).picture[0].pictureUrl+'">' +
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
    $('#cardContent').append(html);
  }
  
  //滚动下拉显示回到顶部按钮
  $('.content').scroll(function () {
    scrollHeight = $('.content').scrollTop();
    if (scrollHeight > 200) {
      $('.topBack').fadeIn();
    } else {
      $('.topBack').fadeOut();
    }
  });
  //点击按钮回到顶部
  $('#topBack').tap(function () {
    $('.content').scrollTop(0)
  });
  
  //获取当前点击tab的当前id
  $('#indexTab').on('tap', 'li', function (e) {
    currentClickId = $(e.target).attr('id');
    console.log(currentClickId);
  });

  //热点页面轮播图
  function slideHot() {
    var mySwiper = new Swiper('.swiper-container', {
      autoplay: 2000,
      pagination: {
        el: '.swiper-pagination',
      },
      loop: true,
      observer: true,
      observerParents: true,
      autoplayDisableOnInteraction: false,
      pagination: '.swiper-pagination',
      clickable: true,
      clickableClass: 'my-pagination-clickable',
    });
  }
  
  //调用图片
  function getPhoto() {
    if (window.systemWeb != null && typeof (window.systemWeb) != "undefined") {
      window.systemWeb.uploadFile(2);
    } else {
      alert(typeof (window.systemWeb));
    }
  }
  
  //获取本地图片的地址
  // function uploadFileResult(objs) {
  //   if (objs == null || typeof (objs) == "undefined" || objs.length == 0) {} else {
  //     if (objs[0] == null || objs[0] == 'undefined' || objs[0] == '' || objs[0].fileBase64 == null || objs[0].fileBase64 == 'undefined') {} else {
  //       alert(objs)
  //     }
  //   }
  // }
  
  //关注
  $(document).ready(function(){
    var onOff=true;
    var div=$(".attentionBtn a");
    console.log(div.onOff)
    div.click(function(){  
      if (div.onOff) {
       $(this).html("关注");
       $(this).removeClass('attention_active');
       div.onOff = false;
      } else {
        $(this).addClass('attention_active');
        $(this).html("已关注");
       div.onOff = true;
      }
     });
    });

  //路由跳转
  $('#cardContent').on('click', '.infoNameMyPage', function () {
    console.log(this)
    $.router.load('./myPage.html');
  })
  
  //点击专题列表到专题详情
  $('#cardContent').on('tap', '.specialTopicLi', function () {
    console.log('8888')
    $.router.load('/topicDetails.html');
  });
  
  //点击跳转到详情
  
$(".company_main_cover").on("tap",".ul_content_active_content",function(){
   $.router.load('/details.html');
   var msg = $(this).attr("msg");
   $.ajax({
      url: postUrl + '/getBlogInfo',
      type: "POST",
      data: '{ "msgId":"'+msg+'","imId":"'+selfImId+'"}',
      contentType: "application/json;charset=utf-8",
      success: function (res) {  
        if (res.code == 200) {
          //alert(JSON.parse(res.data[0].blog.msgContent).text.title)
        var text = '<header class="bar bar-nav">'+
            '<a class="button button-link button-nav pull-left getBackToPage" href="javascript:history.go(-1);">'+
              '<span style="padding-left: 10px">'+
                '<img src="./images/leftBack.png" alt="" style="width:10px;margin-top:14px;">'+
              '</span>'+
            '</a>'+
            '<a href="./myPage.html" class="button button-link button-nav name-center" style="width: 30%;margin-left: 25%;">'+
              '<img src="./images/timg.jpg">'+
              '<span class="button-name">云淡风轻</span>'+
            '</a>'+
            '<span class="guanzhu">关注</span>'+
          '</header>'+
          '<div class="content" id="detailContent">'+
            '<h3>'+JSON.parse(res.data[0].blog.msgContent).text.title+'</h3>'+
            '<div class="detailInfo">'+
              '<span class="time">2018.03.27</span>'+
              '<a href="#">云淡风轻</a>'+
              '<span class="readNum">阅读4524</span>'+
            '</div>'+
            '<div class="picture">'+
              '<img src="'+JSON.parse(res.data[0].blog.msgContent).picture[0].pictureUrl+'" alt="" style="width:100%;height:170px;">'+
            '</div>'+
            '<div class="article">'+
              '<p>'+JSON.parse(res.data[0].blog.msgContent).text.msg+'</p>'+
            '</div>'
              }
             // $(".data").html(text);
            },
            error: function (msg) {
              $.toast("网络错误");
            }
          });
});

  $('#tabflag1').click(function(){
    tab1Click();
  })
  
  if (!isResultPage) {
    return;
  }
  //再次回到主页的方法
  if (data != 0) {
    switch (whichTab) {
      case 1:
        tab1Click();
        break;
      case 2:
        tab2Click();
        break;
      case 3:
        tab3Click();
        break;
      default:
        break;
    }
    $.pullToRefreshTrigger("#tab1Content");
    return;
  }
  $("#cardContent").html("");
  //初始化方法
  tab1Click(openUpAndDown);
}

//新增的方法测试
function initTime(){
  
}

//点击保存
var val;
var titleImage;
function titleSave(){
   val = $(".textarea").val();
   $.router.load('./active1.html');
   $(".title_text a").text(val)
}


//更换封面
function changeBg(){
  if (window.systemWeb != null && typeof(window.systemWeb) != "undefined") {
          window.systemWeb.uploadFile(2);
      } else {
          alert(typeof(window.systemWeb));
      }
}



function coverComplete(){
   //sessionStorage.setItem("titleImage",titleImage);
   /*var canvasImage = se*/
  
   $.router.load("./active1.html");
};

