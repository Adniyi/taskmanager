<?php

class ErrorHandler{
    public static function handleException(Throwable $exception){

        http_response_code(500);
        echo json_encode([
            'code' => $exception->getCode(),
            "error"=> $exception->getMessage(),
            'file'=> $exception->getFile(),
            'lineNumber'=> $exception->getLine() 
        ]);
    }
}