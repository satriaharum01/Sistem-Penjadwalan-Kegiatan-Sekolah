import React from 'react';

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5 py-3 py-lg-0">
			<a href="/" className="navbar-brand p-0">
				<h1 className="m-0 text-primary">
					<i className="fa fa-book-reader me-3"></i>eLEARNING
				</h1>
			</a>
			<button
				className="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarCollapse"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarCollapse">
				<div className="navbar-nav ms-auto py-0">
					<a href="/" className="nav-item nav-link active">
						Home
					</a>
					<a href="#about" className="nav-item nav-link">
						About
					</a>
					<a href="#courses" className="nav-item nav-link">
						Courses
					</a>
					<a href="#contact" className="nav-item nav-link">
						Contact
					</a>
				</div>
				<a href="#register" className="btn btn-primary py-2 px-4 ms-3 d-none d-lg-block">
					Join Now
				</a>
			</div>
		</nav>
	);
};

export default Navbar;
