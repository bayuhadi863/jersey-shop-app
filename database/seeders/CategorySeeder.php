<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('categories')->insert([
      [
        'id' => Str::uuid(),
        'name' => 'Manchester United',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'id' => Str::uuid(),
        'name' => 'Manchester City',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'id' => Str::uuid(),
        'name' => 'Liverpool',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'id' => Str::uuid(),
        'name' => 'Chelsea',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'id' => Str::uuid(),
        'name' => 'Arsenal',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'id' => Str::uuid(),
        'name' => 'Tottenham Hotspurs',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'id' => Str::uuid(),
        'name' => 'Real Madrid',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'id' => Str::uuid(),
        'name' => 'FC Barcelona',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'id' => Str::uuid(),
        'name' => 'Atletico Madrid',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'id' => Str::uuid(),
        'name' => 'Paris Saint Germain',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'id' => Str::uuid(),
        'name' => 'Bayern Munchen',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'id' => Str::uuid(),
        'name' => 'Borussia Dortmund',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'id' => Str::uuid(),
        'name' => 'AC Milan',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'id' => Str::uuid(),
        'name' => 'Inter Milan',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
      [
        'id' => Str::uuid(),
        'name' => 'Juventus',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ],
    ]);
  }
}
