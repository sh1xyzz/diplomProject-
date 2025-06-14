<?php

// app/Models/Reply.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    protected $fillable = ['message_id', 'message', 'from_admin', 'user_id'];

    public function message()
    {
        return $this->belongsTo(Message::class);
    }
}

