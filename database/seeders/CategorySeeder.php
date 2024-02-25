<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class CategorySeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('categories')->insert([
      [
        'name' => 'Manchester United',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Manchester City',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Liverpool',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Chelsea',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Arsenal',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Tottenham Hotspurs',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Real Madrid',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'FC Barcelona',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Atletico Madrid',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Paris Saint Germain',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Bayern Munchen',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Borussia Dortmund',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'AC Milan',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Inter Milan',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'name' => 'Juventus',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
    ]);
  }
}
