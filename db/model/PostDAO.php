<?php

require_once 'common.php';

class PostDAO {

    public function getAll() {
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
                new Event(
                    $row['location_name'],
                    $row['time_visited'],
                    $row['category'],
                    );
        }

        // STEP 5
        $stmt = null;
        $conn = null;

        // STEP 6
        return $posts;
    }

    public function update($id, $points) {

        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "UPDATE
                    acc
                SET
                    points+= :points
                WHERE 
                    id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':points', $points, PDO::PARAM_INT);


        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }

    public function delete($id) {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "DELETE FROM
                    post
                WHERE 
                    id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }

    public function add($id, $location_name, $time_visited, $category) {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "INSERT INTO travel_history
                    (
                        user_id, 
                        location_name,
                        time_visited,
                        category
                    )
                VALUES
                    (
                        :id,
                        :location_name,
                        :time_visited,
                        :category
                    )";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':location_name', $location_name, PDO::PARAM_STR);
        $stmt->bindParam(':time_visited', $time_visited, PDO::PARAM_STR);
        $stmt->bindParam(':category', $cagetory, PDO::PARAM_STR);

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
        $sql = "SELECT * FROM users 
                WHERE acc_email = '$username' AND 
            `   acc_password = '$password'";
                    
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':acc_email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':acc_password', $password, PDO::PARAM_STR);
        
        //STEP 3
        $status = $stmt->execute();
        if($numrows > 1) { 
            //send email to sysadmin that my site has been hacked 
        } else if ($numrows = 0) { 
            echo "wrong username or password";
        }
        else { 
            echo "welcome dr. Falken" ;
        }
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }
}

?>