// Convert numbers to words
// copyright 25th July 2006, by Stephen Chapman http://javascript.about.com
// permission to use this Javascript on your web page is granted
// provided that all of the code (including this copyright notice) is
// used exactly as shown (you can change the numbering system if you wish)

// American Numbering System
var th = ['','thousand','million', 'billion','trillion'];
// uncomment this line for English Number System
// var th = ['','thousand','million', 'milliard','billion'];

var dg = ['zero','First','Second','Third','Fourth', 'Fifth','Sixth','Seventh','Eighth','Ninth']; var tn = ['tenth','eleventh','twelveth','thirteenth', 'fourteenth','fifteenth','sixteenth', 'seventeenth','eighteenth','nineteenth']; var tw = ['twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety']; function toWords(s){s = s.toString(); s = s.replace(/[\, ]/g,''); if (s != parseFloat(s)) return 'not a number'; var x = s.indexOf('.'); if (x == -1) x = s.length; if (x > 15) return 'too big'; var n = s.split(''); var str = ''; var sk = 0; for (var i=0; i < x; i++) {if ((x-i)%3==2) {if (n[i] == '1') {str += tn[Number(n[i+1])] + ' '; i++; sk=1;} else if (n[i]!=0) {str += tw[n[i]-2] + ' ';sk=1;}} else if (n[i]!=0) {str += dg[n[i]] +' '; if ((x-i)%3==0) str += 'hundred ';sk=1;} if ((x-i)%3==1) {if (sk) str += th[(x-i-1)/3] + ' ';sk=0;}} if (x != s.length) {var y = s.length; str += 'point '; for (var i=x+1; i<y; i++) str += dg[n[i]] +' ';} return str.replace(/\s+/g,' ');}





var num = toWords(12);
console.log(num);
function sendRequest() {
    document.getElementById("resp1").innerText ="";
    var username= document.getElementById("rollno").value;
    var password= document.getElementById("pwd").value;
    console.log(username);
    var useryear = username.substring(2,4);
    console.log(useryear);
      var d = new Date();
      var year= d.getFullYear();
      currentmonth =d.getMonth();
      currentyear = year - 2000;
      var sem = 0;
      console.log(currentyear);
      if(currentmonth<=11 && currentmonth>=6){
      sem = 1 + (currentyear-useryear)*2;
      }
      else{
      sem = 2 + (currentyear-useryear)*2;
      }
      console.log(sem);
      var semname = toWords(sem);
      console.log("Current sem is"+semname);
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
            var searchto = "</table>";
            console.log(searchto);
            var str =http.responseText;
						console.log(str);
            var regex= "(?="+  semname  +").*?(?="+  searchto  +")";
            var matches_array = str.match(regex);
						console.log(matches_array);
            var credits= "Earned Credit:";
            var gpa="GPA:";
            var cgpa="CGPA:"
            var searchto1="</font>";
            var regexCredits= "(?="+  credits  +").*?(?="+  searchto1  +")";
            var regexGpa="(?="+  gpa  +").*?(?="+  searchto1  +")";
            var regexCgpa="(?="+  cgpa  +").*?(?="+  searchto1  +")";
						console.log(matches_array);
            var matches_credits = matches_array[0].match(regexCredits);
            var matches_gpa = matches_array[0].match(regexGpa);
            var matches_cgpa = matches_array[0].match(regexCgpa);

            console.log( matches_credits + matches_gpa + matches_cgpa );

            document.getElementById("resp1").innerText = http.responseText;

              // Save it using the Chrome extension storage API.
              chrome.storage.sync.set({'value':matches_credits+matches_gpa+matches_cgpa}, function() {

              // Notify that we saved.
              console.log('Settings saved');

              });

          }
          else{
        //    document.getElementById("resp1").innerText = "Failed to get Response inside";
          }
        };
        http.open("GET",url1,true);
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

