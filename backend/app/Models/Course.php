<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = ['title', 'description', 'detail', 'image'];

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

}



