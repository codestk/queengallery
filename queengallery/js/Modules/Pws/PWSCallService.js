//*======================================Call Service==============================================================================================
var ShowError = false;
//Url ManageUsers.aspx/SearchEmployee
//data "{ssss:1,ddddd:1}"
//for Call Back    CallServices(Url, parameter, true, function(myRtn) {});
var processing = false;
function CallServices(url, data, async, callBack) {
    if (processing == true) {
        return;
    }
    processing = true;
    $.ajax({
        type: "POST",
        dataType: "json",
        beforeSend: function (jqXHR, settings) {
            // console.log(jqXHR.progress)
        },
        url: url,
        data: data,
        contentType: "application/json; charset=utf-8",
        async: async,
        success: function (msg) {
            output = msg;
            processing = false;
            return callBack(msg);
        }
        , error: function (jqXHR, textStatus, errorThrown) {
            //fix bug error not set false
            processing = false;
            if (ShowError == true)

                alert(errorThrown);

            // return callBack(jqXHR.status);
        }
        , complete: function (jqXHR, textStatus) {
            processing = false;
            if (ShowError == true)
                alert(textStatus);
        }
    });  //.ajax
}