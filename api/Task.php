<?php

class Task{
    private $conn;

    public function __construct($conn){
        $this->conn = $conn;
    }

    public function getAllTask(){
        $query = "SELECT * FROM task";
        $result = mysqli_query($this->conn, $query);
        $tasks = [];
        if($result){
            while($row = mysqli_fetch_array($result)){
                $tasks[] = [
                    'id' => (int)$row['id'],
                    'title' => $row['title'],
                    'description' => $row['description'],
                    'due_date' => $row['due_date'],
                    'status' => $row['status']
                ];
            }
            return $tasks;
        }else{
            $data = [
                'status' => 404,
                'message' =>'No Task available'
            ];
            return $data;
        }
    }

    public function getTaskbyId($id){
        $query = "SELECT * FROM task WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id); // i = integer
        $stmt->execute();
        $result = $stmt->get_result();
        if($result){
            $task = mysqli_fetch_assoc($result);
            if($task){
                $task['id'] = (int)$task['id'];
            }
            return $task;
        }else{
            $data = [
                'status' => 404,
                'message' =>'No Task with id $id available'
            ];
            echo json_encode( $data );
            return $data;
        }
        // return json_encode($task);
    }

    public function addTask($task){
        $title = $task["title"];
        $description = $task["description"];
        $due_date = $task["due_date"];
        $status = $task["status"];
        if($due_date == "") {
            $query = "INSERT INTO task (title, description, status) VALUES ('$title', '$description','$status')";
            $result = mysqli_query($this->conn, $query);
        }else{
            $query = "INSERT INTO task (title, description, due_date, status) VALUES ('$title', '$description','$due_date','$status')";
            $result = mysqli_query($this->conn, $query);
        }

        if($result){
            return true;
        }else{
            return false;
        }
    }

    public function updateTask($id, $task){
        if (isset($task["status"])) {
            $status = $task["status"];
            $query = "UPDATE task SET status = '$status' WHERE id = '$id'";
            $result = mysqli_query($this->conn, $query);
            if($result){
                return true;
            }else{
                return false;
            }
        }
        else{
            return ['error' => 'Status field is required'];;
        }
    }

    public function deleteTask($id){
        $query = "DELETE FROM task WHERE id = $id";
        $result = mysqli_query($this->conn, $query);
        if($result){
            return true;
        }else{
            return false;
        }
    }
}