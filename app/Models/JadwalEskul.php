<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class JadwalEskul extends Model
{
    use HasFactory;
    protected $table = 'jadwal_eskul';
    protected $primaryKey = 'id';
    protected $fillable = ['hari','nama_eskul','pembina','pelatih','ruangan'];
    protected $inputType = [
        'hari' => 'text',
        'nama_eskul' => 'text',
        'pembina' => 'text',
        'pelatih' => 'text',
        'ruangan' => 'text'
    ];

    public static function validate($data)
    {
        return Validator::make($data, [
            'hari'         => 'required|string',
            'nama_eskul'         => 'required|string',
            'pembina'       => 'required|string',
            'pelatih'       => 'required|string'
        ]);
    }

    public function getField()
    {
        return $this->inputType;
    }

}
