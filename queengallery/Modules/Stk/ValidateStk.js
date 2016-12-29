function ImageNameValid(filename) {
    return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(filename);
}

//'JavaScriptthai@gmail.com'
function EmailValidate(email) {
    var emailFormat = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

    //Return True
    return emailFormat.test(email);;
}

//var Zipcode =  /^d{5}$/;
//    console.log(Zipcode .test('10140'));         //True
//    console.log(Zipcode .test('9999999999'));    //false
function ZipCodeValidate(ZipCode) {
    var ZipCodeFormat = /^d{5}$/;
    return ZipCodeFormat.test(ZipCode);
}