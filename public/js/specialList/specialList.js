function TospecialList(){
  $('#specialContent').on('tap','.topicList',function(){
    $.router.load('/topicDetails.html')
  })
}