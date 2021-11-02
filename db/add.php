<?php
require_once 'common.php';
$status = false;
$result = [];
if( isset($_REQUEST['location']) && isset($_REQUEST['time']) && isset($_REQUEST['category']) ) {
    $location = $_REQUEST['location'];
    $time = $_REQUEST['time'];
    $category = $_REQUEST['category'];

    $dao = new PostDAO();
    $status = $dao->add(1, $location, $time, $category);
}
if ($status)
    $result["status"] = "Post added successfully";
else 
    $result["status"] = "Post was not added";

$postJSON = json_encode($result);
echo $postJSON;
?>


