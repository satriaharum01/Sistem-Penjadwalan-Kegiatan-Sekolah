import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ScrollToTopOnRouteChange from '@hocs/withScrollTopOnRouteChange';
import withLazyLoadably from '@hocs/withLazyLoadably';

import MinimalLayout from '@/components/layouts/minimalLayout';
import MainLayout from '@/components/layouts/mainLayout';

import RequireAuth from './RequireAuth';
import PublicOnlyRoute from './PublicOnlyRoute';
import { AuthProvider } from '../../context/AuthContext';

import Page404 from '@/pages/errorPages/404';

const LandingPages = withLazyLoadably(lazy(() => import('@/pages/landingPages')));
const DashboardPage = withLazyLoadably(lazy(() => import('@/pages/admDashboardPages')));
const WorktimePage = withLazyLoadably(lazy(() => import('@/pages/admDashboardPages/section/distributedWorktime')));
const DistributedMapelPage = withLazyLoadably(lazy(() => import('@/pages/admDashboardPages/section/distributedMapel')));
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
const NewFormKelasMapel = withLazyLoadably(lazy(() => import('@/pages/kelasPages/newFormKelasMapel')));
const GuruPage = withLazyLoadably(lazy(() => import('@/pages/guruPages')));
const NewFormGuru = withLazyLoadably(lazy(() => import('@/pages/guruPages/newFormGuru')));
const NewFormGuruMapel = withLazyLoadably(lazy(() => import('@/pages/guruPages/newFormGuruMapel')));
const JadwalPage = withLazyLoadably(lazy(() => import('@/pages/jadwalPages')));
const AturJadwalPage = withLazyLoadably(lazy(() => import('@/pages/jadwalPages/setup')));
const JadwalKelas = withLazyLoadably(lazy(() => import('@/pages/jadwalPages/jadwalKelas')));
const NewFormJadwal = withLazyLoadably(lazy(() => import('@/pages/jadwalPages/newFormJadwal')));
const AgendaPage = withLazyLoadably(lazy(() => import('@/pages/agendaPages')));
const NewFormAgenda = withLazyLoadably(lazy(() => import('@/pages/agendaPages/newFormAgenda')));
const EskulPage = withLazyLoadably(lazy(() => import('@/pages/eskulPages')));
const NewFormEskul = withLazyLoadably(lazy(() => import('@/pages/eskulPages/newFormEskul')));

function Router() {
	return (
		<AuthProvider>
			<BrowserRouter basename="/">
				<ScrollToTopOnRouteChange>
					<Routes>
						<Route
							path="/"
							element={
								<PublicOnlyRoute>
									<MinimalLayout />
								</PublicOnlyRoute>
							}
						>
							<Route path="account/">
								<Route path="login" element={<LoginSimplePage />} />
							</Route>
							<Route path="403" element={<WIPPage />} />
						</Route>
						<Route path="/">
							<Route path="samplePage" element={<SamplePage />} />

							<Route
								path="admin/"
								element={
									<RequireAuth allowedRoles={['Administrator']}>
										<MainLayout />
									</RequireAuth>
								}
							>
								{/* List Dashboard */}
								<Route path="dashboard" element={<DashboardPage />} />
								<Route path="dashboard/worktime" element={<WorktimePage />} />
								<Route path="dashboard/studytime" element={<DistributedMapelPage />} />
								{/* List Mapel */}
								<Route path="mapel" element={<MapelPage />} />
								<Route path="mapel/new" element={<NewFormMapel />} />
								<Route path="mapel/edit/:id" element={<NewFormMapel />} />
								{/* List Kelas */}
								<Route path="kelas" element={<KelasPage />} />
								<Route path="kelas/new" element={<NewFormKelas />} />
								<Route path="kelas/edit/:id" element={<NewFormKelas />} />
								<Route path="kelas/mapel/:id" element={<NewFormKelasMapel />} />
								{/* List Guru */}
								<Route path="guru" element={<GuruPage />} />
								<Route path="guru/new" element={<NewFormGuru />} />
								<Route path="guru/edit/:id" element={<NewFormGuru />} />
								<Route path="guru/mapel/:id" element={<NewFormGuruMapel />} />
								{/* List Jadwal */}
								<Route path="jadwal" element={<JadwalPage />} />
								<Route path="jadwal/setup" element={<AturJadwalPage />} />
								<Route path="jadwal/kelas/:id" element={<JadwalKelas />} />
								<Route path="jadwal/edit/:id" element={<NewFormJadwal />} />
								<Route path="jadwal/add/time" element={<NewFormJadwal />} />
								{/* List Agenda */}
								<Route path="agenda" element={<AgendaPage />} />
								<Route path="agenda/new" element={<NewFormAgenda />} />
								<Route path="agenda/edit/:id" element={<NewFormAgenda />} />
								{/* List Eskul */}
								<Route path="eskul" element={<EskulPage />} />
								<Route path="eskul/new" element={<NewFormEskul />} />
								<Route path="eskul/edit/:id" element={<NewFormEskul />} />
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
