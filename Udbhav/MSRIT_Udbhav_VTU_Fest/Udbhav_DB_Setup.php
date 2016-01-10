<?php
$conn;
class DB_UDBHAV
{
    function __construct()
	{
        $this->connect();
    }
    function __destruct()
	{
        $this->close();
    }
    function connect()
	{        
        include 'Udbhav_Config.php';
		global $conn;
        $conn = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD) or die(mysqli_error());
        $db = mysqli_select_db($conn,DB_DATABASE) or die(mysqli_error()) or die(mysqli_error());
		/*if(!$conn)
		{
			echo "connection failed";
		}
		else
		{
			echo "connection successful :P :P";
		}*/
        return $conn;
    }
    function close()
	{
		global $conn;
        mysqli_close($conn);
    }
}
?>