function sendRequest() {
    var username= document.getElementById("rollno").value;
    var password= document.getElementById("pwd").value;
    console.log(username);
    var params="rollno="+username+"&pwd="+password;
    var url="https://www.iitm.ac.in/viewgrades/studentauth/login.php";
    var url1="https://www.iitm.ac.in/viewgrades/studentauth/studopts2.php"

    var xhr = new XMLHttpRequest(); 
    var http = new XMLHttpRequest();   
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // innerText does not let the attacker inject HTML elements.
        document.getElementById("resp").innerText = xhr.responseText;

        http.onreadystatechange=function(){
          if (http.readyState == 4) {
                    // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({'value':http.responseText}, function() {
          // Notify that we saved.
          console.log('Settings saved');
        });
          }
          else{
            document.getElementById("resp1").innerText = "Failed to get Response inside";
          }
        };
        http.open("GET",url,true);
        http.send();

      }
      else{
        document.getElementById("resp").innerText = "Failed to get Response";
      }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
}

document.addEventListener('DOMContentLoaded', function () {

var username= document.getElementById("rollno");
var password= document.getElementById("pwd");
document.getElementById("submit").addEventListener("click",sendRequest);

});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
  }
});