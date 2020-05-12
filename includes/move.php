<?php
	require_once 'functions.php';

	echo json_encode(getStatuses($pdo));

?>
