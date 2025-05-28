<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Notif;
use App\Models\User;
use App\Models\Fasum;
use Auth;
use File;

class Controller extends BaseController
{
    use AuthorizesRequests;
    use DispatchesJobs;
    use ValidatesRequests;

    public $bulan = array('','Januari','Febuari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember');
    public $hari = [
        "","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu","Minggu"
    ];

    public function buat_notif($title, $icon, $color)
    {
        $data = [
            'judul' => $title,
            'status' => 'wait',
            'icon' => $icon,
            'color' => $color,
            'id_user' => Auth::user()->id
        ];

        Notif::create($data);
    }


    public function is_decimal($val)
    {
        return (is_numeric($val) && floor($val) != $val) ? round($val, 2) : $val;
    }

    public function num_of_weeks($val)
    {
        return match ((int)$val) {
            1 => 'st',
            2 => 'nd',
            3 => 'rd',
            default => 'th',
        };
    }

    public function image_destroy($filename)
    {
        if (File::exists(public_path('/img/fasum/' . $filename . ''))) {
            File::delete(public_path('/img/fasum/' . $filename . ''));
        }
    }
    public function profile_destroy($filename)
    {
        if (File::exists(public_path('/assets/img/faces/' . $filename . ''))) {
            File::delete(public_path('/assets/img/faces/' . $filename . ''));
        }
    }

    public function groupByDay($groupedByDayAndClass)
    {
        $tableData = [];

        foreach ($groupedByDayAndClass as $day => $items) {
            $tableData[] = ['isHari' => true, 'hari' => $day];

            $index = 1;
            foreach ($items as $item) {
                if ($item->mapel_id == null) {
                    $tableData[] = [
                        'hari' => $item->hari,
                        'index' => $index,
                        'mulai' => $item->mulai,
                        'selesai' => $item->selesai,
                        'kelas'  => '-' ,
                        'mapel'  =>  $item->jenis ,
                        'jenis'  =>  $item->jenis ,
                        'guru'   =>  $item->jenis,
                    ];
                } else {

                    $tableData[] = [
                        'hari' => $item->hari,
                        'index' => $index,
                        'mulai' => $item->mulai,
                        'selesai' => $item->selesai,
                        'jenis'  =>  $item->jenis ,
                        'kelas'  =>  $item->kelas->nama_kelas ,
                        'mapel'  =>  $item->mapel->nama_mapel ,
                        'guru'   =>  $item->guru->nama_guru,
                    ];
                }
                $index++;
            }
        }

        return response()->json($tableData);
    }
    public function groupByDayNotJson($groupedByDayAndClass)
    {
        $tableData = [];

        foreach ($groupedByDayAndClass as $day => $items) {
            $tableData[] = ['isHari' => true, 'hari' => $day];

            $index = 1;
            foreach ($items as $item) {
                if ($item->mapel_id == null) {
                    $tableData[] = [
                        'hari' => $item->hari,
                        'index' => $index,
                        'mulai' => $item->mulai,
                        'selesai' => $item->selesai,
                        'kelas'  => '-' ,
                        'mapel'  =>  $item->jenis ,
                        'jenis'  =>  $item->jenis ,
                        'guru'   =>  $item->jenis,
                    ];
                } else {

                    $tableData[] = [
                        'hari' => $item->hari,
                        'index' => $index,
                        'mulai' => $item->mulai,
                        'selesai' => $item->selesai,
                        'jenis'  =>  $item->jenis ,
                        'kelas'  =>  $item->kelas->nama_kelas ,
                        'mapel'  =>  $item->mapel->nama_mapel ,
                        'guru'   =>  $item->guru->nama_guru,
                    ];
                }
                $index++;
            }
        }

        return $tableData;
    }
}
