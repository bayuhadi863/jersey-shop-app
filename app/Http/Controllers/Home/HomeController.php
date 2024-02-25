<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function index() {
        return Inertia::render('Home/HomePage');
    }
}
