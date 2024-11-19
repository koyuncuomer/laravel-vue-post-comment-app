<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display comments for a specific post.
     */
    public function index(Post $post)
    {
        return $post->comments()->latest()->get();
    }

    /**
     * Store a new comment for a specific post.
     */
    public function store(Request $request, Post $post)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255',
            'body' => 'required',
        ]);

        $comment = $post->comments()->create($fields);

        return ['comment' => $comment];
    }

    /**
     * Show a specific comment.
     */
    public function show(Comment $comment)
    {
        return $comment;
    }

    /**
     * Update a comment.
     */
    public function update(Request $request, Comment $comment)
    {
        // $fields = $request->validate([
        //     'name' => 'required|max:255',
        //     'email' => 'required|email|max:255',
        //     'body' => 'required',
        // ]);

        // $comment->update($fields);

        // return $comment;
        return ['message' => 'Yorum düzenlemek desteklenmemektedir.'];

    }

    /**
     * Delete a comment.
     */
    public function destroy(Comment $comment)
    {
        // $comment->delete();

        // return ['message' => 'Yorum başarıyla silindi!'];
        return ['message' => 'Yorum silmek desteklenmemektedir.'];

    }
}
