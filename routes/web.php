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

Route::get('/{any}', function () {
    return view('react');
})->where('any', '.*');

Route::prefix('get')->name('get.')->group(function () {
    Route::GET('/jenis', [App\Http\Controllers\HomeController::class, 'getJenis']);

    Route::prefix('prediksi')->name('prediksi.')->group(function () {
        Route::GET('/analys', [App\Http\Controllers\HomeController::class, 'analys']);
    });

});

//Login
