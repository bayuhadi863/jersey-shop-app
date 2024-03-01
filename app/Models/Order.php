<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
  use HasFactory, SoftDeletes, HasUuids;

  protected $table = 'orders';
  protected $fillable = ['address_id', 'shipping_price', 'total_price', 'is_paid'];

  public function address()
  {
    return $this->belongsTo(Address::class, 'address_id');
  }

  public function single_order()
  {
    return $this->hasMany(SingleOrder::class, 'order_id');
  }
}
