 

    $(document).ready(function () {
        //prevent loade complete
        $(window).unbind("load");

        //Preload();
        menuType = 'OnView';
        initEvent();

        RenderList();
    });

function SetActiveLeftMenu(aTag, id) {
    $('#' + id + ' .list-group a').removeClass('active');
    $(aTag).addClass('active');
}

function initEvent() {

    //Left Menu Event Main ======================================================
    $('#aOnView,#aPast,#aUpcoming').on('click', function (event) {
        event.preventDefault();
        //Get Attibute A data-type
        menuType = $(this).attr('data-type');

        SetActiveLeftMenu(this, 'Main');

        PageIndex = '1';
        RenderList();
    });

    //Left SubMenu Event Main ===================================================
    $('#aInformation,#aArtists,#aArtPieces').on('click', function (event) {
        event.preventDefault();
        //Get Attibute A data-type
        menuType = $(this).attr('data-type');

        SetActiveLeftMenu(this, 'SubMain');

        function ShowExhibitioniCon() {
            $('#ExhibitioniCon').show();
        };

        if (menuType == "Information") {
            //Display Full Details
            ShowExhibition();
            $('#ExhibitioniCon').hide();
        }
        else if (menuType == "Artists") {
            //Show Artis
            //process ID Artists from
            //$("#ExhibitionsDetail").html('');

            ShowArtists();
            ShowExhibitioniCon();

        }
        else if (menuType == "ArtPieces") {
            //Show ArtPieces

            ShowArtPieces();
            ShowExhibitioniCon();
        }

    });

    $('#aBiography,#aPersonalArtPiece,#aPersonalExhibition').on('click', function (event) {
        event.preventDefault();
        //Get Attibute A data-type
        menuType = $(this).attr('data-type');

        SetActiveLeftMenu(this, 'SubMainDetail');

        //
        //
        //$("#aBiography").data("jsonobject", jsonobject);
        //$("#aPersonalArtPiece").data("atistid", 52);

        if (menuType == "Biography") {
            //Display Full Details
            //ShowExhibition();
            alert($("#aBiography").data("jsonobject"));
            ShowBiography($("#aBiography"));
        }
        else if (menuType == "PersonalArtPiece") {
            //Show Artis
            //process ID Artists from
            //$("#ExhibitionsDetail").html('');
            alert($("#aPersonalArtPiece").data("atistid"));

            //Show ArtPiece on user id
            // $('#Biography').html('');

            ShowArtPieces2();
            // ShowArtists();

        }//PersonalExhibition
        else if (menuType == "PersonalExhibition") {
            //alert('r');
            //ShowPersonalExhibitionList();
            //$("#divRightContent_SubMainDetail").html('');

            $("#Main").show();

            $("#SubMain").hide();
            $("#SubMainDetail").hide();
        }

    });

};
/*Event====================================================================*/
function ModalEvent() {

    $('.EventModal').on('click', function () {

        $('.imagepreview').attr('src', $(this).find('img').attr('src'));
        $('#imagemodal').modal('show');
    });

}

function EventExhibition() {
    $('.EventExhibition').on('click', function () {

        Preload();

        $('#Main').hide();
        $('#SubMain').show();

        ShowExhibition();
        //Get FormCurent Id
        //var msg = CurrentListData[0];

        //var template = $('#ExhibitionsDetailTemplate').html();
        //Mustache.parse(template);   // optional, speeds up future uses

        //var rendered = Mustache.render(template, { Data: msg });
        //$('#divExhibition').html('');
        //$('#divExhibition').html(rendered);
    });

}

function ShowExhibition() {

    var msg = CurrentListData[0];

    var template = $('#ExhibitionsDetailTemplate').html();
    Mustache.parse(template);   // optional, speeds up future uses

    var rendered = Mustache.render(template, { Data: msg });
    $('#divRightContent').html('');
    $('#divRightContent').html(rendered).imagesLoaded().then(function () {
        // do stuff after images are loaded here
        LoadCompelete();
    }).fail(function () {
        // do stuff if any one of the images fails to load
        LoadCompelete();
    });
}

