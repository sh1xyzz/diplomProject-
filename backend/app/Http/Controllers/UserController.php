<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'role' => ['required', 'string', Rule::in(['Student', 'Admin', 'Teacher'])],
        ]);

        $user->role = $validated['role'];
        $user->save();

        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|max:2048',
            'user_id' => 'required|integer|exists:users,id',
        ]);

        $path = $request->file('avatar')->store('avatars', 'public');

        $user = User::find($request->user_id);
        $user->avatar = $path;
        $user->save();

        return response()->json([
            'success' => true,
            'user' => $user,
            'avatar_url' => asset("storage/$path"),
        ]);
    }
}
