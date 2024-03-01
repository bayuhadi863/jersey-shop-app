<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
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
      'remainingBalance' => 'numeric|min:0',
    ];
  }

  public function messages(): array
  {
    return [
      'remainingBalance.numeric' => 'Sisa saldo harus berupa angka',
      'remainingBalance.min' => 'Saldo Anda tidak mencukupi',
    ];
  }
}
