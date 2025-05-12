<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class Slots extends Model
{
    use HasFactory;
    protected $table = 'slots';
    protected $primaryKey = 'id';
    protected $fillable = ['hari','mulai','selesai','jenis'];
    protected $inputType = [
        'hari' => 'text',
        'mulai' => 'time',
        'selesai' => 'time',
        'jenis' => 'text'
    ];

    public static function validate($data)
    {
        return Validator::make($data, [
            'hari'         => 'required|string',
            'jenis'         => 'required|string'
        ]);
    }

    public function getField()
    {
        return $this->inputType;
    }

}
