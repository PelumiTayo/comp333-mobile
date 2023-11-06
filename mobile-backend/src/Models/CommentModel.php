<?php

namespace src\Models;
require "Model.php";
use src\Models;
class CommentModel extends Model
{
    protected $table_name = 'comments_table';

    protected $fillable = array(
        array(
            'field' => 'username',
            'type' => 'varchar(255)'
        ),
        array(
            'field' => 'rating_id',
            'type' => 'int'
        ),
        array(
            'field' => 'msg_body',
            'type' => 'varchar(255)'
        )
    );
}