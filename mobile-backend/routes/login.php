<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/src/Controllers/UserController.php';
use src\Controllers\UserController;

$controller = new UserController();
switch($_SERVER['REQUEST_METHOD'])
{
    case 'GET':
        # handle get request
//        $controller->show();
    case 'POST':
        # handle post request
        $request = array(
            'username' => $_POST['username'],
            'password' => $_POST['password']

        );
        $controller->create($request);
}