<?php

require_once $_SERVER['DOCUMENT_ROOT'].'/src/Controllers/CommentController.php';
use src\Controllers\CommentController;

$commentController = new CommentController();

switch($_SERVER['REQUEST_METHOD'])
{
    case 'GET': # handle get request
        break;
    case 'POST': # handle post request
        $request = array(
            'username' => $_POST('username'),
            'rating_id' => $_POST('rating_id'),
            'msg_body' => $_POST('msg_body')
        );
        $commentController->store($request);
        break;
    case 'PATCH':
        break;
    case 'DELETE':
        break;
}