<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class Jadwal extends Model
{
    use HasFactory;
    protected $table = 'jadwal';
    protected $primaryKey = 'id';
    protected $fillable = ['kelas_id','mapel_id','guru_id','hari','jam'];
    protected $inputType = [
        'kelas_id' => 'select',
        'mapel_id' => 'select',
        'guru_id' => 'select',
        'hari' => 'enum',
        'jam' => 'number'
    ];

    public static function validate($data)
    {
        return Validator::make($data, [
            'kelas_id'         => 'required|numeric',
            'guru_id'         => 'required|numeric',
            'mapel_id'       => 'required|numeric',
            'hari'       => 'required|string',
            'jam'       => 'required|numeric'
        ]);
    }

    public function getField()
    {
        return $this->inputType;
    }

    public function cariGuru()
    {
        return $this->belongsTo(Guru::class, 'guru_id')->withDefault(function ($data) {
            if (collect($data->getFillable())->every(fn ($attr) => $data->$attr === null)) {
                return 'Undefined';
            }
            return $data;
        });
    }

    public function cariMapel()
    {
        return $this->belongsTo(Mapel::class, 'mapel_id')->withDefault(function ($data) {
            if (collect($data->getFillable())->every(fn ($attr) => $data->$attr === null)) {
                return 'Undefined';
            }
            return $data;
        });
    }

    public function cariKelas()
    {
        return $this->belongsTo(Kelas::class, 'kelas')->withDefault(function ($data) {
            if (collect($data->getFillable())->every(fn ($attr) => $data->$attr === null)) {
                return 'Undefined';
            }
            return $data;
        });
    }
}
