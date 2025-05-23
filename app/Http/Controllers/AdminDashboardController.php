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

    public function getDistribusiWorktime($limit = 5)
    {
        $query = Guru::withCount(['jadwals']);
        if ($limit > 0) {
            $query->limit($limit);
        }

        $guruJadwals = $query->get();
        $totalKerja = 0;
        $count = 0;

        $data = $guruJadwals->map(function ($guru) use (&$totalKerja, &$count) {
            $sisaJam = $guru->jam_kerja - $guru->jadwals_count;

            $totalKerja += $guru->jadwals_count;
            $count++;

            return [
                'guru_id'     => $guru->id,
                'guru_nama'   => $guru->nama_guru,
                'guru_kode'   => $guru->kode,
                'jam_kerja'   => $guru->jam_kerja,
                'kerja'       => $guru->jadwals_count,
                'sisa'        => $sisaJam,
                'avatarImg'   => asset('assets/images/avatars/' . ($guru->findUser?->faces ?? 'default.png')),
                'kesimpulan'  => $this->resolveStatus($sisaJam),
            ];
        });

        $statistik = $data->groupBy('kesimpulan.title')->map->count();

        $summary = [
            'rata_rata_kerja' => $count > 0 ? round($totalKerja / $count, 2) : 0,
            'statistik' => $statistik,
        ];

        return $limit > 0 ? response()->json($data) : [$data,$summary];
    }

    public function getDistribusiMapel($limit = 5)
    {
        $query = Mapel::withCount('jadwals');

        if ($limit > 0) {
            $query->limit($limit);
        }

        $kelasMapels = $query->get();
        $totalStudy = 0;
        $count = 0;

        $data = $kelasMapels->map(function ($km) use (&$totalStudy, &$count) {
            $sumJam = $km->kelasMapel->sum('total_jam');
            $sisaJam = $sumJam - $km->jadwals_count;
            $totalStudy += $km->jadwals_count;
            $count++;

            return [
                'mapel_id'    => $km->id,
                'mapel_nama'  => $km->nama_mapel ?? '-',
                'mapel_kode'  => $km->kode ?? '-',
                'total_jam'   => $sumJam,
                'terisi'      => $km->jadwals_count,
                'sisa'        => $sisaJam,
                'kesimpulan'  => $this->resolveMapelStatus($sisaJam),
            ];
        });

        $statistik = $data->groupBy('kesimpulan.title')->map->count();

        $summary = [
            'rata_rata_kerja' => $count > 0 ? round($totalStudy / $count, 2) : 0,
            'statistik' => $statistik,
        ];

        return $limit > 0 ? response()->json($data) : [$data,$summary];
    }

    private function resolveMapelStatus(int $sisaJam): array
    {
        return match (true) {
            $sisaJam > 0   => ['title' => 'Tidak Terpenuhi', 'status' => 'warning'],
            $sisaJam === 0 => ['title' => 'Terpenuhi',        'status' => 'success'],
            $sisaJam < 0   => ['title' => 'Overtime',         'status' => 'error'],
        };
    }

    private function resolveStatus(int $sisaJam): array
    {
        return match(true) {
            $sisaJam > 0  => ['title' => 'Undertime', 'status' => 'success'],
            $sisaJam === 0 => ['title' => 'On Time',   'status' => 'warning'],
            $sisaJam < 0  => ['title' => 'Overtime',  'status' => 'error'],
        };
    }

    public function getDistribusiMapelAll()
    {
        $data = $this->getDistribusiMapel(0);

        return response()->json(['all' => $data[0],'stats' => $data[1]]);
    }

    public function getDistribusiWorktimeAll()
    {
        $data = $this->getDistribusiWorktime(0);

        return response()->json(['all' => $data[0],'stats' => $data[1]]);
    }

}
