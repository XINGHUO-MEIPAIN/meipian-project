function active1(){
	if(sessionStorage.getItem("titleImage")){
  	  	var titleImage = sessionStorage.getItem("titleImage");
        var contentPath = sessionStorage.getItem("contentPath");
  		  $(".my_img").html("<img data='"+contentPath+"'' src='"+titleImage+"'>");
    };

    if(sessionStorage.getItem("textImagecontentPath")){
        var textImagecontentPath = sessionStorage.getItem("textImagecontentPath");
        $(".textImage img").attr("data",textImagecontentPath);
    }
};


var text;
var localImage;

var modelImg = "../../images/image.png";
var modeltext = '<span>点击添加文字</span>';


//创建添加图片文字框
var addNewChoose = '<div class="imgContent">'+
                       '<img src="../../images/write.png" onclick="addWrite()">'+
                       '<img src="../../images/image.png" onclick="addPic()">'+
                    '</div>';

//添加模板
var textModel = '<div class="Model">'+
                     '<div class="ModelClose"><span onclick="ModelClose(this)">×</span></div>'+
                   '<div class="textModel">'+
                       '<div class="textImage" onclick="addPic()">'+
                            '<img src="'+ modelImg +'">'+
                        '</div>'+
                        '<div class="writeContent" onclick="addWrite()">'+
                           modeltext +
                        '</div>'+
                   '</div>'+
               '</div>';


//编辑文字完成
function newCom(){
   text = $(".textarea").val();
   if(text.length > 5000){
   	  $.alert("字数不能超过5000字");
   }else{
      sessionStorage.setItem("newItemText",text);
   	  $.router.load("./active1.html");
   	  $(".imgContent").hide();
      $(".activeContent").html(textModel);
      $(".writeContent").html(text);
      if(sessionStorage.getItem("fileImage")){
          var fileImage = sessionStorage.getItem("fileImage");
          $(".textImage img").attr("src",fileImage);
     };
   };
};


//删除模板
function ModelClose(this_){
    $(".add").show();
    $(this_).parents(".Model").remove();
}

function addNew(this_){
    $(this_).after(addNewChoose);
    $(this_).hide();
};


//添加内容
function addWrite(){
  $.router.load("./add_new_item.html");
};

//添加文件
function addPic(){
   // if (window.systemWeb != null && typeof(window.systemWeb) != "undefined") {
   //        window.systemWeb.uploadFile(2);
   //    } else {
   //        alert(typeof(window.systemWeb));
   //    };
 
};
//上传文档
function fileChange(target){
  

  
}



//点击完成，发送ajax
function activeComplete(){

  //替换文章的图片地址
      // var textArr = [];
      // for(var i = 0 ; i < $(".textImage img").length ; i++){
      //       textArr.push({"filepath":$(".textImage img").eq(i).attr("data")});    
      // };
      // var textArr = JSON.stringify(textArr);    
      // window.android.callUploadFile(textArr,'textArr');

     // 替换封面的本地地址  
      var titleArr = [];
      for(var i = 0 ; i < $(".my_img img").length ; i++){
            titleArr.push({"filepath":$(".my_img img").eq(i).attr("data")});    
      };
      var titleArr = JSON.stringify(titleArr);    
      window.android.callUploadFile(titleArr,'titleArr');
      if($(".my_img img").length == 0 || $(".title_text").text() == '点击设置标题'){
          $.toast("请设置标题和封面");
          return;
      }    

  $.showPreloader('发表中');
  setTimeout(function(){
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
        Data += '"msg":"111"';
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
        },
        error: function (msg) {
          $.toast("网络请求超时！！！")
        }
     });
   },2000)
    
    
}

function addPic(){
  $.toast("上传文档功能正在开发中");
}