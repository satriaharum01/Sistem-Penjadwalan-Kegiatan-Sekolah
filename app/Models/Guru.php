<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class Guru extends Model
{
    use HasFactory;
    protected $table = 'guru';
    protected $primaryKey = 'id';
    protected $fillable = ['nama_guru','kode','jam_kerja','jabatan','tugas_tambahan','status'];
    protected $inputType = [
        'nama_guru' => 'text',
        'kode' => 'text',
        'jam_kerja' => 'number',
        'jabatan' => 'text',
        'tugas_tambahan' => 'text',
        'status' => 'enum'
    ];

    public static function validate($data)
    {
        return Validator::make($data, [
            'nama_guru'         => 'required|string|max:30',
            'kode'       => 'required|string|max:4|min:2',
            'jam_kerja'          => 'required|numeric',
            'jabatan'         => 'required|string|',
            'tugas_tambahan'    => 'required|string'
        ]);
    }

    public function getField()
    {
        return $this->inputType;
    }

}
