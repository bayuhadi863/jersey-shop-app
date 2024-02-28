<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\TotalImageSize; // Import custom rule

class StoreProductRequest extends FormRequest
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
      'name' => 'required|max:150|string',
      'category_id' => 'required',
      'price' => 'required|numeric',
      'image' => [
        'required',
        'array',
        new TotalImageSize(5 * 1024 * 1024), // Maksimal total ukuran 5 MB
      ],
      'image.*' => 'mimes:png,jpg,jpeg|max:5120', // Setiap gambar harus memiliki format dan ukuran file yang valid
      'description' => 'nullable',
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
      'name.required' => 'Nama produk wajib diisi',
      'name.max' => 'Nama produk maksimal 150 karakter',
      'name.string' => 'Nama produk harus berupa string',
      'category_id.required' => 'Kategori produk wajib diisi',
      'price.required' => 'Harga produk wajib diisi',
      'price.numeric' => 'Harga produk harus berupa angka',
      'image.required' => 'Gambar produk wajib diisi',
      'image.array' => 'Harap unggah gambar produk',
      'image.*.mimes' => 'Format gambar harus png, jpg, jpeg',
      'image.*.max' => 'Ukuran gambar maksimal 5 MB per file',
      'image.*.required' => 'Semua gambar produk wajib diunggah',
    ];
  }
}
