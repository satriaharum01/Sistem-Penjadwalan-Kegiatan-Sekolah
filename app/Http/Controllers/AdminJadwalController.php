<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//Use Models
use App\Models\Slots;
use Yajra\DataTables\Facades\DataTables;
use File;

class AdminJadwalController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('is_admin');
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
                ->orderby('hari', 'ASC')
                ->get()->map(function ($item, $index) {
                    $item->DT_RowIndex = $index + 1;
                    $item->periode = date('h:i',strtotime($item->jam_mulai)) . ' - '. date('h:i',strtotime($item->jam_akhir));
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
