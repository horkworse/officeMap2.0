<?php
require_once 'dbconnect.php';

// вернет массив кординат всех этажей
function getAllFloors($pdo) {
    $floors = $pdo->query("
        SELECT `id`,`floor` as nm
        FROM `floors`;
    ");
    $coordinates = $pdo->prepare("
        SELECT `x`,`y`
        FROM `floor_coordinates`INNER JOIN `floors` ON `floor_coordinates`.`id_floor` = `floors`.`id`
        WHERE `id_floor` = ?;
    ");
    $floors = $floors->fetchAll(PDO::FETCH_ASSOC);
    for ($i = 0; $i < count($floors); $i++) {
        $coordinates->execute([$floors[$i]['id']]);
        $floors[$i]['cds'] = $coordinates->fetchAll(PDO::FETCH_NUM);
    }
    return $floors;
}

// вернет массив кординат конкретного этажа
function getCurrentFloor($pdo, $id) {
    if ($id == null)
        return false;
    $floor = $pdo->prepare("
        SELECT `x`,`y`
        FROM `floor_coordinates`INNER JOIN `floors` ON `floor_coordinates`.`id_floor` = `floors`.`id`
        WHERE `id_floor` = ?;
    ");
    $floor->execute([$id]);
    return $floor->fetchAll(PDO::FETCH_NUM);
}

// var_export(getCurrentFloor($pdo, 1));

// вернет массив кординат помещений на всех этажах
function getRoomsOnAllFloors($pdo) {
    $floors = $pdo->query("
        SELECT `id`,`floor` as nm
        FROM `floors`;
    ");
    $rooms = $pdo->prepare("
        SELECT `id`, `room` as `nm`, `description` as `ds`
        FROM `rooms`
        WHERE `id_floor` = ?;
    ");
    $coordinates = $pdo->prepare("
        SELECT `x`, `y`
        FROM `rooms` INNER JOIN `room_coordinates` on `rooms`.`id` = `room_coordinates`.`id_room`
        WHERE `id_room` = ?;
    ");
    $floors = $floors->fetchAll(PDO::FETCH_ASSOC);
    for ($i = 0; $i < count($floors); $i++) {
        $rooms->execute([$floors[$i]['id']]);
        $floors[$i]['rms'] = $rooms->fetchAll(PDO::FETCH_ASSOC);
        for ($j = 0; $j < count($floors[$i]['rms']); $j++) {
            $coordinates->execute([$floors[$i]['rms'][$j]['id']]);
            $floors[$i]['rms'][$j]['cds'] = $coordinates->fetchAll(PDO::FETCH_NUM);
        }
    }
    return $floors;
}

// вернет массив кординат помещений на конкретном этаже
function getRoomsOnCurrentFloor($pdo, $floor) {
    if ($floor = null) 
        return false;
    $rooms = $pdo->prepare("
        SELECT `id`, `room` as `nm`, `description` as `ds`
        FROM `rooms`
        WHERE `id_floor` = ?;
    ");
    $coordinates = $pdo->prepare("
        SELECT `x`, `y`
        FROM `rooms` INNER JOIN `room_coordinates` ON `rooms`.`id` = `room_coordinates`.`id_rooms`
        WHERE `rooms`.`id` = ?;
    ");
    $rooms->execute([$floor]);
    $rooms = $rooms->fetchAll(PDO::FETCH_ASSOC);
    for ($i = 0; $i < count($rooms); $i++) {
        $coordinates->execute([$rooms[$i]['id']]);
        $rooms[$i]['cds'] = $coordinates->fetchAll(PDO::FETCH_NUM);
    }
    return $rooms;
}

// вернет массив кординат столов на всех этажах
function getAllDesksOnAllFloors($pdo) {
    $floors = $pdo->query("
        SELECT `id`,`floor` as nm
        FROM `floors`;
    ");
    $rooms = $pdo->prepare("
        SELECT `id`, `room` as `nm`, `description` as `ds`
        FROM `rooms`
        WHERE `id_floor` = ?;
    ");
    $desks = $pdo->prepare("
        SELECT `x`, `y`
        FROM `desks` INNER JOIN `rooms` ON `desks`.`id_room` = `rooms`.`id`
        WHERE `id_room` = ?;
    ");
    $floors = $floors->fetchAll(PDO::FETCH_ASSOC);
    for ($i = 0; $i < count($floors); $i++) {
        $rooms->execute([$floors[$i]['id']]);
        $floors[$i]['rms'] = $rooms->fetchAll(PDO::FETCH_ASSOC);
        for ($j = 0; $j < count($floors[$i]['rms']); $j++) {
            $desks->execute([$floors[$i]['rms'][$j]['id']]);
            $floors[$i]['rms'][$j]['cds'] = $desks->fetchAll(PDO::FETCH_NUM);
        }
    }
    return $floors;
}

// вернет массив кординат столов конкретной комнаты
function getDesksOnCurrentRoom($pdo, $room) {
    $room = $pdo->prepare("
        SELECT `id`, `room` as `nm`, `description` as `ds`
        FROM `rooms`
        WHERE `id` = ?;
    ");
    $desks = $pdo->prepare("
        SELECT `x`, `y`
        FROM `desks` INNER JOIN `rooms` ON `desks`.`id_room` = `rooms`.`id`
        WHERE `id_room` = ?;
    ");

    $rooms->execute([$room]);
    $rooms = $rooms->fetchAll(PDO::FETCH_ASSOC);

    $desks->execute([$room['id']]);
    $rooms['dks'] = $desks->fetchAll(PDO::FETCH_NUM);
    
    return $floors;
}

// function getAllData($pdo, $room) {
//     $room = $pdo->prepare("
//         SELECT `id`, `room` as `nm`, `description` as `ds`
//         FROM `rooms`
//         WHERE `id` = ?;
//     ");
//     $desks = $pdo->prepare("
//         SELECT `x`, `y`
//         FROM `desks` INNER JOIN `rooms` ON `desks`.`id_room` = `rooms`.`id`
//         WHERE `id_room` = ?;
//     ");

//     $rooms->execute([$room]);
//     $rooms = $rooms->fetchAll(PDO::FETCH_ASSOC);

//     $desks->execute([$room['id']]);
//     $rooms['dks'] = $desks->fetchAll(PDO::FETCH_NUM);
    
//     return $floors;
// }


// имеет смысл делать функции, зависящие от этажа, ибо при многослойности этажей , будет менятся только это
?>
