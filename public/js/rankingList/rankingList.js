function rankingList(){
  //点击个人跳转到个人主页
  $('.rank_list').on('tap','li',function(){
    $.router.load('/myPage.html');
  });
  $('.sign').on('tap','img',function(){
    $.router.load('/myPage.html');
  })
}