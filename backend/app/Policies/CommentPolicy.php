<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CommentPolicy
{
    public function modify(User $user, Comment $comment): Response
    {
        return $user->is_admin ? Response::allow() : Response::deny('Yetkiniz bulunmamakta!');
    }
}
