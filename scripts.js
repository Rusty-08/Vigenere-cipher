function handleFileSelect(evt) {
  var file = evt.target.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    document.getElementById('plaintext').value = contents;
  };
  reader.readAsText(file);
}
document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

function encrypt() {
  var plaintext = document.getElementById('plaintext').value.toLowerCase();
  var keyword = document.getElementById('keyword').value.toLowerCase();
  var ciphertext = '';
  var keywordIndex = 0;
  for (var i = 0; i < plaintext.length; i++) {
    var charCode = plaintext.charCodeAt(i);
    if (charCode >= 97 && charCode <= 122) {
      var keywordChar = keyword.charAt(keywordIndex);
      var keywordCharCode = keywordChar.charCodeAt(0) - 97;
      var encryptedCharCode = ((charCode - 97 + keywordCharCode) % 26) + 97;
      ciphertext += String.fromCharCode(encryptedCharCode);
      keywordIndex++;
      if (keywordIndex === keyword.length) {
        keywordIndex = 0;
      }
    } else {
      ciphertext += plaintext.charAt(i);
    }  
}
    document.getElementById('result').value = ciphertext;
    document.getElementById('downloadEncrypt').href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(ciphertext);
    document.getElementById('downloadEncrypt').download = 'encrypted.txt';

}
function decrypt() {
  var ciphertext = document.getElementById('plaintext').value.toLowerCase();
  var keyword = document.getElementById('keyword').value.toLowerCase();
  var plaintext = '';
  var keywordIndex = 0;
  for (var i = 0; i < ciphertext.length; i++) {
    var charCode = ciphertext.charCodeAt(i);
    if (charCode >= 97 && charCode <= 122) {
      var keywordChar = keyword.charAt(keywordIndex);
      var keywordCharCode = keywordChar.charCodeAt(0) - 97;
      var decryptedCharCode = ((charCode - 97 - keywordCharCode + 26) % 26) + 97;
      plaintext += String.fromCharCode(decryptedCharCode);
      keywordIndex++;
      if (keywordIndex === keyword.length) {
        keywordIndex = 0;
      }
    } else {
      plaintext += ciphertext.charAt(i);
    }  
}
    document.getElementById('result').value = plaintext;
    document.getElementById('downloadDecrypt').href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(plaintext);
    document.getElementById('downloadDecrypt').download = 'decrypted.txt';

}
