<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Reply;

class Message extends Model
{
protected $fillable = ['user_id', 'recipient_id', 'name', 'email', 'message', 'reply'];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function recipient()
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }

    public function replies()
    {
        return $this->hasMany(Reply::class);
    }
}
