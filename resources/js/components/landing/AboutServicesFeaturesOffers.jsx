import React from 'react';

const AboutServicesFeaturesOffers = () => {
	return (
		<>
			{/* About Start */}
			<div className="container-xxl py-5">
				<div className="container">
					<div className="row g-5 align-items-center">
						<div className="col-lg-6">
							<div className="row g-3">
								<div className="col-6 text-start">
									<img
										className="img-fluid rounded w-100 wow zoomIn"
										data-wow-delay="0.1s"
										src="img/about-1.jpg"
										alt="About 1"
									/>
								</div>
								<div className="col-6 text-start">
									<img
										className="img-fluid rounded w-75 wow zoomIn"
										data-wow-delay="0.3s"
										src="img/about-2.jpg"
										alt="About 2"
										style={{ marginTop: '25%' }}
									/>
								</div>
								<div className="col-6 text-end">
									<img
										className="img-fluid rounded w-75 wow zoomIn"
										data-wow-delay="0.5s"
										src="img/about-3.jpg"
										alt="About 3"
									/>
								</div>
								<div className="col-6 text-end">
									<img
										className="img-fluid rounded w-100 wow zoomIn"
										data-wow-delay="0.7s"
										src="img/about-4.jpg"
										alt="About 4"
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
							<div className="h-100">
								<h6 className="text-primary text-uppercase mb-2">About Us</h6>
								<h1 className="display-6 mb-4">We Provide Best Tour Packages In Your Budget</h1>
								<p>
									Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et
									eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna
									dolore erat amet
								</p>
								<div className="row g-2 mb-4">
									<div className="col-sm-6">
										<i className="fa fa-check text-primary me-2"></i>First Class Flights
									</div>
									<div className="col-sm-6">
										<i className="fa fa-check text-primary me-2"></i>Handpicked Hotels
									</div>
									<div className="col-sm-6">
										<i className="fa fa-check text-primary me-2"></i>5 Star Accommodations
									</div>
									<div className="col-sm-6">
										<i className="fa fa-check text-primary me-2"></i>Latest Model Vehicles
									</div>
								</div>
								<a className="btn btn-primary py-2 px-4" href="">
									Read More
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* About End */}

			{/* Service Start */}
			<div className="container-xxl py-5">
				<div className="container">
					<div className="text-center wow fadeInUp" data-wow-delay="0.1s">
						<h6 className="text-primary text-uppercase">Services</h6>
						<h1 className="mb-5">Our Services</h1>
					</div>
					<div className="row g-4">
						<div className="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
							<div className="service-item rounded pt-3">
								<div className="p-4">
									<i className="fa fa-3x fa-globe text-primary mb-4"></i>
									<h5>WorldWide Tours</h5>
									<p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
							<div className="service-item rounded pt-3">
								<div className="p-4">
									<i className="fa fa-3x fa-hotel text-primary mb-4"></i>
									<h5>Hotel Reservation</h5>
									<p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
							<div className="service-item rounded pt-3">
								<div className="p-4">
									<i className="fa fa-3x fa-user text-primary mb-4"></i>
									<h5>Travel Guides</h5>
									<p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
							<div className="service-item rounded pt-3">
								<div className="p-4">
									<i className="fa fa-3x fa-cog text-primary mb-4"></i>
									<h5>Event Management</h5>
									<p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
							<div className="service-item rounded pt-3">
								<div className="p-4">
									<i className="fa fa-3x fa-globe text-primary mb-4"></i>
									<h5>WorldWide Tours</h5>
									<p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
							<div className="service-item rounded pt-3">
								<div className="p-4">
									<i className="fa fa-3x fa-hotel text-primary mb-4"></i>
									<h5>Hotel Reservation</h5>
									<p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Service End */}
		</>
	);
};

export default AboutServicesFeaturesOffers;
