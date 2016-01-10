<?php 
include 'Udbhav_Config.php';
session_start();
$response = array();
if(isset($_POST["FName"]) && isset($_POST["LName"]) && isset($_POST["USN"]) && isset($_POST["Semester"]) && isset($_POST["Department"]))
{
	$_SESSION["MSRIT"]=$_POST["USN"];
	$_SESSION["NON_MSRIT"]="N/A";
	$conn = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_error());
	$sql = "INSERT INTO msrit_students(FName, MInit, LName, USN, Semester, Department, PhoneNo) VALUES ('".$_POST["FName"]."','".$_POST["MInit"]."','".$_POST["LName"]."','".$_POST["USN"]."','".$_POST["Semester"]."','".$_POST["Department"]."','".$_POST["PhoneNo"]."')";
	if (mysqli_query($conn, $sql))
	{
		$response["success"] = 1;
        $response["message"] = "Data Successfully inserted";
        echo json_encode($response);
		//echo "Data Successfully inserted";
	}
	else
	{
		$response["success"] = 0;
        $response["message"] = "Failed to insert Data";
        echo json_encode($response);
		//echo "Failed to insert Data";
	}
	mysqli_close($conn);
}
else
{
	$response["success"] = 0;
    $response["message"] = "One or more data values missing";
    echo json_encode($response);
	//echo "One or more data values missing";
}
?>