<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class KelasMapelGuru extends Model
{
    use HasFactory;
    protected $table = 'kelas_mapel_guru';
    protected $primaryKey = 'id';
    protected $fillable = ['kelas_mapel_id','guru_id'];
    protected $inputType = [
        'kelas_mapel_id' => 'select',
        'guru_id' => 'select',
    ];

    public static function validate($data)
    {
        return Validator::make($data, [
            'kelas_mapel_id'         => 'required|numeric',
            'guru_id'       => 'required|numeric'
        ]);
    }

    public function getField()
    {
        return $this->inputType;
    }
    
    public function kelasMapel()
    {
        return $this->belongsToMany(KelasMapel::class, 'kelas_mapel_id');
    }

    public function guru()
    {
        return $this->belongsTo(Guru::class, 'guru_id');
    }
    
    public function gurus()
    {
        return $this->belongsToMany(Guru::class, 'guru_id');
    }
}
