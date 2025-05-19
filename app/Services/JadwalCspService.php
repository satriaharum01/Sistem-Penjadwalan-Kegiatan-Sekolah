<?php

namespace App\Services;

use App\Models\Kelas;
use App\Models\KelasMapel;
use App\Models\KelasMapelGuru;
use App\Models\Jadwal;
use App\Models\Slots;
use Illuminate\Support\Facades\DB;

class JadwalCspService
{
    protected array $log = [];

    public function generateSchedule()
    {
        $this->log[] = "Memulai proses penjadwalan...";

        $slots = Slots::orderByRaw("FIELD(hari, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu')")
            ->orderBy('mulai')
            ->get();
        
        $this->log[] = "Total slot tersedia: " . $slots->count();

        $classes = Kelas::all();
        $schedule = [];
        $slotUsageCount = [
            'guru' => [],
            'kelas' => []
        ];

        $this->trancationGenerate($classes, $slots, $schedule, $slotUsageCount);
    }

    public function trancationGenerate($classes, $slots, $schedule, $slotUsageCount)
    {
        Jadwal::truncate();

        foreach ($classes as $kelas) {
            $this->log[] = "Memproses kelas: {$kelas->nama}";
            $kelasMapels = KelasMapel::where('kelas_id', $kelas->id)->get();
            if ($kelasMapels->isEmpty()) {
                $this->log[] = "Tidak ada mapel untuk kelas {$kelas->nama}, mengisi slot dengan null";

                continue;
            }

            foreach ($kelasMapels as $kelasMapel) {
                $mapelId = $kelasMapel->mapel_id;
                $totalJam = $kelasMapel->total_jam;
                $minPertemuan = $kelasMapel->min_pertemuan;
                $maxPertemuan = $kelasMapel->max_pertemuan;

                $guruList = KelasMapelGuru::where('kelas_mapel_id', $kelasMapel->id)->pluck('guru_id')->toArray();
                if (empty($guruList)) {
                    continue;
                }

                $pertemuan = max($minPertemuan, min($totalJam, $maxPertemuan));
                $jamPerPertemuan = (int) ceil($totalJam / $pertemuan);

                $assignedCount = 0;

                foreach ($slots as $slot) {
                    if ($slot->jenis == 'Mata Pelajaran') {
                        if ($assignedCount >= $pertemuan) {
                            break;
                        }

                        $availableGuru = $this->getAvailableGuru($slot->id, $guruList, $kelas->id, $schedule);

                        if (count($availableGuru) == 0) {
                            continue;
                        }

                        $guruId = $this->selectGuruWithLeastLoad($availableGuru, $slotUsageCount);

                        $schedule[] = [
                            'kelas_id' => $kelas->id,
                            'mapel_id' => $mapelId,
                            'slot_id' => $slot->id,
                            'guru_id' => $guruId,
                        ];

                        Jadwal::create([
                            'kelas_id' => $kelas->id,
                            'mapel_id' => $mapelId,
                            'slot_id' => $slot->id,
                            'guru_id' => $guruId,
                        ]);

                        $hari = $slot->hari;
                        $slotUsageCount['guru'][$guruId][$hari] = ($slotUsageCount['guru'][$guruId][$hari] ?? 0) + 1;
                        $slotUsageCount['kelas'][$kelas->id][$hari] = ($slotUsageCount['kelas'][$kelas->id][$hari] ?? 0) + 1;

                        $assignedCount++;
                    }
                }
            }
        }
    }

    private function getAvailableGuru($slotId, array $guruList, $kelasId, $schedule)
    {
        $usedGuru = [];
        $kelasUsed = [];

        foreach ($schedule as $item) {
            if ($item['slot_id'] === $slotId) {
                $usedGuru[] = $item['guru_id'];
                $kelasUsed[] = $item['kelas_id'];
            }
        }

        return array_filter($guruList, function ($guruId) use ($usedGuru, $kelasId, $kelasUsed) {
            return !in_array($guruId, $usedGuru) && !in_array($kelasId, $kelasUsed);
        });
    }

