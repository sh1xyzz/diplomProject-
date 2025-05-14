<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Tag;

class CourseController extends Controller
{
    public function index()
    {
        return response()->json(Course::with('tags')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        $course = Course::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
        ]);

        if (!empty($validated['tags'])) {
            $course->tags()->sync($validated['tags']);
        }

        return response()->json($course->load('tags'), 201);
    }




    public function show(string $id)
    {
        $course = Course::with('tags')->findOrFail($id);
        return response()->json($course);
    }

    public function update(Request $request, string $id)
    {
        // Обновление курса
        $course = Course::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        $course->update($validated);

        if (!empty($validated['tags'])) {
            $course->tags()->sync($validated['tags']);
        }

        return response()->json($course->load('tags'));
    }

    public function destroy(string $id)
    {
        $course = Course::findOrFail($id);
        $course->tags()->detach();
        $course->delete();

        return response()->json(['message' => 'Course deleted']);
    }
    public function getTags()
    {
        $tags = Tag::all();
        return response()->json($tags);
    }
}
