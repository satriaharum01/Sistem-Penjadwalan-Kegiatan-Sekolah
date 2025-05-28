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
                    <h4 class="text-primary">Organisasi</h4>
                    <h3 class="display-8 mb-4">Struktur Organisasi UPT SMP Negeri 27 Medan</h3>
                </div>
                
                <div class="row g-4">
                    <div class="col-md-12 col-lg-12 wow fadeInUp" data-wow-delay="0.2s">
                        <div class="service-item">
                            <div class="service-img">
                                <img src="img/struktur.png" class="img-fluid rounded-top w-100" alt="Image">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Blog End -->

        @endsection