<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//Use Models
use App\Models\Agenda;
use Yajra\DataTables\Facades\DataTables;
use File;

class AdminAgendaController extends Controller
{
    public function __construct()
    {
        //$this->middleware('auth');
        //$this->middleware('is_admin');
    }

    public function getFormSchema()
    {
        $data = new Agenda();

        return response()->json([
            'fillable' => $data->getFillable(),
            'fieldTypes' => $data->getField() // asumsi ini array field => type
        ]);
    }

    public function json()
    {
        $data = Agenda::orderby('tanggal', 'DESC')
                ->orderby('mulai', 'ASC')
                ->get()->map(function ($item, $index) {
                    $item->DT_RowIndex = $index + 1;
                    $item->agenda = $item->nama_agenda;
                    $item->tanggal = date('d F Y', strtotime($item->tanggal));
                    $item->waktu =  date('H:i', strtotime($item->mulai)) . ' - '. date('H:i', strtotime($item->selesai));
                    $item->jenis = $item->jenis;

                    return $item;
                });
                
        return response()->json($data);
    }

    public function find($id)
    {
        // Mengambil data berdasarkan ID
        $data = Agenda::find($id);
        if ($data) {
            $data->mulai = date('H:i', strtotime($data->mulai));
            $data->selesai = date('H:i', strtotime($data->selesai));

            return response()->json($data);
        } else {
            return response()->json(['message' => 'Data not found'], 404);
        }
    }

    //CRUD
    public function update(Request $request, $id)
    {
        // Validasi data masuk
        $validator = Agenda::validate($request->all());

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $data = Agenda::findOrFail($id);
        $fillableFields = (new Agenda())->getFillable();

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
        $validator =  Agenda::validate($request->all());

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $data = new Agenda();

        $fillAble = (new Agenda())->getFillable();
        // Update field lainnya yang boleh diisi
        $data->fill($request->only($fillAble));

        $data->save();

        return response()->json(['message' => 'Data created successfully', 'result' => $data], 201);
    }

    public function destroy($id)
    {
        $rows = Agenda::findOrFail($id);
        $result = $rows->delete();

        return response()->json(['message' => 'Data deleted successfully', 'result' => $result], 201);
    }
}
