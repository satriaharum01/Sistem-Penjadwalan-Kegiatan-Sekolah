<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class FrontController extends Controller
{
    
    public function index()
    {
        $this->data['title'] = 'Landing';
        
        return view('front/main', $this->data);
    }

}
