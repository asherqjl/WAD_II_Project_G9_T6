<?php
require_once 'common.php';
$status = false;
$result = [];
if( isset($_REQUEST['loginEmail']) && isset($_REQUEST['loginPwd']) ) {
    $password = $_REQUEST['loginPwd'];
    $email = $_REQUEST['loginEmail'];

    $dao = new PostDAO();
    $status = $dao->register($email,$password);
}
if ($status)
    $result["status"] = "Registered successfully";
else 
    $result["status"] = "Registration fail";

$postJSON = json_encode($result);
echo $postJSON;
?>


