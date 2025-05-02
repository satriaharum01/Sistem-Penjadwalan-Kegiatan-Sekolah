@extends('backend.app')
@section('content')
<div class="my-3 my-md-5">
    <div class="container">
        <div class="row">
        
            <div class="col-md-12 col-xl-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">{{$sub_title}}</h3>
                    <div class="card-options align-items-center">
                    
                    </div>
                  </div>
                  <div class="card-body " id="card-main">
                      <div class="table-responsive">
                          <table class="table table-hover" id="data-width" width="100%">
                              <thead>
                                <tr>
                                  <th class="text-primary text-center align-content-around" rowspan="2">Kabupaten</th>
                                  <th class="text-primary text-center align-content-around" rowspan="2">Komoditas</th>
                                  <th class="text-primary text-center align-content-around" rowspan="2">Periode</th>
                                  <th class="text-primary text-center align-content-around" rowspan="2">OPT</th>
                                  <th class="text-primary text-center" colspan="5">Luas Terserang</th>
                                </tr>
                                <tr>
                                  <th class="text-primary">R</th>
                                  <th class="text-primary">S</th>
                                  <th class="text-primary">B</th>
                                  <th class="text-primary">P</th>
                                  <th class="text-primary">J</th>
                                </tr>
                              </thead>
                              <tbody>

                              </tbody>
                          </table>
                      </div>
                  </div>
                  <div class="card-footer d-flex justify-content-between">
                      <div>
                        {{env('APP_NAME')}} - {{$title}}
                      </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection