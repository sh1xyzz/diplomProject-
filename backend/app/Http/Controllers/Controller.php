<?php

namespace App\Http\Controllers;
use App\Models\Course;

abstract class Controller
{
    public function getByTag($tag)
    {
        $courses = Course::whereHas('tags', function ($query) use ($tag) {
            $query->where('name', $tag);
        })->with('tags')->get();

        return response()->json($courses);
    }

}
