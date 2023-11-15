<?php

require_once $_SERVER['DOCUMENT_ROOT']. '/vendor/autoload.php';
use Firebase\JWT\Key;
use Firebase\JWT\JWT;

\Dotenv\Dotenv::createImmutable($_SERVER['DOCUMENT_ROOT'])->load();

switch($_SERVER['REQUEST_METHOD']){
    case 'GET':
        if (!key_exists('token', $_GET)) {
            echo false;
            exit();
        }
        $decoded = JWT::decode($_GET['token'], new Key($_ENV['JWT_KEY'], 'HS256'));
        break;
    case 'POST':
        if (!key_exists('token', $_POST)){
            echo false;
            exit();
        }
        $decoded = JWT::decode($_POST['token'], new Key($_ENV['JWT_KEY'], 'HS256'));
        break;
    default :
        $_INPUT = file_get_contents('php://input');
        $_INPUT = json_decode($_INPUT, true);
        if (!key_exists('token', $_INPUT)) {
            echo false;
            exit();
        }
        $decoded = JWT::decode($_INPUT['token'], new Key($_ENV['JWT_KEY'], 'HS256'));
}
$decoded = json_decode(json_encode($decoded),true);
if ($decoded['key'] != $_ENV['JWT_KEY']) {
    echo false;
    exit();
}
