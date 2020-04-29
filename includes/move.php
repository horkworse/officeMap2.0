<?php
move_uploaded_file( $_FILES['avatar']['tmp_name'], "../images/users/avatar".$_POST['user'].".png");
?>
