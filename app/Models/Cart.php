<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cart extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'carts';
    protected $fillable = ['user_id', 'product_size_id', 'quantity', 'total_price'];
    public function user()
    {
      return $this->belongsTo(User::class, 'user_id');
    }
    public function product_size()
    {
      return $this->belongsTo(ProductSize::class, 'product_size_id');
    }
}
