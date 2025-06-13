@extends('front.app') @section('header')
<div class="container-fluid bg-breadcrumb">
	<div class="container text-center py-5" style="max-width: 900px">
		<h4 class="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">{{$title}}</h4>
	</div>
</div>
@endsection @section('content')
<!-- Blog Start -->
<div class="container-fluid blog py-5">
	<div class="container py-5">
		<div class="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style="max-width: 800px">
			<h4 class="text-primary">Agenda Kegiatan Mendatang</h4>
			<h3 class="display-8 mb-4">Daftar Agenda UPT SMP Negeri 27 Medan</h3>
		</div>
		<div class="card-body wow fadeIn" data-wow-delay="0.2s" id="card-main">
			<div class="align-items-baseline card-header d-flex justify-content-between">
				<h5 id="card-title" class="text-primary">List Data Agenda Kegiatan</h5>
				<button class="btn btn-pdf btn-success"><i class="fa fa-file-pdf"></i> Cetak</button>
			</div>
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
		</div>
	</div>
</div>
<!-- Blog End -->

@endsection @section('js')
<script>
	$('.btn-pdf').on('click', function (e) {
		e.preventDefault();
		window.open('{{ url("agenda/cetak?agenda=true") }}', '_blank');
	});
</script>
@endsection
