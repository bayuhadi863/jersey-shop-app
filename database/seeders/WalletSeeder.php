<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

class WalletSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('wallets')->insert([
      [
        'id' => Str::uuid(),
        'user_id' => "9b7611b7-0097-4ce1-9d4f-9210c8718dbc",
        'balance' => 0,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ]
    ]);
  }
}
