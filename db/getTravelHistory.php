<?php
require_once 'common.php';
$dao = new PostDAO();
$posts = $dao->getAllTravel($email); // Get an Indexed Array of Post objects

$items = [];
foreach( $posts as $post_object ) {
    $item = [];
    $item["location_name"] = $post_object->getLocation();
    $item["time_visited"] = $post_object->getTime();
    $item["category"] = $post_object->getCategory();
    $items[] = $item;
}
// make posts into json and return json data
$postJSON = json_encode($items);
echo $postJSON;
?>
