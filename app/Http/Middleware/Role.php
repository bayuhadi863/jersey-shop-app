<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Role
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next, $role): Response
  {
    if ($role === 'admin') {
      if (!$request->user()->is_admin) {
        return redirect('/')->with('error', 'Tidak dapat mengakses, Anda bukan admin!');;
      }
    } else {
      if ($request->user()->is_admin) {
        return redirect('/dashboard')->with('error', 'Tidak dapat mengakses, Anda bukan pembeli!');;
      }
    }


    return $next($request);
  }
}
