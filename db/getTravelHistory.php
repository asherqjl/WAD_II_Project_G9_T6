<?php
require_once 'common.php';
$dao = new PostDAO();
$posts = $dao->getAllTravel($email); // Get an Indexed Array of Post objects

$items = [];
foreach( $posts as $post_object ) {
    $item = [];
    $item["longtitude"] = $post_object->getLongtitude();
    $item["latitude"] = $post_object->getLatitude();
    $item["time_visited"] = $post_object->getTime();
    $items[] = $item;
}
// make posts into json and return json data
$postJSON = json_encode($items);
echo $postJSON;
?>
