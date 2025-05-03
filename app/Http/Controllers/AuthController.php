<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validasi input dari user
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6', // Menambahkan minimal panjang password
        ]);

        // Cek apakah kredensial valid
        if (Auth::attempt($credentials)) {
            // Regenerasi sesi untuk mencegah session fixation
            $request->session()->regenerate();

            // Mendapatkan data user berdasarkan ID
            $user = Auth::user();

            // Update waktu login terakhir
            $user->update([
                'last_login' => now()
            ]);

            // Mengambil data user untuk dikembalikan sebagai respon
            return response()->json([
                'message' => 'Login successful',
                'type' => 'alert-success',
                'user' => [
                    'id' => $user->id,
                    'username' => $user->name, // Sesuaikan dengan field yang Anda butuhkan
                    'email' => $user->email,
                    'level' => $user->level,
                    'faces' => $user->faces, // Sesuaikan dengan kolom foto atau avatar
                ]
            ]);
        }

        // Jika login gagal
        return response()->json([
            'message' => 'Email atau Password Salah!',
            'type' => 'alert-danger',
        ], 401);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function getUser()
    {
        $user = Auth::user();

        if ($user) {
            return response()->json([
                'id' => $user->id,
                'username' => $user->name,
                'level' => $user->level, // atau sesuaikan field `username`
                'email' => $user->email,
                'faces' => $user->faces
            ]);
        }

        return response()->json(['message' => 'Not authenticated'], 401);
    }
}
