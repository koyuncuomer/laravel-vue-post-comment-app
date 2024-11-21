<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Post::with('user')->latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $imageUrl = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('posts', $fileName, 'public');
            $imageUrl = asset('storage/' . $path);
        }
        $fields['image'] = $imageUrl;

        $post = $request->user()->posts()->create($fields);

        return ['post' => $post, 'user' => $post->user];
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return ['post' => $post, 'user' => $post->user];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        Gate::authorize('modify', $post);

        $fields = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $imageUrl = null;
        if ($request->hasFile('image')) {
            if ($post->image) {
                $oldImagePath = str_replace(asset('storage/'), '', $post->image);
                Storage::disk('public')->delete($oldImagePath);
            }

            $file = $request->file('image');
            $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('posts', $fileName, 'public');
            $imageUrl = asset('storage/' . $path);
        }
        $fields['image'] = $imageUrl;

        $post->update($fields);

        return $post;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        Gate::authorize('modify', $post);

        $post->delete();

        return ['message' => 'Post başarıyla silindi!'];
    }
}
