<?php
require "./func.php";

$data = file_get_contents('php://input');

$json = json_decode($data, true);

$data_empty = false;

foreach ($json['step5'] as $item) {
    
    if (!$item) $data_empty = true;
    
}

if (!$data_empty) {
    $response = [
        "status" => "ok",
        "message" => "good"
    ];
} else {

    if (!$json['step5']['name']) {
        $error_message = "Введите ваше имя";
    } elseif (!$json['step5']['phone']) {
        $error_message = "Введите ваш телефон";
    } elseif (!$json['step5']['email']) {
        $error_message = "Введите вашу почту";
    } else {
        $error_message = "ne tak";
    }

    $response = [
        "status" => "error",
        "message" => $error_message
    ];
}

echo json_encode($response);

$test = implode(", ", $json['step3']['answers']);
echo  $test;



