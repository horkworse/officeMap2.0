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

	if (isset($request['isUser'])) {
		if (isset($_SESSION['user'])) 
			echo json_encode($_SESSION['user']);
		else 
			echo json_encode(false);			
		exit;
	}

	if (isset($request['logout'])) {
		unset($_SESSION['user']);
		exit;
	}

	if (isset($request['update']))  {
        echo json_encode(update($pdo, $request['data']));
        exit;
	}
	
	if (isset($request['search']))  {
        echo json_encode(search($pdo, $request['data']));
        exit;
	}

	if (isset($request["status"])) {
		$data = [
			'id' => $request['id'],
			'status' => $request['status']
		];
        updateStatus($pdo, $data);
        exit;
	}

	if (isset($request['user'])) {
		$email = $request['email'];
		$password = $request['password'];
		echo json_encode(signIn($pdo, $email, $password));
		exit;
	}

	if (isset($request['getStatus'])) {
		echo json_encode(getStatuses($pdo));
		exit;
	}
	
	if(isset($_POST["image"])) {
		file_put_contents($_SERVER['DOCUMENT_ROOT'] . '/images/users/avatar'. $_POST['id'] .'.png', base64_decode(explode(",", explode(";", $_POST["image"])[1])[1]));
	}
?>
