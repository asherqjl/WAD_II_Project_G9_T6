<?php

class Post {
    private $longtitude;
    private $latitude;
    private $time_visited;


    public function __construct($longtitude, $latitude, $time_visited) { 
        $this->longtitude = $longtitude;
        $this->latitude= $latitude;
        $this->time_visited = $time_visited;
    }


    public function getLongtitude() {
        return $this->longtitude;
    }

    public function getLatitude() {
        return $this->latitude;
    }

    public function getTime() {
        return $this->time_visited;
    }


}

?>