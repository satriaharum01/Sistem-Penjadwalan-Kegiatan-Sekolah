<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class KelasMapel extends Model
{
    use HasFactory;
    protected $table = 'kelas_mapel';
    protected $primaryKey = 'id';
    protected $fillable = ['kelas_id','mapel_id'];
    protected $inputType = [
        'kelas_id' => 'select',
        'mapel_id' => 'select'
    ];

    public static function validate($data)
    {
        return Validator::make($data, [
            'kelas_id'         => 'required|numeric',
            'mapel_id'       => 'required|numeric'
        ]);
    }

    public function getField()
    {
        return $this->inputType;
    }

    public function cariKelas()
    {
        return $this->belongsTo(Kelas::class, 'kelas_id')->withDefault(function ($data) {
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
}
