<?php
require_once 'common.php';
$dao = new PostDAO();
$travel_history = $dao->getAll(); // Get an Indexed Array of Post objects

$items = [];
foreach( $travel_history as $place ) {
    $item = [];
    $item["id"] = $post_object->getID();
    $item["subject"] = $post_object->getSubject();
    $item["entry"] = $post_object->getEntry();
    $item["mood"] = $post_object->getMood();
    $items[] = $item;
}
// make posts into json and return json data
$postJSON = json_encode($items);
echo $postJSON;
?>

