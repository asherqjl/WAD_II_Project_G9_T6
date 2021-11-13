<?php

require_once 'common.php';

class PostDAO {
    public function getUserInfo($id) {
        //points, username, 
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "SELECT  *
                FROM    acc
                WHERE   id = :userID"; 
        $stmt = $conn->prepare($sql);

        // STEP 3
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':userID', $id, PDO::PARAM_STR);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        // STEP 4
        $account = []; // Indexed Array of Post objects
        while( $row = $stmt->fetch() ) {
            $account[] =
                new Account(
                    $row['id'],
                    $row['acc_email'],
                    $row['acc_password'],
                    $row['points']
                    );
        }

        // STEP 5
        $stmt = null;
        $conn = null;

        // STEP 6
        return $account;
    }

    public function getAllTravel() {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "SELECT
                    location_name, time_visited, category
                FROM travel_history"; // SELECT * FROM post; // This will also work
        $stmt = $conn->prepare($sql);

        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        // STEP 4
        $travel_history = []; // Indexed Array of Post objects
        while( $row = $stmt->fetch() ) {
            $travel_history[] =
                new Post (
                    $row['location_name'],
                    $row['time_visited'],
                    $row['category']
                    );
        }

        // STEP 5
        $stmt = null;
        $conn = null;

        // STEP 6
        return $travel_history;
    }

    public function getAllRewards() {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "SELECT
                    item_name, img_url, points_used, time_redeemed
                FROM reward_history 
                "; // SELECT * FROM post; // This will also work
        $stmt = $conn->prepare($sql);

        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        // STEP 4
        $reward_history = []; // Indexed Array of Post objects
        while( $row = $stmt->fetch() ) {
            $reward_history[] =
                new Reward (
                    $row['item_name'],
                    $row['img_url'],
                    $row['points_used'],
                    $row['time_redeemed']
                    );
        }

        // STEP 5
        $stmt = null;
        $conn = null;

        // STEP 6
        return $reward_history;
    }

    public function update($email, $points) {

        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "UPDATE
                    acc
                SET
                    points+= :points
                WHERE 
                    acc_email = :email";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':points', $points, PDO::PARAM_INT);


        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }

    // public function delete($id) {
    //     // STEP 1
    //     $connMgr = new ConnectionManager();
    //     $conn = $connMgr->connect();

    //     // STEP 2
    //     $sql = "DELETE FROM
    //                 post
    //             WHERE 
    //                 id = :id";
    //     $stmt = $conn->prepare($sql);
    //     $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    //     //STEP 3
    //     $status = $stmt->execute();
        
    //     // STEP 4
    //     $stmt = null;
    //     $conn = null;

    //     // STEP 5
    //     return $status;
    // }

    public function add($email, $location_name, $category) {
        // STEP 1   
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "INSERT INTO travel_history
                    (
                        email, 
                        location_name,
                        time_visited,
                        category
                    )
                VALUES
                    (
                        :email,
                        :location_name,
                        CURRENT_TIMESTAMP,
                        :category
                    )";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':location_name', $location_name, PDO::PARAM_STR);
        $stmt->bindParam(':category', $cagetory, PDO::PARAM_STR);

        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }

    public function addReward($email, $item_name, $img_url, $points_used) {
        // STEP 1   
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "INSERT INTO travel_history
                    (
                        email, 
                        item_name,
                        img_url,
                        points_used,
                        time_redeemed
                    )
                VALUES
                    (
                        :email,
                        :item_name,
                        :img_url,
                        :points_used,
                        CURRENT_TIMESTAMP
                    )";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':item_name', $item_name, PDO::PARAM_STR);
        $stmt->bindParam(':img_url', $img_url, PDO::PARAM_STR);
        $stmt->bindParam(':points_used', $points_used, PDO::PARAM_STR);
        

        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }

    public function register($email, $password) {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "INSERT INTO acc
                    (
                        acc_email,
                        acc_password,
                        points
                    )
                VALUES
                    (
                        :acc_email,
                        :acc_password,
                        0
                    )";            
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':acc_email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':acc_password', $password, PDO::PARAM_STR);

        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }
    public function login($email, $password) {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "SELECT * 
                FROM acc 
                WHERE acc_email = :acc_email 
                AND acc_password = :acc_password";
                    
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':acc_email',  $email, PDO::PARAM_STR);
        $stmt->bindParam(':acc_password', $password, PDO::PARAM_STR);
        
        //STEP 3
        // if( $stmt->execute() ) {
        $status = False;
        
        $stmt->execute();
        // $stmt->setFetchMode(PDO::FETCH_ASSOC);

        if ($stmt->rowCount() > 0){
            $status = True;
        }
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }
    public function getPoints($id) {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "SELECT points
                FROM acc
                WHERE id = :id";
                    
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id',  $id, PDO::PARAM_INT);
        
        //STEP 3
        // if( $stmt->execute() ) {
        $status = False;
        
        $stmt->execute();
        // $stmt->setFetchMode(PDO::FETCH_ASSOC);

        if ($stmt->rowCount() > 0){
            $status = True;
        }
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;

    
}
}


?>