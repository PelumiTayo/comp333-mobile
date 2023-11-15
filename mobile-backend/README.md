# Backend Documentation

[< Back to main README](../README.md)

A detailed documentation for the Backend API.

📆 *Last Updated: Nov 14, 2023*

Updated Features: [JWT authentication](#jwt-authentication), [dotenv support](#dotenv-support)

## Class structure

The three classes are responsible for the core functionalities of the backend API

- [Route](./src/Route.php)
- [Model](./src/Models/Model.php)
- [Controller](./src/Controllers/BaseController.php)

This readme will outline the usage of each class.

### Route Class

This class is responsible for handling http requests sent through various uris.
```PHP
Route::add($uri, $target, $middleware)
```
is a static method which compares the `$_SERVER['REQUEST_URI']` with the `$uri` variable and runs `include_once $target` file. In the `$target` file, there is a `case switch` statement which handles different kinds of `$_SERVER['REQUEST_METHOD]`. 

> Changes: `$middleware` an array input with middleware files in `/routes/middleware` which runs before the main `$target` file.

The routing algorithm was adapted from an open source repository [link](https://github.com/phprouter/main).
  
### Model Class

The `Model` class is a wrapper class that handles primitive database operations such as SQL queries. The `Controller` class is able to perform database operations through methods inside the `Model` class.
```PHP
protected $table_name
```
The main `Model` class holds a `$table_name` variable which is used to query the appropriate table for data. The child class of `Model`, such as the `UserModel` class instantiates the `$table_name` variable such as the following
```PHP
protected $table_name = 'user_table'
```
```PHP
function create($request)
```
a `$request` variable is a key/value pair array where key is the column name and value is the input for the column. The function parses data from the `$request` variable and is equivalent to the sql query
```SQL
INSERT INTO [table] [fields] VALUES [values]
```
```PHP
function retrieve($request)
```
also takes a `$request` array and returns the query results from the database. This is equivalent to the following SQL statement
```SQL
SELECT * FROM [table] WHERE [request]
```
```PHP
function update($request, $identifier)
```
updates a database entry based on `$request` and finds the corresponding entry using `$identifier`. This is equivalent to
```SQL
UPDATE [table] SET [update_values] WHERE [identifier_values]
```
```PHP
function delete($request)
```
drops a table entry based on values of `$request`. This is equivalent to
```SQL
DELETE FROM [table] WHERE [request_values]
```

### Controller Class

The `Controller` class is paired with a `Model` class to perform appropriate operations on a request body and perform CRUD operations through the `Model` class. Using the `RatingController` class as an example,
```PHP
function show() {
    if ($key != null) {
            $result = $this->model->retrieve();
        }
        else {
            $result = $this->model->retrieve($key);
        }
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($result);
}
```
calling `$this->model->retrieve()` will retrieve all ratings the database.

## JWT authentication

The backend API has been extended to authenticate users based on JSON web tokens. The `auth.php` file in `routes/middleware` will check if the request has been supplied with a token and, if a token is present, will decode and match a passphrase to verify the validity of the token. To supply a user with a JWT, logging in will return a JWT. On the application scope, the `/rating` route is currently protected by JWT.

Currently, this feature is very elementary and is prone to exploitation.
- A JWT is supposed to have a short timestamp due to security reasons - since JWT are not tracked, there is no way to recall a stolen JWT. For simplicity reasons, the current API does not support timestamps.
- Also for simplicity reasons, the key to encode the JWT has been used as the passphrase to validate tokens. This is **EXTREMELY** bad practice and should never be done in a real application.

## dotenv support

dotenv files facilitate the changing of environment variables for the project. The [`.env.example`](./.env.example) file has the template for the environment variables used in the application.

## Database Structure

user_table

| username (PRIMARY KEY) | password |
|------------------------|----------|

rating_table

| id (PRIMARY KEY) | username (FOREIGN KEY) | title | artist | rating |
|------------------|------------------------|-------|--------|--------|

## Deploying application

Any of the following servers are required to deploy a PHP application.

- [Apache](https://httpd.apache.org)
- [nginx](https://www.nginx.com)

Or a comprehensive package, [XAMPP](https://www.apachefriends.org), that comes with a MySQL, ProFTPD, Apache servers.

### Configurations

To access the MySQL database, credentials must be changed in [`/src/db.php`](./src/db.php)
```PHP
$DB_HOSTNAME = ;
$DB_USERNAME = ;
$DB_PASSWORD = ;
$DB_DATABASE = ;
$DB_PORT = ;
$DB_SOCKET = ;
```
These values should be set according to the MySQL database in use for deployment.

### Database table creation
For `user_table`,
```SQL
CREATE TABLE user_table (username VARCHAR(255), password VARCHAR(255), PRIMARY KEY(username));
```
For `ratings_table`,
```SQL
CREATE TABLE ratings_table (
    id INT NOT NULL AUTO_INCREMENT, 
    username VARCHAR(255), 
    title VARCHAR(255), 
    artist VARCHAR(255), 
    rating INT(1), 
    PRIMARY KEY(id), 
    FOREIGN KEY(username)
        REFERENCES user_table(username)
        ON DELETE CASCADE
);
```
