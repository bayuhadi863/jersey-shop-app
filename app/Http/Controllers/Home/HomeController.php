<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Product;

class HomeController extends Controller
{
  public function index()
  {
    $products = Product::with('product_image', 'product_size')->limit(8)->get();

    return Inertia::render('Home/HomePage', ['products' => $products]);
  }
}
