<?php 
include 'Udbhav_Config.php';
session_start();
$response = array();
if(isset($_POST["FName"]) && isset($_POST["LName"]) && isset($_POST["USN"]) && isset($_POST["Coll_ID"]))
{
	$_SESSION["NON_MSRIT"]=$_POST["USN"];
	$_SESSION["MSRIT"]="N/A";
	$conn = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_error());
	$sql = "INSERT INTO non_msrit_students(FName, MInit, LName, USN, Coll_ID, PhoneNo) VALUES ('".$_POST["FName"]."','".$_POST["MInit"]."','".$_POST["LName"]."','".$_POST["USN"]."','".$_POST["Coll_ID"]."','".$_POST["PhoneNo"]."')";
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