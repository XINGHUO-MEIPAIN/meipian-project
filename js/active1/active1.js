
function active1(){
   
}

var text;
var localImage;

var modelImg = "../../images/addImg.png";
var modeltext = '<span>点击添加文字</span>';

//创建添加图片文字框
var addNewChoose = '<div class="imgContent">'+
                       '<img src="../../images/write.png" onclick="addWrite(this)">'+
                       '<img src="../../images/addImg.png" style="position: relative;top: -0.15rem;width: 1.1rem;" onclick="addPic(this)">'+
                    '</div>';

//添加模板
var textModel ='<div class="ModelContent imgSrc">'+
                  '<div class="Model">'+
                       '<div class="ModelClose"><span onclick="ModelClose(this)">×</span></div>'+
                     '<div class="textModel">'+
                         '<div class="textImage" onclick="adjustPic(this)">'+
                              '<img src="'+ modelImg +'">'+
                          '</div>'+
                          '<div class="writeContent" onclick="reWrite(this)">'+
                             modeltext +
                          '</div>'+
                     '</div>'+
                 '</div>'+
                 '<div class="add_1">'+
                       '<p class="add" onclick="addNew(this)">+</p><div class="imgContent" style="display: none;"><img src="../../images/write.png" onclick="addWrite(this)"><img src="../../images/image.png" onclick="addPic(this)"></div>'+
                       '<div class="add_type clearfix">'+
                          '<div class="add_type_div"><a href="./add_new_item.html">文字</a></div>'+
                          '<div class="add_type_div add_type_img" onclick="openPhotoAlbum()">图片</div>'+
                       '</div>'+
                  '</div>'+
                '</div>'

var textIndex; //文字的索引
var imgIndex; //文章图片的索引
var isAdjust = 0;//用来判断是从点击修改文字中过来还是添加过来，修改文字 1 ，添加 0
var isImage = 0 ;//用来判断是从点击修改图片中过来还是添加过来，修改文字 1 ，添加 0

//编辑文字完成

function newCom(){
   text = $(".textarea").val();
   if(text.length > 5000){
   	  $.alert("字数不能超过5000字");
   }else{
      $.router.load("./active1.html");
      if(sessionStorage.getItem("init")){
         $(".ModelContent").remove();
         $(".title_text a").text("点击设置标题");
         $(".my_img").html("");
      }
      $(".imgContent").hide();
      if(textIndex == undefined){
        setTimeout(function(){
           $(".add_1").after(textModel);
           $(".writeContent").eq(0).html(text); 
        },1000);
        return;
      };
      //第一个添加文字
      if(textIndex == -1){
          $(".ModelContent").eq(0).before(textModel);
          $(".writeContent").eq(0).html(text);
          return;
      };
      //第一个以后的添加文字
      if(isAdjust == 0){
         $(".ModelContent").eq(textIndex-1).after(textModel);
         $(".writeContent").eq(textIndex).html(text);
      }else{
         $(".writeContent").eq(textIndex).html(text); 
      };
   };
};


//删除模板
function ModelClose(this_){
    if($(".ModelContent").length == 1){
      $.toast("不能清空模板");
      return;
    }
    $(".add").show();
    $(this_).parents(".ModelContent").remove();
}

function addNew(this_){
    var div = '<p class="add" onclick="addNew(this)">+</p>';
    $(this_).parent(".add_1").html(div + addNewChoose);
    sessionStorage.removeItem("init");

};
//跳到标题页面
function titlePage(){
    $.router.load("./title.html");
    sessionStorage.removeItem("init");
}
//修改文字
function reWrite(this_){
   isAdjust = 1;
   var i = $(this_).parents(".ModelContent").index() - 1;
   textIndex = i;
   $.router.load("./add_new_item.html");
   sessionStorage.removeItem("init");
};


//添加内容
function addWrite(this_){
   isAdjust = 0;
   var i = $(this_).parents(".ModelContent").index();
   textIndex = i;
   $.router.load("./add_new_item.html");
   sessionStorage.removeItem("init");
};

//修改图片
function adjustPic(this_){
   isImage = 1;
   var i = $(this_).parents(".ModelContent").index();
   imgIndex = i;
   if (window.systemWeb != null && typeof(window.systemWeb) != "undefined") {
          window.systemWeb.uploadFile(2);
      } else {
          alert(typeof(window.systemWeb));
     };
   sessionStorage.removeItem("init");
};

