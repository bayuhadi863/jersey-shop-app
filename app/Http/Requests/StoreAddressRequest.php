<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAddressRequest extends FormRequest
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
      'country' => 'required|max:100|string',
      'state' => 'required|max:100|string',
      'city' => 'required|max:100|string',
      'address_name' => 'required|max:255|string',
      'postal_code' => 'required|numeric',
      'recipient_name' => 'required|max:100|string',
      'phone_number' => 'required|max:15|string',
      'additional_detail' => 'nullable|max:50|string',
      'is_default' => 'required|boolean',
    ];
  }

  /**
   * Get the error messages for the defined validation rules.
   *
   * @return array<string, string>
   */

  public function messages(): array
  {
    return [
      'country.required' => 'Nama negara tidak boleh kosong',
      'country.max' => 'Nama negara maksimal 100 karakter',
      'country.string' => 'Nama negara harus berupa string',
      'state.required' => 'Nama provinsi tidak boleh kosong',
      'state.max' => 'Nama provinsi maksimal 100 karakter',
      'state.string' => 'Nama provinsi harus berupa string',
      'city.required' => 'Nama kota tidak boleh kosong',
      'city.max' => 'Nama kota maksimal 100 karakter',
      'city.string' => 'Nama kota harus berupa string',
      'address_name.required' => 'Alamat tidak boleh kosong',
      'address_name.max' => 'Alamat maksimal 255 karakter',
      'address_name.string' => 'Alamat harus berupa string',
      'postal_code.required' => 'Kode pos tidak boleh kosong',
      'postal_code.numeric' => 'Kode pos harus berupa angka',
      'recipient_name.required' => 'Nama penerima tidak boleh kosong',
      'recipient_name.max' => 'Nama penerima maksimal 100 karakter',
      'recipient_name.string' => 'Nama penerima harus berupa string',
      'phone_number.required' => 'Nomor handphone penerima tidak boleh kosong',
      'phone_number.max' => 'Nomor handphone penerima maksimal 15 karakter',
      'phone_number.string' => 'Nomor handphone penerima harus berupa string',
      'additional_detail.max' => 'Detail tambahan maksimal 50 karakter',
      'additional_detail.string' => 'Detail tambahan harus berupa string',
      'is_default.required' => 'Wajib pilih apakah dijadikan alamat default',
      'is_default.boolean' => 'is_default harus berupa boolean',
    ];
  }
}
