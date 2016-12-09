var ReadMore = {
    showChar: 250, // How many characters are shown by default
    ellipsestext: "...",
    moretext: "Show more >",
    lesstext: "Show less",

    BindEvent: function () {
        var _showChar = this.showChar;
        var _ellipsestext = this.ellipsestext;
        var _moretext = this.moretext;
        var _lesstext = this.lesstext;
       
        $('.more').each(function () {
            var content = $(this).html();
            
            if (content.length > _showChar) {
                var c = content.substr(0, _showChar);
                var h = content.substr(_showChar, content.length - _showChar);

                //var html = c + '<span class="moreellipses">' + _ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp <a href="" class="morelink">' + _moretext + '</a></span>';

                //var html = c + '<span class="moreellipses">' + _ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp <br><a href="" class="morelink">' + _moretext + '</a></span>';

 
                //var html = c + '<span class="moreellipses">' + _ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp <a href="" class="morelink">' + _moretext + '</a></span>';
                var html = c + '<span class="moreellipses">' + _ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp <a href="" class="morelink">' + _moretext + '</a></span>';
                $(this).html(html);
            }
        });

        $(".morelink").click(function () {
            if ($(this).hasClass("less")) {
                $(this).removeClass("less");
                $(this).html(_moretext);
            } else {
                $(this).addClass("less");
                $(this).html(_lesstext);
            }
            $(this).parent().prev().toggle();
            $(this).prev().toggle();
            return false;
        });
    },
};