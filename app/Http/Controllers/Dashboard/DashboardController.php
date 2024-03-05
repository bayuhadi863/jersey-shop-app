<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
  public function index()
  {
    $totalUser = User::where('is_admin', false)->count();
    $totalProduct = Product::count();
    $totalCategory = Category::count();
    $totalOrder = Order::count();

    $error = null;
    if (session('error')) {
      $error = session('error');
    }
    return Inertia::render(
      'Dashboard/Dashboard',
      [
        'error' => $error,
        'totalUser' => $totalUser,
        'totalProduct' => $totalProduct,
        'totalCategory' => $totalCategory,
        'totalOrder' => $totalOrder,
      ]
    );
  }
}
