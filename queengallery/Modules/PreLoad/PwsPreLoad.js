
 

$(window).load(function () {
    // Animate loader off screen
    LoadCompelete();
});


function Preload() {
   // blurElement("body", 1)
  
    //$(".fakeloader").fakeLoader({
    //    timeToHide: 12000,
    //    //bgColor: "#2ecc71",
    //    spinner: "spinner1"
    //});

   
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
    blurElement("body", 0)

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