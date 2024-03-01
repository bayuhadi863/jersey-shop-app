<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWalletRequest extends FormRequest
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
      'balance' => 'required|numeric|min:10000',
    ];
  }

  public function messages(): array
  {
    return [
      'balance.required' => 'Saldo tidak boleh kosong',
      'balance.numeric' => 'Saldo harus berupa angka',
      'balance.min' => 'Minimal top up adalah Rp10.000',
    ];
  }
}
