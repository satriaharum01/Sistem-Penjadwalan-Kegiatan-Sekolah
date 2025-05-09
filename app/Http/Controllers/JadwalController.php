<?php

// app/Http/Controllers/JadwalController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ScheduleService;
use App\Models\Guru;
use App\Models\Mapel;
use App\Models\GuruMapel;
use App\Models\Kelas;
use App\Models\KelasMapel;
use App\Models\Slots;
use App\Models\Jadwal;

class JadwalController extends Controller
{
    public function __construct()
    {

    }

    public function generate(Request $request)
    {

        // Dummy data mimicking tabel guru, mapel, guru_mapel, kelas, kelas_mapel, slot
        $gurus = Guru::all()->toArray();
        $mapels = Mapel::all()->toArray();
        $guruMapel = GuruMapel::all()->toArray();
        $kelas = Kelas::all()->toArray();
        $kelasMapel = KelasMapel::all()->toArray();
        $slots = Slots::all()->toArray();

        $service = new ScheduleService();
        $schedule = $service->generateSchedule($gurus, $mapels, $guruMapel, $kelas, $kelasMapel, $slots);
        //return $schedule;
        foreach ($schedule as $row) {
            Jadwal::updateOrCreate($row);
        }
        //return response()->json($schedule);
    }

    public function groupSchedule()
    {
        // Ambil semua data jadwal
        $jadwals = Jadwal::with(['slot', 'kelas', 'mapel', 'guru']) // pastikan relasi sudah terdefinisi
            ->get();

        // Kelompokkan data berdasarkan hari
        $groupedByDay = $jadwals->groupBy(function ($item) {
            return $item->slot->hari; // Mengelompokkan berdasarkan hari
        });

        // Kelompokkan lagi berdasarkan kelas_id dan urutkan berdasarkan mulai
        $groupedByDayAndClass = $groupedByDay->map(function ($items) {
            return $items->groupBy('kelas_id') // Mengelompokkan berdasarkan kelas_id
                ->map(function ($kelasItems) {
                    return $kelasItems->sortBy('slot.mulai'); // Urutkan berdasarkan mulai
                });
        });
        // Siapkan data untuk ditampilkan dalam bentuk tabel
        $tableData = [];

        foreach ($groupedByDayAndClass as $day => $classes) {
            foreach ($classes as $kelasId => $items) {
                foreach ($items as $item) {
                    $tableData[] = [
                        'Hari' => $item->slot->hari,
                        'Mulai' => $item->slot->mulai,
                        'Selesai' => $item->slot->selesai,
                        'Kelas' => $item->kelas->nama_kelas,
                        'Mapel' => $item->mapel->nama_mapel, // Sesuaikan dengan nama field di tabel Mapel
                        'Guru' => $item->guru->kode,   // Sesuaikan dengan nama field di tabel Guru
                    ];
                }
            }
        }

        // Kembalikan data dalam bentuk tabel
        return response()->json($tableData);
        //return response()->json($groupedByDayAndClass);
    }
}
