<?php

namespace src\Models;

use mysqli;

class Model
{
    /**
     * table name to query the database
     *
     * @var string
     */
    protected $table_name;
    /**
     * fillable fields for the model
     *
     * @var string[]
     */
    protected $fillable;
    /**
     * Queries the information schema table and returns the columns for given table name
     *
     * @return string[]|bool
     */
    protected function getColumns() : array|bool {
        require $_SERVER['DOCUMENT_ROOT'].'/src/db.php';
        /** @var mysqli $db
         *  @var string $DB_DATABASE
         */
        $query_string = "SELECT COLUMN_NAME, COLUMN_TYPE FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='$DB_DATABASE' AND TABLE_NAME='$this->table_name'";
        if ($result = $db->execute_query($query_string)) {
            $rows = $result->fetch_all();
            $db->close();
            return $rows;
        }
        else {
            return false;
        }
    }
    /**
     * Creates new entry into the database. Returns true if successful, false otherwise.
     *
     * @param string[] $entries
     * @return bool
     */
    public function create(array $entries) : bool {
        require $_SERVER['DOCUMENT_ROOT'].'/src/db.php';
        # check if $fillable is in $rows
        $rows = $this->getColumns();
        $db_fields = array();
        foreach ($rows as $row){
            $db_fields[] = $row[0];
        }
        $input_fields = array_keys($entries);
        foreach ($input_fields as $input_field) {
            if (!in_array($input_field, $db_fields)) {
                return false;
            }
        }
        # convert entries into string
        $array_fields = array();
        $array_values = array();
        foreach ($entries as $field) {
            $array_fields[] = array_search($field, $entries);
            if (gettype($field) == "string") {
                $array_values[] = "'" . $field . "'";
            }
            else {
                $array_values[] = $field;
            }
        }
        $fields = implode(',',$array_fields);
        $values = implode(',',$array_values);
        # query string would be INSERT INTO table_name (?,?)
        $query_string = "INSERT INTO $this->table_name ($fields) VALUES ($values)";
        /** @var mysqli $db */
        if ($db->execute_query($query_string)) {
            $db->close();
            return true;
        }
        else {
            $db->close();
            return false;
        }
    }

    /**
     * Queries the database for the provided entries and returns the query result as an array
     *
     * @param array|null $entries
     * @return array
     */
    public function retrieve(array|null $entries=null) : array {
        require $_SERVER['DOCUMENT_ROOT'].'/src/db.php';

        $search_values = array();

        if ($entries == null) {
            $query_string = "SELECT * FROM $this->table_name";
        }
        else {
            foreach ($entries as $entry) {
                $search_values[] = array_search($entry, $entries) . '=' . "'" . $entry . "'";
            }
            $keywords = implode(' AND ', $search_values);

            $query_string = "SELECT * FROM $this->table_name WHERE $keywords";
        }
        /** @var mysqli $db */
        if ($results = $db->execute_query($query_string)) {
            $rows = $results->fetch_all();
            $db->close();
            return $rows;
        }
        else {
            $db->close();
            return array();
        }
    }
    /**
     * Queries the database with $identity and updates the values with the given $update. Returns true if query was successful, false otherwise.
     *
     * @param array $update
     * @param array $identity
     * @return bool
     */
    public function update(array $update, array $identity) : bool {
        require $_SERVER['DOCUMENT_ROOT'].'/src/db.php';

        $update_values = array();
        $search_values = array();
        # Extract query values from array $update to strings
        foreach ($update as $key) {
            $field = array_search($key, $update);
            $update_value = $field."=".$key;
            if (gettype($key) == "string") {
                $update_value = $field."="."'".$key."'";
            }
            $update_values[] = $update_value;
        }
        $update_keys = implode(',', $update_values);

        # Extract query values from array $identity to strings
        foreach ($identity as $key) {
            $field = array_search($key, $update);
            $search_value = $field."=".$key;
            if (gettype($key) == "string") {
                $search_value = $field."="."'".$key."'";
            }
            $search_values[] = $search_value;
        }
        $search_keys = implode(' AND ', $search_values);

        $query_string = "UPDATE $this->table_name SET $update_keys WHERE $search_keys";

        /** @var mysqli $db */
        $result = $db->execute_query($query_string);
        $db->close();
        return $result;
    }
    /**
     * Queries the database with $identity and deletes the entry that matches the given identifier. Returns true if query was successful, false otherwise
     *
     * @param array $identity
     * @return bool
     */
    public function delete(array $identity) : bool {
        require $_SERVER['DOCUMENT_ROOT'].'/src/db.php';

        $identity_values = array();
        
        foreach ($identity as $key) {
            $identity_values[] = array_search($key, $identity)."="."'".$key."'";
        }

        $identity_keys = implode(' AND ', $identity_values);

        $query_string = "DELETE FROM $this->table_name WHERE $identity_keys";

        /** @var mysqli $db */
        $result = $db->execute_query($query_string);
        $db->close();
        return $result;
    }
}