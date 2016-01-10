<html>
<head>
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</head>
<body>
<?php session_start(); ?>
<script>
$(document).ready(function()
{
	$("#udbhav").submit(function()
	{
		//window.sessionStorage.setItem("USN",$("#U").val());
		<?php $_SESSION["MSRIT_USN"]= echo "<script>$(\"#U\").val()</script>" ?>
		$.ajax(
		{
			type: "POST",
			url: "Udbhav_Insert_Into_Students.php", //Relative or absolute path to response.php file
			datatype: "json",
			data:$("#udbhav").serializeArray(),
			success: function(data) 
			{
				JSONObj = jQuery.parseJSON(data);
				if(JSONObj.success == 1)
				{
					$("#result").html(JSONObj.message);
					//window.location.href = "ActivityRegistration.html";
					window.open("ActivityRegistration.html");
				}
			},
			error: function(ts)
			{
				$("#result").html("failure reason:"+ts.responseText);
			}
		});
		return false;
	});
});
</script>
<div class="container">
<form id="udbhav" method="POST">
<fieldset>
<div class="row">
<div class="col-sm-2">First Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
<div class="col-sm-8"><input type="text" class="form-control" id="FN" name="FName" required></div>
</div>
<br />
<div class="row">
<div class="col-sm-2">Middle Name:&nbsp;&nbsp;&nbsp;&nbsp;</div>
<div class="col-sm-8"><input type="text" class="form-control" id="MI" name="MInit"></div>
</div>
<br />
<div class="row">
<div class="col-sm-2">Last Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> 
<div class="col-sm-8"><input type="text" class="form-control" id="LN" name="LName" required></div>
</div>
<br />
<div class="row">
<div class="col-sm-2">USN:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
<div class="col-sm-8"><input type="text" class="form-control" id="U" name="USN" required></div>
</div>
<br />
<div class="row">
<div class="col-sm-2">Semester:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
<div class="col-sm-8"><input type="number" class="form-control" id="S" name="Semester" min="1" max="8" required></div>
</div>
<br />
<div class="row">
<div class="col-sm-2">Department:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> 
<div class="col-sm-8"><input type="text" class="form-control" id="D" name="Department" required></div>
</div>
<br />
<input type="submit" id="submit" class="btn btn-primary" name="submit">
</fieldset>
</form>
<div id="result"></div>
</div>
</body>
</html>