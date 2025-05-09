import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ScrollToTopOnRouteChange from '@hocs/withScrollTopOnRouteChange';
import withLazyLoadably from '@hocs/withLazyLoadably';

import MinimalLayout from '@/components/layouts/minimalLayout';
import MainLayout from '@/components/layouts/mainLayout';

import RequireAuth from './RequireAuth';
import { AuthProvider } from '../../context/AuthContext';

import Page404 from '@/pages/errorPages/404';

const Dashboard1Page = withLazyLoadably(lazy(() => import('@/pages/dashboardsPages/dashboard1')));
const FormsComponentPage = withLazyLoadably(lazy(() => import('@/pages/componentsPages/forms')));
const TablesComponentPage = withLazyLoadably(lazy(() => import('@/pages/componentsPages/tables')));
const LoginSimplePage = withLazyLoadably(lazy(() => import('@/pages/loginPages/loginSimple')));
const EditProfilePage = withLazyLoadably(lazy(() => import('@/pages/editProfile')));
const NotificationsPage = withLazyLoadably(lazy(() => import('@/pages/notificationsPage')));
const WIPPage = withLazyLoadably(lazy(() => import('@/pages/wip')));
const SamplePage = withLazyLoadably(lazy(() => import('@/pages/sample')));
const MapelPage = withLazyLoadably(lazy(() => import('@/pages/mataPelajaran')));
const NewFormMapel = withLazyLoadably(lazy(() => import('@/pages/mataPelajaran/newFormMapel')));
const KelasPage = withLazyLoadably(lazy(() => import('@/pages/kelasPages')));
const NewFormKelas = withLazyLoadably(lazy(() => import('@/pages/kelasPages/newFormKelas')));
const GuruPage = withLazyLoadably(lazy(() => import('@/pages/guruPages')));
const NewFormGuru = withLazyLoadably(lazy(() => import('@/pages/guruPages/newFormGuru')));

function Router() {
	return (
		<AuthProvider>
			<BrowserRouter basename="/">
				<ScrollToTopOnRouteChange>
					<Routes>
						<Route path="/" element={<MinimalLayout />}>
							<Route path="account/">
								<Route path="login" element={<LoginSimplePage />} />
							</Route>
						</Route>
						<Route
							path="/"
							element={
								<RequireAuth>
									<MainLayout />
								</RequireAuth>
							}
						>
							<Route index element={<Dashboard1Page />} />
							<Route path="samplePage" element={<SamplePage />} />

							<Route path="dashboards/">
								<Route path="dashboard1" element={<Dashboard1Page />} />
							</Route>
							<Route path="admin/">
								{/* List Mapel */}
								<Route path="mapel" element={<MapelPage />} />
								<Route path="mapel/new" element={<NewFormMapel />} />
								<Route path="mapel/edit/:id" element={<NewFormMapel />} />
								{/* List Kelas */}
								<Route path="kelas" element={<KelasPage />} />
								<Route path="kelas/new" element={<NewFormKelas />} />
								{/* List Guru */}
								<Route path="guru" element={<GuruPage />} />
								<Route path="guru/new" element={<NewFormGuru />} />
								<Route path="guru/edit/:id" element={<NewFormGuru />} />
							</Route>

							<Route path="pages/">
								<Route path="settings" element={<EditProfilePage />} />
								<Route path="notifications" element={<NotificationsPage />} />
							</Route>
						</Route>
						<Route path="/" element={<MainLayout container={false} pb={false} />}>
							<Route path="pages/">
								<Route path="wip" element={<WIPPage />} />
							</Route>
						</Route>
						<Route path="*" element={<Page404 />} />
					</Routes>
				</ScrollToTopOnRouteChange>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default Router;
