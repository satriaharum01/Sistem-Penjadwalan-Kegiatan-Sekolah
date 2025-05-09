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
    protected $fillable = ['hari','jam_mulai','jam_akhir'];
    protected $inputType = [
        'hari' => 'text',
        'jam_mulai' => 'time',
        'jam_akhir' => 'time'
    ];

    public static function validate($data)
    {
        return Validator::make($data, [
            'hari'         => 'required|string'
        ]);
    }

    public function getField()
    {
        return $this->inputType;
    }

}