function ShowPersonalExhibitionList() {

    var msg = CurrentListData[0];

    var template = $('#ExhibitionsDetailTemplate').html();
    Mustache.parse(template);   // optional, speeds up future uses

    var rendered = Mustache.render(template, { Data: msg });
    $('#divRightContent').html('');
    $('#divRightContent').html(rendered).imagesLoaded().then(function () {
        // do stuff after images are loaded here
        LoadCompelete();
    }).fail(function () {
        // do stuff if any one of the images fails to load
        LoadCompelete();
    });
}

function ShowArtists() {
    var msg = CurrentListData[0];

    var url = 'ArtistService?id=99';

    CallServices(url, '', true, function (msg) {
        console.log(msg);
        if (msg.length > 0) {    /*Show Event By Navigation*/
            var template = $('#ArtistsTemplate').html();
            Mustache.parse(template);   // optional, speeds up future uses

            var data = msg[0];
            //convert Data
            var arrayPosition = 0;

            for (var key in data) {

                //preFixLang
                //var preFixLang = 'En';
                data[key]["name"] = data[key]["name" + preFixLang];
                data[key]["description"] = data[key]["description" + preFixLang];

                //data[key]["JsonObject"] = btoa(data[key]);
                //console.log("JsonObject");
                var JsonObject = Base64.encode(JSON.stringify(data[key]));

                //alert(a);
                data[key]["JsonObject"] = JsonObject;

                var ImageUmbracoString = data[key]["image"];
                if (ImageUmbracoString != undefined) {
                    data[key]["imageCropUrl"] = UmbracoImageUrl(ImageUmbracoString);
                }
                data[key]["id"] = arrayPosition;
                arrayPosition = arrayPosition + 1;
            }
            //

            var rendered = Mustache.render(template, { Data: data });
            $('#divRightContent').html('');
            $('#divRightContent').html(rendered).imagesLoaded().then(function () {
                // do stuff after images are loaded here

                //Fix matchHeight Higt
                $('#Artists').each(function () {
                    $(this).children('.matchHeight').matchHeight({
                        property: 'min-height'
                    });
                });

                LoadCompelete();
            });

        } else {
            /*Display No data Display*/
            var template = $('#NoEventTemplate').html();
            var rendered = Mustache.render(template);
            $('#divRightContent').html('');
            $('#divRightContent').html(rendered);
        }

    });
}

function ShowArtPieces() {

    var msg = CurrentListData[0];
    var ListOfartist = msg.artist;
    var url = 'ArtPiecesService?id=99';

    CallServices(url, '', true, function (msg) {

        if (msg.length > 0) {    /*Show Event By Navigation*/
            var template = $('#ArtPiecesTemplate').html();
            Mustache.parse(template);   // optional, speeds up future uses

            var data = msg[0];
            //convert Data
            var arrayPosition = 0;
            for (var key in data) {
                //preFixLang
                //var preFixLang = 'En';
                data[key]["name"] = data[key]["name" + preFixLang];

                var ImageUmbracoString = data[key]["image"];
                if (ImageUmbracoString != undefined) {
                    data[key]["imageCropUrl"] = UmbracoImageUrl(ImageUmbracoString);
                }
                data[key]["id"] = arrayPosition;
                arrayPosition = arrayPosition + 1;
            }
            //

            var rendered = Mustache.render(template, { Data: data });
            $('#divRightContent').html('');
            $('#divRightContent').html(rendered).imagesLoaded().then(function () {
                // do stuff after images are loaded here

                //Fix matchHeight Higt
                //$('#ArtPieces').each(function () {
                //    $(this).children('.matchHeight').matchHeight({
                //        //property: 'min-height'
                //        byRow: true,
                //        //property: 'height',
                //        target: null,
                //        remove: false
                //    });
                //});

                LoadCompelete();
            });

        } else {
            /*Display No data Display*/
            var template = $('#NoEventTemplate').html();
            var rendered = Mustache.render(template);
            $('#divRightContent').html('');
            $('#divRightContent').html(rendered);
        }

    });

    //ArtistService

    //var template = $('#ArtistsTemplate').html();
    //Mustache.parse(template);   // optional, speeds up future uses

    //var rendered = Mustache.render(template, { Data: msg });
    //$('#divRightContent').html('');
    //$('#divRightContent').html(rendered);
}

