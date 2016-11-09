

// ImageObject.src + "?anchor=center&mode=crop&width=120&height=120";
function UmbracoImageUrl(ImageObjectString, imageType)
{
    var UmbracoImageObject = ConvertStringImageToJson(ImageObjectString);
    var url = '';
     
    if (imageType == undefined)
    {
        url = UmbracoImageObject.src;
        return url;
    }
    function selectImageType(imgObj) {
        return imgObj.crops.filter(
            function (imgObj) { return imgObj.alias == imageType }
        );
    }
   
    var img = selectImageType(UmbracoImageObject);
    url = UmbracoImageObject.src + "?anchor=center&mode=crop&width=" + img[0].width + "&height=" + img[0].height;
    return url;

}


function UmbracoFileName(ImageObjectString) {
    
    var filename = '';
    var UmbracoImageObject = ConvertStringImageToJson(ImageObjectString);
    //ImageObject.src.substring(ImageObject.src.lastIndexOf('/') + 1);
    filename = UmbracoImageObject.src.substring(UmbracoImageObject.src.lastIndexOf('/') + 1);
    return filename;

}
//ใช้ สำหรับ Convent Image Type
function ConvertStringImageToJson(ImageObjectString) {
    var data = '{' + ImageObjectString.slice(1, -1) + '}';

    var ImageObj = JSON.stringify(eval("(" + data + ")"));

    var json = JSON.parse(ImageObj);

    return json;
}
