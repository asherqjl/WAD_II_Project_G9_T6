<?php
require_once 'common.php';
$status = false;
$result = [];
if( isset($_REQUEST['email']) && isset($_REQUEST['item_name'])  && isset($_REQUEST['img_url']) && isset($_REQUEST['points_used'])) {
    $email = $_REQUEST['email'];
    $location= $_REQUEST['item_name'];
    $category = $_REQUEST['img_url'];
    $category = $_REQUEST['points_used'];

    $dao = new PostDAO();
    $status = $dao->addReward($email, $item_name, $img_url, $points_used);
}
if ($status)
    $result["status"] = "Post added successfully";
else 
    $result["status"] = "Post was not added";

$postJSON = json_encode($result);
echo $postJSON;
?>


