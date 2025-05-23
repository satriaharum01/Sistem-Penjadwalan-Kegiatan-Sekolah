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
            'nama_mapel'         => 'required|string|max:50',
            'kode'       => 'required|string|max:8|min:2'
        ]);
    }

    public function getField()
    {
        return $this->inputType;
    }

    public function jadwals()
    {
        return $this->hasMany(Jadwal::class, 'mapel_id', 'id');
    }

    public function kelasMapel()
    {
        return $this->hasMany(KelasMapel::class, 'mapel_id', 'id');
    }
}
