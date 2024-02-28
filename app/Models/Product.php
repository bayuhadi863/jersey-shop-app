<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
  use HasFactory, SoftDeletes, HasUuids;
  protected $table = 'products';
  protected $fillable = ['name', 'category_id', 'price', 'description'];
  public function category()
  {
    return $this->belongsTo(Category::class, 'category_id');
  }
  public function product_image()
  {
    return $this->hasMany(ProductImage::class, 'product_id');
  }
  public function product_size()
  {
    return $this->hasMany(ProductSize::class, 'product_id');
  }
}
