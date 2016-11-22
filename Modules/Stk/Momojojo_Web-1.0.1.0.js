// <copyright file="Momojo.js" company="CodeStk">
// Copyright (c) 2007, 2008 All Right Reserved, http://CodeStk.com/
//
// This source is subject to the Microsoft Permissive License.
// Please see the License.txt file for more information.
// All other rights reserved.
//
// THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY
// KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
// PARTICULAR PURPOSE.
//
// </copyright>
// <author>momojojo</author>
// <email>codestk@gmail.com</email>
// <date>19-07-2012</date>
// <summary>Add Function run Base on Jquery</summary>

//*======================================Manage Error
////page 'SignOff.aspx'
//function SetAjaxSignOut(page) {
//    $(document).ajaxError(function (event, request, settings) {
//
//        if (request.status == 401) {
//            //window.location = 'SignOff.aspx';
//            window.location = page;

//        }

//        //if (props.status === 401) {
//        //    location.reload();
//        //}
//    });
//}

/*========================================================Json==============================================*/

/* Create 24/01/2013
 * Json To Text Or Csv
 * objArray = JsonData.d
 */
function DownloadJSON2CSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';

        for (var index in array[i]) {
            //
            //  if(index != "__type"){
            if ((index != "__type") && (index != "LOGTIME")) {
                line += array[i][index] + ',';
            }
        }

        // Here is an example where you would wrap the values in double quotes
        // for (var index in array[i]) {
        //    line += '"' + array[i][index] + '",';
        // }

        line.slice(0, line.Length - 1);

        str += trim(line, ',') + '\r\n';
    }

    //Fix ie
    if (navigator.appName != 'Microsoft Internet Explorer') {
        window.open('data:text/csv;charset=utf-8,' + escape(str));
    } else {
        var popup = window.open('', 'csv', '');
        popup.document.body.innerHTML = '<pre>' + str + '</pre>';
    }
    window.open("data:text/csv;charset=utf-8," + escape(str));
}

/*==============================Html===================================================================================================================================*/

/* Set HtmlString let display is Html Code
 * 14/02/2013
 * Use = HtmlStringToHtml(HtmlClass)
 */
function HtmlStringToHtml(css) {
    //$("." + css).html($("." + css).text());

    $("." + css).each(function () {
        $($(this)).html($(this).text());
    });
    //$(".example_2 .my_target_link a").each(function () {
    //    $($(this).parent()).html($(this).text());
    //});
}

/*Remove  All Html in Control
    * 14/02/2013
    Use =  removeAllHtml('Div')*/
function removeAllHtml(id) {
    $("#" + id).html($("#" + id).text());
};

/** 15/02/2013
 * highlight Wording by .class and can add option
 * var o = { words: trim($("#txtInputsearch").val(), ' ') };
 * highlight(".DivblockImage", o);
 **/
function highlight(css, options) {
    var o = {
        words: '',
        caseSensitive: false,
        wordsOnly: true,
        template: '$1<span class="highlight">$2</span>$3'
    }, pattern;
    $.extend(true, o, options || {});

    if (o.words.length == 0) {
        return;
    }
    pattern = new RegExp('(>[^<.]*)(' + o.words + ')([^<.]*)', o.caseSensitive ? "" : "ig");

    $(css).each(function () {
        var content = $(this).html();

        if (!content) return;
        $(this).html(content.replace(pattern, o.template));
    });
}

/** 25/02/2013
 * highlight Wording by add  class to txt
 * Texthighlight('cat rat map', 'map', 'higthlight');
 *
 **/
function Texthighlight(txt, words, cssClass) {
    var out = '';
    var caseSensitive = false;
    var wordsOnly = true;
    var template = '$1<span class="' + cssClass + '">$2</span>$3';
    if (words.length == 0) {
        return txt;
    }
    //pattern = new RegExp('(.*)(' + words + ')(.*)', caseSensitive ? "" : "ig");
    pattern = new RegExp('([.*]*)(' + words + ')([.*]*)', caseSensitive ? "" : "ig");

    var content = txt;
    if (!content) return;
    out = content.replace(pattern, template);

    return out;
}