    private function selectGuruWithLeastLoad(array $guruList, array $slotUsageCount)
    {
        $guruScores = [];

        foreach ($guruList as $guruId) {
            $load = 0;
            foreach ($slotUsageCount['guru'][$guruId] ?? [] as $hari => $count) {
                $load += $count;
            }
            $guruScores[] = ['id' => $guruId, 'load' => $load];
        }

        usort($guruScores, fn ($a, $b) => $a['load'] <=> $b['load']);

        return $guruScores[0]['id'] ?? $guruList[0];
    }

    /*New
    public function generateJadwal(): array
    {

        $this->log[] = "Memulai proses penjadwalan...";
        Jadwal::truncate();
        $this->log[] = "Membersihkan database jadwal...";

        $slots = Slots::where('jenis', 'Mata Pelajaran')->orderBy('hari')->orderBy('mulai')->get();
        $this->log[] = "Total slot tersedia: " . $slots->count();

        $kelasList = Kelas::with(['kelasMapels.kelasMapelGuru.guru'])->get();
        DB::beginTransaction();

        try {
            foreach ($kelasList as $kelas) {
                $this->log[] = "Memproses kelas: {$kelas->nama_kelas}";
                $slotIndex = 0;
                if (empty($kelas->kelasMapels)) {
                    $this->log[] = "Tidak ada mapel untuk kelas {$kelas->nama_kelas}, mengisi slot dengan null";
                    //foreach ($slots as $slot) {
                    //    Jadwal::create([
                    //        'kelas_id' => $kelas->id,
                    //        'slot_id' => $slot->id,
                    //        'mapel_id' => null,
                    //        'guru_id' => null,
                    //    ]);
                    //}
                    continue;
                }

                $jadwalSementara = [];

                foreach ($kelas->kelasMapels as $kelasMapel) {
                    $mapelNama = $kelasMapel->cariMapel->nama_mapel ?? '-';
                    $this->log[] = "  Mapel: $mapelNama (Total Jam: {$kelasMapel->total_jam})";

                    $requiredJam = $kelasMapel->total_jam;
                    $assignedJam = 0;
                    $maxPerHari = $kelasMapel->max_pertemuan ?? 2; // default 2 jika null
                    $pertemuanPerHari = [];

                    $guruList = $kelasMapel->kelasMapelGuru;

                    foreach ($guruList as $gm) {
                        $guru = $gm->guru;
                        $this->log[] = "    Coba jadwalkan untuk guru: {$guru->nama_guru}";

                        while ($assignedJam < $requiredJam && $slotIndex < $slots->count()) {
                            $slot = $slots[$slotIndex];
                            // Cek hard constraint: batas max pertemuan per hari
                            $hari = $slot->hari;
                            if (!isset($pertemuanPerHari[$hari])) {
                                $pertemuanPerHari[$hari] = 0;
                            }

                            if ($pertemuanPerHari[$hari] >= $maxPerHari) {
                                $this->log[] = "      ❌ Slot $hari {$slot->mulai} dilewati karena melebihi max_pertemuan ($maxPerHari)";
                                $slotIndex++;
                                continue;
                            }
                            // Cek bentrok guru
                            $bentrok = Jadwal::where('slot_id', $slot->id)->where('guru_id', $guru->id)->exists();
                            if ($bentrok) {
                                $this->log[] = "      Slot {$slot->hari} {$slot->mulai} bentrok untuk guru {$guru->nama_guru}";
                                $slotIndex++;
                                continue;
                            }

                            // Assign jadwal
                            $jadwalSementara[] = [
                                'kelas_id' => $kelas->id,
                                'slot_id' => $slot->id,
                                'mapel_id' => $kelasMapel->mapel_id,
                                'guru_id' => $guru->id,
                            ];

                            $this->log[] = "      Jadwal berhasil: {$slot->hari} {$slot->mulai} untuk {$mapelNama} oleh {$guru->nama_guru}";
                            $pertemuanPerHari[$hari]++;
                            $assignedJam++;
                            $slotIndex++;
                        }

                        if ($assignedJam >= $requiredJam) {
                            break;
                        }
                    }

                    if ($assignedJam < $requiredJam) {
                        $this->log[] = "    ⚠️ Gagal penuhi total jam untuk mapel $mapelNama di kelas {$kelas->nama}. Hanya terisi $assignedJam / $requiredJam.";
                    }
                }

                /* Tambahkan slot kosong jika masih tersisa
                while ($slotIndex < $slots->count()) {
                    $slot = $slots[$slotIndex];
                    $jadwalSementara[] = [
                        'kelas_id' => $kelas->id,
                        'slot_id' => $slot->id,
                        'mapel_id' => null,
                        'guru_id' => null,
                    ];
                    $this->log[] = "  Slot kosong ditambahkan di {$slot->hari} {$slot->mulai}";
                    $slotIndex++;
                }

                // Simpan jadwal ke DB
                foreach ($jadwalSementara as $jadwal) {
                    Jadwal::create($jadwal);
                }

                $this->log[] = "Selesai memproses kelas {$kelas->nama_kelas}";
            }

            DB::commit();
            $this->log[] = "✅ Jadwal berhasil dibuat dan disimpan.";
        } catch (\Throwable $e) {
            DB::rollBack();
            $this->log[] = "❌ Terjadi kesalahan: " . $e->getMessage();
        }

        return $this->log;
    }
    */
    public function generateJadwal(): array
    {
        $this->log[] = "Memulai proses penjadwalan...";
        Jadwal::truncate();
        $this->log[] = "Membersihkan database jadwal...";

        $slots = Slots::where('jenis', 'Mata Pelajaran')->orderByRaw("FIELD(hari, 'Senin', 'Kamis', 'Selasa', 'Jumat', 'Rabu', 'Sabtu')")->orderBy('mulai')->get();
        $this->log[] = "Total slot tersedia: " . $slots->count();

        $kelasList = Kelas::with(['kelasMapels.kelasMapelGuru.guru'])->get();
        DB::beginTransaction();

        try {
            foreach ($kelasList as $kelas) {
                $this->log[] = "Memproses kelas: {$kelas->nama_kelas}";
                $slotIndex = 0;

                if ($kelas->kelasMapels->isEmpty()) {
                    $this->log[] = "Tidak ada mapel untuk kelas {$kelas->nama_kelas}, mengisi slot dengan null";
                    //foreach ($slots as $slot) {
                    //    Jadwal::create([
                    //        'kelas_id' => $kelas->id,
                    //        'slot_id' => $slot->id,
                    //        'mapel_id' => null,
                    //        'guru_id' => null,
                    //    ]);
                    //}
                    continue;
                }

                $jadwalSementara = [];
                $sisaKelasMapel = [];
                $slotUsed = [];

                // Tahap 1: alokasikan mapel per guru dengan hard constraint
                foreach ($kelas->kelasMapels as $kelasMapel) {
                    $mapelNama = $kelasMapel->cariMapel->nama_mapel ?? '-';
                    $this->log[] = "  Mapel: $mapelNama (Total Jam: {$kelasMapel->total_jam})";

                    $requiredJam = $kelasMapel->total_jam;
                    $assignedJam = 0;
                    $maxPerHari = $kelasMapel->max_pertemuan ?? 2;
                    $pertemuanPerHari = [];

                    $guruList = $kelasMapel->kelasMapelGuru;

                    foreach ($guruList as $gm) {
                        $guru = $gm->guru;
                        $this->log[] = "    Coba jadwalkan untuk guru: {$guru->nama_guru}";

                        for ($i = 0; $i < $slots->count(); $i++) {
                            if ($assignedJam >= $requiredJam) {
                                break;
                            }

                            $slot = $slots[$i];
                            if (in_array($slot->id, $slotUsed)) {
                                //$this->log[] = "      ❌ Jadwal $hari {$slot->mulai} dilewati karena sudah terisi";
                                continue;
                            }

                            $hari = $slot->hari;
                            if (!isset($pertemuanPerHari[$hari])) {
                                $pertemuanPerHari[$hari] = 0;
                            }
                            if ($pertemuanPerHari[$hari] >= $maxPerHari) {
                                $this->log[] = "      ❌ Jadwal $hari {$slot->mulai} dilewati karena melebihi max_pertemuan ($maxPerHari)";
                                continue;
                            }

                            $bentrok = Jadwal::where('slot_id', $slot->id)->where('guru_id', $guru->id)->exists();
                            if ($bentrok) {
                                continue;
                            }

                            $jadwalSementara[] = [
                                'kelas_id' => $kelas->id,
                                'slot_id' => $slot->id,
                                'mapel_id' => $kelasMapel->mapel_id,
                                'guru_id' => $guru->id,
                            ];

                            $slotUsed[] = $slot->id;
                            $this->log[] = "      Jadwal berhasil: {$slot->hari} {$slot->mulai} untuk {$mapelNama} oleh {$guru->nama_guru}";
                            $pertemuanPerHari[$hari]++;
                            $assignedJam++;
                        }

                        if ($assignedJam >= $requiredJam) {
                            break;
                        }
                    }

                    if ($assignedJam < $requiredJam) {
                        $this->log[] = "    ⚠️ Gagal penuhi total jam untuk mapel $mapelNama di kelas {$kelas->nama_kelas}. Hanya terisi $assignedJam / $requiredJam.";
                    }

                    $sisaKelasMapel[] = [
                        'kelasMapel' => $kelasMapel,
                        'sisaJam' => $kelasMapel->total_jam - $assignedJam,
                    ];
                }

                // Tahap 2: alokasikan sisa slot kosong dengan mapel yang masih kurang jam
                foreach ($slots as $slot) {
                    if (in_array($slot->id, $slotUsed)) {
                        continue;
                    }

                    foreach ($sisaKelasMapel as &$item) {
                        if ($item['sisaJam'] <= 0) {
                            continue;
                        }

                        $kelasMapel = $item['kelasMapel'];
                        $guru = $kelasMapel->kelasMapelGuru->first()?->guru;

                        if (!$guru) {
                            $this->log[] = "      Tidak ada guru pada mapel {$mapelNama} ";
                            continue;
                        }

                        $bentrok = Jadwal::where('slot_id', $slot->id)->where('guru_id', $guru->id)->exists();
                        if ($bentrok) {
                            $this->log[] = "      Jadwal {$slot->hari} {$slot->mulai} bentrok untuk guru {$guru->nama_guru}";
                            continue;
                        }

                        $jadwalSementara[] = [
                            'kelas_id' => $kelas->id,
                            'slot_id' => $slot->id,
                            'mapel_id' => $kelasMapel->mapel_id,
                            'guru_id' => $guru->id,
                        ];
                        $slotUsed[] = $slot->id;
                        $item['sisaJam']--;
                        $this->log[] = "  🌀 Sisa jadwal diisi ulang: {$slot->hari} {$slot->mulai} dengan {$kelasMapel->cariMapel->nama_mapel} oleh {$guru->nama_guru}";
                        break;
                    }
                }

                /* Tahap 3: isi slot kosong yang tersisa dengan null
                foreach ($slots as $slot) {
                    if (!in_array($slot->id, $slotUsed)) {
                        $jadwalSementara[] = [
                            'kelas_id' => $kelas->id,
                            'slot_id' => $slot->id,
                            'mapel_id' => null,
                            'guru_id' => null,
                        ];
                        $this->log[] = "  ❎ Slot kosong: {$slot->hari} {$slot->mulai} diisi null.";
                    }
                }
                */
                // Simpan ke DB
                foreach ($jadwalSementara as $jadwal) {
                    Jadwal::create($jadwal);
                }

                $this->log[] = "Selesai memproses kelas {$kelas->nama_kelas}";
            }

            DB::commit();
            $this->log[] = "✅ Jadwal berhasil dibuat dan disimpan.";
        } catch (\Throwable $e) {
            DB::rollBack();
            $this->log[] = "❌ Terjadi kesalahan: " . $e->getMessage();
        }

        return $this->log;
    }

}
