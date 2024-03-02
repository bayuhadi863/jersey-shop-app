<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Cart;
use App\Models\Order;
use App\Models\SingleOrder;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
  public function index()
  {
    $user = Auth::user();
    $user = Auth::user();
    $orders = Order::whereHas('single_order.cart', function ($query) use ($user) {
      $query->where('user_id', $user->id);
    })->with('single_order.cart')->get();

    return Inertia::render('Home/OrderListPage', ['orders' => $orders]);
  }

  public function show($order_id)
  {
    $user = Auth::user();
    $order = Order::with('single_order.cart.product_size.product.category', 'address')->find($order_id);

    $wallet = Wallet::where('user_id', $user->id)->first();

    return Inertia::render('Home/OrderDetailPage', ['order' => $order, 'wallet' => $wallet]);
  }

  public function store(StoreOrderRequest $request)
  {
    $validated = $request->validated();

    if ($validated) {
      $order = new Order();
      $order->address_id = $request->input('address_id');
      $order->shipping_price = $request->input('shipping_price');
      $order->total_price = $request->input('total_price');
      $order->is_paid = false;
      $order->save();

      $cart_ids = $request->input('cart_ids');
      foreach ($cart_ids as $cart_id) {
        $singleOrder = new SingleOrder();
        $singleOrder->cart_id = $cart_id;
        $singleOrder->order_id = $order->id;
        $singleOrder->save();
      }

      foreach ($cart_ids as $cart_id) {
        $cart = Cart::with('product_size')->find($cart_id);
        if ($cart) {
          $productSize = $cart->product_size;
          $productSize->stock -= $cart->quantity;
          $productSize->save();
        }
      }
    }

    return to_route('order.show', $order->id);
  }

  public function update(UpdateOrderRequest $request, $order_id)
  {
    $validated = $request->validated();

    if ($validated) {
      $order = Order::find($order_id);
      $order->is_paid = true;
      $order->save();

      $user = Auth::user();
      $wallet = Wallet::where('user_id', $user->id)->first();
      $wallet->balance -= $order->total_price;
      $wallet->save();
    }
  }
}
