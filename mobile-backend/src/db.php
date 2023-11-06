<?php

$DB_HOSTNAME = '127.0.0.1';
$DB_USERNAME = 'app_db_admin';
$DB_PASSWORD = 'password';
$DB_DATABASE = 'app_db';
$DB_PORT = '3306';
$DB_SOCKET = null;

$db = new mysqli($DB_HOSTNAME,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE,$DB_PORT);

//printf("Connected successfully as $DB_USERNAME@$DB_HOSTNAME:$DB_PORT\n");
//printf("Server version: %s\n", $db->get_server_info());

