<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductSizeRequest extends FormRequest
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
      'size' => 'required|max:5|string',
      // |unique:product_sizes,size,NULL,id,product_id,' . $this->product_id,
      'stock' => 'required|numeric',
    ];
  }

  public function messages(): array
  {
    return [
      'size.required' => 'Ukuran produk tidak boleh kosong',
      'size.max' => 'Ukuran produk maksimal 5 karakter',
      'size.string' => 'Ukuran produk harus berupa string',
      // 'size.unique' => 'Ukuran produk harus berbeda dari yang sudah ada',
      'stock.required' => 'Stok produk tidak boleh kosong',
      'stock.numeric' => 'Stok produk harus berupa angka',
    ];
  }
}
