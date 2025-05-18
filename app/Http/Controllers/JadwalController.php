<?php

// app/Http/Controllers/JadwalController.php

namespace App\Http\Controllers;

ini_set('max_execution_time', 300); // 300 detik = 5 menit
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Services\ScheduleService;
use App\Models\Guru;
use App\Models\Mapel;
use App\Models\GuruMapel;
use App\Models\Kelas;
use App\Models\KelasMapel;
use App\Models\Slots;
use App\Models\Jadwal;
use App\Services\JadwalCspService;

class JadwalController extends Controller
{
    protected $jadwalService;

    public function __construct(JadwalCspService $jadwalService)
    {
        $this->jadwalService = $jadwalService;
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
        $jadwals = Jadwal::select('jadwal.*')
        ->join('slots', 'slots.id', '=', 'jadwal.slot_id') // join slot biar bisa akses kolom 'hari'
        ->with(['slot', 'kelas', 'mapel', 'guru'])
        ->orderByRaw("FIELD(slots.hari, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu')")
        ->orderBy('slots.mulai') // urut juga berdasarkan jam mulai kalau perlu
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
                        'Guru' => $item->guru->nama_guru,   // Sesuaikan dengan nama field di tabel Guru
                    ];
                }
            }
        }
        // Kembalikan data dalam bentuk tabel
        return $groupedByDayAndClass;
        //return response()->json($groupedByDayAndClass);
    }

    public function generateCSP()
    {
        $this->jadwalService->generateSchedule();

        return response()->json([
            'message' => 'Jadwal berhasil dibuat.',
        ]);
    }

    public function generateJadwal1()
    {
        $logs = app(\App\Services\JadwalCspService::class)->generateJadwal();

        // Kembalikan log ke frontend atau dump
        return response()->json([
            'status' => 'success',
            'logs' => $logs
        ]);
    }

    public function streamLog()
    {

        return response()->stream(function () {
            echo "Loading Data ...\n\n";
            foreach (app(JadwalCspService::class)->generateJadwal() as $line) {
                echo "data: {$line}\n\n";
                ob_flush();
                flush();
                usleep(200000); // 0.2 detik per log
            }
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache',
            'X-Accel-Buffering' => 'no',
        ]);
    }


}
