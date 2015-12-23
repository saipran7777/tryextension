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
            document.getElementById("resp1").innerText = http.responseText;
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