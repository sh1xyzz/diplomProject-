<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        return response()->json(Tag::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string',
        ]);

        $tag = Tag::create([
            'name' => $validated['name'],
        ]);

        return response()->json($tag, 201);
    }

    public function show(string $id)
    {
        $course = Tag::with('tags')->findOrFail($id);
        return response()->json($course);
    }

    public function update(Request $request, string $id)
    {
        $tag = Tag::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
        ]);

        $tag->update($validated);

        return response()->json($tag);
    }

    public function destroy(string $id)
    {
        $tag = Tag::findOrFail($id);
        $tag->tags()->detach();
        $tag->delete();

        return response()->json(['message' => 'Course deleted']);
    }
}
