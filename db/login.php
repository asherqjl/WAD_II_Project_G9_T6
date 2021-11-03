<?php
require_once 'common.php';

if (array_key_exists('error',$_SESSION)){
    $err = $_SESSION['error'];

    unset($_SESSION['error']);
    unset($_SESSION['user']);
}
$status = false;
$result = [];
if( isset($_REQUEST['loginEmail']) && isset($_REQUEST['loginPwd']) ) {
    $password = $_REQUEST['loginPwd'];
    $email = $_REQUEST['loginEmail'];

    $dao = new PostDAO();
    $status = $dao->login($email,$password);
    if ($status){
        session_start();
        $result["status"] = "Login successful";
        $_SESSION['user'] = $email;
    }else {
        $result["status"] = "Login Failed!";
    }
}


$postJSON = json_encode($result);
echo $postJSON;
?>


