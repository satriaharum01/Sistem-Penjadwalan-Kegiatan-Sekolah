<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class GuruMapel extends Model
{
    use HasFactory;
    protected $table = 'guru_mapel';
    protected $primaryKey = 'id';
    protected $fillable = ['guru_id','mapel_id'];
    protected $inputType = [
        'guru_id' => 'select',
        'mapel_id' => 'select'
    ];

    public static function validate($data)
    {
        return Validator::make($data, [
            'guru_id'         => 'required|numeric',
            'mapel_id'       => 'required|numeric'
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
}
