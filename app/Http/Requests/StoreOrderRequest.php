<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'address_id' => 'required|string',
      'shipping_price' => 'required|numeric',
      'total_price' => 'required|numeric',
      'cart_ids' => 'required|array|min:1',
    ];
  }

  public function messages(): array
  {
    return [
      'address_id.required' => 'Anda harus memilih alamat pengiriman',
      'address_id.string' => 'address_id harus berupa string',
      'shipping_price.required' => 'Biaya pengiriman tidak boleh kosong',
      'shipping_price.numeric' => 'Biaya pengiriman harus berupa angka',
      'total_price.required' => 'Total harga tidak boleh kosong',
      'total_price.numeric' => 'Total harga harus berupa angka',
      'cart_ids.required' => 'Pilih setidaknya satu item dari keranjang',
      'cart_ids.array' => 'Cart IDs harus berupa array',
      'cart_ids.min' => 'Pilih setidaknya satu item dari keranjang',
    ];
  }
}
