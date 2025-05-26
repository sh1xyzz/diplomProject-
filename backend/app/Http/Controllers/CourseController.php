<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

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
            'detail' => 'required|string',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = uniqid('course_') . '.' . $file->getClientOriginalExtension();
            try {
                $path = $file->storeAs('uploads', $filename, 'public');
                $imagePath = '/storage/uploads/' . $filename;
                Log::info('Image save here: ' . storage_path('app/public/uploads/' . $filename));
            } catch (\Exception $e) {
                Log::error('Error load image: ' . $e->getMessage());
                return response()->json(['error' => 'Error load image'], 500);
            }
        }

        $course = Course::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'detail' => $validated['detail'] ?? null,
            'image' => $imagePath,
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
        $course = Course::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'detail' => 'nullable|string',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'image' => 'nullable|image|max:2048',
        ]);

        if (isset($validated['title'])) {
            $course->title = $validated['title'];
        }

        if (array_key_exists('description', $validated)) {
            $course->description = $validated['description'];
        }

        if (array_key_exists('detail', $validated)) {
            $course->detail = $validated['detail'];
        }

        if ($request->hasFile('image')) {
            if ($course->image) {
                $oldPath = str_replace('/storage', 'public', $course->image);
                Storage::disk('public')->delete($oldPath); 
            }

            $file = $request->file('image');
            $filename = uniqid('course_') . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('uploads', $filename, 'public'); 
            $course->image = '/storage/uploads/' . $filename;
            Log::info('Image saved here: ' . storage_path('app/public/uploads/' . $filename));
        }

        $course->save();

        if (!empty($validated['tags'])) {
            $course->tags()->sync($validated['tags']);
        }

        return response()->json($course->load('tags'));
    }

    public function destroy($id)
    {
        $course = Course::find($id);
        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

       
        if ($course->image) {
            $imagePath = str_replace('/storage', 'public', $course->image);
            Storage::delete($imagePath);
        }

        $course->delete();

        return response()->json(['message' => 'Course deleted successfully']);
    }

    public function getTags()
    {
        $tags = Tag::all();
        return response()->json($tags);
    }
}
