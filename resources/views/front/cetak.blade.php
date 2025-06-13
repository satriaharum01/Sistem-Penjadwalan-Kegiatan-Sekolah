@extends('template.cetak') @section('title','Cetak PDF') @section('content') 
<?php error_reporting(0);
$tgla = $start;
$tglk = $end;
$bulan = array( '01' => 'Januari', '02' => 'Februari', '03' => 'Maret', '04' => 'April', '05' => 'Mei',
'06' => 'Juni', '07' => 'Juli', '08' => 'Agustus', '09' => 'September', '10' => 'Oktober', '11' => 'November', '12' =>
'Desember', );
$array1 = explode("-", $tgla);
$tahun = $array1[0];
$bulan1 = $array1[1];
$hari = $array1[2];
$bl1 =
$bulan[$bulan1];
$tgl1 = $bl1 . ' ' . $tahun;
$no = 1;
$array2 = explode("-", $tglk);
$tahun2 = $array2[0];
$bulan2 =
$array2[1];
$hari2 = $array2[2];
$bl2 = $bulan[$bulan2];
$tgl2 = $bl2 . ' ' . $tahun2;
$total = 0; ?>

<div class="my-5 my-md-5">
	<div class="container">
		<div class="row">
			<div class="cold-md-12 col-xl-12">
				<span class="login-form-title">
					<center>
						<div  style="width: 75%; display: flex; flex-direction: row; justify-content: space-around; height: 50%">
							<img src="{{asset('assets/img/logo.png')}}" class="pr-2" alt="logo" />
							<div class="print-content">
								<h3 style="margin-bottom: 0px">
									{{$subTitle}} <br />
									<br />
									{{$kelas}} {{env('APP_DESCRIPTION')}}
									<br />
								</h3>
							</div>
						</div>
					</center>
				</span>
			</div>

			<hr class="hr1" />
			<hr class="hr2" />
			<div class="col-md-12 col-xl-12">
				<div class="card">
					<div class="card-body">
						<div class="table-responsive">
							@if($kelas)
							<table class="table table-hover " id="data-mapel">
								<thead>
									<tr>
										<th class="text-center text-primary">#</th>
										<th class="text-center text-primary">Waktu</th>
										<th class="text-center text-primary">Mata Pelajaran</th>
										<th class="text-center text-primary">Guru</th>
									</tr>
								</thead>
								<tbody>
									@forelse ($data as $i => $row) @if (!empty($row['isHari']))
									<tr>
										<td colspan="5" class="fw-bold bg-light px-md-5">{{ $row['hari'] }}</td>
									</tr>
									@elseif ($row['jenis'] !== 'Mata Pelajaran')
									<tr>
										<td class="text-center">{{ $row['index'] }}</td>
										<td class="text-center">{{ $row['mulai'] }} - {{ $row['selesai'] }}</td>
										<td colspan="3" class="text-center fw-bold bg-light">{{ $row['jenis'] }}</td>
									</tr>
									@else
									<tr>
										<td class="text-center">{{ $row['index'] }}</td>
										<td class="text-center">{{ $row['mulai'] }} - {{ $row['selesai'] }}</td>
										<td class="text-center">{{ $row['mapel'] }}</td>
										<td class="text-center">{{ $row['guru'] }}</td>
									</tr>
									@endif @empty
									<tr>
										<td colspan="5" class="text-center">Tidak ada data.</td>
									</tr>
									@endforelse
								</tbody>
							</table>
							@elseif($estrakulikuler)
							<table class="table table-hover" id="data-width" width="100%">
								<thead>
									<tr>
										<th width="10%"></th>
										<th class="text-center text-primary">Nama Eskul</th>
										<th class="text-center text-primary">Pembina</th>
										<th class="text-center text-primary">Pelatih</th>
										<th class="text-center text-primary">Jadwal</th>
										<th class="text-center text-primary">Ruangan</th>
									</tr>
								</thead>
								<tbody class="text-center">
									@foreach($data as $row)
									<tr class="wow fadeIn" data-wow-delay="0.2s">
										<td>{{$row->DT_RowIndex}}</td>
										<td>{{$row->nama_eskul}}</td>
										<td>{{$row->pembina}}</td>
										<td>{{$row->pelatih}}</td>
										<td>{{$row->hari}}</td>
										<td>{{$row->ruangan}}</td>
									</tr>
									@endforeach
								</tbody>
							</table>
							@elseif($agenda)
							<div class="table-responsive">
								<table class="table table-hover" id="data-width" width="100%">
									<thead>
										<tr>
											<th width="10%"></th>
											<th class="text-center text-primary">Kegiatan</th>
											<th class="text-center text-primary">Tanggal</th>
											<th class="text-center text-primary">Waktu</th>
											<th class="text-center text-primary">Jenis Kegiatan</th>
										</tr>
									</thead>
									<tbody class="text-center">
										@foreach($data as $row)
										<tr>
											<td>{{$row->DT_RowIndex}}</td>
											<td>{{$row->nama_agenda}}</td>
											<td>{{$row->tanggal}}</td>
											<td>{{$row->waktu}}</td>
											<td>{{$row->jenis}}</td>
										</tr>
										@endforeach
									</tbody>
								</table>
							</div>
							@else
							<h5 class="text-center text-danger">Error Loading Data</h5>
							@endif
						</div>
					</div>

					<div class="card-footer d-flex justify-content-between">
						<div><?= env('APP_DESCRIPTION') ?> - {{$title}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

@endsection @section('js') @endsection
