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
Route::get('/generate-csp', [App\Http\Controllers\JadwalController::class, 'generateCSP']);
Route::get('/group-jadwal', [App\Http\Controllers\JadwalController::class, 'groupSchedule']);
Route::get('/generate-csp-jadwal', [App\Http\Controllers\JadwalController::class, 'generateJadwal1']);
Route::get('/stream-jadwal-log', [App\Http\Controllers\JadwalController::class, 'streamLog']);

//Admin Route
Route::prefix('dashboard')->name('dashboard.')->group(function () {
    Route::GET('/get/jam-tingkatan', [App\Http\Controllers\AdminDashboardController::class, 'getJamTingkatan']);
    Route::GET('/get/jam-tingkatan-counter', [App\Http\Controllers\AdminDashboardController::class, 'countJamPelajaran']);
    Route::GET('/get/jam-guru-counter', [App\Http\Controllers\AdminDashboardController::class, 'getJamGuru']);
    Route::GET('/get/jam-mapel-counter', [App\Http\Controllers\AdminDashboardController::class, 'hitungJam']);
    Route::GET('/get/jam-stats-counter', [App\Http\Controllers\AdminDashboardController::class, 'getStatsCounter']);
    Route::GET('/get/distributed-mapel', [App\Http\Controllers\AdminDashboardController::class, 'getDistribusiMapel']);
    Route::GET('/get/distributed-worktime', [App\Http\Controllers\AdminDashboardController::class, 'getDistribusiWorktime']);
    Route::GET('/get/distributed-mapel/all', [App\Http\Controllers\AdminDashboardController::class, 'getDistribusiMapelAll']);
    Route::GET('/get/distributed-worktime/all', [App\Http\Controllers\AdminDashboardController::class, 'getDistribusiWorktimeAll']);
});

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
    Route::GET('/kelas-mapel/get/{kelas_id}', [App\Http\Controllers\AdminKelasController::class, 'show']);
    Route::post('/kelas-mapel/store', [App\Http\Controllers\AdminKelasController::class, 'storeKelasMapelGuru']);
});

Route::prefix('guru')->name('guru.')->group(function () {
    Route::GET('/get', [App\Http\Controllers\AdminGuruController::class, 'json']);
    Route::get('/guru-by-mapel/{mapel_id}', [App\Http\Controllers\AdminGuruController::class, 'getGuruByMapel']);
    Route::POST('/store', [App\Http\Controllers\AdminGuruController::class, 'store']);
    Route::post('/guru-mapel/store', [App\Http\Controllers\AdminGuruController::class, 'storeMapel']);
    Route::POST('/update/{id}', [App\Http\Controllers\AdminGuruController::class, 'update']);
    Route::DELETE('/delete/{id}', [App\Http\Controllers\AdminGuruController::class, 'destroy']);
    Route::GET('/find/{id}', [App\Http\Controllers\AdminGuruController::class, 'find']);
});

//Jadwal Time Range
Route::prefix('jadwal')->name('jadwal.')->group(function () {
    Route::GET('/get', [App\Http\Controllers\AdminJadwalController::class, 'json']);
    Route::GET('/agenda', [App\Http\Controllers\AdminJadwalController::class, 'agendaJson']);
    Route::POST('/store', [App\Http\Controllers\AdminJadwalController::class, 'store']);
    Route::POST('/update/{id}', [App\Http\Controllers\AdminJadwalController::class, 'update']);
    Route::get('/kelas/agenda/{id}', [App\Http\Controllers\AdminJadwalController::class, 'groupScheduleClassFind']);
    Route::DELETE('/delete/{id}', [App\Http\Controllers\AdminJadwalController::class, 'destroy']);
    Route::GET('/find/{id}', [App\Http\Controllers\AdminJadwalController::class, 'find']);
});
