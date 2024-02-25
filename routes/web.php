<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Home\HomeController;
use App\Http\Controllers\ProductController;
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

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/mantine', function () {
  return Inertia::render('Mantine');
});

Route::middleware('auth', 'role:admin')->group(function () {
  Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

  // CRUD PRODUCT
  Route::get('/dashboard/product/create', [ProductController::class, 'create'])->name('product.create');
  Route::post('/dashboard/product', [ProductController::class, 'store'])->name('product.store');
  Route::get('/dashboard/product', [ProductController::class, 'index'])->name('product.index');
  Route::get('/dashboard/product/{product_id}', [ProductController::class, 'show'])->where('product_id', '[0-9]+')->name('product.show');
  Route::post('/dashboard/product/{product_id}/size', [ProductController::class, 'storeProductSize'])->where('product_id', '[0-9]+')->name('product.storeProductSize');
});

Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
