<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateAccountRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AccountController extends Controller
{
    public function updateAccount(UpdateAccountRequest $request)
    {
        User::where('id', Auth::user()->id)->update([
            'name'=>$request->name,
            'email'=>$request->email
        ]);
        return response()->json(['message' => "Your information is changed!"]);
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        if(!Hash::check($request->old_password, Auth::user()->password)){
            return response()->json(['message' => "Old password is not correct"], 401);
        }
        User::where('id', Auth::user()->id)->update([
            'password'=>Hash::make($request->password)
        ]);
        return response()->json(['message' => "Your password is changed!"]);
    }

}
