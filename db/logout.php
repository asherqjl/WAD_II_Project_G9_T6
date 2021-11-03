
<?php

// YOUR CODE GOES HERE
session_start();
unset($_SESSION['error']);
unset($_SESSION['user']);
session_destroy();
header("Location: login.php");
exit;
?>