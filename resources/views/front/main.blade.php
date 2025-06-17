<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title><?=env('APP_NAME')?> - Landing Page</title>
		<meta content="width=device-width, initial-scale=1.0" name="viewport" />
		<meta content="" name="keywords" />
		<meta content="" name="description" />

		<!-- Google Web Fonts -->
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto:wght@400;500;700;900&display=swap"
			rel="stylesheet"
		/>

		<!-- Icon Font Stylesheet -->
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" />
		<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />

		<!-- Libraries Stylesheet -->
		<link rel="stylesheet" href="{{asset('lib/animate/animate.min.css')}}" />
		<link href="{{asset('lib/lightbox/css/lightbox.min.css')}}" rel="stylesheet" />
		<link href="{{asset('lib/owlcarousel/assets/owl.carousel.min.css')}}" rel="stylesheet" />

		<!-- Customized Bootstrap Stylesheet -->
		<link href="{{asset('css/bootstrap.min.css')}}" rel="stylesheet" />

		<!-- Template Stylesheet -->
		<link href="{{asset('css/style.css')}}" rel="stylesheet" />
	</head>

	<body>
		<!-- Spinner Start -->
		<div
			id="spinner"
			class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
		>
			<div class="spinner-border text-primary" style="width: 3rem; height: 3rem" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</div>
		<!-- Spinner End -->

		<!-- Topbar Start -->
		<div class="container-fluid topbar bg-light px-5 d-none d-lg-block" id="mainTop">
			<div class="row gx-0 align-items-center">
				<div class="col-lg-8 text-center text-lg-start mb-2 mb-lg-0">
					<div class="d-flex flex-wrap">
						<a href="#" class="text-muted small me-4"
							><i class="fas fa-map-marker-alt text-primary me-2"></i>UPT SMN Negeri 27 Medan</a
						>
						<a href="tel:+01234567890" class="text-muted small me-4"
							><i class="fas fa-phone-alt text-primary me-2"></i>021-5725610</a
						>
						<a href="mailto:example@gmail.com" class="text-muted small me-0"
							><i class="fas fa-envelope text-primary me-2"></i>smpn27medann@gmail.com</a
						>
					</div>
				</div>
				<div class="col-lg-4 text-center text-lg-end">
					<div class="d-inline-flex align-items-center" style="height: 45px">
						@if(Auth::user())
						<div class="dropdown">
							<a href="#" class="dropdown-toggle text-dark" data-bs-toggle="dropdown"
								><small><i class="fa fa-home text-primary me-2"></i> My Menu</small></a
							>
							<div class="dropdown-menu rounded">
								<a href="{{url('admin/dashboard')}}" class="dropdown-item"
									><i class="fas fa-cog me-2"></i> Dashboard</a
								>
								<a href="#" data-bs-toggle="modal" data-bs-target="#logoutModal" class="dropdown-item"
									><i class="fas fa-power-off me-2"></i> Log Out</a
								>
							</div>
						</div>
						@else
						<a href="{{url('account/login')}}"
							><small class="me-3 text-dark"
								><i class="fa fa-sign-in-alt text-primary me-2"></i>Login</small
							></a
						>
						@endif
					</div>
				</div>
			</div>
		</div>
		<!-- Topbar End -->

		<!-- Navbar & Hero Start -->
		<div class="container-fluid position-relative p-0">
			<nav class="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
				<a href="" class="navbar-brand p-0">
					<h1 class="text-primary">
						<i class="fas fa-school me-3"></i
						><?=env('APP_NAME')?>
					</h1>
					<!-- <img src="img/logo.png" alt="Logo"> -->
				</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
					<span class="fa fa-bars"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarCollapse">
					<div class="navbar-nav ms-auto py-0">
						<a href="#mainTop" class="nav-item nav-link active">Home</a>
						<a href="{{url('agenda')}}" class="nav-item nav-link">Agenda</a>
						<a href="#eskul" class="nav-item nav-link">Eskul</a>
						<a href="{{url('jadwal')}}" class="nav-item nav-link">Jadwal</a>
						<div class="nav-item dropdown">
							<a href="#" class="nav-link" data-bs-toggle="dropdown">
								<span class="dropdown-toggle">Tentang Sekolah</span>
							</a>
							<div class="dropdown-menu m-0">
								<a href="{{url('organisasi')}}" class="dropdown-item">Stuktur Organisasi</a>
								<a href="{{url('guru')}}" class="dropdown-item">Guru</a>
								<a href="#visiMisi" class="dropdown-item">Visi Misi</a>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<!-- Carousel Start -->
			<div class="header-carousel owl-carousel">
				<div class="header-carousel-item">
					<img src="img/carousel-1.jpg" class="img-fluid w-100" alt="Image" />
					<div class="carousel-caption">
						<div class="container">
							<div class="row gy-0 gx-5">
								<div class="col-lg-0 col-xl-5"></div>
								<div class="col-xl-7 animated fadeInLeft">
									<div class="text-sm-center text-md-end">
										<h4 class="text-primary text-uppercase fw-bold mb-4">
											Selamat datang di portal informasi Penjadwalan
										</h4>
										<h1 class="display-4 text-uppercase text-white mb-4">
											UPT SMP Negeri 27 Medan
										</h1>
										<p class="mb-5 fs-5">
											Dapatkan informasi jadwal pelajaran, kegiatan ekstrakurikuler, dan agenda
											sekolah secara cepat dan akurat untuk mendukung produktivitas
										</p>
										<div
											class="d-flex align-items-center justify-content-center justify-content-md-end"
										>
											<h2 class="text-white me-2">Follow Us:</h2>
											<div class="d-flex justify-content-end ms-2">
												<a
													class="btn btn-md-square btn-light rounded-circle me-2"
													href="https://www.facebook.com/SmpNegeri27Medan/?locale=id_ID"
													><i class="fab fa-facebook-f"></i
												></a>
												<a
													class="btn btn-md-square btn-light rounded-circle mx-2"
													href="https://www.instagram.com/smp.n27medan/"
													><i class="fab fa-instagram"></i
												></a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="header-carousel-item">
					<img src="img/carousel-2.jpg" class="img-fluid w-100" alt="Image" />
					<div class="carousel-caption">
						<div class="container">
							<div class="row g-5">
								<div class="col-12 animated fadeInUp">
									<div class="text-center">
										<h4 class="text-primary text-uppercase fw-bold mb-4">
											Welcome To SMPN 27 Medan
										</h4>
										<h1 class="display-4 text-uppercase text-white mb-4">
											Membangun Generasi Cerdas dan Berprestasi
										</h1>
										<p class="mb-5 fs-5">
											Menciptakan generasi penerus bangsa yang berdaya saing global,
											berintegritas, dan memiliki semangat untuk terus belajar dan berkembang
										</p>
										<div class="d-flex align-items-center justify-content-center">
											<h2 class="text-white me-2">Follow Us:</h2>
											<div class="d-flex justify-content-end ms-2">
												<a
													class="btn btn-md-square btn-light rounded-circle me-2"
													href="https://www.facebook.com/SmpNegeri27Medan/?locale=id_ID"
													><i class="fab fa-facebook-f"></i
												></a>
												<a
													class="btn btn-md-square btn-light rounded-circle mx-2"
													href="https://www.instagram.com/smp.n27medan/"
													><i class="fab fa-instagram"></i
												></a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Carousel End -->
		</div>
		<!-- Navbar & Hero End -->

		<!-- Abvout Start -->
		<div class="container-fluid about py-5">
			<div class="container py-5">
				<div class="row g-5 align-items-center">
					<div class="col-xl-7 wow fadeInLeft" data-wow-delay="0.2s">
						<div>
							<h4 class="text-primary">Tentang Kami</h4>
							<h1 class="display-5 mb-4">UPT SMP NEGERI 27 MEDAN</h1>
							<p class="mb-4">
								UPT SMP Negeri 27 Medan adalah sebuah lembaga pendidikan menengah pertama yang berlokasi
								di Jl. Pancing Pasar IV No.2, Kenangan Baru, Kec. Percut Sei Tuan, Medan, Sumatera Utara
								. Sekolah ini memiliki fasilitas yang cukup lengkap untuk menunjang kegiatan belajar
								mengajar. Dengan jumlah rombel yang cukup banyak, SMPN 27 Medan berkomitmen untuk
								memberikan pendidikan berkualitas bagi para siswanya.
							</p>
							<div class="row g-4">
								<div class="col-md-6 col-lg-6 col-xl-6">
									<div class="d-flex">
										<div><i class="fas fa-lightbulb fa-3x text-primary"></i></div>
										<div class="ms-4">
											<h4>Sekolah Kreatif</h4>
											<p>
												Memilik berbakai macam kegiatan ekstrakurikuler yang dapat membina masa
												depan siswa menjadi lebih baik.
											</p>
										</div>
									</div>
								</div>
								<div class="col-md-6 col-lg-6 col-xl-6">
									<div class="d-flex">
										<div><i class="bi bi-bookmark-heart-fill fa-3x text-primary"></i></div>
										<div class="ms-4">
											<h4>Sekolah Terakreditasi</h4>
											<p>
												UPT SMP NEGERI 27 Medan telah Terakreditasi A (Unggul) yang merupakan
												sekolah terbaik.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xl-5 wow fadeInRight" data-wow-delay="0.2s">
						<div class="bg-primary rounded-top position-relative overflow-hidden d-flex">
							<img src="img/about-1.jpg" class="img-fluid w-50" alt="" />
							<img src="img/about-2.jpg" class="img-fluid w-50" alt="" />
						</div>
						<div class="bg-primary rounded-bottom position-relative overflow-hidden d-flex">
							<img src="img/about-3.jpg" class="img-fluid w-50" alt="" />
							<img src="img/about-4.jpg" class="img-fluid w-50" alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- About End -->

		<!-- Services Start -->
		<div class="container-fluid service pb-5" id="eskul">
			<div class="container pb-5">
				<div class="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style="max-width: 800px">
					<h4 class="text-primary">Ekstrakurikuler Kami</h4>
					<h1 class="display-5 mb-4">Ekstrakurikuler UPT SMPN 27 Medan</h1>
					<p class="mb-0">
						Ekstrakurikuler adalah kegiatan yang wajib diselenggarakan oleh satuan pendidikan sebagai wadah
						kegiatan pengembangan karakter dalam rangka perluasan potensi, bakat, minat, kemampuan,
						kepribadian, kerja sama, dan kemandirian peserta didik secara optimal. Oleh sebab itu, kegiatan
						ekstrakurikuler harus dikelola secara sistematis dan terpola agar bermuara pada pencapaian
						tujuan yang diharapkan.
					</p>
				</div>
				<div class="row g-4">
					<div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.2s">
						<div class="service-item">
							<div class="service-img">
								<img src="img/service-1.jpg" class="img-fluid rounded-top w-100" alt="Image" />
							</div>
							<div class="rounded-bottom p-4">
								<a href="#" class="h4 d-inline-block mb-4"> Paskibra</a>
								<p class="mb-4">
									Ekstrakurikuler Paskibra melatih kedisiplinan, kepemimpinan, dan kerja sama melalui
									kegiatan baris-berbaris dan upacara.
								</p>
							</div>
						</div>
					</div>
					<div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.4s">
						<div class="service-item">
							<div class="service-img">
								<img src="img/service-2.jpg" class="img-fluid rounded-top w-100" alt="Image" />
							</div>
							<div class="rounded-bottom p-4">
								<a href="#" class="h4 d-inline-block mb-4">Pramuka</a>
								<p class="mb-4">
									Ekstrakurikuler Pramuka membentuk karakter, kemandirian, dan jiwa kepemimpinan
									melalui kegiatan alam dan keterampilan hidup.
								</p>
							</div>
						</div>
					</div>
					<div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.6s">
						<div class="service-item">
							<div class="service-img">
								<img src="img/service-3.jpg" class="img-fluid rounded-top w-100" alt="Image" />
							</div>
							<div class="rounded-bottom p-4">
								<a href="#" class="h4 d-inline-block mb-4">Karate</a>
								<p class="mb-4">
									Ekstrakurikuler Karate mengembangkan kedisiplinan, kepercayaan diri, dan kebugaran
									fisik melalui seni bela diri tradisional.
								</p>
							</div>
						</div>
					</div>
					<div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.2s">
						<div class="service-item">
							<div class="service-img">
								<img src="img/service-4.jpg" class="img-fluid rounded-top w-100" alt="Image" />
							</div>
							<div class="rounded-bottom p-4">
								<a href="#" class="h4 d-inline-block mb-4">Seni Tari</a>
								<p class="mb-4">
									Ekstrakurikuler Seni Tari mengasah kreativitas, ekspresi diri, dan kekompakan
									melalui gerakan tari tradisional dan modern.
								</p>
							</div>
						</div>
					</div>
					<div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.4s">
						<div class="service-item">
							<div class="service-img">
								<img src="img/service-5.jpg" class="img-fluid rounded-top w-100" alt="Image" />
							</div>
							<div class="rounded-bottom p-4">
								<a href="#" class="h4 d-inline-block mb-4">Futsal</a>
								<p class="mb-4">
									Ekstrakurikuler Futsal meningkatkan keterampilan bermain, kerja sama tim, dan
									kebugaran melalui latihan dan pertandingan rutin.
								</p>
							</div>
						</div>
					</div>
					<div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.6s">
						<div class="service-item">
							<div class="service-img">
								<img src="img/service-6.jpg" class="img-fluid rounded-top w-100" alt="Image" />
							</div>
							<div class="rounded-bottom p-4">
								<a href="#" class="h4 d-inline-block mb-4">Pengajian Tahfiz</a>
								<p class="mb-4">
									Ekstrakurikuler Pengajian Tahfiz membina hafalan Al-Qur’an, memperkuat iman, dan
									membentuk akhlak mulia secara rutin dan terarah.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Services End -->

		<!-- Features Start -->
		<div class="container-fluid feature pb-5" id="visiMisi">
			<div class="container pb-5">
				<div class="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style="max-width: 800px">
					<h4 class="text-primary">Landasan Operasional</h4>
					<h1 class="display-5 mb-4">Visi, Misi dan Tujuan.</h1>
					<p class="mb-0">
						Dalam struktur sebuah unit UPT (Unit Pelaksana Teknis), visi, misi, dan tujuan termasuk dalam
						elemen perencanaan strategis dan arah kebijakan organisasi. Secara spesifik, ketiganya berfungsi
						sebagai landasan atau dasar ideologis dan operasional yang menentukan arah, identitas, serta
						target kinerja unit tersebut.
					</p>
				</div>
				<div class="row g-4">
					<div class="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.4s">
						<div class="feature-item p-4">
							<div class="feature-icon p-4 mb-4">
								<i class="fas fa-eye fa-4x text-primary"></i>
							</div>
							<h4>Visi</h4>
							<p class="mb-4">
								UPT berkomitmen menciptakan sekolah religius, bersih, sehat, dan ramah anak, menanamkan
								pengetahuan serta keterampilan untuk pendidikan, serta mengembangkan peserta didik
								aktif, kreatif, dan terampil demi "Terwujudnya Peserta didik yang Berkarakter,
								Berbudaya, dan Berpengetahuan."
							</p>
						</div>
					</div>
					<div class="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.6s">
						<div class="feature-item p-4">
							<div class="feature-icon p-4 mb-4">
								<i class="fas fa-bullseye fa-4x text-primary"></i>
							</div>
							<h4>Misi</h4>
							<p class="mb-4">
								UPT melaksanakan kegiatan pengembangan peserta didik secara menyeluruh, termasuk
								keagamaan, penguatan karakter, pengembangan ilmu pengetahuan dan teknologi sesuai minat,
								pembinaan kemandirian kewirausahaan, serta kerja sama harmonis dengan berbagai pihak
								terkait.
							</p>
						</div>
					</div>
					<div class="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.8s">
						<div class="feature-item p-4">
							<div class="feature-icon p-4 mb-4">
								<i class="fas fa-flag-checkered fa-4x text-primary"></i>
							</div>
							<h4>Tujuan</h4>
							<p class="mb-4">
								UPT bertujuan membangun budaya sekolah religius dan kondusif dengan lingkungan bersih,
								indah, sehat jasmani dan rohani. UPT juga mewujudkan sekolah ramah anak tanpa kekerasan,
								menanamkan pengetahuan dan keterampilan, serta mengembangkan peserta didik aktif dan
								kreatif.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Features End -->

		<!-- Offer Start -->
		<div class="container-fluid offer-section pb-5">
			<div class="container pb-5">
				<div class="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style="max-width: 800px">
					<h4 class="text-primary">Kata Sambutan</h4>
					<h1 class="display-5 mb-4">Kepala Sekolah</h1>
				</div>
				<div class="row g-5 align-items-center">
					<div class="col-xl-12 wow fadeInRight" data-wow-delay="0.4s">
						<div class="tab-content">
							<div class="tab-pane show p-0 active">
								<div class="row g-4">
									<div class="col-md-4">
										<img src="img/kepsek.jpg" class="img-fluid w-100 rounded" alt="" />
									</div>
									<div class="col-md-8">
										<h5 class="mb-4">Kata Sambutan Kepala Sekolah SMPN 27 Medan</h5>
										<p class="mb-2 text-justify">
										Assalamu’alaikum warahmatullahi wabarakatuh.
										</p>
										<p class="mb-2 text-justify">
											Puji syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa. Dalam era
											perkembangan teknologi informasi yang begitu pesat, SMP Negeri 27 Medan
											turut berinovasi dengan menghadirkan website resmi sebagai media informasi
											dan komunikasi sekolah.
										</p>
										<p class="mb-2 text-justify">
										Website ini kami harapkan menjadi sarana untuk menyampaikan berbagai informasi
										penting, prestasi siswa, serta kegiatan sekolah secara cepat dan transparan.
										Teknologi harus dimanfaatkan secara positif untuk mendukung proses pendidikan
										dan membentuk generasi yang siap menghadapi tantangan zaman.
										</p>
										<p class="mb-2 text-justify">
										Terima kasih atas dukungan semua pihak. Mari bersama kita majukan pendidikan
										dengan semangat digital dan kolaboratif.
										</p>
										<p class="mb-2 text-justify">
										Wassalamu’alaikum warahmatullahi wabarakatuh.
										</p>
										Drs. H. Sangkot Basuki, M.M. Kepala SMP Negeri 27 Medan
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Offer End -->

		<!-- Blog Start ->
        <div class="container-fluid blog pb-5">
            <div class="container pb-5">
                <div class="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style="max-width: 800px;">
                    <h4 class="text-primary">Kegiatan</h4>
                    <h1 class="display-5 mb-4">Sekilas aktivitas sekolah</h1>
                    <p class="mb-0">
                    Blog sekolah menyajikan informasi terkini tentang kegiatan akademik, ekstrakurikuler, dan prestasi siswa. Melalui blog, warga sekolah dan masyarakat dapat mengikuti perkembangan serta berbagai program inovatif yang mendukung pembelajaran dan pengembangan karakter peserta didik secara menyeluruh.
                    </p>
                </div>
                <div class="owl-carousel blog-carousel wow fadeInUp" data-wow-delay="0.2s">
                    <div class="blog-item p-4">
                        <div class="blog-img mb-4">
                            <img src="img/service-1.jpg" class="img-fluid w-100 rounded" alt="">
                            <div class="blog-title">
                                <a href="#" class="btn">Kegiatan A</a>
                            </div>
                        </div>
                        <a href="#" class="h4 d-inline-block mb-3">Options Trading Business?</a>
                        <p class="mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore aut aliquam suscipit error corporis accusamus labore....
                        </p>
                        <div class="d-flex align-items-center">
                            <img src="img/testimonial-1.jpg" class="img-fluid rounded-circle" style="width: 60px; height: 60px;" alt="">
                            <div class="ms-3">
                                <h5>Admin</h5>
                                <p class="mb-0">October 9, 2025</p>
                            </div>
                        </div>
                    </div>
                    <div class="blog-item p-4">
                        <div class="blog-img mb-4">
                            <img src="img/service-2.jpg" class="img-fluid w-100 rounded" alt="">
                            <div class="blog-title">
                                <a href="#" class="btn">Kegiatan B</a>
                            </div>
                        </div>
                        <a href="#" class="h4 d-inline-block mb-3">Options Trading Business?</a>
                        <p class="mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore aut aliquam suscipit error corporis accusamus labore....
                        </p>
                        <div class="d-flex align-items-center">
                            <img src="img/testimonial-2.jpg" class="img-fluid rounded-circle" style="width: 60px; height: 60px;" alt="">
                            <div class="ms-3">
                                <h5>Admin</h5>
                                <p class="mb-0">October 9, 2025</p>
                            </div>
                        </div>
                    </div>
                    <div class="blog-item p-4">
                        <div class="blog-img mb-4">
                            <img src="img/service-3.jpg" class="img-fluid w-100 rounded" alt="">
                            <div class="blog-title">
                                <a href="#" class="btn">Kegiatan C</a>
                            </div>
                        </div>
                        <a href="#" class="h4 d-inline-block mb-3">Options Trading Business?</a>
                        <p class="mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore aut aliquam suscipit error corporis accusamus labore....
                        </p>
                        <div class="d-flex align-items-center">
                            <img src="img/testimonial-3.jpg" class="img-fluid rounded-circle" style="width: 60px; height: 60px;" alt="">
                            <div class="ms-3">
                                <h5>Admin</h5>
                                <p class="mb-0">October 9, 2025</p>
                            </div>
                        </div>
                    </div>
                    <div class="blog-item p-4">
                        <div class="blog-img mb-4">
                            <img src="img/service-4.jpg" class="img-fluid w-100 rounded" alt="">
                            <div class="blog-title">
                                <a href="#" class="btn">Kegiatan D</a>
                            </div>
                        </div>
                        <a href="#" class="h4 d-inline-block mb-3">Options Trading Business?</a>
                        <p class="mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore aut aliquam suscipit error corporis accusamus labore....
                        </p>
                        <div class="d-flex align-items-center">
                            <img src="img/testimonial-1.jpg" class="img-fluid rounded-circle" style="width: 60px; height: 60px;" alt="">
                            <div class="ms-3">
                                <h5>Admin</h5>
                                <p class="mb-0">October 9, 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Blog End -->

		<!-- Team Start ->
		<div class="container-fluid team pb-5">
			<div class="container pb-5">
				<div class="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style="max-width: 800px">
					<h4 class="text-primary">Guru</h4>
					<h1 class="display-5 mb-4">Sapa guru terbaik kami</h1>
					<p class="mb-0">
						Guru Terbaik adalah pendidik yang profesional, berdedikasi, dan inspiratif dalam membimbing
						peserta didik. Mereka mengembangkan kompetensi, menumbuhkan motivasi belajar, serta membangun
						karakter positif untuk menciptakan generasi unggul dan berprestasi.
					</p>
				</div>
				<div class="row g-4">
					<div class="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.2s">
						<div class="team-item">
							<div class="team-img">
								<img src="img/team-1.jpg" class="img-fluid" alt="" />
							</div>
							<div class="team-title">
								<h4 class="mb-0">Guru A</h4>
								<p class="mb-0">Mapel A</p>
							</div>
							<div class="team-icon">
								<a class="btn btn-primary btn-sm-square rounded-circle me-3" href=""
									><i class="fab fa-facebook-f"></i
								></a>
								<a class="btn btn-primary btn-sm-square rounded-circle me-3" href=""
									><i class="fab fa-twitter"></i
								></a>
								<a class="btn btn-primary btn-sm-square rounded-circle me-3" href=""
									><i class="fab fa-linkedin-in"></i
								></a>
								<a class="btn btn-primary btn-sm-square rounded-circle me-0" href=""
									><i class="fab fa-instagram"></i
								></a>
							</div>
						</div>
					</div>
					<div class="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.4s">
						<div class="team-item">
							<div class="team-img">
								<img src="img/team-2.jpg" class="img-fluid" alt="" />
							</div>
							<div class="team-title">
								<h4 class="mb-0">Guru B</h4>
								<p class="mb-0">Mapel B</p>
							</div>
							<div class="team-icon">
								<a class="btn btn-primary btn-sm-square rounded-circle me-3" href=""
									><i class="fab fa-facebook-f"></i
								></a>
								<a class="btn btn-primary btn-sm-square rounded-circle me-3" href=""
									><i class="fab fa-twitter"></i
								></a>
								<a class="btn btn-primary btn-sm-square rounded-circle me-3" href=""
									><i class="fab fa-linkedin-in"></i
								></a>
								<a class="btn btn-primary btn-sm-square rounded-circle me-0" href=""
									><i class="fab fa-instagram"></i
								></a>
							</div>
						</div>
					</div>
					<div class="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.6s">
						<div class="team-item">
							<div class="team-img">
								<img src="img/team-3.jpg" class="img-fluid" alt="" />
							</div>
							<div class="team-title">
								<h4 class="mb-0">Guru C</h4>
								<p class="mb-0">Mapel C</p>
							</div>
							<div class="team-icon">
								<a class="btn btn-primary btn-sm-square rounded-circle me-3" href=""
									><i class="fab fa-facebook-f"></i
								></a>
								<a class="btn btn-primary btn-sm-square rounded-circle me-3" href=""
									><i class="fab fa-twitter"></i
								></a>
								<a class="btn btn-primary btn-sm-square rounded-circle me-3" href=""
									><i class="fab fa-linkedin-in"></i
								></a>
								<a class="btn btn-primary btn-sm-square rounded-circle me-0" href=""
									><i class="fab fa-instagram"></i
								></a>
							</div>
						</div>
					</div>
					<div class="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.8s">
						<div class="team-item">
							<div class="team-img">
								<img src="img/team-4.jpg" class="img-fluid" alt="" />
							</div>
							<div class="team-title">
								<h4 class="mb-0">Guru D</h4>
								<p class="mb-0">Mapel D</p>
							</div>
							<div class="team-icon">
								<a class="btn btn-primary btn-sm-square rounded-circle me-3" href=""
									><i class="fab fa-facebook-f"></i
								></a>
								<a class="btn btn-primary btn-sm-square rounded-circle me-3" href=""
									><i class="fab fa-twitter"></i
								></a>
								<a class="btn btn-primary btn-sm-square rounded-circle me-3" href=""
									><i class="fab fa-linkedin-in"></i
								></a>
								<a class="btn btn-primary btn-sm-square rounded-circle me-0" href=""
									><i class="fab fa-instagram"></i
								></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Team End -->

		<!-- Footer Start ->
        <div class="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
            <div class="container py-5 border-start-0 border-end-0" style="border: 1px solid; border-color: rgb(255, 255, 255, 0.08);">
                <div class="row g-5">
                    <div class="col-md-6 col-lg-6 col-xl-4">
                        <div class="footer-item">
                            <a href="index.html" class="p-0">
                                <h4 class="text-white"><i class="fas fa-search-dollar me-3"></i>Stocker</h4>
                                <!-- <img src="img/logo.png" alt="Logo"> ->
                            </a>
                            <p class="mb-4">Dolor amet sit justo amet elitr clita ipsum elitr est.Lorem ipsum dolor sit amet, consectetur adipiscing...</p>
                            <div class="d-flex">
                                <a href="#" class="bg-primary d-flex rounded align-items-center py-2 px-3 me-2">
                                    <i class="fas fa-apple-alt text-white"></i>
                                    <div class="ms-3">
                                        <small class="text-white">Download on the</small>
                                        <h6 class="text-white">App Store</h6>
                                    </div>
                                </a>
                                <a href="#" class="bg-dark d-flex rounded align-items-center py-2 px-3 ms-2">
                                    <i class="fas fa-play text-primary"></i>
                                    <div class="ms-3">
                                        <small class="text-white">Get it on</small>
                                        <h6 class="text-white">Google Play</h6>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-2">
                        <div class="footer-item">
                            <h4 class="text-white mb-4">Quick Links</h4>
                            <a href="#"><i class="fas fa-angle-right me-2"></i> About Us</a>
                            <a href="#"><i class="fas fa-angle-right me-2"></i> Feature</a>
                            <a href="#"><i class="fas fa-angle-right me-2"></i> Attractions</a>
                            <a href="#"><i class="fas fa-angle-right me-2"></i> Tickets</a>
                            <a href="#"><i class="fas fa-angle-right me-2"></i> Blog</a>
                            <a href="#"><i class="fas fa-angle-right me-2"></i> Contact us</a>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="footer-item">
                            <h4 class="text-white mb-4">Support</h4>
                            <a href="#"><i class="fas fa-angle-right me-2"></i> Privacy Policy</a>
                            <a href="#"><i class="fas fa-angle-right me-2"></i> Terms & Conditions</a>
                            <a href="#"><i class="fas fa-angle-right me-2"></i> Disclaimer</a>
                            <a href="#"><i class="fas fa-angle-right me-2"></i> Support</a>
                            <a href="#"><i class="fas fa-angle-right me-2"></i> FAQ</a>
                            <a href="#"><i class="fas fa-angle-right me-2"></i> Help</a>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="footer-item">
                            <h4 class="text-white mb-4">Contact Info</h4>
                            <div class="d-flex align-items-center">
                                <i class="fas fa-map-marker-alt text-primary me-3"></i>
                                <p class="text-white mb-0">123 Street New York.USA</p>
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="fas fa-envelope text-primary me-3"></i>
                                <p class="text-white mb-0">info@example.com</p>
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="fa fa-phone-alt text-primary me-3"></i>
                                <p class="text-white mb-0">(+012) 3456 7890</p>
                            </div>
                            <div class="d-flex align-items-center mb-4">
                                <i class="fab fa-firefox-browser text-primary me-3"></i>
                                <p class="text-white mb-0">Yoursite@ex.com</p>
                            </div>
                            <div class="d-flex">
                                <a class="btn btn-primary btn-sm-square rounded-circle me-3" href="#"><i class="fab fa-facebook-f text-white"></i></a>
                                <a class="btn btn-primary btn-sm-square rounded-circle me-3" href="#"><i class="fab fa-twitter text-white"></i></a>
                                <a class="btn btn-primary btn-sm-square rounded-circle me-3" href="#"><i class="fab fa-instagram text-white"></i></a>
                                <a class="btn btn-primary btn-sm-square rounded-circle me-0" href="#"><i class="fab fa-linkedin-in text-white"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer End -->

		<!-- Copyright Start -->
		<div class="container-fluid copyright py-4">
			<div class="container">
				<div class="row g-4 align-items-center">
					<div class="col-md-6 text-center text-md-start mb-md-0">
						<span class="text-body"
							><a href="#" class="border-bottom text-white"
								><i class="fas fa-copyright text-light me-2"></i
								><?=env('APP_NAME')?></a
							>, All right reserved.</span
						>
					</div>
					<div class="col-md-6 text-center text-md-end text-body">
						<!--/*** This template is free as long as you keep the below author’s credit link/attribution link/backlink. ***/-->
						<!--/*** If you'd like to use the template without the below author’s credit link/attribution link/backlink, ***/-->
						<!--/*** you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". ***/-->
						Designed and Developed By
						<a class="border-bottom text-white" href="#">UPT SMP Negeri 27 Medan</a>
					</div>
				</div>
			</div>
		</div>
		<!-- Copyright End -->

		@include('front.logoutModal')

		<!-- Back to Top -->
		<a href="#" class="btn btn-primary btn-lg-square rounded-circle back-to-top"><i class="fa fa-arrow-up"></i></a>

		<!-- JavaScript Libraries -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
		<script src="{{asset('lib/wow/wow.min.js')}}"></script>
		<script src="{{asset('lib/easing/easing.min.js')}}"></script>
		<script src="{{asset('lib/waypoints/waypoints.min.js')}}"></script>
		<script src="{{asset('lib/counterup/counterup.min.js')}}"></script>
		<script src="{{asset('lib/lightbox/js/lightbox.min.js')}}"></script>
		<script src="{{asset('lib/owlcarousel/owl.carousel.min.js')}}"></script>

		<!-- Template Javascript -->
		<script src="js/main.js"></script>
	</body>
</html>
