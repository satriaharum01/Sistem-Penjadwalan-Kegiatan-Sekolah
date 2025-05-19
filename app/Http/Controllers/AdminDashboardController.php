<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Mapel;
use App\Models\Kelas;
use App\Models\Jadwal;
use App\Models\KelasMapel;
use App\Models\Guru;
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

    public function countJamPelajaran()
    {
        $counter = Jadwal::count();

        return response()->json($counter);
    }
    public function getJamGuru()
    {
        $counter = Jadwal::count();
        $jumlahJamKerja = Guru::sum('jam_kerja');

        $sisaJamKerja = $jumlahJamKerja - $counter;

        return response()->json($sisaJamKerja);
    }

    public function hitungJam()
    {
        $kelasMapel = KelasMapel::all();

        // Pisahkan data berdasarkan kondisi total_jam
        $lebihDari4 = $kelasMapel->where('total_jam', '>', 4);
        $kurangSama4 = $kelasMapel->where('total_jam', '<=', 4);

        // Hitung total jam untuk masing-masing
        $totalLebihDari4 = $lebihDari4->sum('total_jam');
        $totalKurangSama4 = $kurangSama4->sum('total_jam');
        $data = ['berat' => $totalLebihDari4,
        'ringan' => $totalKurangSama4];

        return response()->json($data);
    }

    public function getStatsCounter()
    {
        $kelas = Kelas::count();
        $guru = Guru::count();
        $mapel = Mapel::count();
        $terjadwal = Jadwal::select('kelas_id')->distinct()->count();

        $data = ['kelas' => $kelas, 'guru' => $guru, 'mapel' => $mapel, 'terjadwal' => $terjadwal];

        return response()->json($data);
    }

    public function getDistribusiWorktime()
    {
        $guruJadwals = Guru::withCount(['jadwals'])->limit(5)->get();
        $data = array();

        foreach ($guruJadwals as $km) {
            $sisaJam = $km->jam_kerja - $km->jadwals_count;

            if ($sisaJam > 0) {
                $keterangan = ['title' => 'Undertime','status' => 'success'];
            } elseif ($sisaJam == 0) {
                $keterangan = ['title' => 'On Time','status' => 'warning'];
            } else {
                
                $keterangan = ['title' => 'Overtime','status' => 'error'];
            }
            $avatars = asset('assets/images/avatars/' . ($km->findUser?->faces ?? 'default.png'));
            $data[] = [
                'guru_id' => $km->id,
                'guru_nama' => $km->nama_guru,
                'guru_kode' => $km->kode,
                'jam_kerja' => $km->jam_kerja,
                'kerja' => $km->jadwals_count,
                'avatarImg' => $avatars,
                'kesimpulan' => $keterangan,
                'sisa' => $sisaJam
            ];
        }

        return response()->json($data);
    }

    public function getDistribusiMapel()
    {
        $kelasMapels = KelasMapel::withCount(['jadwals'])->limit(5)->get();
        $data = array();

        foreach ($kelasMapels as $km) {
            $sisaJam = $km->total_jam - $km->jadwals_count;

            if ($sisaJam > 0) {
                $keterangan = ['title' => 'Tidak Terpenuhi','status' => 'warning'];
            } elseif ($sisaJam == 0) {
                $keterangan = ['title' => 'Terpenuhi','status' => 'success'];
            } else {
                $keterangan = ['title' => 'Overtime','status' => 'error'];
            }

            $data[] = [
                'mapel_id' => $km->mapel_id,
                'mapel_nama' => $km->cariMapel->nama_mapel,
                'mapel_kode' => $km->cariMapel->kode,
                'total_jam' => $km->total_jam,
                'terisi' => $km->jadwals_count,
                'kesimpulan' => $keterangan,
                'sisa' => $sisaJam
            ];
        }

        return response()->json($data);
    }
}
