<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCartRequest extends FormRequest
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
      'product_size_id' => 'required',
      'quantity' => 'required|numeric|min:1'
    ];
  }

  public function messages(): array
  {
    return [
      'product_size_id.required' => 'Ukuran produk harus dipilih',
      'quantity.required' => 'Jumlah produk tidak boleh kosong',
      'quantity.numeric' => 'Jumlah produk harus berupa angka',
      'quantity.min' => 'Jumlah produk harus minimal 1',
    ];
  }
}
