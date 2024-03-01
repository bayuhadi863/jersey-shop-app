<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
  use HasFactory, SoftDeletes, HasUuids;
  protected $table = 'addresses';
  protected $fillable = ['user_id', 'country', 'state', 'city', 'address_name', 'postal_code', 'recipient_name', 'phone_number', 'additional_detail', 'is_default'];

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }
  public function order()
  {
    return $this->hasMany(Order::class, 'address_id');
  }
}
