@extends('front.app')
@section('header')
<div class="container-fluid bg-breadcrumb">
  <div class="container text-center py-5" style="max-width: 900px;">
    <h4 class="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">{{$title}}</h4>
  </div>
</div>
@endsection
@section('content')
<!-- Blog Start -->
<div class="container-fluid blog py-5">
  <div class="container py-5">
    <div class="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style="max-width: 800px;">
      <h4 class="text-primary">Jadwal Kegiatan</h4>
      <h3 class="display-8 mb-4">Data Jadwal Mata Pelajaran dan Ekstrakurikuler</h3>
    </div>
    <div class="accordion row justify-content-center">
      <div class="accordion-item col-md-4">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            Mata Pelajaran
          </button>
        </h2>
      </div>
      <div class="accordion-item col-md-4">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            Ekstrakurikuler
          </button>
        </h2>

      </div>
    </div>
    <div id="accordionFlushExample">
      <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <div class="card wow fadeIn" data-wow-delay="0.2s">
            <div class="align-items-baseline card-header d-flex justify-content-between">
              <h5 id="card-title" class="text-primary">List Data Jadwal Kelas:</h5>
              <div>
              <select class="btn btn-success" id="kelas" value="{{$kelas}}">
                @foreach($kelasList as $row)
                <option value="{{$row->nama_kelas}}">{{$row->nama_kelas}}</option>
                @endforeach
              </select>
              <button class="btn btn-pdf-kelas btn-success"><i class="fa fa-file-pdf"></i> Cetak</button>
              </div>
              
            </div>

            @if (isset($error))
            <div class="alert alert-danger">
              {{ $error }}
            </div>
            @endif

            <div class="table-responsive p-3">
              <table class="table table-bordered table-sm" id="data-mapel">
                <thead>
                  <tr>
                    <th class="text-center text-primary">#</th>
                    <th class="text-center text-primary">Waktu</th>
                    <th class="text-center text-primary">Mata Pelajaran</th>
                    <th class="text-center text-primary">Guru</th>
                  </tr>
                </thead>
                <tbody>
                  @forelse ($dataList as $i => $row)
                  @if (!empty($row['isHari']))
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
                  @endif
                  @empty
                  <tr>
                    <td colspan="5" class="text-center">Tidak ada data.</td>
                  </tr>
                  @endforelse
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <div class="card-body wow fadeIn" data-wow-delay="0.2s" id="card-main">
            <div class="align-items-baseline card-header d-flex justify-content-between">
              <h5 id="card-title" class="text-primary">List Data Jadwal Ekstrakurikuler</h5>
              <button class="btn btn-pdf btn-success"><i class="fa fa-file-pdf"></i> Cetak</button>
            </div>
            <div class="table-responsive">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Blog End -->

@endsection
@section('js')

<script>
$('.btn-pdf').on('click', function (e) {
  e.preventDefault();
  window.open('{{ url("jadwal/cetak?estrakulikuler=true") }}', '_blank');
});
$('.btn-pdf-kelas').on('click', function (e) {
  e.preventDefault();
  const selected = $('#kelas').val();
  if (selected) {
    window.open(`{{ url("jadwal/cetak?kelas=") }}${encodeURIComponent(selected)}`, '_blank');
  } else {
    alert('Silakan pilih kelas terlebih dahulu.');
  }
});
  document.getElementById('kelas').addEventListener('change', function () {
    const selected = this.value;

    fetch(`/get/mapel-by-kelas?kelas=${encodeURIComponent(selected)}`)
      .then(res => res.json())
      .then(data => {
        const tbody = document.querySelector('#data-mapel tbody');
        tbody.innerHTML = ''; // Kosongkan isi

        data.forEach((row, index) => {
          const tr = document.createElement('tr');

          if (row.isHari) {
            tr.innerHTML = `
      <td colspan="5" class="fw-bold bg-light px-md-5">${row.hari}</td>
    `;
          } else if (row.jenis !== 'Mata Pelajaran') {
            tr.innerHTML = `
      <td class="text-center">${row.index}</td>
      <td class="text-center">${row.mulai} - ${row.selesai}</td>
      <td colspan="3" class="text-center fw-bold bg-light">${row.jenis}</td>
    `;
          } else {
            tr.innerHTML = `
      <td class="text-center">${row.index}</td>
      <td class="text-center">${row.mulai} - ${row.selesai}</td>
      <td class="text-center">${row.mapel}</td>
      <td class="text-center">${row.guru}</td>
    `;
          }

          tbody.appendChild(tr);
        });

        if (data.length === 0) {
          const tr = document.createElement('tr');
          tr.innerHTML = `
    <td colspan="5" class="text-center">Tidak ada data.</td>
  `;
          tbody.appendChild(tr);
        }

      })
      .catch(err => {
        alert('Gagal memuat data mapel: ' + err.message);
      });
  });
</script>

@endsection