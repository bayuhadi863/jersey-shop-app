<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAddressRequest;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AddressController extends Controller
{
  public function index()
  {
    $user = Auth::user();
    $addresses = Address::where('user_id', $user->id)->orderBy('is_default', 'desc')->get();

    return Inertia::render('Home/AddressListPage', ['addresses' => $addresses]);
  }

  public function create()
  {
    return Inertia::render('Home/CreateAddressPage');
  }

  public function store(StoreAddressRequest $request)
  {
    $validated = $request->validated();

    if ($validated) {
      $user = Auth::user();
      $defaultUserAddress = Address::where('user_id', $user->id)->where('is_default', true)->first();

      $address = new Address();
      $address->user_id = $user->id;
      $address->country = $request->input('country');
      $address->state = $request->input('state');
      $address->city = $request->input('city');
      $address->address_name = $request->input('address_name');
      $address->postal_code = $request->input('postal_code');
      $address->recipient_name = $request->input('recipient_name');
      $address->phone_number = $request->input('phone_number');
      $address->additional_detail = $request->input('additional_detail');

      if ($request->input('is_default') === true) {
        if ($defaultUserAddress) {
          $defaultUserAddress->is_default = false;
          $defaultUserAddress->save();
        }
      }

      $address->is_default = $request->input('is_default');
      $address->save();
    }
  }
}