/*=================================From  Usage=======================================================================================================*/

jQuery.fn.extend({
    disableSelection: function () {
        return this.each(function () {
            this.onselectstart = function () {
                return false;
            };
            jQuery(this).find('input, textarea, button, select,a').attr('disabled', 'disabled');
        });
    }
});

jQuery.fn.extend({
    EnableSelection: function () {
        return this.each(function () {
            this.onselectstart = function () {
                return false;
            };
            jQuery(this).find('input, textarea, button, select,a').removeAttr("disabled");
        });
    }
});

/** input nummerric
*  Use
* <INPUT id="txtChar" onkeypress="return isNumberKey(event)" type="text" name="txtChar">
**/
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;

    return true;
}

/*AutoClose-------------------------------------------------------------------------------------------------------
* Help
* Close Map when alter click
* $("body").click(function (event) {
*     if (event.target.nodeName == "IMG") {
*         return;
*     }
*     if ($(event.target).isOf('#divMenuCat')) {
*         return;
*     }
*     HideMenuCat();
* }
* );
**/
$.fn.isOf = function (selector) {
    if ($(this).is(selector) || $(this).parents(selector).size() > 0) {
        return true;
    }
    return false;
}

/*=================================================      Control   =====================================================================*/
//ClearInputValue("#Form1 input[type=text],#Form1 input[type=password],#Form1 input[type=checkbox],#Form1 select,#Form input[type=radio]");
function ClearInputValue(control) {
    $(control).each(function () {
        //Update radio
        if (($(this)[0].type == "text") || ($(this)[0].type == "password")) {
            $(this).val('');
        } else if ($(this)[0].type == "checkbox") {
            this.checked = false;
        } else if ($(this)[0].type == "select-one") { //For Option html or select
            $(this)[0].selectedIndex = 0;
        } else if ($(this)[0].type == "radio") { //For Option html or select
            //$(this)[0].attr("checked", false);
            //$(this)[0].removeAttr("checked");
            $(this).prop('checked', false);
        }
    });
}

//Usage
// id =customerForm
// class = .InputForm
//LockInput("customerForm input[type=text],input[type=password],input[type=checkbox],select", true);
function LockInput(control, flage) {
    // $("#x").attr('disabled', 'disabled');

    $(control).each(function () {
        if (($(this)[0].type == "button") || ($(this)[0].type == "text") || ($(this)[0].type == "password") || ($(this)[0].type == "checkbox") || $(this)[0].type == "select-one") {
            // $(this).val('');
            if (flage == true) {
                $(this).attr('disabled', 'disabled');

                //Option
                //$(this).removeClass(css);
            }
            else {
                $(this).removeAttr('disabled');

                //$(this).addClass(css);
            }
        }
    });
}

/* Create 24/01/2010 By www.javascriptthai.com
 *  Usesage $("#yourTextBoxName").ForceNumericOnly();
 */
jQuery.fn.ForceNumericOnly =
function () {
    return this.each(function () {
        $(this).keypress(function (e) {
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                //display error messages
                return false;
            }
            //return check_digit(e, this, 8, 0);
        });
    });
};

jQuery.fn.ForceNumericOnly2Digit =
function () {
    return this.each(function () {
        $(this).keypress(function (e) {
            return check_digit(e, this, 8, 2);
        });
    });
};

jQuery.fn.ForceNumericDigit =
function (digit) {
    return this.each(function () {
        $(this).keypress(function (e) {
            return check_digit(e, this, 8, 10);
        });
    });
};

