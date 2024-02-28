<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductImage extends Model
{
  use HasFactory, SoftDeletes, HasUuids;

  protected $table = 'product_images';
  protected $fillable = ['product_id', 'image'];
  public function product()
  {
    return $this->belongsTo(Product::class, 'product_id');
  }
}
