'use strict'
var alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
function extendKey(message,key){
    while(key.length < message.length){
        key += key;
    }
    return key;
}
function VigenereEncryption(message, key){

    var encryptedMessage='';
    for(var i=0; i<message.length; i++){
        var newChar = ( alfabeto.indexOf(message[i])+alfabeto.indexOf(key[i]) )%alfabeto.length;
        encryptedMessage += alfabeto[newChar];
    }
    return encryptedMessage;
}
function VigenereDecryption(message, key){
    var decryptedMessage='';
    for(var i=0; i<message.length; i++){
        var newChar = ( alfabeto.indexOf(message[i])-alfabeto.indexOf(key[i])+alfabeto.length) % alfabeto.length;
        decryptedMessage += alfabeto[newChar];
    }
    return decryptedMessage;
}
$('#encrypt, #decrypt').on('click',(e)=>{
    var mensaje = $('#message').val().toUpperCase();
    var key = $('#key').val().toUpperCase();

    if(mensaje=='') alert('Inserte un mensaje');
    else if (key=='')  alert('Inserte una clave');
    else {
        key = extendKey(mensaje, key);
        $('.result').text(e.target.id=='encrypt'?
                    VigenereEncryption(mensaje, key):
                    VigenereDecryption(mensaje, key));
    }

})
