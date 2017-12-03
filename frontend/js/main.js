$(document).ready(function(){
  $(document).foundation();
  //$("img").unveil(200);
  $(window).scroll(_throttle(onScroll, 1000, {trailing: false}));
});

function onScroll(e) {
  console.log('scrolling occured');
}
