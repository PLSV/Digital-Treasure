<?php 
include 'Udbhav_Config.php';
session_start();
$response = array();
if(isset($_SESSION["MSRIT"]) || isset($SESSION["NON_MSRIT"]))
{
	$flag = 0;
	$conn = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_error());
	foreach($_POST as $key => $value)
	{
		$sql = "INSERT INTO participation(MSRIT_USN, NON_MSRIT_USN, Evt_Code) VALUES ('".$_SESSION["MSRIT"]."','".$_SESSION["NON_MSRIT"]."','".$value."')";
		if (!mysqli_query($conn, $sql))
		{
			$flag = 1;
			break;
		}
	}
	if($flag == 1)
	{
		$response["success"] = 0;
		$response["message"] = "Data insertion failed";
	}
	else
	{
		$response["success"] = 1;
		$response["message"] = "Data insertion successful";
	}
}
else
{
	$response["success"] = 0;
	$response["message"] = "Data Values Missing";
}
session_destroy(); 
mysqli_close($conn);
echo json_encode($response);
?>