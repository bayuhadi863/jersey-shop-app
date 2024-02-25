<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\UploadedFile;

class TotalImageSize implements ValidationRule
{
  protected int $maxSize; // Maksimal total ukuran (dalam byte)

  /**
   * Create a new rule instance.
   *
   * @param  int  $maxSize
   * @return void
   */
  public function __construct(int $maxSize)
  {
    $this->maxSize = $maxSize;
  }

  /**
   * Run the validation rule.
   *
   * @param  string  $attribute
   * @param  mixed  $value
   * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
   * @return void
   */
  public function validate(string $attribute, mixed $value, Closure $fail): void
  {
    // Pastikan nilai yang diunggah adalah array
    if (!is_array($value)) {
      $fail("The $attribute must be an array.");
      return;
    }

    // Hitung total ukuran dari semua gambar
    $totalSize = 0;
    foreach ($value as $file) {
      // Pastikan nilai yang diunggah adalah instance dari UploadedFile
      if (!$file instanceof UploadedFile) {
        $fail("Invalid value in $attribute array.");
        return;
      }

      $totalSize += $file->getSize(); // Ukuran file dalam byte
    }

    // Validasi total ukuran
    if ($totalSize > $this->maxSize) {
      $fail("Total ukuran gambar maksimal " . ($this->maxSize / 1024 / 1024) . " MB.");
      return;
    }
  }
}
