$(document).on("pageInit", function(e, pageId, $page) {

  if(pageId == "router") {
  	/*首页*/
  	$(document).on("click",".add",function(){
		$(".add").show();
		$(this).hide();
		$(".add_type").hide();
		$(this).siblings(".add_type").show();
     })
  	//获取从标题编辑页面传过来的标识
  	if(localStorage.getItem("title")){
       var getStoragetitle = localStorage.getItem("title");
       $(".title_text a").text(getStoragetitle);
     };
      $(document).on("click",".add_content_1_text",function(){
      	  var ind = $(this).parents(".add_content_2").index()-1;
      	  localStorage.setItem("ind",ind);
      });

      //获取从文字编辑页面传过来的对应的标识
      if(localStorage.getItem("ind")){
        var ind= localStorage.getItem("ind");
        var t = localStorage.getItem('text');
        $(".add_content_2").eq(ind).find(".add_content_1_text").text(t);
       };
       //添加新模板
       if(localStorage.getItem("html") && localStorage.getItem("i")){
       	   var html= localStorage.getItem("html");
           var i = localStorage.getItem('i');
       	   if(i == -1){
              $(".add_content>.add_1").before(html); 
       	   }else{ 
              $(".add_content_2").eq(i-1).after(html); 
           } 
       }
     
       $(document).on("click",".add_type_div",function(){
           $(".add").show();
           $(".add_type").hide();
           var i = $(this).parents(".add_content_2").index();
           localStorage.setItem('i', i);
       });

       //删除
       $(document).on("click",".add_content_1_left",function(){
       	   $(this).parents(".add_content_2").remove();
       });

       //生成html
		$(".complete").click(function(){
			$(".loadding").show();
			//传给安卓地址字符串
            var arr = [];
             for(var i = 0 ; i < $(".add_content_2").length ; i++){
             	  var img = $(".add_content_2").eq(i).find(".add_content_1_img img").attr("src")

             	  if(img.indexOf("./images/2.jpg") == -1){
             	  	  arr.push(img)
             	  }     
             };
            var url = arr.toString()
         

			//接受安卓的网络上的地址
			function imgUrls(res){
			    for(var i = 0 ; i < res.length; i++){
			    	var img = $(".add_content_2").eq(i).find(".add_content_1_img img:not(.default_img)");
                       img.attr("src",res[i].imgurl)	       	
			    }
			    $(".loadding").hide();
             };

             //上传Html
             var htmlContent = '<!DOCTYPE html>'+
			'<html>'+
			'<head>'+
			    '<meta charset="utf-8">'+
			    '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">'+
			    '<link rel="stylesheet" href="./css/index.css">'+
			    '<script type="text/javascript" src="./js/zepto.min.js" charset="utf-8"></script>'+
			    '<script>$.config = {autoInit: true}</script>'+
			    '<link rel="stylesheet" href="./css/sm.min.css">'+
			    '</script>'+
			    '<script  src="./js/sm.min.js"></script>'+
			    '<script type="text/javascript" src="./js/cordova.js"></script>'+
			      '<script type="text/javascript" src="./js/total.js"></script>'+
				'<title></title>'+
			'</head>'+
			'<body class="report">'+
            '<div class="my_title">'+$(".title_text").text()+'</div>'+
            '<div class="autor"><span class="time">2017.11.09</span><em>我的征途是星辰大海</em><span class="readding">阅读 0</span></div>';
			for(var i = 0 ;i < $(".add_content_2").length; i++){
				  var img = $(".add_content_2").eq(i).find(".add_content_1_img img").attr("src")
				if(img.indexOf("./images/2.jpg") == -1){
				  htmlContent += '<div class="text_content"><div class="text">'+$(".add_content_2").eq(i).find(".add_content_1_img").html()+'</div>'+
                   '<div class="text_1">'+$(".add_content_2").eq(i).find(".add_content_1_text").html()+'</div></div>'
				}else{
                   htmlContent += '<div class="text_content">'+
                   '<div class="text_1">'+$(".add_content_2").eq(i).find(".add_content_1_text").html()+'</div></div>'
               }   
			}; 
			htmlContent +='</body></html>';
             		console.log(htmlContent)
			Cordova.exec(null,null, "Interactive", "jsHtml", [htmlContent]);	
		})
       
       localStorage.clear();

  }/*标题编辑*/else if(pageId == "router1"){
      $(".complete").click(function(){
          var t = $(".textarea").val();
          localStorage.setItem('title', t);
      })
  }/*文字编辑*/else if(pageId == "router2"){
  	  $(".textarea").focus();
      $(".complete").click(function(){
          var t = $(".textarea").val();
          localStorage.setItem('text', t);          
          var attrid = localStorage.getItem('attrid');
          localStorage.setItem('arrtid_new', attrid);
     	})
  }/*add*/else if(pageId == "router3"){
         $(".textarea").focus();  
  	     $(".complete").click(function(){
  	     	   html ='';
  	     	  if($(".textarea").val() != ''){
                var t = $(".textarea").val();
                html += '<div class="add_content_2">'+
	           '<div class="add_content_1 clearfix">'+
	               '<div class="add_content_1_left">×</div>' +
	               '<div class="add_content_1_img">'+
	                  '<img src="./images/2.jpg" class="default_img">'+
	               '</div>'+
	               '<a href="/new/editor_text.html">'+
	                 '<div class="add_content_1_text">'+t+'</div>'+
	               '</a>'+
	           '</div>'+
	           '<div class="add_1">'+
	              '<p class="add">+</p>'+
	              '<div class="add_type clearfix">'+
	                 '<div class="add_type_div"><a href="/new/add_new_item.html">文字</a></div>'+
	                 '<div class="add_type_div">图片</div>'+
	              '</div>'+
	            '</div>'+
              '</div>'
                localStorage.setItem("html",html)
  	     	  }
  	     })
     }/*更换封面*/else if(pageId == "router4"){
      $(".change_page").click(function(){
           var pickTag = "pick_tag";  
           Cordova.exec(null,null, "Interactive", "openCameraOrPick", [pickTag]);	

     })
  }
});
