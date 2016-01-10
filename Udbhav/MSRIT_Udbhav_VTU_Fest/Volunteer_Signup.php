<?php 
include 'Udbhav_Config.php';
session_start();
$response = array();
if(isset($_POST["V_USN"]))
{
	$conn = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_error());
	$sql = "INSERT INTO volunteering(FName, MInit, LName, Semester, V_USN, Department, Event_Code, PhoneNo) VALUES ('".$_POST["FName"]."','".$_POST["MInit"]."','".$_POST["LName"]."','".$_POST["Semester"]."','".$_POST["V_USN"]."','".$_POST["Department"]."','N/A','".$_POST["PhoneNo"]."')";
	if (mysqli_query($conn, $sql))
	{
		$response["success"] = 1;
        $response["message"] = "Data Successfully inserted";
        echo json_encode($response);
	}
	else
	{
		$response["success"] = 0;
        $response["message"] = "Failed to insert Data";
        echo json_encode($response);
	}
	mysqli_close($conn);
}
else
{
	$response["success"] = 0;
    $response["message"] = "One or more data values missing";
    echo json_encode($response);
}
?>