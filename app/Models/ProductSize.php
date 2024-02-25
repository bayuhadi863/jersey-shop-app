<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductSize extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'product_sizes';
  protected $fillable = ['product_id', 'size', 'stock'];
  public function product()
  {
    return $this->belongsTo(Product::class, 'product_id');
  }
}
