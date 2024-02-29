<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Home\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

// NO AUTH
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/products', [ProductController::class, 'homeProductIndex'])->name('product.homeProductIndex');
Route::get('/products/{product_id}', [ProductController::class, 'homeProductShow'])->name('product.homeProductShow');

Route::get('/test', [CartController::class, 'index']);

// REQUIRED AUTH
Route::middleware('auth', 'role:admin')->group(function () {
  Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

  // CRUD PRODUCT
  Route::get('/dashboard/product/create', [ProductController::class, 'create'])->name('product.create');
  Route::post('/dashboard/product', [ProductController::class, 'store'])->name('product.store');
  Route::get('/dashboard/product', [ProductController::class, 'index'])->name('product.index');
  Route::get('/dashboard/product/{product_id}', [ProductController::class, 'show'])->name('product.show');
  Route::post('/dashboard/product/{product_id}/size', [ProductController::class, 'storeProductSize'])->name('product.storeProductSize');

  // USERS
  // CRUD CART
  Route::post('/products/{product_id}/carts', [CartController::class, 'store'])->name('cart.store');
});

Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