function check_digit(e, obj, intsize, deczize) {
    var keycode;

    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    else return true;
    var fieldval = (obj.value);
    var dots = fieldval.split(".").length;

    var ThaiChar = (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && (!(keycode == 46)));

    if (ThaiChar) {
        return false;
    }

    if (keycode == 46) {
        if (dots > 1) {
            return false;
        } else {
            return true;
        }
    }
    if (keycode == 8 || keycode == 9 || keycode == 46 || keycode == 13) // back space, tab, delete, enter
    {
        return true;
    }
    if ((keycode >= 32 && keycode <= 45) || keycode == 47 || (keycode >= 58 && keycode <= 127)) {
        return false;
    }

    //alert(jQuery(fieldval:contains('.').length));

    if (fieldval == "0" && keycode == 48)
        return false;
    //alert(fieldval.indexOf(".") + ' - '+ fieldval.length);
    if (fieldval.indexOf(".") != -1) {
        if (keycode == 46)
            return false;
        var splitfield = fieldval.split(".");

        //alert('Spilt -> '+ splitfield[1].length);
        if (splitfield[1].length >= deczize && keycode != 8 && keycode != 0)
            return false;
    }
    else if (fieldval.length >= intsize && keycode != 46) {
        return false;
    }
    else return true;
}

/*======================================================Utility=========================================================================*/
//<a name="id3"/>
//scrollToAnchor('id3');
function scrollToAnchor(aid) {
    var aTag = $("a[name='" + aid + "']");
    $('html,body').animate({ scrollTop: aTag.offset().top }, 'slow');
}

function getPageName() {
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    return sPage;
}

function getRootWebSitePath() {
    var _location = document.location.toString();
    var applicationNameIndex = _location.indexOf('/', _location.indexOf('://') + 3);
    var applicationName = _location.substring(0, applicationNameIndex) + '/';
    var webFolderIndex = _location.indexOf('/', _location.indexOf(applicationName) + applicationName.length);
    var webFolderFullPath = _location.substring(0, webFolderIndex);

    return webFolderFullPath;
}

function Refresh(parameters) {
    location.reload();
}

//==================================================================================Url=================================================================================
/* Get Query String
* http://dummy.com/?stringtext=jquery&stringword=jquerybyexample
* var tech = GetQueryStringParams('stringtext');
* var blog = GetQueryStringParams('stringword');
*
*/
//function GetQueryString(sParam) {
//    sParam = sParam.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
//    var regex = new RegExp("[\\?&]" + sParam + "=([^&#]*)");
//    var qs = regex.exec(window.location.href);
//    if (qs == null)
//        return null;
//    return qs[1];

//    /*  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
//      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));*/

//    /* var sPageURL = window.location.search.substring(1);
//     var sURLVariables = sPageURL.split('&');

//     for (var i = 0; i < sURLVariables.length; i++)
//     {
//         var sParameterName = sURLVariables[i].split('=');
//         if (sParameterName[0] == sParam)
//         {
//             return sParameterName[1];
//         }
//     }*/
//}

//===============================================Print==============================================================================================================
/*PRint Div*/
/*
Div = id
*/
function Print(div) {
    var divToPrint = document.getElementById(div);
    var newWin = window.open('', 'Print-Window', 'width=400,height=400,top=100,left=100');
    newWin.document.open();
    newWin.document.write('<html><head>  <link href="Css/StyleSheet1.css" rel="stylesheet"><link href="Css/NonBaseStlyte.css" rel="stylesheet">  <link href="Css/CustomCss/OrdersCss.css" rel="stylesheet" /></head><body  onload="window.print()"    >' + divToPrint.innerHTML + '</body></html>');
    //newWin.document.write('<html><head>  <link href="Css/StyleSheet1.css" rel="stylesheet"></head><body   onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); }, 100);
}

