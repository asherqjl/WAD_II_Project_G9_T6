<?php
require_once 'common.php';
$status = false;
$result = [];
echo "2"
if( isset($_REQUEST['email']) && isset($_REQUEST['location']) && isset($_REQUEST['category']) ) {
    $email = $_REQUEST['email'];
    $location= $_REQUEST['location'];
    $category = $_REQUEST['category'];

    $dao = new PostDAO();
    $status = $dao->add($email, $location, $category);
}
if ($status)
    $result["status"] = "Post added successfully";
else 
    $result["status"] = "Post was not added";

$postJSON = json_encode($result);
echo"2";
echo $postJSON;
?>


