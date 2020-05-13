<?php
    session_start();
    require_once 'dbconnect.php';

// вернет массив кординат конкретного этажа
    function getCurrentFloor($pdo, $floorId) {
        if ($floorId == null)
            return false;

        $floor = $pdo->prepare("
            SELECT `x`,`y`
            FROM `floor_coordinates`INNER JOIN `floors` ON `floor_coordinates`.`id_floor` = `floors`.`id`
            WHERE `id_floor` = ?;
        ");

        $floor->execute([$floorId]);
        return array([
            'geometry' => [
                'coordinates' => [$floor->fetchAll(PDO::FETCH_NUM)]
            ]
        ]);
    }

// вернет массив кординат помещений на конкретном этаже
    function getRoomsOnCurrentFloor($pdo, $floorId) {
        if ($floorId == null) 
            return false;
        
        $rooms = $pdo->prepare("
            SELECT `id`, `room` as `nm`, `description` as `ds`
            FROM `rooms` 
            WHERE `id_floor` = ?;
        ");
        
        $coordinates = $pdo->prepare("
            SELECT `x`, `y`
            FROM `rooms` INNER JOIN `room_coordinates`  ON `rooms`.`id` = `room_coordinates`.`id_room`
            WHERE `rooms`.`id` = ?;
            ", array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL)
        );
        
        $rooms->execute([$floorId]);
        $rooms = $rooms->fetchAll(PDO::FETCH_ASSOC);
        $result = [];

        for ($i = 0; $i < count($rooms); $i++) {
            $result[$i]['properties'] = [
                'id' => $rooms[$i]['id'],
                'name' => $rooms[$i]['nm']
            ];

            $result[$i]['geometry']['coordinates'] = [];
            $coordinates->execute([$rooms[$i]['id']]);

            while ($row = $coordinates->fetch(PDO::FETCH_NUM, PDO::FETCH_ORI_NEXT)) {
                $result[$i]['geometry']['coordinates'][0][count($result[$i]['geometry']['coordinates'][0])] = $row;
            }
        }

        return $result;
    }

// вернет массив кординат столов на конкретном этаже
    function getDesksOnCurrentFloor($pdo, $floorId) {
        if ($floorId == null)
            return false;

        $desks = $pdo->prepare("
            SELECT `employees`.`id` AS `id`, `x`, `y`, `desks`.`image` as `image`, CONCAT(`surname`, ' ', `name`, ' ', `patronymic`) AS `user`, `social`, `employees`.`image` as `avatar`, `post`, `employees`.`status`
            FROM `employees` INNER JOIN
                (`desks` INNER JOIN `floors` ON `desks`.`id_floor` = `floors`.`id`)
            ON `employees`.`id` = `desks`.`id_employee`
            WHERE `id_floor` = ?;
            ", array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL)
        );

        $desks->execute([$floorId]);
        $result = [];
        
        while($row = $desks->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) {
            $result[count($result)] = [
                'geometry' => [
                    'coordinates' => [ $row['x'], $row['y'] ]
                ],
                'properties' => [
                    'id' => $row['id'],
                    'url' => '/images/'.$row['image'],
                    'user' => $row['user'],
                    'avatar' => $row['avatar'],
                    'post' => $row['post'],
                    'social' => $row['social'],
                    'status' => $row['status']
                ]
            ];
        }
        return $result;
    }

    function updateCordinates($pdo, $data) {
        $update = $pdo->prepare("
            UPDATE `desks` SET 
                `x` = :x,
                `y` = :y
            WHERE `id` = :id
        ;");

        $update->bindValue(':x', $data['x'], PDO::PARAM_STR);
        $update->bindValue(':y', $data['y'], PDO::PARAM_STR);
        $update->bindValue(':id', $data['id'], PDO::PARAM_STR);

        return $update->execute();
    }

// авторизация
    function signIn($pdo, $email, $password) {
        $check = $pdo->prepare('
            SELECT *
            FROM `employees`
            WHERE `email` = ?;
        ');

        $check->execute([$email]);
        $check = $check->fetch(PDO::FETCH_ASSOC);
        
        if ( password_verify($password, $check['password'])) {
            unset($check['password']);
            $_SESSION['user'] = $check;
            return $check;
        }
        else {
            return false;
        }
    }

// вернет всех пользователей + столы
    function getAllUsers($pdo) {
        $users = $pdo->query("
            SELECT `employees`.`id` AS `id`, `x`, `y`, `employees`.`image` as `image`, CONCAT(`surname`, ' ', `name`, ' ', `patronymic`) AS `user`, `employees`.`image` as `avatar`, `post`, `employees`.`status`
            FROM `employees` INNER JOIN
                (`desks` INNER JOIN `floors` ON `desks`.`id_floor` = `floors`.`id`)
            ON `employees`.`id` = `desks`.`id_employee`
        ");

        return $users->fetchAll(PDO::FETCH_ASSOC);
    }

// обновление данных юзера
    function updateUserData($pdo, $data) {
        $update = $pdo->prepare("
            UPDATE `employees` SET 
            `social`= :social, `phone`= :phone
            WHERE `id`= :id
        ;");

        $update->bindValue(':social', $data['social'], PDO::PARAM_STR);
        $update->bindValue(':phone', $data['phone'], PDO::PARAM_STR);
        $update->bindValue(':id', $data['id'], PDO::PARAM_STR);

        return $update->execute();
    }

    function updateImage($pdo, $data) {
        $updat = $pdo->prepare("
            UPDATE `employees` SET 
            `image`= :image
            WHERE `id`= :id
        ;");

        $updat->bindValue(':image', $data['image'], PDO::PARAM_STR);
        $updat->bindValue(':id', $data['id'], PDO::PARAM_STR);
        
        return $updat->execute();
    }

    function updateStatus($pdo, $data) {
        $update = $pdo->prepare("
            UPDATE `employees` SET 
                `status`= :status
            WHERE `id`= :id
        ;");

        $update->bindValue(':status', $data['status'], PDO::PARAM_STR);
        $update->bindValue(':id', $data['id'], PDO::PARAM_STR);
        
        return $update->execute();
    }

// Поиск
    function search($pdo, $data) {
        $searchStatus = $pdo->prepare("
            SELECT id, name, surname, status, post
            FROM `employees`
            WHERE `status` LIKE ? OR `name` LIKE ? OR `surname` LIKE ? OR `post` LIKE ?;
        ;");

        $searchStatus->execute([$data['key']."%",$data['key']."%",$data['key']."%",$data['key']."%"]);

        return $searchStatus->fetchAll(PDO::FETCH_ASSOC);
    }

    function getStatuses($pdo) {
        $statuses = $pdo->prepare("
            SHOW COLUMNS
            FROM `employees`
            WHERE field = ?;
        ;");

        $statuses->execute(['status']);
        $statuses = $statuses->fetch(PDO::FETCH_ASSOC);

        $result = explode(',', str_replace('\'', '', substr($statuses['Type'], 5, count($statuses['Type']) - 2)));
        return $result;
    }
?>
