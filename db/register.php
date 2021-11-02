<?php
require_once 'common.php';
$status = false;
$result = [];
if( isset($_REQUEST['cfmPwd']) && isset($_REQUEST['userEmail']) && isset($_REQUEST['category']) ) {
    $password = $_REQUEST['cfmPwd'];
    $email = $_REQUEST['userEmail'];

    $dao = new PostDAO();
    $status = $dao->add(1, $location, $time, $category);
}
if ($status)
    $result["status"] = "Registered successfully";
else 
    $result["status"] = "Registration fail";

$postJSON = json_encode($result);
echo $postJSON;
?>


