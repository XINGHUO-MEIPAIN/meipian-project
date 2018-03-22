//避免重复绑定document
var documentFlag = true;
var documentFlag2 = true;
var documentFlag3 = true;
var documentFlag4 = true;
var documentTab2Flag = true;
var selfImId = '442000198204228833';
var pageIndex = GetQueryString("page");
var pageMainMsg = GetQueryString("msgId");
//当前点击头像的imid
var clickHeadImid;
//存放后退的相关参数
var jumpPageArr = [];
//判断是否停止加载
var isOverLoad = false;
//开发环境
//var postUrl = "http://20.95.15.171:8082/blogService/im";
//var postUrl = "http://172.29.3.43:8082/blogService/im";
var postUrl = "http://20.95.15.171:8083/mpService/im";
var contactServecesUrl = "http://20.95.15.171:8082/contactservice";
//拉取美篇的参数
var parmaData = {};
var currentPageNum = 1;
parmaData.backwords = true;
parmaData.lastBlogMsgid = 0;
parmaData.lastUpdateTime = "0";
parmaData.blogNum = 10;
parmaData.imId = selfImId;
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
var currentClickId = "tabflag1";
//获取带过来的参数
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function pageIndeLoad(data) {
  //开启上拉刷新  下拉加载更多
  function openUpAndDown() {
    topRefreshTab1();
    downReshTab2();
  }
  //定义内容区
  var currentTabBlock = $("#content_block_tab");
  function clearTabs() {
    $("#tab1").html("");
  }

  //热点
  function tab1Click(callBack) {
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
    clearTabs();
    whichTab = 2;
    isOpenBorside = 0;
    topRefreshTab2();
    $.pullToRefreshTrigger("#tab2Content");
  }

  //我的
  function tab3Click(callBack) {
    if (!!callBack) {
      callBack();
    }
    whichTab = 3;
    isOpenBorside = 0;
  }

  $('#tabflag1').click(function () {
    tab1Click();
  });
  $('#tabflag2').click(function () {
    tab2Click();
  })

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
          //是否有回调
          if (!!callBack) {
            callBack();
          }
        }
        if (res.data.length >= 10) {
          bottomloadMoreTab1();
        } else {
          return;
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
      commentUi(data);
     } 
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

 //关注下拉刷新
  function topRefreshTab2() {
    if(documentTab2Flag==true){
      $(document).on('refresh', '#tab2Content', function (e) {
        $(".content").scrollTop(0);
        parmaData.lastBlogMsgid = 0;
        parmaData.lastUpdateTime = "0";
        parmaData.blogNum = 10;
        downReshTab2(closeUpRefrsh);
  
        function closeUpRefrsh() {
          setTimeout(() => {
            isOverLoad = false;
            $.pullToRefreshDone('#tab2Content');
          }, 0);
        };
      });
      documentTab2Flag = false;
    }
  };

  function downReshTab2(callBack) {
    //开启加载指示器
    $.showIndicator();
    var paramDatad = {};
    paramDatad.randomNum = 10;
    $.ajax({
     url: contactServecesUrl+"/user/getRandomUsers",
      type: "POST",
      data: JSON.stringify(paramDatad),
      contentType: "application/json;charset=utf-8",
      success: function (res) {
        $.hideIndicator();
        if (res.code == 200) {
          //清空列表
          $(".contentBlock").html("");
          attentionInitUi(res.data);
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

  //滚动加载更多
  function bottomloadMoreTab1() {
    var loading = false;
    $(document).on('infinite',function () {
      if (!isNeedScroll)
        return;
      // 如果正在加载，则退出
      if (loading) return;
      // 设置flag
      loading = true;
      $('#noMore').hide();
      $('#loadMoreloding').show();
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
  };

  //关注的通讯录列表

   
  //轮播ui模板
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
    $('#cardContent').append(html);
  }


  //关注UI
  function attentionInitUi(data) {
    var html = "";
    html += '<div class="inform">' +
      '<span><img src="./images/touxiang.jpg" alt=""> 关注别人,第一时间得到他们的专栏更新</span>' +
      '</div>' +
      '<div class="personnelList">'
    for (var i = 0; i < data.length; i++) {
      html += '<div class="personnel">' +
        '<div class="headPortrait"> i' +
        // '<img src="./images/5.jpg" alt="">' +
        '</div>' +
        '<div class="personnelInfo">' +
        '<div class="personnelName">'+ data[i].userName +'</div>' +
        '<div class="profession">'+ data[i].rank +'</div>' +
        '</div>' +
        '<div class="attentionBtn">' +
        '<a href="#">关注</a>' +
        '</div>' +
        '</div>' +
        '</div>'
      }
    
    $('.contentBlock').append(html);
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

  //关注、取消关注
  $('#tab2Content').on('click', '.attentionBtn a', function (e) {
    if ($(this).hasClass('attention_active') == false) {
      var pramAjaxAttention = {};
        pramAjaxAttention.imId = selfImId,
        pramAjaxAttention.attentionImid = selfImId,
        pramAjaxAttention.from_type = 0,
        $.ajax({
          url: postUrl + "/attention",
          type: 'post',
          dataType: 'json',
          data: JSON.stringify(pramAjaxAttention),
          contentType: "application/json;charset=utf-8",
          success: function (res) {
            if (res.code == 200) {
              $(e.target).addClass('attention_active');
              $(e.target).html("已关注");
            }
          }
        });
    } else {
      $.confirm('确定取消关注?', function () {
          var pramAjaxAttentionNo = {};
          pramAjaxAttentionNo.imId = selfImId,
          pramAjaxAttentionNo.attentionImid = "100002",
          $.ajax({
            url: postUrl + "/cancelAttention",
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(pramAjaxAttentionNo),
            contentType: "application/json;charset=utf-8",
            success: function (res) {
              if (res.code == 200) {
                $(e.target).removeClass('attention_active');
                $(e.target).html("关注");
              }
            }
          });
      });
    }
  })

  //路由跳转
  $('#cardContent').on('click', '.infoNameMyPage', function (e) {
    e.stopImmediatePropagation();
    $.router.load('./myPage.html');
  });
  
  //将时间戳转为时间
  function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y+M+D+h+m+s;
    }

    

  //点击跳转到详情
  $(".company_main_cover").on("click", ".ul_content_active_content", function () {
    $.router.load('/details.html');
    currentClickMsgId = $(this).attr("msg");
    console.log(currentClickMsgId)
    $.ajax({
      url: postUrl + '/getBlogInfo',
      type: "POST",
      data: '{ "msgId":"' + currentClickMsgId + '","imId":"' + selfImId + '"}',
      contentType: "application/json;charset=utf-8",
      success: function (res) {
        console.log(res)
        if (res.code == 200) {
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
         // var timestampToTime = timestampToTime(res.data[0].blog.createTime);  
          var text = '<div class="content" id="detailContent">' +
            '<h3>' + JSON.parse(res.data[0].blog.msgContent).text.title + '</h3>' +
            '<div class="detailInfo">' +
            '<span class="time">'+ timestampToTime(1403058804) +'</span>' +
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
        }
        
        var text = text.replace(/<img src='..\/..\/images\/addImg.png'>/g,"<p></p>");
        $("#details .bar-nav").html(header);
        $("#detailContent").html(text);
      },
      error: function (msg) {
        $.toast("网络错误");
      }
    });
  });

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


 

//点击保存
var val;
var titleImage;
function titleSave() {
  val = $(".textarea").val();
  $.router.load('./active1.html');
  $(".title_text a").text(val)
}

//更换封面
function changeBg() {
  if (window.systemWeb != null && typeof (window.systemWeb) != "undefined") {
    window.systemWeb.uploadFile(2);
  } else {
    alert(typeof (window.systemWeb));
  }
}



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

  //从首页进入发表页面  初始化
  function report(){
     sessionStorage.clear();
     $.router.load("./add_new_item.html");
     $(".my_img").html("");
     $(".title_text a").text("点击设置标题");
     //从首页进入，来让发表界面初始化.
     sessionStorage.setItem("init","init")
  }