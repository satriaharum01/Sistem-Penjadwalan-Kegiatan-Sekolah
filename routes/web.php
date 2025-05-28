<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//GET ROUTER PUBLIC
//Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('landing');

Route::prefix('get')->name('get.')->group(function () {
    Route::GET('/jenis', [App\Http\Controllers\HomeController::class, 'getJenis']);
    Route::GET('/generate-jadwal-new', [App\Http\Controllers\HomeController::class, 'generateStreamJadwal']);
    Route::prefix('prediksi')->name('prediksi.')->group(function () {
        Route::GET('/analys', [App\Http\Controllers\HomeController::class, 'analys']);
    });
    Route::GET('/mapel-by-kelas', [App\Http\Controllers\FrontController::class, 'mapelByKelas']);
    Route::get('/stream-jadwal-log', [App\Http\Controllers\JadwalController::class, 'streamLog']);
});

Route::GET('/', [App\Http\Controllers\FrontController::class, 'index']);
Route::GET('/agenda', [App\Http\Controllers\FrontController::class, 'agenda']);
Route::GET('/organisasi', [App\Http\Controllers\FrontController::class, 'organisasi']);
Route::GET('/jadwal', [App\Http\Controllers\FrontController::class, 'jadwal']);
Route::POST('/logout', [App\Http\Controllers\AuthController::class, 'logout'])->name('logout');

Route::get('/{any}', function () {
    return view('react');
})->where('any', '.*');


//Login