/* Momojojo_Web-1.0.1.0.js
* printCanvas(el,width,height)  : el is canav item
*/
function printCanvas(el, w, h) {
    var dataUrl = document.getElementById(el).toDataURL(); //attempt to save base64 string to server using this var
    var windowContent = '<!DOCTYPE html>';
    windowContent += '<html>';
    windowContent += '<head><title>Print canvas</title></head>';
    windowContent += '<body>';
    windowContent += '<img src="' + dataUrl + '">';
    windowContent += '</body>';
    windowContent += '</html>';
    var printWin = window.open('', 'new', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no,width=' + w + ',height=' + h);
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    //printWin.focus();

    printWin.print();
    printWin.close();
    window.close();
}

/*Message Box=======================================================================================================================================*/
//Tooltip
//Obj for tooltip popup
function SetToolTip(obj, msg, aJudstTop, aJustLeft) {
    //var offset = $(obj).position();
    var offset = $(obj).offset();
    var left = (offset.left + aJustLeft);//ชิดขอบ
    var top = (offset.top + aJudstTop);//Custom

    var left = (offset.left);//ชิดขอบ
    var top = (offset.top + 30);//Custom

    //$('#divPleaseSelect').css({ zIndex: 5000, top: offset.top, left: (offset.left) + width + 10 }).fadeIn();
    //<div  class="tooltip ValidateError ">  Please Select </div>
    //var $newdiv1 = $('<div  class="tooltip ValidateError ">' + msg + '</div>');
    var $newdiv1 = $('<div  class="tooltip">' + msg + '</div>');
    $('body').append($newdiv1);

    $newdiv1.click(function () {
        //$("#tooltip").fadeOut(1000);
        $(this).fadeOut(1000);
        //this.fadeOut(1000);
        // $("#slide1").hide();
    });

    $newdiv1.css({ position: 'absolute', zIndex: 5000, top: top, left: left }).fadeIn();
}

function ClearToolTip() {
    $('.tooltip').fadeOut(1000);
}

function ClearMessageBox() {
    $('#messageBox').slideUp().remove();
    //$('#messageBox').remove();
}

var templateMessage = "<div id=messageBox class=info ><span id=textMessage class=textMessage></span></div>";

function MessageBoxBase(parameters) {
    $('#messageBox').remove();//Remove Old iitem
    $('body').append(templateMessage);
}

function MessageBoxAction(parameters) {
    $('#messageBox').hide();
    $('#messageBox').slideDown();
}
function MessageBoxSuccess(message) {
    //$('#messageBox').remove();//Remove Old iitem

    //var template = "<div id=messageBox class=success  ><span class=textMessage>" + message + " </span> </div>";
    //$('body').append(templateMessage);
    MessageBoxBase();
    $('#messageBox').addClass("success");//Add Stylte
    $('#textMessage').text(message);
    MessageBoxAction();
    //$('#messageBox').hide();
    //$('#messageBox').slideDown();

    //$('#messageBox').remove();//Remove Old iitem

    ////var template = "<div id=messageBox class=success  ><span class=textMessage>" + message + " </span> </div>";
    //$('body').append(templateMessage);

    //$('#messageBox').addClass("success");//Add Stylte
    //$('#textMessage').text(message);

    //$('#messageBox').hide();
    //$('#messageBox').slideDown();
}

function MessageBoxInfo(message) {
    //var template = "<div id=messageBox class=info ><span class=textMessage>" + message + "</span></div>";
    MessageBoxBase();
    $('#messageBox').addClass("info");//Add Stylte
    $('#textMessage').text(message);
    MessageBoxAction();
}

function MessageBoxWarning(message) {
    //var template = "<div id=messageBox class=warning ><span class=textMessage>" + message + "</span></div>";
    MessageBoxBase();
    $('#messageBox').addClass("warning");//Add Stylte
    $('#textMessage').text(message);
    MessageBoxAction();
}

function MessageBoxError(message) {
    //var template = "<div id=messageBox class=error ><span class=textMessage>" + message + "</span></div>";
    MessageBoxBase();
    $('#messageBox').addClass("error");//Add Stylte
    $('#textMessage').text(message);
    MessageBoxAction();
}

function MessageBoxValidation(message) {
    //var template = "<div id=messageBox class=error ><span class=textMessage>" + message + "</span></div>";
    MessageBoxBase();
    $('#messageBox').addClass("validation");//Add Stylte
    $('#textMessage').text(message);
    MessageBoxAction();
}