<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('single_orders', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->uuid('cart_id');
      $table->foreign('cart_id')->references('id')->on('carts');
      $table->uuid('order_id');
      $table->foreign('order_id')->references('id')->on('orders');
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('single_orders');
  }
};
