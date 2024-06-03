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

    // select all product
    $products = Product::all();

    // function to get month from created_at
    function getMonth($date)
    {
      return date('m', strtotime($date));
    }

    // function to get year from created_at
    function getYear($date)
    {
      return date('Y', strtotime($date));
    }

    // filter product by month in 2024
    $products = $products->filter(function ($product) {
      return getYear($product->created_at) == 2024;
    });

    // variable to store 12 month in 2024 with product count in each month
    $monthlyProduct = [
      'January' => 0,
      'February' => 0,
      'March' => 0,
      'April' => 0,
      'May' => 0,
      'June' => 0,
      'July' => 0,
      'August' => 0,
      'September' => 0,
      'October' => 0,
      'November' => 0,
      'December' => 0,
    ];

    // loop through all product
    foreach ($products as $product) {
      // get month from created_at
      $month = getMonth($product->created_at);
      // get year from created_at
      $year = getYear($product->created_at);
      // check if year is 2024
      if ($year == 2024) {
        // increment product count in that month
        $monthlyProduct[date('F', strtotime($product->created_at))]++;
      }
    }

    // print
    // dd($monthlyProduct['January']);


    // select all users
    $users = User::all();

    // filter user by month in 2024
    $users = $users->filter(function ($user) {
      return getYear($user->created_at) == 2024;
    });

    // variable to store 12 month in 2024 with user count in each month
    $monthlyUser = [
      'January' => 0,
      'February' => 0,
      'March' => 0,
      'April' => 0,
      'May' => 0,
      'June' => 0,
      'July' => 0,
      'August' => 0,
      'September' => 0,
      'October' => 0,
      'November' => 0,
      'December' => 0,
    ];

    // loop through all user
    foreach ($users as $user) {
      // get month from created_at
      $month = getMonth($user->created_at);
      // get year from created_at
      $year = getYear($user->created_at);
      // check if year is 2024
      if ($year == 2024) {
        // increment user count in that month
        $monthlyUser[date('F', strtotime($user->created_at))]++;
      }
    }

    // print
    // dd($monthlyUser);


    // select all order
    $orders = Order::all();

    // filter order by month in 2024
    $orders = $orders->filter(function ($order) {
      return getYear($order->created_at) == 2024;
    });

    // variable to store 12 month in 2024 with order count in each month
    $monthlyOrder = [
      'January' => 0,
      'February' => 0,
      'March' => 0,
      'April' => 0,
      'May' => 0,
      'June' => 0,
      'July' => 0,
      'August' => 0,
      'September' => 0,
      'October' => 0,
      'November' => 0,
      'December' => 0,
    ];

    // loop through all order
    foreach ($orders as $order) {
      // get month from created_at
      $month = getMonth($order->created_at);
      // get year from created_at
      $year = getYear($order->created_at);
      // check if year is 2024
      if ($year == 2024) {
        // increment order count in that month
        $monthlyOrder[date('F', strtotime($order->created_at))]++;
      }
    }

    // print
    // dd($monthlyOrder);


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
        'monthlyProduct' => $monthlyProduct,
        'monthlyUser' => $monthlyUser,
        'monthlyOrder' => $monthlyOrder,
      ]
    );
  }
}
