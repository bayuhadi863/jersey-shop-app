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
    })->with('single_order.cart', 'address')->get();

    // mapping orders to change format data
    $data = $orders->map(function ($order) {
      $total_price = 0;
      $products = $order->single_order->map(function ($singleOrder) use (&$total_price) {
        $cart = $singleOrder->cart;
        $product = $cart->product_size->product;
        $total_price += $cart->total_price;

        return [
          'id' => $product->id,
          'name' => $product->name,
          'price' => $product->price,
          'quantity' => $cart->quantity,
          'size' => $cart->product_size->size,
          'total_price' => $cart->total_price,
        ];
      });

      return [
        'id' => $order->id,
        'total_price' => $order->total_price,
        'shipping_price' => $order->shipping_price,
        'address' => $order->address,
        'products' => $products,
        'is_paid' => $order->is_paid,
        'created_at' => $order->created_at->format('d F Y H:i:s'),
      ];
    });

    return Inertia::render('Home/OrderListPage', ['data' => $data]);
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

  public function destroy($order_id)
  {
    //return product_size stock
    $carts = Cart::whereHas('single_order', function ($query) use ($order_id) {
      $query->where('order_id', $order_id);
    })->with('product_size')->get();
    // dd($carts);
    foreach ($carts as $cart) {
      $productSize = $cart->product_size;
      $productSize->stock += $cart->quantity;
      $productSize->save();
    }

    $singleOrders = SingleOrder::where('order_id', $order_id)->get();
    foreach ($singleOrders as $singleOrder) {
      $singleOrder->delete();
    }

    $order = Order::find($order_id);
    $order->delete();


    return redirect()->route('order.index');
  }

  // ADMIN
  public function adminIndex()
  {
    $orders = Order::with('single_order.cart', 'address')->get();

    // mapping orders to change format data
    $data = $orders->map(function ($order) {
      $total_price = 0;
      $products = $order->single_order->map(function ($singleOrder) use (&$total_price) {
        $cart = $singleOrder->cart;
        $product = $cart->product_size->product;
        $total_price += $cart->total_price;

        return [
          'id' => $product->id,
          'name' => $product->name,
          'price' => $product->price,
          'quantity' => $cart->quantity,
          'size' => $cart->product_size->size,
          'total_price' => $cart->total_price,
        ];
      });

      $user = $order->single_order->first()->cart->user;

      return [
        'id' => $order->id,
        'total_price' => $order->total_price,
        'shipping_price' => $order->shipping_price,
        'address' => $order->address,
        'products' => $products,
        'is_paid' => $order->is_paid,
        'user' => $user,
        'created_at' => $order->created_at->format('d F Y H:i:s'),
      ];
    });

    // dd($data);

    return Inertia::render('Dashboard/OrderListPage', ['data' => $data]);
  }
}
