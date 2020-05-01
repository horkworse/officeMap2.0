<?php
	require_once 'functions.php';

	$request = json_decode(file_get_contents('php://input'), true);

	if (isset($request['desks'])) {
		$dataSet = [
			'floor' => getCurrentFloor($pdo, 1),
			'rooms' => getRoomsOnCurrentFloor($pdo, 1),
			'desks' => getDesksOnCurrentFloor($pdo, 1),
			'users' => getAllUsers($pdo)
		];	
		echo json_encode($dataSet);
		exit();
	}

	if (isset($request['isUser']))
	{
		if (isset($_SESSION['user'])) 
			echo json_encode($_SESSION['user']);
		else 
			echo json_encode(false);			
		exit;
	}

	if (isset($request['logout']))
	{
		unset($_SESSION['user']);
		exit;
	}

	if (isset($request['update'])) 
	{
        echo json_encode(update($pdo, $request['data']));
        exit;
	}

	if (isset($_POST))
        updateStatus($pdo, $_POST);

	if (isset($request['user']))
	{
		$email = $request['email'];
		$password = $request['password'];
		echo json_encode(signIn($pdo, $email, $password));
		exit;
	}

	if ($_FILES) {
		$path = $_SERVER['DOCUMENT_ROOT'] . "/images/users/";
		$name = $_FILES['file']['name'];
		$temp = $_FILES['file']['tmp_name'];
		
		if (move_uploaded_file($temp, $path . $name)) {

			$data = [
				'id' => $_POST['id'],
				'image' => $name
			];
			updateImage($pdo, $data);
			echo $data['image'];
		}
		exit;
	}
?>