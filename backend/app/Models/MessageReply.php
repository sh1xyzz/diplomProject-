<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Message;

class MessageReply extends Model
{
    protected $table = 'replies';
    protected $fillable = ['message', 'from_admin', 'message_id'];

    public function message()
    {
        return $this->belongsTo(Message::class);
    }
}