function ShowArtPieces2() {

    var msg = CurrentListData[0];
    var ListOfartist = msg.artist;
    var url = 'ArtPiecesService?id=99';

    CallServices(url, '', true, function (msg) {

        if (msg.length > 0) {    /*Show Event By Navigation*/
            var template = $('#ArtPiecesTemplate').html();
            Mustache.parse(template);   // optional, speeds up future uses

            var data = msg[0];
            //convert Data
            var arrayPosition = 0;
            for (var key in data) {
                //preFixLang
                //var preFixLang = 'En';
                data[key]["name"] = data[key]["name" + preFixLang];

                var ImageUmbracoString = data[key]["image"];
                if (ImageUmbracoString != undefined) {
                    data[key]["imageCropUrl"] = UmbracoImageUrl(ImageUmbracoString);
                }
                data[key]["id"] = arrayPosition;
                arrayPosition = arrayPosition + 1;
            }
            //

            var rendered = Mustache.render(template, { Data: data });
            $('#divRightContent_SubMainDetail').html('');
            $('#divRightContent_SubMainDetail').html(rendered).imagesLoaded().then(function () {
                // do stuff after images are loaded here

                //Fix matchHeight Higt
                //$('#ArtPieces').each(function () {
                //    $(this).children('.matchHeight').matchHeight({
                //        //property: 'min-height'
                //        byRow: true,
                //        //property: 'height',
                //        target: null,
                //        remove: false
                //    });
                //});

                LoadCompelete();
            });

        } else {
            /*Display No data Display*/
            var template = $('#NoEventTemplate').html();
            var rendered = Mustache.render(template);
            $('#divRightContent_SubMainDetail').html('');
            $('#divRightContent_SubMainDetail').html(rendered);
        }

    });

    //ArtistService

    //var template = $('#ArtistsTemplate').html();
    //Mustache.parse(template);   // optional, speeds up future uses

    //var rendered = Mustache.render(template, { Data: msg });
    //$('#divRightContent').html('');
    //$('#divRightContent').html(rendered);
}

/*Level2*/
function ShowBiography(aTag) {
    // alert('333');

    $("#SubMain").hide();
    $("#SubMainDetail").show();
    //<a href="#" id="aBiography" data-type="Biography" class="list-group-item active">Biography</a>
    //         <a href="#" id="aPersonalArtPiece" data-type="PersonalArtPiece" data-atistNodeID="" class="list-group-item">Art Piece</a>

    var jsonobject = $(aTag).data("jsonobject");

    $("#aBiography").data("jsonobject", jsonobject);
    $("#aPersonalArtPiece").data("atistid", 52);

    //Set Json To left Menu

    var jsonstring = Base64.decode(jsonobject);

    //var json = JSON.stringify(eval("(" + aaaaa + ")"));
    var data = JSON.parse(jsonstring);

    //preFixLang
    //var preFixLang = 'En';
    data["name"] = data["name" + preFixLang];
    data["description"] = data["description" + preFixLang];

    //<p>{{name}}</p>
    //<p>{{__Raw_biography}}</p>
    //<p>{{description}} </p>
    data["__Raw_biography"] = data["__Raw_biography" + preFixLang];
    data["description"] = data["description" + preFixLang];

    var ImageUmbracoString = data["image"];
    if (ImageUmbracoString != undefined) {
        data["imageUrl"] = UmbracoImageUrl(ImageUmbracoString);
    }

    var template = $('#BiographyTemplate').html();
    Mustache.parse(template);   // optional, speeds up future uses

    var rendered = Mustache.render(template, { Data: data });
    $('#divRightContent_SubMainDetail').html('');
    $('#divRightContent_SubMainDetail').html(rendered).imagesLoaded().then(function () {
        // do stuff after images are loaded here
        //
        //Fix matchHeight Higt
        //$('#Artists').each(function () {
        //    $(this).children('.matchHeight').matchHeight({
        //        property: 'min-height'
        //    });
        //});

        //LoadCompelete();
    });
    //call data artist by node

}