//添加
function addPic(this_){
   sessionStorage.removeItem("init");
   isImage = 0;
   var i = $(this_).parents(".ModelContent").index();
   imgIndex = i;
   if (window.systemWeb != null && typeof(window.systemWeb) != "undefined") {
          window.systemWeb.uploadFile(2);
      } else {
          alert(typeof(window.systemWeb));
      };
}



//点击完成，发送ajax
function activeComplete(){   

      if($(".my_img img").length == 0 || $(".title_text").text() == '点击设置标题'){
          $.toast("请设置标题和封面");
          return;
      }    
      //替换文章的图片地址
      var textArr = [];
      for(var i = 0 ; i < $(".ModelContent").length ; i++){
            textArr.push({"filepath":$(".ModelContent").eq(i).find(".textImage img").attr("data")});    
      };
      
      var textArr = JSON.stringify(textArr);  
      window.android.callUploadFile(textArr,'textArr');
      //结束


      $.showPreloader('发表中');
      var imgBase64Data  = $(".my_img img").attr("src");
      var pos = imgBase64Data.indexOf("4")+2;
      var base64 = imgBase64Data.substring(pos, imgBase64Data.length - pos);//去掉Base64:开头的标识字符

      $.ajax({
        url:"/changeBase64",
        type: "POST",
        data: {
          base64:base64,
          imid:selfImId
        },
        success: function (res) {
              $(".my_img").find("img").attr("src",res.data)
        },
        error: function (msg) {
          $.toast("上传失败，请重新上传");
          $.hidePreloader();
        }
     }); 
  

//对图片是否替换成http地址进行处理
   function replaceImg(){
      if($(".my_img").find("img").attr("src").indexOf("http://") != -1){
          if($(".imgSrc").length != 0 ){
              if($(".imgSrc").eq(0).find(".textImage img").attr("src").indexOf("http://") != -1){    
                  thsrc();
               }else{
                  setTimeout(function(){   
                       replaceImg();
                    })
               }
            }else{
               thsrc();
         }   
     }else{
        setTimeout(function(){        
           replaceImg();
        })
     }
   }
  replaceImg();

  function thsrc(){
      //文章内容
      var artContent = "";
      for(var i = 0 ; i < $(".ModelContent").length ; i++){
           var textContent = ($(".ModelContent").eq(i).find(".writeContent").text() =='点击添加文字' || $(".ModelContent").eq(i).find(".writeContent").text() =='') ? '' : $(".ModelContent").eq(i).find(".writeContent").text();
           artContent += "<img src='"+$(".ModelContent").eq(i).find(".textImage img").attr("src")+"'>" ;
           artContent += textContent;
      }
      

     var msgStatusFlag = 'aa';
     var picturePath = "[";
         picturePath += '{pictureUrl:"'+ $(".my_img").find("img").attr("src") +'",videoUrl:"",picWidth:200,picHight:300,"type":1}';
         picturePath +="]";

    var Data = '{'; 
        Data += '"msgContent":{'; 
        Data += '"blogHtml":"",'; 
        Data += '"picture":'+ picturePath +',';
        Data += '"text":{';
        Data += '"title":"'+ $(".title_text").text() +'",';
        Data += '"topicName":"12",';
        Data += '"topicId":"144083166192205824",';
        Data += '"msg":"'+ artContent +'"';
        Data += '}},';      
        Data += '"imId": "442000198204228833",';
        Data += '}';
   
       $.ajax({
        url:"http://20.95.15.171:8083/mpService/im/writeBlog",
        type: "POST",
        data: Data,
        contentType: "application/json;charset=utf-8",
        success: function (res) {
            $.hidePreloader();
            $.router.load("./index.html");
            sessionStorage.clear();
        },
        error: function (msg) {
          $.toast("网络请求超时！！！")
        }
     }); 
  }    
}


//编辑封面
function editorPage(){
  sessionStorage.removeItem("init");
  if($(".my_img img").length == 0){
     $.router.load("./cover.html");
  }else{
     $.router.load("./cover.html");
     $(".pageXg").click();
  }
};
