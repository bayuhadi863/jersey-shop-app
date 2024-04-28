<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCartRequest;
use App\Models\Address;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
  public function index()
  {
    $user = Auth::user();

    $carts = Cart::with('product_size.product', 'user')
      ->where('user_id', $user->id)
      ->whereDoesntHave('single_order')
      ->get();

    $addresses = Address::where('user_id', $user->id)->get();

    $data = $carts->map(function ($cart) {
      return [
        'id' => $cart->id,
        'product_name' => $cart->product_size->product->name,
        'product_price' => $cart->product_size->product->price,
        'product_size' => $cart->product_size->size,
        'quantity' => $cart->quantity,
        'total_price' => $cart->total_price,
      ];
    });
    // dd($data);
    $shipping_price = 30000;

    return Inertia::render(
      'Home/CartListPage',
      [
        'data' => $data,
        'addresses' => $addresses,
        'shipping_price' => $shipping_price
      ]
    );
  }

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

  public function destroy($cart_id)
  {
    $user = Auth::user();
    $cart = Cart::where('user_id', $user->id)->find($cart_id);

    if ($cart) {
      $cart->delete();
    }
  }
}
