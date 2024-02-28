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
    Schema::create('addresses', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->uuid('user_id');
      $table->foreign('user_id')->references('id')->on('users');
      $table->string('country', 100);
      $table->string('state', 100);
      $table->string('city', 100);
      $table->string('address_name', 255);
      $table->integer('postal_code');
      $table->string('recipient_name', 100);
      $table->string('phone_number', 30);
      $table->string('additional_detail', 100);
      $table->boolean('is_default');
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('addresses');
  }
};
