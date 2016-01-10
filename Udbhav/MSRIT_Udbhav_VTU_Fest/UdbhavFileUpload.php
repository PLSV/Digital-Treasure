<?php
ini_set('upload_max_filesize', '6400M');
ini_set('post_max_size', '4096M');
ini_set('max_input_time', '10800');
ini_set('max_execution_time', '10800');

$target = "MSRIT_Audition_Uploads/";
$response = array();
$server_IP = gethostbyname(gethostname());
$file_upload_url = 'http://'.$server_IP.'/'.'MSRIT_Udbhav_VTU_Fest'.'/'.$target;
if(isset($_FILES['image']['name']))
{
	$target = $target.basename($_FILES['image']['name']);
	$response['file_name'] = basename($_FILES['image']['name']);
	try
	{
		if(!move_uploaded_file($_FILES['image']['tmp_name'], $target))
		{
			$response['error'] = true;
            $response['message'] = 'Could not move the file!';
			echo 'Could not move the file!';
		}
		$response['message'] = 'File uploaded successfully!';
        $response['error'] = false;
        $response['file_path'] = $file_upload_url.basename($_FILES['image']['name']);
		echo 'File uploaded successfully!';
	}
	catch (Exception $e)
	{
        $response['error'] = true;
        $response['message'] = $e->getMessage();
		echo $e->getMessage();
    }	
}
else
{
    $response['error'] = true;
    $response['message'] = 'Not received any file!!!';
	echo $response['message'];
}
//echo json_encode($response);
// 192.168.0.106 IPv4 address
?>
