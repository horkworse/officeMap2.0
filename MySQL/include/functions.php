<?php
function getTable($pdo)
{
    return $pdo->query("SELECT * FROM Employees");
}

function getRows($pdo, $param, $value)
{
    switch ($param) {
        case 'post':
            return $pdo->query('SELECT * FROM Employees WHERE post=\'' . $value . '\'');
            break;
        case 'full_name':
            return $pdo->query('SELECT * FROM Employees WHERE full_name=\'' . $value . '\'');
            break;
        case 'status':
            return $pdo->query('SELECT * FROM Employees WHERE `status`=\'' . $value . '\'');
            break;
    }
}
