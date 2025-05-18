<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//Use Models
use App\Models\Slots;
use App\Models\Kelas;
use App\Models\Jadwal;
use Yajra\DataTables\Facades\DataTables;
use File;

class AdminJadwalController extends Controller
{
    public function __construct()
    {
        //$this->middleware('auth');
        //$this->middleware('is_admin');
    }

    public function getFormSchema()
    {
        $data = new Slots();

        return response()->json([
            'fillable' => $data->getFillable(),
            'fieldTypes' => $data->getField() // asumsi ini array field => type
        ]);
    }
    public function json()
    {
        $data = Slots::select('*')
                ->orderByRaw("FIELD(hari, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu')")
                ->orderby('mulai', 'ASC')
                ->get()->map(function ($item, $index) {
                    $item->DT_RowIndex = $index + 1;
                    $item->periode = date('h:i', strtotime($item->mulai)) . ' - '. date('h:i', strtotime($item->selesai));
                    return $item;
                });

        return response()->json($data);
    }

    public function agendaJson()
    {
        $data = Kelas::withCount(['jadwal'])
                ->orderby('nama_kelas', 'ASC')
                ->get()->map(function ($item, $index) {
                    $item->DT_RowIndex = $index + 1;

                    $item->agenda = $item->jadwal_count > 0 ? $item->jadwal_count .' Jam Pelajaran' : 'Belum di Set';

                    return $item;
                });

        return response()->json($data);
    }

    public function find($id)
    {
        // Mengambil data anime berdasarkan ID
        $data = Slots::find($id);
        if ($data) {
            return response()->json($data);
        } else {
            return response()->json(['message' => 'Data not found'], 404);
        }
    }

    public function groupScheduleClassFind($id)
    {
        // Ambil semua data jadwal
        $jadwals = Jadwal::select('jadwal.*')
        ->where('kelas_id', $id)
        ->join('slots', 'slots.id', '=', 'jadwal.slot_id') // join slot biar bisa akses kolom 'hari'
        ->with(['slot', 'kelas', 'mapel', 'guru'])
        ->orderByRaw("FIELD(slots.hari, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu')")
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
        return $this->groupByDay($groupedByDayAndClass);
        //return response()->json($groupedByDayAndClass);
    }

    //CRUD
    public function update(Request $request, $id)
    {
        // Validasi data masuk
        $validator = Slots::validate($request->all());

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $data = Slots::findOrFail($id);
        $fillableFields = (new Slots())->getFillable();

        // Update field lainnya yang boleh diisi
        $data->fill($request->only($fillableFields));

        $data->save();

        return response()->json([
            'message' => 'Data updated successfully',
            'result' => $data
        ], 200);
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $validator =  Slots::validate($request->all());

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $data = new Slots();

        $fillAble = (new Slots())->getFillable();
        // Update field lainnya yang boleh diisi
        $data->fill($request->only($fillAble));

        $data->save();

        return response()->json(['message' => 'Data created successfully', 'result' => $data], 201);
    }

    public function destroy($id)
    {
        $rows = Slots::findOrFail($id);
        $result = $rows->delete();

        return response()->json(['message' => 'Data deleted successfully', 'result' => $result], 201);
    }
}
