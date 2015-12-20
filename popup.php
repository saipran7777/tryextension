<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
echo function_exists('curl_version')?'Yes':'No';
$username=$_POST["rollno"];
$password=$_POST["pwd"];
$url="https://www.iitm.ac.in/viewgrades/studentauth/login.php";
$postinfo = "rollno=".$username."&pwd=".$password;

$ch = curl_init("");

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postinfo);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$html = curl_exec($ch);
curl_close($ch);
echo $html;
if ($html == "OK") {
	echo "success";
	echo $html;
}
else {
	echo "failed";
}
?>