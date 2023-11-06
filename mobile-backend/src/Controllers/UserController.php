<?php

namespace src\Controllers;
require 'BaseController.php';
require $_SERVER['DOCUMENT_ROOT'].'/src/Models/UserModel.php';

use src\Models\UserModel;
class UserController extends BaseController
{
    public function __construct()
    {
        $this->model = new UserModel();
    }

    /**
     * Creates new user session from login credentials
     *
     * @param $request
     * @return bool
     */
    function create($request): bool {
        $username_request = array('username'=>$request['username']);
        $password_request = $request['password'];
        try {
            $rows = $this->model->retrieve($username_request);
            $user_result = $rows[0];
            if (count($rows) > 0) {
                $user_password = $user_result[1];
                if (password_verify($password_request, $user_password)) {
                    echo true;
                    return true;
                } else {
                    echo false;
                    return false;
                }
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
     * Stores new user information in the database
     *
     * @return bool
     */
    function store($request): bool
    {
        # Hash password
        $request['password'] = password_hash($request['password'], PASSWORD_DEFAULT);
        try {
            $rows = $this->model->retrieve(array('username' => $request['username']));
            if (count($rows) > 0) {
                echo "username is taken";
                return false;
            }
            else
            {
                $this->model->create($request);
                echo true;
                return true;
            }
        } catch (\Exception $e) {
            http_response_code(500);
            echo $e;
            return false;
        }
    }
}

?>