<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
Route::POST('/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::POST('/logout', [App\Http\Controllers\AuthController::class, 'logout']);
Route::get('/user', [App\Http\Controllers\AuthController::class, 'getUser']);

Route::prefix('form-schema')->group(function () {
    Route::get('/fasum', [App\Http\Controllers\AdminFasumController::class, 'getFormSchema']);
});

Route::prefix('get')->name('get.')->group(function () {
    Route::GET('/jenis', [App\Http\Controllers\HomeController::class, 'getJenis']);
    Route::GET('/fasum/paginate', [App\Http\Controllers\HomeController::class, 'getFasumWithPaginate']);
    Route::GET('/count/fasum', [App\Http\Controllers\HomeController::class, 'countTempatPerJenis']);
});

Route::get('/generate-jadwal', [App\Http\Controllers\JadwalController::class, 'generate']);
Route::get('/group-jadwal', [App\Http\Controllers\JadwalController::class, 'groupSchedule']);

//Admin Route
Route::prefix('mapel')->name('mapel.')->group(function () {
    Route::GET('/get', [App\Http\Controllers\AdminMapelController::class, 'json']);
    Route::POST('/store', [App\Http\Controllers\AdminMapelController::class, 'store']);
    Route::POST('/update/{id}', [App\Http\Controllers\AdminMapelController::class, 'update']);
    Route::DELETE('/delete/{id}', [App\Http\Controllers\AdminMapelController::class, 'destroy']);
    Route::GET('/find/{id}', [App\Http\Controllers\AdminMapelController::class, 'find']);
});

Route::prefix('kelas')->name('kelas.')->group(function () {
    Route::GET('/get', [App\Http\Controllers\AdminKelasController::class, 'json']);
    Route::POST('/store', [App\Http\Controllers\AdminKelasController::class, 'store']);
    Route::POST('/update/{id}', [App\Http\Controllers\AdminKelasController::class, 'update']);
    Route::DELETE('/delete/{id}', [App\Http\Controllers\AdminKelasController::class, 'destroy']);
    Route::GET('/find/{id}', [App\Http\Controllers\AdminKelasController::class, 'find']);
});

Route::prefix('guru')->name('guru.')->group(function () {
    Route::GET('/get', [App\Http\Controllers\AdminGuruController::class, 'json']);
    Route::POST('/store', [App\Http\Controllers\AdminGuruController::class, 'store']);
    Route::POST('/update/{id}', [App\Http\Controllers\AdminGuruController::class, 'update']);
    Route::DELETE('/delete/{id}', [App\Http\Controllers\AdminGuruController::class, 'destroy']);
    Route::GET('/find/{id}', [App\Http\Controllers\AdminGuruController::class, 'find']);
});

//Jadwal Time Range
Route::prefix('jadwal')->name('jadwal.')->group(function () {
    Route::GET('/get', [App\Http\Controllers\AdminJadwalController::class, 'json']);
    Route::POST('/store', [App\Http\Controllers\AdminJadwalController::class, 'store']);
    Route::POST('/update/{id}', [App\Http\Controllers\AdminJadwalController::class, 'update']);
    Route::DELETE('/delete/{id}', [App\Http\Controllers\AdminJadwalController::class, 'destroy']);
    Route::GET('/find/{id}', [App\Http\Controllers\AdminJadwalController::class, 'find']);
});
