<?php
	session_start();

	// ini_set('error_reporting', E_ALL);
	// ini_set('display_errors', 1);
	// ini_set('display_startup_errors', 1);
	
	define("HOST", "localhost");
	define("DB", "OfficeMap");
	define("USER", "root");
	define("PASSWORD", "");

	$pdo = new PDO("mysql:host=" . HOST . ";dbname=" . DB . ";charset=utf8", USER, PASSWORD);
?>