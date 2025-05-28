<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//Use Models
use App\Models\JadwalEskul;
use Yajra\DataTables\Facades\DataTables;
use File;

class AdminJadwalEskulController extends Controller
{
    public function __construct()
    {
        //$this->middleware('auth');
        //$this->middleware('is_admin');
    }

    public function getFormSchema()
    {
        $data = new JadwalEskul();

        return response()->json([
            'fillable' => $data->getFillable(),
            'fieldTypes' => $data->getField() // asumsi ini array field => type
        ]);
    }

    public function json()
    {
        $data = JadwalEskul::orderby('nama_eskul', 'ASC')
                ->get();

        return response()->json($data);
    }

    public function find($id)
    {
        // Mengambil data anime berdasarkan ID
        $data = JadwalEskul::find($id);
        if ($data) {
            return response()->json($data);
        } else {
            return response()->json(['message' => 'Data not found'], 404);
        }
    }

    //CRUD
    public function update(Request $request, $id)
    {
        // Validasi data masuk
        $validator = JadwalEskul::validate($request->all());

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $data = JadwalEskul::findOrFail($id);
        $fillableFields = (new JadwalEskul())->getFillable();

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
        $validator =  JadwalEskul::validate($request->all());

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $data = new JadwalEskul();

        $fillAble = (new JadwalEskul())->getFillable();
        // Update field lainnya yang boleh diisi
        $data->fill($request->only($fillAble));

        $data->save();

        return response()->json(['message' => 'Data created successfully', 'result' => $data], 201);
    }


    public function destroy($id)
    {
        $rows = JadwalEskul::findOrFail($id);
        $result = $rows->delete();

        return response()->json(['message' => 'Data deleted successfully', 'result' => $result], 201);
    }
}
