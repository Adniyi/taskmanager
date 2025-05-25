<?php
require_once('config.php');
require_once 'Task.php';
require_once 'Errorhandler.php';



# Construct the object instance
$database = new DatabaseConfig(hostname:'localhost', username:'root', password:'', database:'task');
// Establish the connection
$conn = $database->getconnection();
// create a task object instance


$task = new Task($conn);
set_exception_handler('ErrorHandler::handleException');
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // <-- This is required!
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$endpoint = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : $_SERVER['REQUEST_URI'];
switch ($method) {
    case 'GET':
        if($endpoint === '/tasks') {
            // Get all tasks
            $data = $task->getAllTask();
            header('HTTP/1.0 200 OK');
            echo json_encode($data);
            exit;
        }else if(preg_match('/^\/tasks\/(\d+)$/', $endpoint, $matches)) {
            // Get task by id 
            $taskid = $matches[1];
            $data = $task->getTaskbyId($taskid);
            if($data != null) {
                header('HTTP/1.0 200 OK');
                echo json_encode($data);
                exit;
            }else{
                $data = [
                    'status' => 404,
                    'message' =>"No Task with id $taskid available"
                ];
                header("HTTP/1.0 404 No Task with id $taskid available");
                echo json_encode($data);
                exit;
            }
        }
        break;
    case 'POST':
        if($endpoint === '/tasks') {
            // Create a Task
            $data = json_decode(file_get_contents('php://input'), true);
            $result = $task->addTask($data);
            if($result === true){
                header('HTTP/1.0 200 OK');
                echo json_encode(['success' => $result]);
                exit;
            }else{
                header('HTTP/1.0 400 Error Creating data');
                echo json_encode(['error' => $result]);
                exit;
            }
        }
        break;
    case 'PUT':
        if(preg_match('/^\/tasks\/(\d+)$/', $endpoint, $matches)) {
            // Update a task
            $taskid = $matches[1];
            $data = json_decode(file_get_contents('php://input'), true);
            $result = $task->updateTask($taskid, $data);
            header('HTTP/1.0 200 OK');
            echo json_encode(['success' => $result]);
            exit;
        }
        break;
    case 'DELETE':
        if(preg_match('/^\/tasks\/(\d+)$/', $endpoint, $matches)) {
            // Delete a task
            $taskid = $matches[1];
            $result = $task->deleteTask($taskid);
            header('HTTP/1.0 200 OK');
            echo json_encode(['success' => $result]);
            exit;
        }
        break;
    default:
        header('HTTP/1.0 405 Method Not Allowed');
        echo json_encode(['error'=> 'Method Not Allowed']);
        break;


}