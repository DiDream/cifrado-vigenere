'use strict'
var alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
function extendKey(message,key){
    while(key.length < message.length){
        key += key;
    }
    return key;
}
function renderOperation(msgChar, numMsg, keyChar, numKey, resChar, numRes){
    var html = `
        <div class="operation">
            <div class="char-box char-message">
                <span class="char">${msgChar} </span>
                <span class="number">${numMsg}</span>
            </div>
            <div class="char-box char-key">
                <span class="char">${keyChar} </span>
                <span class="number">${numKey} </span>
            </div>
            <div class="char-box char-result">
                <span class="char">${resChar} </span>
                <span class="number">${numRes} </span>
            </div>
        </div>
    `;
    $('#operations').append(html);

}
function VigenereEncryption(message, key){
    $('#modal #box h2').text('CIFRAR');

    var encryptedMessage='';
    for(var i=0; i<message.length; i++){
        var numberMessage = alfabeto.indexOf(message[i]);
        var numberKey = alfabeto.indexOf(key[i]);
        var newChar = ( numberMessage + numberKey)%alfabeto.length;
        encryptedMessage += alfabeto[newChar];

        renderOperation(message[i], numberMessage,key[i], numberKey, encryptedMessage[i], newChar);

    }

    return encryptedMessage;
}
function VigenereDecryption(message, key){
    $('#modal #box h2').text('DESCIFRAR');
    var decryptedMessage='';
    for(var i=0; i<message.length; i++){
        var numberMessage = alfabeto.indexOf(message[i]);
        var numberKey = alfabeto.indexOf(key[i]);
        var newChar = (numberMessage - numberKey + alfabeto.length) % alfabeto.length;
        decryptedMessage += alfabeto[newChar];
        renderOperation(message[i],numberMessage,key[i], numberKey, decryptedMessage[i], newChar);
    }

    return decryptedMessage;
}
$('#encrypt, #decrypt').on('click',function(e){
    var mensaje = $('#message').val().replace(/\s/g, '').toUpperCase();
    var key = $('#key').val().replace(/\s/g, '').toUpperCase();

    if(mensaje=='') alert('Inserte un mensaje');
    else if (key=='')  alert('Inserte una clave');
    else {
        key = extendKey(mensaje, key);
        $('#operations').empty();
        $('.result').text(e.target.id=='encrypt'?
                    VigenereEncryption(mensaje, key):
                    VigenereDecryption(mensaje, key));
    }

})
