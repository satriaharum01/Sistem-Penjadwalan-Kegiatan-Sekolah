<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Jadwal;
use Yajra\DataTables\Facades\DataTables;
use App\Http\helpers\Formula;
use Auth;

class AdminDashboardController extends Controller
{
    public function __construct()
    {
        //$this->middleware('auth');
        //$this->middleware('is_admin');
    }

    public function getJamTingkatan()
    {
        $jadwals = Jadwal::select('jadwal.*')
        ->join('slots', 'slots.id', '=', 'jadwal.slot_id')
        ->with(['slot', 'kelas'])
        ->orderByRaw("FIELD(slots.hari, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu')")
        ->get();
        // Ambil semua hari tetap
        $hariList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

        // Tingkatan kelas yang ingin dihitung (hardcode atau ambil dari DB kalau perlu)
        $tingkatanList = ['VII', 'VIII', 'IX'];

        // Inisialisasi struktur rekap
        $rekap = [];
        foreach ($tingkatanList as $tingkatan) {
            foreach ($hariList as $hari) {
                $rekap[$tingkatan][$hari] = 0;
            }
        }

        // Hitung jumlah jadwal per tingkatan per hari
        foreach ($jadwals as $jadwal) {
            $hari = $jadwal->slot->hari;
            $tingkatan = $jadwal->kelas->tingkat;

            // Pastikan hanya menghitung tingkatan yang diizinkan
            if (in_array($tingkatan, $tingkatanList) && isset($rekap[$tingkatan][$hari])) {
                $rekap[$tingkatan][$hari]++;
            }
        }


        // Format ke struktur "series"
        $series = [];
        foreach ($rekap as $tingkatan => $harian) {
            $series[] = [
                'name' => 'Kelas ' . $tingkatan,
                'data' => array_values($harian),
            ];
        }

        return response()->json(['series' => $series]);
    }
}
