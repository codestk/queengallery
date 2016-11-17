$(document).ready(function () {
    Preload();
    
});
 
$(window).bind("load", function () {
    LoadCompelete();
});
 
$(document).ajaxStart(function () {
    Preload();
});

 
// Fn to allow an event to fire after all images are loaded
$.fn.imagesLoaded = function () {

    // get all the images (excluding those with no src attribute)
    var $imgs = this.find('img[src!=""]');
    // if there's no images, just return an already resolved promise
    if (!$imgs.length) { return $.Deferred().resolve().promise(); }

    // for each image, add a deferred object to the array which resolves when the image is loaded (or if loading fails)
    var dfds = [];
    $imgs.each(function () {

        var dfd = $.Deferred();
        dfds.push(dfd);
        var img = new Image();
        img.onload = function () { dfd.resolve(); }
        img.onerror = function () { dfd.resolve(); }
        img.src = this.src;

    });

    // return a master promise object which will resolve when all the deferred objects have resolved
    // IE - when all the images are loaded
    return $.when.apply($, dfds);

}
 
function Preload() {
   // blurElement("body", 1)
  
    //$(".fakeloader").fakeLoader({
    //    timeToHide: 12000,
    //    //bgColor: "#2ecc71",
    //    spinner: "spinner1"
    //});

    //blurElement("body", 1)
    $(".fakeloader").fakeLoader({
        //timeToHide: 1200,
        bgColor: "#888",
        spinner: "spinner1",
        filter:" alpha(opacity=60)"
    });

    $(".fakeloader").fadeIn();
}

function LoadCompelete()
{

    //$(".fakeloader").remove();
    blurElement("body", 0);

    $(".fakeloader").fadeOut();
}

//set the css3 blur to an element
function blurElement(element, size) {
    var filterVal = 'blur(' + size + 'px)';
    $(element)
      .css('filter', filterVal)
      .css('webkitFilter', filterVal)
      .css('mozFilter', filterVal)
      .css('oFilter', filterVal)
      .css('msFilter', filterVal);
}