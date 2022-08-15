<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }


    public function register(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'string|required|',
            'email' => 'string|required|unique:users,email',
            'password' => 'string|required|min:8|confirmed',
        ]);
        if ($validation->fails()) {
            $error = $validation->getMessageBag()->toArray();
            // return response()->json(['message'=>json_encode($error)], 401);

            $message = "";
            foreach ($error as $key => $value) {
                foreach ($value as $value1) {
                    $message = $message . "" . $value1 . "\n";
                }
            }
            return response()->json(['message' => $message], 401);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => 0
        ]);

        $token = auth()->login($user);
        // return response()->json(['success' => 'Unauthorized'], 200);
        return $this->respondWithToken($token);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'email' => 'string|required|exists:users,email',
            'password' => 'string|required|min:8',
        ]);
        if ($validation->fails()) {
            return response()->json(['message' => 'Not find account'], 401);
        }
        $credentials = $request->only(['email', 'password']);

        if (!$token = JWTAuth::attempt(['email' => $request->email, 'password' => $request->password], $request->remember)) {
            return response()->json(['message' => 'Not find account'], 401);
        }

        // if($token == true){
        //     return
        // }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(JWTAuth::user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => JWTAuth::user(),
        ]);
    }
}
