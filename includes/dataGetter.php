<?php
require_once 'functions.php';
echo json_encode(getCurrentFloor($pdo, 1));
// if (isset($_GET['floor'])) {
// 	echo json_encode(getCurrentFloor($pdo, 1));
// }
// if (isset($_GET['rooms'])) {
// 	echo json_encode(getCurrentFloor($pdo, 1));
// }
// if (isset($_GET['tables'])) {
// 	echo json_encode(getCurrentFloor($pdo, 1));
// }
?>