<?php
require_once $_SERVER['DOCUMENT_ROOT']. '/vendor/autoload.php';

\Dotenv\Dotenv::createImmutable($_SERVER['DOCUMENT_ROOT'])->load();
$DB_DATABASE=$_ENV['DB_DATABASE'];

$db = new mysqli($_ENV['DB_HOSTNAME'],$_ENV['DB_USERNAME'],$_ENV['DB_PASSWORD'],$_ENV['DB_DATABASE'],$_ENV['DB_PORT']);
