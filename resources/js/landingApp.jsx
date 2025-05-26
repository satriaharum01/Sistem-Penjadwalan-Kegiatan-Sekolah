//React Component
import { lazy } from 'react';
import withCustomLazyLoadably from '@hocs/withCustomLazyLoadably';
import { Route, Routes } from 'react-router-dom';
//Pages
const LandingPages = withCustomLazyLoadably(lazy(() => import('@/pages/landingPages')));

const LandingApp = () => {
	return (
		<Routes>
			<Route path="/">
				<Route index element={<LandingPages />} />
			</Route>
		</Routes>
	);
};

export default LandingApp;
