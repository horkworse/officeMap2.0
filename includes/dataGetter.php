<?php
	require_once 'functions.php';
	$dataSet = [
		'floor' => getCurrentFloor($pdo, 1),
		'rooms' => getRoomsOnCurrentFloor($pdo, 1),
		'desks' => getDesksOnCurrentFloor($pdo, 1)
	];	
	echo json_encode($dataSet);
?>