import { useEffect } from 'react';
//Components
import Spinner from '@/components/landing/Spinner';
import Topbar from '@/components/landing/Topbar';
import NavbarHero from '@/components/landing/NavbarHero';
import AboutServicesFeaturesOffers from '@/components/landing/AboutServicesFeaturesOffers';
//Utils
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './bootstrap.min.css';
import './style.css'; // Style lama jika ada

function App() {
	useEffect(() => {
		// Simulasi WOW.js, OwlCarousel, dsb jika diperlukan
	}, []);

	return (
		<>
			<Topbar />
			<NavbarHero />
			<AboutServicesFeaturesOffers />
		</>
	);
}

export default App;
