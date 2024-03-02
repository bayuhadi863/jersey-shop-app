<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWalletRequest;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WalletController extends Controller
{
  public function index()
  {
    $user = Auth::user();
    $wallet = Wallet::where('user_id', $user->id)->first();

    return Inertia::render('Home/WalletPage', ['wallet' => $wallet]);
  }

  public function update(StoreWalletRequest $request)
  {
    $validated = $request->validated();

    if ($validated) {
      $user = Auth::user();
      $wallet = Wallet::where('user_id', $user->id)->first();
      $wallet->balance += $request->input('balance');
      $wallet->save();
    }
  }
}
