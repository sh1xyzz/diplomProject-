<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\User;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Показувати повідомлення, де користувач є відправником або одержувачем
        $messages = Message::with('replies')
            ->where('user_id', $user->id)
            ->orWhere('recipient_id', $user->id)
            ->get();

        return response()->json(['messages' => $messages]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $request->validate([
            'message' => 'required|string',
        ]);

        // Знайти адміністратора (наприклад, за роллю або ID)
        $admin = User::where('role', 'Admin')->firstOrFail(); // Або User::findOrFail(1) для конкретного ID

        $message = new Message();
        $message->name = $user->name;
        $message->email = $user->email;
        $message->message = $request->message;
        $message->user_id = $user->id;
        $message->recipient_id = $admin->id; // Встановлюємо адміна як одержувача
        $message->save();

        return response()->json(['success' => true, 'messageId' => $message->id]);
    }

    public function reply(Request $request, $id)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $message = Message::findOrFail($id);
        // Дозволяємо відповідати відправнику або одержувачу
        if ($message->user_id !== $user->id && $message->recipient_id !== $user->id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $reply = $message->replies()->create([
            'message' => $request->message,
            'from_admin' => $user->role === 'Admin', 
            
            'user_id' => $user->id,
        ]);

        return response()->json(['success' => true, 'reply' => $reply]);
    }
}