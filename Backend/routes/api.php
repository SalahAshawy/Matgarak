<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\UserAuthController;
use App\Models\Comment;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('register',[UserAuthController::class,'register']);
Route::post('login',[UserAuthController::class,'login']);
Route::post('logout',[UserAuthController::class,'logout'])
->middleware('auth:sanctum');
Route::middleware(['auth:sanctum'])->group(function(){
    Route::resource('products',ProductsController::class);
    Route::resource('comments',CommentController::class);
    Route::get('/latest-products', [ProductsController::class, 'latestProducts']);
    Route::get('/recommended-products', [ProductsController::class, 'recommendedProducts']);    
    Route::get('/popular-products', [ProductsController::class, 'popularProducts']);    
    Route::get('/more-products', [ProductsController::class, 'showMoreProducts']);    
});
