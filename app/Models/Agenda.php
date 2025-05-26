<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class Agenda extends Model
{
    use HasFactory;
    protected $table = 'agenda';
    protected $primaryKey = 'id';
    protected $fillable = ['nama_agenda','tanggal','mulai','selesai','jenis'];
    protected $inputType = [
        'nama_agenda' => 'text',
        'tanggal' => 'date',
        'mulai' => 'time',
        'selesai' => 'time',
        'jenis' => 'select'
    ];

    public static function validate($data)
    {
        return Validator::make($data, [
            'nama_agenda'         => 'required|string',
            'tanggal'         => 'required|date',
            'mulai'       => 'required|date_format:H:i',
            'selesai'       => 'required|date_format:H:i'
        ]);
    }

    public function getField()
    {
        return $this->inputType;
    }

}
