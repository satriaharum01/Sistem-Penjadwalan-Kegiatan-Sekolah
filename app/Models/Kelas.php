<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class Kelas extends Model
{
    use HasFactory;
    protected $table = 'kelas';
    protected $primaryKey = 'id';
    protected $fillable = ['nama_kelas','tingkat'];
    protected $inputType = [
        'nama_kelas' => 'text',
        'tingkat' => 'text'
    ];

    public static function validate($data)
    {
        return Validator::make($data, [
            'nama_kelas'         => 'required|string|max:30',
            'tingkat'       => 'required|string|max:4|min:2'
        ]);
    }

    public function getField()
    {
        return $this->inputType;
    }

}
