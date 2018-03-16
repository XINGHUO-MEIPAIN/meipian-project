(function($,window,document){
  // console.log("表情");
   var Face = function(){  
    //初始化       
       //this.renderHtml();
       //this.bindEvent();
       this.slider();
      // this.imgtoText();
       this.radius(); 
       this.addBacKHtml(); 
       this.clickBacK();
   };
   
   Face.prototype = {  
     /**
     * 渲染html结构
     */
      renderHtml:function(){
       function $(id){
         return document.getElementById(id);
       }

       function Node(cls){
         return document.getElementsByClassName(cls);
       }
       //表情数组
       var face = [
           './img/face/emotion_aini.png',
           './img/face/emotion_aiqing.png',
           './img/face/emotion_aixin.png',
           './img/face/emotion_aoman.png',
           './img/face/emotion_baiyan.png',
           './img/face/emotion_bangbangtang.png',
           './img/face/emotion_baobao.png',
           './img/face/emotion_baojing.png',
           './img/face/emotion_baoquan.png',
           './img/face/emotion_bianbian.png',
           './img/face/emotion_bianpao.png',
           './img/face/emotion_biezui.png',
           './img/face/emotion_bishi.png',
           './img/face/emotion_bizui.png',
           './img/face/emotion_cahan.png',
           './img/face/emotion_caidao.png',
           './img/face/emotion_caiqiu.png',
           './img/face/emotion_chajing.png',
           './img/face/emotion_chaopiao.png',
           './img/face/emotion_chexiang.png',
           './img/face/emotion_ciya.png',
           './img/face/emotion_dabing.png',
           './img/face/emotion_daku.png',
           './img/face/emotion_dangao.png',
           './img/face/emotion_dao.png',
           './img/face/emotion_dashan.png',
           './img/face/emotion_dashuai.png',
           './img/face/emotion_denglong.png',
           './img/face/emotion_dengpao.png',
           './img/face/emotion_deyi.png',
           './img/face/emotion_diaoxie.png',
           './img/face/emotion_duoyun.png',
           './img/face/emotion_facai.png',
           './img/face/emotion_fadai.png',
           './img/face/emotion_fadou.png',
           './img/face/emotion_fakuang.png',
           './img/face/emotion_fan.png',
           './img/face/emotion_fanu.png',
           './img/face/emotion_feiji.png',
           './img/face/emotion_feiwen.png',
           './img/face/emotion_fendou.png',
           './img/face/emotion_fengche.png',
           './img/face/emotion_ganga.png',
           './img/face/emotion_gouwu.png',
           './img/face/emotion_gouying.png',
           './img/face/emotion_guzhang.png',
           './img/face/emotion_haixiu.png',
           './img/face/emotion_hanxiao.png',
           './img/face/emotion_haqian.png',
           './img/face/emotion_hecai.png',
           './img/face/emotion_henai.png',
           './img/face/emotion_huaixiao.png',
           './img/face/emotion_huishou.png',
           './img/face/emotion_huitou.png',
           './img/face/emotion_jidong.png',
           './img/face/emotion_jie.png',
           './img/face/emotion_jiewu.png',
           './img/face/emotion_jingkong.png',
           './img/face/emotion_jingya.png',
           './img/face/emotion_kafei.png',
           './img/face/emotion_kaiche.png',
           './img/face/emotion_keai.png',
           './img/face/emotion_kelian.png',
           './img/face/emotion_ketou.png',
           './img/face/emotion_kge.png',
           './img/face/emotion_koubi.png',
           './img/face/emotion_ku.png',
           './img/face/emotion_kuaikule.png',
           './img/face/emotion_kulou.png',
           './img/face/emotion_kun.png',
           './img/face/emotion_lanqiu.png',
           './img/face/emotion_lenghan.png',
           './img/face/emotion_liuhan.png',
           './img/face/emotion_liulei.png',
           './img/face/emotion_liwu.png',
           './img/face/emotion_meigui.png',
           './img/face/emotion_nanguo.png',
           './img/face/emotion_naozhong.png',
           './img/face/emotion_no.png',
           './img/face/emotion_ok.png',
           './img/face/emotion_ouhuo.png',
           './img/face/emotion_pachong.png',
           './img/face/emotion_pijiu.png',
           './img/face/emotion_pingpang.png',
           './img/face/emotion_qiang.png',
           './img/face/emotion_qiaoda.png',
           './img/face/emotion_qidao.png',
           './img/face/emotion_qingwa.png',
           './img/face/emotion_qinqin.png',
           './img/face/emotion_qiudale.png',
           './img/face/emotion_quantou.png',
           './img/face/emotion_ruo.png',
           './img/face/emotion_se.png',
           './img/face/emotion_shafa.png',
           './img/face/emotion_shandian.png',
           './img/face/emotion_shengli.png',
           './img/face/emotion_shiai.png',
           './img/face/emotion_shouqiang.png',
           './img/face/emotion_shuai.png',
           './img/face/emotion_shuangxi.png',
           './img/face/emotion_shui.png',
           './img/face/emotion_taiyang.png',
           './img/face/emotion_tiaopi.png',
           './img/face/emotion_tiaosheng.png',
           './img/face/emotion_tiaotiao.png',
           './img/face/emotion_touxiao.png',
           './img/face/emotion_tu.png',
           './img/face/emotion_weiqu.png',
           './img/face/emotion_weixiao.png',
           './img/face/emotion_woshou.png',
           './img/face/emotion_xia.png',
           './img/face/emotion_xiamian.png',
           './img/face/emotion_xiangjiao.png',
           './img/face/emotion_xianwen.png',
           './img/face/emotion_xiayu.png',
           './img/face/emotion_xigua.png',
           './img/face/emotion_xinsui.png',
           './img/face/emotion_xiongmao.png',
           './img/face/emotion_xu.png',
           './img/face/emotion_yao.png',
           './img/face/emotion_yingxian.png',
           './img/face/emotion_yiwen.png',
           './img/face/emotion_youchexiang.png',
           './img/face/emotion_youhengheng.png',
           './img/face/emotion_youjian.png',
           './img/face/emotion_youtaiji.png',
           './img/face/emotion_yueliang.png',
           './img/face/emotion_yun.png',
           './img/face/emotion_zaijian.png',
           './img/face/emotion_zhadan.png',
           './img/face/emotion_zhijing.png',
           './img/face/emotion_zhuakuang.png',
           './img/face/emotion_zhuanjie.png',
           './img/face/emotion_zhuanquan.png',
           './img/face/emotion_zhuqiu.png',
           './img/face/emotion_zhutou.png',
           './img/face/emotion_zouma.png',
           './img/face/emotion_zuochetou.png',
           './img/face/emotion_zuohengheng.png',
           './img/face/emotion_zuotaiji.png'
        ];
         // if(Node("disFace")[0] != undefined){
            // var faceBox =  Node("disFace");
         // }else if($("disFace").innerHTML != undefined){
            var faceBox =  $("disFace");
            // console.log(faceBox);
         // }
         
         
         var _bodyHtml = "<div class='faceContent clearfix'><ul class='faceUl'>";
         for(var i = 1 ; len = face.length , i < len ; i++){   
            
          i % 20 == 0 && i != 0 ?_bodyHtml += "<li class='lic'><img src="+face[i]+"></li></ul><ul class='faceUl'>":_bodyHtml +="<li class='lic'><img src="+face[i]+"></li>" 
            
         };
         var oul = "<div class='radius_content'>";
         for(var i=0; i< Math.ceil(face.length/20); i++){
             oul += '<span class="radius"></span>'
         }
          oul +='</div>';
        
         _bodyHtml += '</ul></div>'+oul+'';
        //  console.log(faceBox);
         faceBox.innerHTML = _bodyHtml;
         var size = Node("faceUl").length;
         var w = Node("faceUl")[0].offsetWidth;

		
         var wtotal = w * size;
    		 var w1 = window.innerWidth;
    		 for(var i = 0 ; i < size ; i++){
    			 Node("faceUl")[i].style.width = w1 + 'px';
    		 }
         Node("faceContent")[0].style.width = wtotal + 'px';
         faceBox.style.width = w1 + 'px';
       },
       //添加回退
       addBacKHtml:function(){
         $(".faceUl").append("<li class='faceClose'><img src='./img/face/delface1.png' alt='' id='delface' /></li>");
       },
       //回退事件
       clickBacK:function(){
          $(".faceClose").click(function(){
              // $(".faceInputDiv").html();  
          })
       },
       //下标
      radius:function(){
         $(".radius").eq(0).addClass("active1");
      },
     /**
     * 点击表情的方法
     */
       bindEvent:function(){
        
         $(document).on("click",".faceUl .lic",function(){
  
             var copy = $(this).html();
             //映射到gif图上
            var copy = copy.replace(/.png/,'_gif.gif')
            //  console.log(copy)
             $(".faceInputDiv").append(copy);
         })     
       },
      
      /**
     * 表情滑动的方法
     */
      slider:function(){
          var i = 0;
          /**
           * x为触屏时的坐标，
           * x1为触屏移动的坐标,
           * x2为移动的距离
           */
            var x,x1,x2;      
            $(document).on("touchstart",".faceUl",function(event){
                 this.x = event.touches[0].clientX;  
            })
            $(document).on("touchmove",".faceUl",function(event){         
                 this.x1 = event.touches[0].clientX;
            })  
            $(document).on("touchend",".faceUl",function(event){
                
                 this.x2 = event.changedTouches[0].clientX;
                 var dis = this.x2 - this.x;
                  var w2 = window.innerWidth;
                if(dis >=20){         
                    i--;
                    if(i<0){
                      $(".faceContent").css({"transform":"translate3d(0px,0,0)"});
                      i=0;
                      return;
                  }
                  $(".faceContent").css({"transform":"translate3d("+(-w2*i)+"px,0,0)"});

               }else if(dis <-20){
                  if(i>=$(".faceUl").length-1){
                    $(".faceContent").css({"transform":"translate3d("+(-w2*($(".faceUl").length-1))+"px,0,0)" });
                    i=$(".faceUl").length-1;
                    return;
                  }
                  i++;
                  $(".faceContent").css({"transform":"translate3d("+(-w2*i)+"px,0,0)"});
                }
                 $(".radius_content .radius").eq(i).addClass("active1").siblings().removeClass("active1");
              })
       },
       /*表情图片关联字符串data*/
       imgtoText:function(){    
            var len = $(".faceUl li").length;
            var str = ['[em:1]','[em:2]','[em:3]','[em:4]','[em:5]','[em:6]','[em:7]','[em:8]','[em:9]','[em:10]',
             '[em:11]','[em:12]','[em:13]','[em:14]','[em:15]','[em:16]','[em:17]','[em:18]','[em:19]','[em:20]',
             '[em:21]','[em:22]','[em:23]','[em:24]','[em:25]','[em:26]','[em:27]','[em:28]','[em:29]','[em:30]',
             '[em:31]','[em:32]','[em:33]','[em:34]','[em:35]','[em:36]','[em:37]','[em:38]','[em:39]','[em:40]',
             '[em:41]','[em:42]','[em:43]','[em:44]','[em:45]','[em:46]','[em:47]','[em:48]','[em:49]','[em:50]',
             '[em:51]','[em:52]','[em:53]','[em:54]','[em:55]','[em:56]','[em:57]','[em:58]','[em:59]','[em:60]',
             '[em:61]','[em:62]','[em:63]','[em:64]','[em:65]','[em:66]','[em:67]','[em:68]','[em:69]','[em:70]',
             '[em:71]','[em:72]','[em:73]','[em:74]','[em:75]','[em:76]','[em:77]','[em:78]','[em:79]','[em:80]',
             '[em:81]','[em:82]','[em:83]','[em:84]','[em:85]','[em:86]','[em:87]','[em:88]','[em:89]','[em:90]',
             '[em:91]','[em:92]','[em:93]','[em:94]','[em:95]','[em:96]','[em:97]','[em:98]','[em:99]','[em:100]',
             '[em:101]','[em:102]','[em:103]','[em:104]','[em:105]','[em:106]','[em:107]','[em:108]','[em:109]','[em:110]',
             '[em:111]','[em:112]','[em:113]','[em:114]','[em:115]','[em:116]','[em:117]','[em:118]','[em:119]','[em:120]',
             '[em:121]','[em:122]','[em:123]','[em:124]','[em:125]','[em:126]','[em:127]','[em:128]','[em:129]','[em:130]',
             '[em:131]','[em:132]','[em:133]','[em:134]','[em:135]','[em:136]','[em:137]','[em:138]','[em:139]','[em:140]',
             '[em:141]','[em:142]','[em:143]','[em:144]','[em:145]','[em:146]','[em:147]','[em:148]','[em:149]','[em:150]'
            ];      
            for(var i = 0; i < $(".faceUl li").length ; i++){
              // console.log("data")
              $(".faceUl li").eq(i).find("img").attr("data",str[i]);
            }
       },
       /*发送到后台的方法，调用用Face().send()*/
       send:function(faceInputDiv){
        // console.log(faceInputDiv);
             var faceInput = document.getElementById(faceInputDiv);
             var content= $(faceInput).html();
             
             var arr= [];
             var len = $(faceInput).find("img").length;
             for (j = 0; j < len; j++) {
                    arr.push($(faceInput).find("img").eq(j).attr("data"))
                    content = content.replace(/<img\b[^>]*>/,arr[j]);
                    // console.log($(faceInput).find("img").eq(j).attr("data"));
              }
  
              return content;  
       },
       /*
        *前端解析后台传过来的图片的方法
        *后台请求到的数据要赋给变量str;例如 var str='[em:10][em:5][em:6]大叔大婶大苏打实打实大苏打实打实大苏打撒旦';
        */
       get:function(str){
         var arr = [
           './img/face/emotion_aini_gif.gif',
           './img/face/emotion_aiqing_gif.gif',
           './img/face/emotion_aixin_gif.gif',
           './img/face/emotion_aoman_gif.gif',
           './img/face/emotion_baiyan_gif.gif',
           './img/face/emotion_bangbangtang_gif.gif',
           './img/face/emotion_baobao_gif.gif',
           './img/face/emotion_baojing_gif.gif',
           './img/face/emotion_baoquan_gif.gif',
           './img/face/emotion_bianbian_gif.gif',
           './img/face/emotion_bianpao_gif.gif',
           './img/face/emotion_biezui_gif.gif',
           './img/face/emotion_bishi_gif.gif',
           './img/face/emotion_bizui_gif.gif',
           './img/face/emotion_cahan_gif.gif',
           './img/face/emotion_caidao_gif.gif',
           './img/face/emotion_caiqiu_gif.gif',
           './img/face/emotion_chajing_gif.gif',
           './img/face/emotion_chaopiao_gif.gif',
           './img/face/emotion_chexiang_gif.gif',
           './img/face/emotion_ciya_gif.gif',
           './img/face/emotion_dabing_gif.gif',
           './img/face/emotion_daku_gif.gif',
           './img/face/emotion_dangao_gif.gif',
           './img/face/emotion_dao_gif.gif',
           './img/face/emotion_dashan_gif.gif',
           './img/face/emotion_dashuai_gif.gif',
           './img/face/emotion_denglong_gif.gif',
           './img/face/emotion_dengpao_gif.gif',
           './img/face/emotion_deyi_gif.gif',
           './img/face/emotion_diaoxie_gif.gif',
           './img/face/emotion_duoyun_gif.gif',
           './img/face/emotion_facai_gif.gif',
           './img/face/emotion_fadai_gif.gif',
           './img/face/emotion_fadou_gif.gif',
           './img/face/emotion_fakuang_gif.gif',
           './img/face/emotion_fan_gif.gif',
           './img/face/emotion_fanu_gif.gif',
           './img/face/emotion_feiji_gif.gif',
           './img/face/emotion_feiwen_gif.gif',
           './img/face/emotion_fendou_gif.gif',
           './img/face/emotion_fengche_gif.gif',
           './img/face/emotion_ganga_gif.gif',
           './img/face/emotion_gouwu_gif.gif',
           './img/face/emotion_gouying_gif.gif',
           './img/face/emotion_guzhang_gif.gif',
           './img/face/emotion_haixiu_gif.gif',
           './img/face/emotion_hanxiao_gif.gif',
           './img/face/emotion_haqian_gif.gif',
           './img/face/emotion_hecai_gif.gif',
           './img/face/emotion_henai_gif.gif',
           './img/face/emotion_huaixiao_gif.gif',
           './img/face/emotion_huishou_gif.gif',
           './img/face/emotion_huitou_gif.gif',
           './img/face/emotion_jidong_gif.gif',
           './img/face/emotion_jie_gif.gif',
           './img/face/emotion_jiewu_gif.gif',
           './img/face/emotion_jingkong_gif.gif',
           './img/face/emotion_jingya_gif.gif',
           './img/face/emotion_kafei_gif.gif',
           './img/face/emotion_kaiche_gif.gif',
           './img/face/emotion_keai_gif.gif',
           './img/face/emotion_kelian_gif.gif',
           './img/face/emotion_ketou_gif.gif',
           './img/face/emotion_kge_gif.gif',
           './img/face/emotion_koubi_gif.gif',
           './img/face/emotion_ku_gif.gif',
           './img/face/emotion_kuaikule_gif.gif',
           './img/face/emotion_kulou_gif.gif',
           './img/face/emotion_kun_gif.gif',
           './img/face/emotion_lanqiu_gif.gif',
           './img/face/emotion_lenghan_gif.gif',
           './img/face/emotion_liuhan_gif.gif',
           './img/face/emotion_liulei_gif.gif',
           './img/face/emotion_liwu_gif.gif',
           './img/face/emotion_meigui_gif.gif',
           './img/face/emotion_nanguo_gif.gif',
           './img/face/emotion_naozhong_gif.gif',
           './img/face/emotion_no_gif.gif',
           './img/face/emotion_ok_gif.gif',
           './img/face/emotion_ouhuo_gif.gif',
           './img/face/emotion_pachong_gif.gif',
           './img/face/emotion_pijiu_gif.gif',
           './img/face/emotion_pingpang_gif.gif',
           './img/face/emotion_qiang_gif.gif',
           './img/face/emotion_qiaoda_gif.gif',
           './img/face/emotion_qidao_gif.gif',
           './img/face/emotion_qingwa_gif.gif',
           './img/face/emotion_qinqin_gif.gif',
           './img/face/emotion_qiudale_gif.gif',
           './img/face/emotion_quantou_gif.gif',
           './img/face/emotion_ruo_gif.gif',
           './img/face/emotion_se_gif.gif',
           './img/face/emotion_shafa_gif.gif',
           './img/face/emotion_shandian_gif.gif',
           './img/face/emotion_shengli_gif.gif',
           './img/face/emotion_shiai_gif.gif',
           './img/face/emotion_shouqiang_gif.gif',
           './img/face/emotion_shuai_gif.gif',
           './img/face/emotion_shuangxi_gif.gif',
           './img/face/emotion_shui_gif.gif',
           './img/face/emotion_taiyang_gif.gif',
           './img/face/emotion_tiaopi_gif.gif',
           './img/face/emotion_tiaosheng_gif.gif',
           './img/face/emotion_tiaotiao_gif.gif',
           './img/face/emotion_touxiao_gif.gif',
           './img/face/emotion_tu_gif.gif',
           './img/face/emotion_weiqu_gif.gif',
           './img/face/emotion_weixiao_gif.gif',
           './img/face/emotion_woshou_gif.gif',
           './img/face/emotion_xia_gif.gif',
           './img/face/emotion_xiamian_gif.gif',
           './img/face/emotion_xiangjiao_gif.gif',
           './img/face/emotion_xianwen_gif.gif',
           './img/face/emotion_xiayu_gif.gif',
           './img/face/emotion_xigua_gif.gif',
           './img/face/emotion_xinsui_gif.gif',
           './img/face/emotion_xiongmao_gif.gif',
           './img/face/emotion_xu_gif.gif',
           './img/face/emotion_yao_gif.gif',
           './img/face/emotion_yingxian_gif.gif',
           './img/face/emotion_yiwen_gif.gif',
           './img/face/emotion_youchexiang_gif.gif',
           './img/face/emotion_youhengheng_gif.gif',
           './img/face/emotion_youjian_gif.gif',
           './img/face/emotion_youtaiji_gif.gif',
           './img/face/emotion_yueliang_gif.gif',
           './img/face/emotion_yun_gif.gif',
           './img/face/emotion_zaijian_gif.gif',
           './img/face/emotion_zhadan_gif.gif',
           './img/face/emotion_zhijing_gif.gif',
           './img/face/emotion_zhuakuang_gif.gif',
           './img/face/emotion_zhuanjie_gif.gif',
           './img/face/emotion_zhuanquan_gif.gif',
           './img/face/emotion_zhuqiu_gif.gif',
           './img/face/emotion_zhutou_gif.gif',
           './img/face/emotion_zouma_gif.gif',
           './img/face/emotion_zuochetou_gif.gif',
           './img/face/emotion_zuohengheng_gif.gif',
           './img/face/emotion_zuotaiji_gif.gif'
        ]
          var str1 = str.replace(/\[em:(\d+)\]/g, function(item, index){
            return '<img src='+arr[index]+'>'
         });
           return str1;
       },

       //对表情的一些处理，截取等
       getAndDealStr:function(str,strCountLimmit){
        var arr = [
          './img/face/emotion_aini_gif.gif',
          './img/face/emotion_aiqing_gif.gif',
          './img/face/emotion_aixin_gif.gif',
          './img/face/emotion_aoman_gif.gif',
          './img/face/emotion_baiyan_gif.gif',
          './img/face/emotion_bangbangtang_gif.gif',
          './img/face/emotion_baobao_gif.gif',
          './img/face/emotion_baojing_gif.gif',
          './img/face/emotion_baoquan_gif.gif',
          './img/face/emotion_bianbian_gif.gif',
          './img/face/emotion_bianpao_gif.gif',
          './img/face/emotion_biezui_gif.gif',
          './img/face/emotion_bishi_gif.gif',
          './img/face/emotion_bizui_gif.gif',
          './img/face/emotion_cahan_gif.gif',
          './img/face/emotion_caidao_gif.gif',
          './img/face/emotion_caiqiu_gif.gif',
          './img/face/emotion_chajing_gif.gif',
          './img/face/emotion_chaopiao_gif.gif',
          './img/face/emotion_chexiang_gif.gif',
          './img/face/emotion_ciya_gif.gif',
          './img/face/emotion_dabing_gif.gif',
          './img/face/emotion_daku_gif.gif',
          './img/face/emotion_dangao_gif.gif',
          './img/face/emotion_dao_gif.gif',
          './img/face/emotion_dashan_gif.gif',
          './img/face/emotion_dashuai_gif.gif',
          './img/face/emotion_denglong_gif.gif',
          './img/face/emotion_dengpao_gif.gif',
          './img/face/emotion_deyi_gif.gif',
          './img/face/emotion_diaoxie_gif.gif',
          './img/face/emotion_duoyun_gif.gif',
          './img/face/emotion_facai_gif.gif',
          './img/face/emotion_fadai_gif.gif',
          './img/face/emotion_fadou_gif.gif',
          './img/face/emotion_fakuang_gif.gif',
          './img/face/emotion_fan_gif.gif',
          './img/face/emotion_fanu_gif.gif',
          './img/face/emotion_feiji_gif.gif',
          './img/face/emotion_feiwen_gif.gif',
          './img/face/emotion_fendou_gif.gif',
          './img/face/emotion_fengche_gif.gif',
          './img/face/emotion_ganga_gif.gif',
          './img/face/emotion_gouwu_gif.gif',
          './img/face/emotion_gouying_gif.gif',
          './img/face/emotion_guzhang_gif.gif',
          './img/face/emotion_haixiu_gif.gif',
          './img/face/emotion_hanxiao_gif.gif',
          './img/face/emotion_haqian_gif.gif',
          './img/face/emotion_hecai_gif.gif',
          './img/face/emotion_henai_gif.gif',
          './img/face/emotion_huaixiao_gif.gif',
          './img/face/emotion_huishou_gif.gif',
          './img/face/emotion_huitou_gif.gif',
          './img/face/emotion_jidong_gif.gif',
          './img/face/emotion_jie_gif.gif',
          './img/face/emotion_jiewu_gif.gif',
          './img/face/emotion_jingkong_gif.gif',
          './img/face/emotion_jingya_gif.gif',
          './img/face/emotion_kafei_gif.gif',
          './img/face/emotion_kaiche_gif.gif',
          './img/face/emotion_keai_gif.gif',
          './img/face/emotion_kelian_gif.gif',
          './img/face/emotion_ketou_gif.gif',
          './img/face/emotion_kge_gif.gif',
          './img/face/emotion_koubi_gif.gif',
          './img/face/emotion_ku_gif.gif',
          './img/face/emotion_kuaikule_gif.gif',
          './img/face/emotion_kulou_gif.gif',
          './img/face/emotion_kun_gif.gif',
          './img/face/emotion_lanqiu_gif.gif',
          './img/face/emotion_lenghan_gif.gif',
          './img/face/emotion_liuhan_gif.gif',
          './img/face/emotion_liulei_gif.gif',
          './img/face/emotion_liwu_gif.gif',
          './img/face/emotion_meigui_gif.gif',
          './img/face/emotion_nanguo_gif.gif',
          './img/face/emotion_naozhong_gif.gif',
          './img/face/emotion_no_gif.gif',
          './img/face/emotion_ok_gif.gif',
          './img/face/emotion_ouhuo_gif.gif',
          './img/face/emotion_pachong_gif.gif',
          './img/face/emotion_pijiu_gif.gif',
          './img/face/emotion_pingpang_gif.gif',
          './img/face/emotion_qiang_gif.gif',
          './img/face/emotion_qiaoda_gif.gif',
          './img/face/emotion_qidao_gif.gif',
          './img/face/emotion_qingwa_gif.gif',
          './img/face/emotion_qinqin_gif.gif',
          './img/face/emotion_qiudale_gif.gif',
          './img/face/emotion_quantou_gif.gif',
          './img/face/emotion_ruo_gif.gif',
          './img/face/emotion_se_gif.gif',
          './img/face/emotion_shafa_gif.gif',
          './img/face/emotion_shandian_gif.gif',
          './img/face/emotion_shengli_gif.gif',
          './img/face/emotion_shiai_gif.gif',
          './img/face/emotion_shouqiang_gif.gif',
          './img/face/emotion_shuai_gif.gif',
          './img/face/emotion_shuangxi_gif.gif',
          './img/face/emotion_shui_gif.gif',
          './img/face/emotion_taiyang_gif.gif',
          './img/face/emotion_tiaopi_gif.gif',
          './img/face/emotion_tiaosheng_gif.gif',
          './img/face/emotion_tiaotiao_gif.gif',
          './img/face/emotion_touxiao_gif.gif',
          './img/face/emotion_tu_gif.gif',
          './img/face/emotion_weiqu_gif.gif',
          './img/face/emotion_weixiao_gif.gif',
          './img/face/emotion_woshou_gif.gif',
          './img/face/emotion_xia_gif.gif',
          './img/face/emotion_xiamian_gif.gif',
          './img/face/emotion_xiangjiao_gif.gif',
          './img/face/emotion_xianwen_gif.gif',
          './img/face/emotion_xiayu_gif.gif',
          './img/face/emotion_xigua_gif.gif',
          './img/face/emotion_xinsui_gif.gif',
          './img/face/emotion_xiongmao_gif.gif',
          './img/face/emotion_xu_gif.gif',
          './img/face/emotion_yao_gif.gif',
          './img/face/emotion_yingxian_gif.gif',
          './img/face/emotion_yiwen_gif.gif',
          './img/face/emotion_youchexiang_gif.gif',
          './img/face/emotion_youhengheng_gif.gif',
          './img/face/emotion_youjian_gif.gif',
          './img/face/emotion_youtaiji_gif.gif',
          './img/face/emotion_yueliang_gif.gif',
          './img/face/emotion_yun_gif.gif',
          './img/face/emotion_zaijian_gif.gif',
          './img/face/emotion_zhadan_gif.gif',
          './img/face/emotion_zhijing_gif.gif',
          './img/face/emotion_zhuakuang_gif.gif',
          './img/face/emotion_zhuanjie_gif.gif',
          './img/face/emotion_zhuanquan_gif.gif',
          './img/face/emotion_zhuqiu_gif.gif',
          './img/face/emotion_zhutou_gif.gif',
          './img/face/emotion_zouma_gif.gif',
          './img/face/emotion_zuochetou_gif.gif',
          './img/face/emotion_zuohengheng_gif.gif',
          './img/face/emotion_zuotaiji_gif.gif'
       ];
       
       var objS = {
        fullStr:"",
        partStr:"",
        isoverLimmit:false
       }
        objS.fullStr = str.replace(/\[em:(\d+)\]/g, function(item, index){
           return '<img src='+arr[index]+'>';
        });
        var faceArr = [];
        var str1 = str.replace(/\[em:(\d+)\]/g, function(item, index){
          faceArr.push("[em:"+index+"]");
          return '`';
        });

        if(str1.length < strCountLimmit){
          objS.isoverLimmit = true;
          return objS;
        }
        str1 = str1.slice(0,strCountLimmit);
        var strt = '';
        for(var i = 0,j = 0; i < str1.length;i++){
          if(str1[i]  == '`'){
            strt += faceArr[j++];
          }else{
            strt += str1[i];
          }
        }
        objS.partStr = strt.replace(/\[em:(\d+)\]/g, function(item, index){
          return '<img src='+arr[index]+'>';
       });
        return objS;
      }
   };

   var currentStrLength;
   //暴露接口

  window.Face = function(){
    return new Face();
  };

})(Zepto,window,document)




