<?php

namespace src\Controllers;
require "BaseController.php";
require $_SERVER['DOCUMENT_ROOT'].'/src/Models/CommentModel.php';
use src\Controllers\BaseController;
use src\Models\CommentModel;

class CommentController extends BaseController
{
    public function __construct()
    {
        $this->model = new CommentModel();
    }

    /**
     * @return null
     */
    function show(array $key): null  {

    }

    /**
     * @param array $request
     * @return bool
     */
    function store(array $request): bool {
        try {
            if ($this->model->create($request)) {
                echo true;
                return true;
            }
            else {
                echo false;
                return false;
            }
        } catch (\Exception $e) {
            http_response_code(500);
            echo $e;
            return false;
        }
    }

    /**
 * @param array $request
     * @return bool
     */
    function update(array $request): bool{
        try {
            if ($this->model->update($request,array('id'=>$request['id']) )){
                echo true;
                return true;
            }
            else {
                echo false;
                return false;
            }
        } catch (\Exception $e) {
            http_response_code(500);
            echo $e;
            return false;
        }
    }

    /**
     * @param array $request
     * @return bool
     */
    function delete(array $request): bool {
        try {
            if ($this->model->delete($request)){
                echo true;
                return true;
            }
            else{
                echo false;
                return false;
            }
        } catch (\Exception $e) {
            http_response_code(500);
            echo $e;
            return false;
        }
    }
}