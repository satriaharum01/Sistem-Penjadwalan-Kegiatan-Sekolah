<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use App\Models\Jadwal;
use App\Models\JadwalEskul;
use App\Models\Kelas;
use Illuminate\Http\Request;
use Auth;

class FrontController extends Controller
{
    public function index()
    {
        $this->data['title'] = 'Landing';

        return view('front/main', $this->data);
    }

    public function agenda()
    {
        $this->data['title'] = 'Agenda';
        $this->data['data'] = Agenda::orderby('tanggal', 'DESC')
                ->orderby('mulai', 'ASC')
                ->get()->map(function ($item, $index) {
                    $item->DT_RowIndex = $index + 1;
                    $item->agenda = $item->nama_agenda;
                    $item->tanggal = date('d F Y', strtotime($item->tanggal));
                    $item->waktu =  date('H:i', strtotime($item->mulai)) . ' - '. date('H:i', strtotime($item->selesai));
                    $item->jenis = $item->jenis;

                    return $item;
                });

        return view('front/agenda', $this->data);
    }

    public function organisasi()
    {
        $this->data['title'] = 'Organisasi';

        return view('front/organisasi', $this->data);
    }

    public function jadwal()
    {
        //Sampling Data
        $kelas = Kelas::first();

        $this->data['title'] = 'Jadwal';
        $this->data['data'] = JadwalEskul::orderby('nama_eskul', 'ASC')->get();
        $this->data['dataList'] = $this->groupScheduleClassFind($kelas->id);
        $this->data['kelas'] = $kelas->nama_kelas;
        $this->data['kelasList'] = Kelas::all();

        // return ($this->data['dataList']);
        return view('front/jadwal', $this->data);
    }

    public function mapelByKelas(Request $request)
    {
        $name = $request->input('kelas');
        $kelas = Kelas::where('nama_kelas', $name)->first();
        if (!$kelas) {
            return response()->json([], 404); // Kelas tidak ditemukan
        }
        $data = $this->groupScheduleClassFind($kelas->id);

        return response()->json($data);
    }

    public function groupScheduleClassFind($id)
    {
        $jadwals = Jadwal::with(['mapel', 'guru', 'kelas']) // relasi di jadwal
        ->rightJoin('slots', function ($join) use ($id) {
            $join->on('jadwal.slot_id', '=', 'slots.id')
                 ->where('jadwal.kelas_id', $id);
        })
        ->orderByRaw("FIELD(slots.hari, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu')")
        ->orderBy('slots.mulai')
        ->get();

        foreach ($jadwals as $item) {
            if ($item->mapel_id == null) {
                $item->kelas_id = $id;
            }
        }
        // Kelompokkan data berdasarkan hari
        $groupedByDay = $jadwals->groupBy(function ($item) {
            return $item->hari; // Mengelompokkan berdasarkan hari
        });

        $tableData = [];
        foreach ($groupedByDay as $day => $items) {

            foreach ($items as $item) {
                if ($item->mapel_id == null) {
                    $tableData[] = [
                        'Hari' => $item->hari,
                        'Mulai' => $item->mulai,
                        'Selesai' => $item->selesai,
                        'Kelas'  =>  '-' ,
                        'Mapel'  =>  $item->jenis ,
                        'Guru'   =>  $item->jenis,
                        'Jenis'   =>  $item->jenis,
                    ];
                } else {
                    $tableData[] = [
                        'Hari' => $item->hari,
                        'Mulai' => $item->mulai,
                        'Selesai' => $item->selesai,
                        'Kelas'  =>  $item->kelas->nama_kelas ,
                        'Mapel'  =>  $item->mapel->nama_mapel ,
                        'Guru'   =>  $item->guru->nama_guru,
                        'Jenis'   =>  $item->jenis,
                    ];
                }
            }
        }

        // Kembalikan data dalam bentuk tabel
        $lastdata = $this->groupByDayNotJson($groupedByDay);

        return $lastdata;
    }


    public function cetakJadwal(Request $request)
    {
        $this->data['title'] = 'Cetak Jadwal PDF';
        $this->data['subTitle'] = 'Data Jadwal';
        $this->data['page'] = 'Laporan';

        if ($request->input('kelas')) {
            $this->data['subTitle'] = 'Jadwal Kegiatan Belajar Mengajar';
            $name = $request->input('kelas');
            $kelas = Kelas::where('nama_kelas', $name)->first();
            if (!$kelas) {
                return response()->json([], 404); // Kelas tidak ditemukan
            }
            $data = $this->groupScheduleClassFind($kelas->id);
            $this->data['data'] = $data;
            $this->data['kelas'] = 'Kelas ' .$name;
        }
        if ($request->input('estrakulikuler')) {

            $this->data['title'] = 'Estrakulikuler';
            $this->data['subTitle'] = 'Jadwal Kegiatan Ekstrakulikuler';
            $this->data['data'] = JadwalEskul::orderby('nama_eskul', 'ASC')->get();
            $this->data['estrakulikuler'] = true;
        }
        if ($request->input('agenda')) {
            $this->data['title'] = 'Agenda';
            $this->data['subTitle'] = 'Jadwal Agenda Kegiatan';
            $this->data['data'] = Agenda::orderby('tanggal', 'DESC')
                    ->orderby('mulai', 'ASC')
                    ->get()->map(function ($item, $index) {
                        $item->DT_RowIndex = $index + 1;
                        $item->agenda = $item->nama_agenda;
                        $item->tanggal = date('d F Y', strtotime($item->tanggal));
                        $item->waktu =  date('H:i', strtotime($item->mulai)) . ' - '. date('H:i', strtotime($item->selesai));
                        $item->jenis = $item->jenis;

                        return $item;
                    });

            $this->data['agenda'] = true;
        }

        return view('front/cetak', $this->data);
    }
}
