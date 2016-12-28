function ToTop() {
    //$('body').animatescroll();
    //var scrollPosition = document.body.scrollTop;
    //console.log(scrollPosition);
    //if (scrollPosition > 0) {
    //    // top of the page
    //    $('body').animatescroll({ scrollSpeed: 2000, easing: 'easeInOutBack' });
    //}

    var $window = $(window);
    $topOffset = $(this).scrollTop();
    if ($topOffset > 400) {
        // top of the page
        $('body').animatescroll({ scrollSpeed: 2000, easing: 'easeInOutBack' });
    }
}

//For Check Point
//var $window = $(window);

//$(window).on('scroll', function() {
//    $topOffset = $(this).scrollTop();

//    console.log($topOffset);