var PageIndex = '1';
var PageSize = '10';
var menuType = '';
var CurrentListData;

function RenderList() {

    //Render List
    var url = 'RazorJson?page=' + PageIndex + '&Type=' + menuType;
    Preload();
    CallServices(url, '', true, function (msg) {

        //Reder Data ListTemplate
        //console.log(msg);

        CurrentListData = ConvertDataByLanguage(msg[0]);
        SetList(CurrentListData);

        SetPagger(msg[1].RecordCount);

        //Create Event in list
        if (msg[0].length > 0) {
            ModalEvent();

            EventExhibition();
        }
    });

}

/*Render Data*/
function SetList(msg) {
    if (msg.length > 0) {    /*Show Event By Navigation*/
        var template = $('#ListTemplate').html();
        Mustache.parse(template);   // optional, speeds up future uses

        //msg = ConvertDataByLanguage(msg);

        var rendered = Mustache.render(template, { Data: msg });
        $('#divList').html('');
        $('#divList').html(rendered).html(rendered).imagesLoaded().then(function () {
            // do stuff after images are loaded here
            LoadCompelete();
        });
        //.fail(function () {
        //    // do stuff if any one of the images fails to load
        //    LoadCompelete();
        //});

    } else {
        /*Display No data Display*/
        var template = $('#NoEventTemplate').html();
        var rendered = Mustache.render(template);
        $('#divList').html('');
        $('#divList').html(rendered).imagesLoaded().then(function () {
            // do stuff after images are loaded here
            LoadCompelete();
        });
    }

}

//Set Pagger
function SetPagger(RecordCount) {

    if (RecordCount == 0) {
        $('#ulpage').hide();
        return;
    }
    else {
        $('#ulpage').show();
    }
    $('#ulpage').pagination({
        items: RecordCount,
        itemsOnPage: PageSize,

        //prevText: '<img class="iconDirection" src="Images/1457020750_arrow-left-01.svg" />',
        //nextText: '<img class="iconDirection" src="Images/1457020740_arrow-right-01.svg" />',

        prevText: lblPrev,
        nextText: lblNext,
        currentPage: PageIndex,//cssStyle: 'light-theme',
        onPageClick: function (event) {

            //Set Global Page
            if (event < 10) {
                PageIndex = '0' + event;
            }
            else {
                PageIndex = event;
            }
            //-Set Global Page
            RenderList();
        }

    });

}

/*Convert Data*/
function ConvertDataByLanguage(data) {
    var arrayPosition = 0;
    for (var key in data) {
        //preFixLang
        //var preFixLang = 'En';
        data[key]["name"] = data[key]["name" + preFixLang];
        data[key]["title"] = data[key]["title" + preFixLang];
        data[key]["introduction"] = data[key]["introduction" + preFixLang];
        data[key]["content"] = data[key]["content" + preFixLang];

        var ImageUmbracoString = data[key]["logo"];

        data[key]["logoUrl"] = UmbracoImageUrl(ImageUmbracoString);

        data[key]["id"] = arrayPosition;
        arrayPosition = arrayPosition + 1;
    }

    return data;
}
