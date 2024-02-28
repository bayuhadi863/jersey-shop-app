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
    Schema::create('carts', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->uuid('user_id');
      $table->foreign('user_id')->references('id')->on('users');
      $table->uuid('product_size_id');
      $table->foreign('product_size_id')->references('id')->on('product_sizes');
      $table->integer('quantity');
      $table->bigInteger('total_price');
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('carts');
  }
};
