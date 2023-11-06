<?php

require_once $_SERVER['DOCUMENT_ROOT'].'/src/Controllers/RatingController.php';
use src\Controllers\RatingController;

$ratingController = new RatingController();

switch($_SERVER['REQUEST_METHOD'])
{
    case 'GET': # handle get request
        $ratingController->show();
        break;
    case 'POST': # handle post request
        $request = array(
        'username' => $_POST['username'],
        'title' => $_POST['title'],
        'artist' => $_POST['artist'],
        'rating' => $_POST['rating']
        );
        $ratingController->store($request);
        break;
    case 'PATCH':
        $_PATCH = file_get_contents('php://input');
        $_PATCH = json_decode($_PATCH, true);
        $request = array(
            'id' => $_PATCH['id'],
            'username' => $_PATCH['username'],
            'title' => $_PATCH['title'],
            'artist' => $_PATCH['artist'],
            'rating' => $_PATCH['rating']
        );
        $ratingController->update($request);
        break;
    case 'DELETE':
        $_DELETE = file_get_contents('php://input');
        $_DELETE = json_decode($_DELETE, true);
        $request = array('id'=>$_DELETE['id']);
        $ratingController->delete($request);
        break;
}