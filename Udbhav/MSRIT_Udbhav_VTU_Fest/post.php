<?php
session_start();
$result;
if(isset($_SESSION['name']) && isset($_POST["message"]))
{
    $text = $_POST['message'];     
    $fp = fopen("log.html", 'a');
    fwrite($fp, "<div class='msgln'><b>".$_SESSION['name']."</b>: ".stripslashes(htmlspecialchars($text))."<br></div>");
    fclose($fp);
	$result = $text;
}
else
{
	$fp = fopen("log.html", 'a');
    fwrite($fp, "<div class='msgln'><b>"."Message could not be sent"."<br></div>");
    fclose($fp);
	$result = "failure";
}
echo $result;
?>