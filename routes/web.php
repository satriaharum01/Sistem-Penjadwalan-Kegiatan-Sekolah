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
Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('landing');
Route::get('/fasum', [App\Http\Controllers\HomeController::class, 'index'])->name('landing');

Route::prefix('get')->name('get.')->group(function () {
    Route::GET('/jenis', [App\Http\Controllers\HomeController::class, 'getJenis']);

    Route::prefix('prediksi')->name('prediksi.')->group(function () {
        Route::GET('/analys', [App\Http\Controllers\HomeController::class, 'analys']);
    });

});

//FIND ROUTER PUBLIC

Route::prefix('find')->name('find.')->group(function () {

});

//Login

Route::get('/login', function () {
    return view('auth');
});

Route::prefix('account')->group(function () {
    Route::get('/login', [App\Http\Controllers\HomeController::class, 'login'])->name('login');
    Route::POST('/logout', [App\Http\Controllers\CustomAuth::class, 'customlogout'])->name('logout');
    Route::POST('/set_password', [App\Http\Controllers\CustomAuth::class, 'set_password'])->name('set.password');
    Route::POST('/login/cek_login', [App\Http\Controllers\CustomAuth::class, 'customLogin'])->name('custom.login');
});

//ADMIN ROUTES
Route::prefix('admin')->name('admin.')->group(function () {
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::POST('/update/{id}', [App\Http\Controllers\AdminProfileController::class, 'update']);
    });

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/json', [App\Http\Controllers\AdminDashboardController::class, 'json']);
    });

    Route::prefix('pengguna')->name('pengguna.')->group(function () {
        Route::get('/tambah', [App\Http\Controllers\AdminPenggunaController::class, 'new'])->name('new');
        Route::get('/edit/{id}', [App\Http\Controllers\AdminPenggunaController::class, 'edit'])->name('edit');
        Route::POST('/save', [App\Http\Controllers\AdminPenggunaController::class, 'store']);
        Route::POST('/update/{id}', [App\Http\Controllers\AdminPenggunaController::class, 'update']);
        Route::GET('/delete/{id}', [App\Http\Controllers\AdminPenggunaController::class, 'destroy']);
        Route::get('/json', [App\Http\Controllers\AdminPenggunaController::class, 'json']);
        Route::get('/find/{id}', [App\Http\Controllers\AdminPenggunaController::class, 'find']);
    });
    Route::get('/{any}', function () {
        return view('react');
    })->where('any', '.*');

});
