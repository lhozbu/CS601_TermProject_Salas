<?php

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    // Sets the header to return
    header('Content-type: application/json');

    // Connection information
    $servername = 'localhost';
    $username = 'lhozonli_user';
    $password = 'pzS`<<8a5W,4Ln8N';
    $dbname = 'lhozonli_lhoz';

    // Request information
    $json = file_get_contents('php://input');
    $form = json_decode($json);

    $name = $form->name;
    $email = $form->email;
    $message = $form->message;
    $ip = $_SERVER['REMOTE_ADDR'];

    try{
        // Creates the connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Saves the form information
        $conn->execute_query('insert into contact (name, email, message, date_created, ip) values (?, ?, ?, now(), ?)', [$name, $email, $message, $ip]);
        $conn->close();

        http_response_code(200);
        echo json_encode(["message" => "success"]);

    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(["message" => "An error occurred while inserting information to the database."]);
    }
}
