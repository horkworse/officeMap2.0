<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Карта офиса</title>
    <style>
        td {
            text-align: center;
        }

        table {
            border-collapse: collapse;
        }

        td,
        th {
            padding: 10px;
            border: 1px solid black;
        }
    </style>
</head>

<?php
require_once 'include/dbconnect.php';
require_once 'include/functions.php';

echo "<table><tr><th>id</th><th>ФИО</th><th>Должность</th><th>Статус</th></tr>";
foreach (getTable($pdo) as $row) {
    echo "<tr>";
    echo '<td>' . $row['id'] . '</td>';
    echo '<td>' . $row['full_name'] . '</td>';
    echo '<td>' . $row['post'] . '</td>';
    echo '<td>' . $row['status'] . '</td>';
}
echo "</table>";
$param = 'status';
$value = 'Работает';

echo "<br> </br>";

echo "<table><tr><th>id</th><th>ФИО</th><th>Должность</th><th>Статус</th></tr>";
foreach (getRows($pdo, $param, $value) as $row) {
    echo "<tr>";
    echo '<td>' . $row['id'] . '</td>';
    echo '<td>' . $row['full_name'] . '</td>';
    echo '<td>' . $row['post'] . '</td>';
    echo '<td>' . $row['status'] . '</td>';
}
echo "</table>";
