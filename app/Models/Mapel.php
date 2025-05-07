<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class Mapel extends Model
{
    use HasFactory;
    protected $table = 'mapel';
    protected $primaryKey = 'id';
    protected $fillable = ['nama_mapel','kode'];
    protected $inputType = [
        'nama_mapel' => 'text',
        'kode' => 'text'
    ];

    public static function validate($data)
    {
        return Validator::make($data, [
            'nama_mapel'         => 'required|string|max:30',
            'kode'       => 'required|string|max:4|min:2'
        ]);
    }

    public function getField()
    {
        return $this->inputType;
    }

}
