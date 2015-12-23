function sendRequest() {
    var username= document.getElementById("rollno").value;
    var password= document.getElementById("pwd").value;
    console.log(username);
    var params="rollno="+username+"&pwd="+password;
    var url="https://www.iitm.ac.in/viewgrades/studentauth/login.php";


    var xhr = new XMLHttpRequest();    
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // innerText does not let the attacker inject HTML elements.
        document.getElementById("resp").innerText = xhr.responseText;
      }
      else{
        document.getElementById("resp").innerText = "Failed to get Response";
      }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-length", params.length);
    xhr.setRequestHeader("Connection", "close");
    xhr.send(params);
}

document.addEventListener('DOMContentLoaded', function () {

var username= document.getElementById("rollno");
var password= document.getElementById("pwd");
document.getElementById("submit").addEventListener("click",sendRequest);

});