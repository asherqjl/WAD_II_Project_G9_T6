<?php

class Event {
    private $id;
    private $create_timestamp;
    private $update_timestamp;
    private $acc_email;
    private $acc_password;
    private $points;
    private $user_id;
    private $location_name;
    private $time_visited;
    private $category;


    public function __construct($location_name, $time_visited, $category) {
        $this->id= 1;
        $this->location_name = $location_name;
        $this->time_visited = $time_visited;
        $this->category= $category;

    }

    public function getID() {
        return $this->id;
    }

    public function getLocation() {
        return $this->location_name;
    }

    public function getTime() {
        return $this->time_visited;
    }

    public function getCategory() {
        return $this->category;
    }

}

?>