<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//Use Models
use App\Models\Guru;
use App\Models\GuruMapel;
use Yajra\DataTables\Facades\DataTables;
use File;

class AdminGuruController extends Controller
{
    public function __construct()
    {
        //$this->middleware('auth');
        //$this->middleware('is_admin');
    }

    public function getFormSchema()
    {
        $data = new Guru();

        return response()->json([
            'fillable' => $data->getFillable(),
            'fieldTypes' => $data->getField() // asumsi ini array field => type
        ]);
    }
    public function json()
    {
        $data = Guru::with(['guruMapels.cariMapel'])
                ->orderby('nama_guru', 'ASC')
                ->get()->map(function ($item, $index) {
                    $item->DT_RowIndex = $index + 1;
                    $item->mapel = $item->guruMapels->map(fn ($gm) => $gm->cariMapel->nama_mapel)->implode(', ');
                    return $item;
                });

        return response()->json($data);
    }
    
    public function getGuruByMapel($mapel_id)
    {
        $gurus = Guru::whereHas('guruMapels', function ($q) use ($mapel_id) {
            $q->where('mapel_id', $mapel_id);
        })->select('id', 'nama_guru')->get();
    
        return response()->json($gurus);
    }

    public function find($id)
    {
        // Mengambil data berdasarkan ID
        $data = Guru::find($id);
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
        $validator = Guru::validate($request->all());

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $data = Guru::findOrFail($id);
        $fillableFields = (new Guru())->getFillable();

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
        $validator =  Guru::validate($request->all());

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $data = new Guru();

        $fillAble = (new Guru())->getFillable();
        // Update field lainnya yang boleh diisi
        $data->fill($request->only($fillAble));

        $data->save();

        return response()->json(['message' => 'Data created successfully', 'result' => $data], 201);
    }

    public function storeMapel(Request $request)
    {
        $request->validate([
            'guru_id' => 'required|exists:guru,id',
            'mapel_id' => 'required|array',
            'mapel_id.*' => 'exists:mapel,id',
        ]);

        GuruMapel::where('guru_id', $request->guru_id)->delete();
        
        foreach ($request->mapel_id as $mapelId) {
            GuruMapel::firstOrCreate([
                'guru_id' => $request->guru_id,
                'mapel_id' => $mapelId,
            ]);
        }

        return response()->json(['message' => 'Data created successfully', 'result' => $mapelId], 201);
    }

    public function destroy($id)
    {
        $rows = Guru::findOrFail($id);
        $result = $rows->delete();

        return response()->json(['message' => 'Data deleted successfully', 'result' => $result], 201);
    }
}
