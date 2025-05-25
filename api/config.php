<?php
// Database Configurtions 

class DatabaseConfig{
    public $hostname;
    public $username;
    public $password;
    public $database;

    public function __construct($hostname, $username, $password, $database){
        $this->hostname = $hostname;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
    }

    public function getconnection(){
        $conn = mysqli_connect($this->hostname, $this->username, $this->password, $this->database); 
        if (!$conn) {
            die('Connection Faild: '. mysqli_connect_error());
        }
        return $conn;
    }
}
