# Backend Documentation

[< Back to main README](../README.md)

## Class structure

The three classes are responsible for the core functionalities of the backend API

- [Route](./src/Route.php)
- [Model](./src/Models/Model.php)
- [Controller](./src/Controllers/BaseController.php)

This readme will outline the usage of each class.

### Route Class

This class is responsible for handling http requests sent through various uris.
```PHP
Route::add($uri, $target)
```
is a static method which compares the `$_SERVER['REQUEST_URI]` with the `$uri` variable and `include_once $target` file. In the `$target` file, is a `case switch` statement which handles different kinds of `$_SERVER['REQUEST_METHOD]`. The routing algorithm was adapted from an open source repository[link](https://github.com/phprouter/main).
  
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

The `Controller` class is paired with a `Model` class to do appropriate operations on a request body and perform CRUD operations through the `Model` class. Using the `RatingController` class as an example,
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

### Database tables
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
