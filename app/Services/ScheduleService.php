<?php

namespace App\Services;

class ScheduleService
{
    public function generateSchedule($gurus, $mapels, $guruMapel, $kelas, $kelasMapel, $slots)
    {


        // Buat daftar guru per mapel dari pivot guruMapel
        $mapelGuru = [];
        foreach ($guruMapel as $gm) {
            $mapelGuru[$gm['mapel_id']][] = $gm['guru_id'];
        }

        // Buat tugas (tasks) dari kelasMapel (per 1 jam Mata Pelajaran)
        $tasks = [];
        foreach ($kelasMapel as $km) {
            for ($i = 0; $i < $km['jam']; $i++) {
                $tasks[] = [
                    'kelas_id' => $km['kelas_id'],
                    'mapel_id' => $km['mapel_id'],
                    'guru_id' => null,
                    'slot_id' => null,
                ];
            }
        }
        $n = count($tasks);

        //dd($gurus, $mapels, $guruMapel, $kelas, $kelasMapel, $slots);
        //print_r($tasks);
        // Inisialisasi jadwal kosong (false = slot tersedia)
        $teacherSchedule = []; // teacherSchedule[guru_id][slot_id]
        $classSchedule   = []; // classSchedule[kelas_id][slot_id]
        foreach ($gurus as $guru) {
            foreach ($slots as $slot) {
                if ($slot['jenis'] == 'Mata Pelajaran') {
                    $teacherSchedule[$guru['id']][$slot['id']] = false;
                }
            }
        }
        foreach ($kelas as $k) {
            foreach ($slots as $slot) {
                if ($slot['jenis'] == 'Mata Pelajaran') {
                    $classSchedule[$k['id']][$slot['id']] = false;
                }
            }
        }
        //print_r($teacherSchedule);
        //print_r($classSchedule);
        // Fungsi rekursif backtracking
        $assignLesson = function ($index) use (&$assignLesson, &$tasks, $n, $mapelGuru, &$teacherSchedule, &$classSchedule, $slots) {
            if ($index >= $n) {
                return true; // semua tugas terjadwal
            }
            $task = &$tasks[$index];
            $kelas_id = $task['kelas_id'];
            $mapel_id = $task['mapel_id'];
            if (!isset($mapelGuru[$mapel_id])) {
                return false; // tidak ada guru untuk mapel ini
            }
            foreach ($mapelGuru[$mapel_id] as $guru_id) {
                foreach ($slots as $slot) {
                    // SKIP slot yang bukan Mata Pelajaran (upacara/motivasi/istirahat)
                    if ($slot['jenis'] != 'Mata Pelajaran') {
                        continue;
                    }
                    $slot_id = $slot['id'];
                    // Guru tidak boleh mengajar dua kelas di slot yang sama
                    if ($teacherSchedule[$guru_id][$slot_id]) {
                        continue;
                    }
                    // Kelas tidak boleh memiliki dua mapel di slot yang sama
                    if ($classSchedule[$kelas_id][$slot_id]) {
                        continue;
                    }
                    // Tentukan penugasan
                    $task['guru_id'] = $guru_id;
                    $task['slot_id'] = $slot_id;
                    $teacherSchedule[$guru_id][$slot_id] = true;
                    $classSchedule[$kelas_id][$slot_id] = true;
                    // Lanjut ke tugas berikutnya
                    if ($assignLesson($index + 1)) {
                        return true;
                    }
                    // Backtrack: batalkan penugasan
                    $task['guru_id'] = null;
                    $task['slot_id'] = null;
                    $teacherSchedule[$guru_id][$slot_id] = false;
                    $classSchedule[$kelas_id][$slot_id] = false;
                }
            }
            return false;
        };

        // Eksekusi backtracking mulai dari tugas pertama
        $assignLesson(0);

        // Bentuk output jadwal: array [kelas_id, mapel_id, guru_id, slot_id]
        $schedule = [];
        foreach ($tasks as $task) {
            if ($task['guru_id'] !== null && $task['slot_id'] !== null) {
                $schedule[] = [
                    'kelas_id' => $task['kelas_id'],
                    'mapel_id' => $task['mapel_id'],
                    'guru_id'  => $task['guru_id'],
                    'slot_id'  => $task['slot_id'],
                ];
            }
        }
        return $schedule;
    }
}
