<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class SingleOrder extends Model
{
  use HasFactory, SoftDeletes, HasUuids;
  protected $table = 'single_orders';
  protected $fillable = ['cart_id', 'order_id'];

  public function cart()
  {
    return $this->belongsTo(Cart::class, 'cart_id');
  }
  public function order()
  {
    return $this->belongsTo(Order::class, 'order_id');
  }
}
