<?php

// app/Services/ScheduleGeneratorService.php

namespace App\Services;

class ScheduleGeneratorService
{
    protected $schedule = [];

    public function generate($classes, $subjects, $teachers, $slots, $teacherSubject, $classSubject)
    {
        $this->schedule = [];

        $result = $this->backtrack(0, $classes, $slots, $subjects, $teachers, $teacherSubject, $classSubject);

        return $result ? $this->schedule : false;
    }

    protected function backtrack($index, $classes, $slots, $subjects, $teachers, $teacherSubject, &$classSubject)
    {
        if ($index >= count($slots) * count($classes)) {
            return true;
        }

        $slotIndex = $index % count($slots);
        $classIndex = intdiv($index, count($slots));

        $slot = $slots[$slotIndex];
        $class = $classes[$classIndex];

        foreach ($subjects as $subject) {
            if (!isset($classSubject[$class['id']][$subject['id']]) || $classSubject[$class['id']][$subject['id']] <= 0) {
                continue;
            }

            foreach ($teachers as $teacher) {
                if (!in_array($subject['id'], $teacherSubject[$teacher['id']])) {
                    continue;
                }

                if ($this->isSlotAvailable($slot, $teacher['id'])) {
                    $this->schedule[$slot][$class['name']] = [
                        'subject' => $subject['name'],
                        'teacher' => $teacher['name']
                    ];
                    $classSubject[$class['id']][$subject['id']]--;
                    $this->assignSlot($slot, $teacher['id']);

                    if ($this->backtrack($index + 1, $classes, $slots, $subjects, $teachers, $teacherSubject, $classSubject)) {
                        return true;
                    }

                    // Backtrack
                    unset($this->schedule[$slot][$class['name']]);
                    $classSubject[$class['id']][$subject['id']]++;
                    $this->unassignSlot($slot, $teacher['id']);
                }
            }
        }

        // kosongkan slot jika tidak bisa mengisi (misal jam kosong)
        $this->schedule[$slot][$class['name']] = ['subject' => '-', 'teacher' => '-'];
        return $this->backtrack($index + 1, $classes, $slots, $subjects, $teachers, $teacherSubject, $classSubject);
    }

    protected $teacherSlots = [];

    protected function isSlotAvailable($slot, $teacherId)
    {
        return empty($this->teacherSlots[$slot][$teacherId]);
    }

    protected function assignSlot($slot, $teacherId)
    {
        $this->teacherSlots[$slot][$teacherId] = true;
    }

    protected function unassignSlot($slot, $teacherId)
    {
        unset($this->teacherSlots[$slot][$teacherId]);
    }
}
