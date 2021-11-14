<?php

class Account {
    private $id;
    private $acc_email;
    private $acc_password;
    private $points;


    public function __construct($acc_email, $acc_password, $points) {
        $this->id= 1;
        $this->$acc_email= $acc_email;
        $this->acc_password= $acc_password;
        $this->points= $points;
    }

    public function getID() {
        return $this->id;
    }

    public function getEmail() {
        return $this->acc_email;
    }

    public function getPassword() {
        return $this->acc_password;
    }

    public function getPoints() {
        return $this->points;
    }

}

?>