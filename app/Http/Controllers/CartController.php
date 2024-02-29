<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCartRequest;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
  public function store(StoreCartRequest $request, $product_id)
  {
    $validated = $request->validated();

    if ($validated) {
      $cart = new Cart();
      $user = Auth::user();
      $cart->user_id = $user->id;
      $cart->product_size_id = $request->input('product_size_id');
      $cart->quantity = $request->input('quantity');

      $product = Product::find($product_id);
      $cart->total_price = $product->price * $cart->quantity;

      $cart->save();
    }
  }
}
