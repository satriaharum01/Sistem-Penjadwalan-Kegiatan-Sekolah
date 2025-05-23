import useAutoCounter from '@hooks/useAutoCounter';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import SyncIcon from '@mui/icons-material/Sync';
// MUI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import LoadingComponent from '@/components/loader/customLoader';
//REACT
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
//Utils
import api from '../../api';

const ICON_MAP = {
	'Mata Pelajaran': MenuBookIcon,
	Kelas: HomeWorkIcon,
	Guru: Diversity3Icon,
	'Kelas Terjadwal': EditCalendarIcon,
};

function StatsSection() {
	const [data, setData] = useState([]);
	const [loadingGraph, setLoadingGraph] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		await api.get('dashboard/get/jam-stats-counter').then((res) => {
			// Misal data = { mapel: 123, kelas: 45, guru: 67, terjadwal: 30 }
			const mapped = [
				{
					id: 1,
					color: 'secondary.main',
					name: 'Mata Pelajaran',
					total: res.data.mapel,
					Icon: ICON_MAP['Mata Pelajaran'],
				},
				{
					id: 2,
					color: 'cuaternary.main',
					name: 'Kelas',
					total: res.data.kelas,
					Icon: ICON_MAP['Kelas'],
				},
				{
					id: 3,
					color: 'tertiary.400',
					name: 'Guru',
					total: res.data.guru,
					Icon: ICON_MAP['Guru'],
				},
				{
					id: 4,
					color: 'success.main',
					name: 'Jam Terjadwal',
					total: res.data.terjadwal,
					Icon: ICON_MAP['Kelas Terjadwal'],
				},
			];

			setData(mapped);
			setLoadingGraph(false);
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Grid
			container
			sx={{
				borderRadius: 1,
				overflow: 'hidden',
				bgcolor: 'background.paper',
				boxShadow: 26,
				'--Grid-borderWidth': '1px',
				borderTop: 'var(--Grid-borderWidth) solid',
				borderLeft: 'var(--Grid-borderWidth) solid',
				borderColor: 'border',
				'& > div': {
					borderRight: 'var(--Grid-borderWidth) solid',
					borderBottom: 'var(--Grid-borderWidth) solid',
					borderColor: 'border',
				},
			}}
		>
			{loadingGraph ? (
				<LoadingComponent />
			) : (
				data.map((stat) => (
					<Grid item xs={12} sm={6} md={3} key={stat.id}>
						<StatSection statData={stat} />
					</Grid>
				))
			)}
		</Grid>
	);
}

function StatSection({ statData }) {
	const { name, total, color, Icon } = statData;
	const counter = useAutoCounter({
		limiter: total,
		increment: 5000,
		interval: 10,
	});

	return (
		<Stack p={3} direction="row" spacing={3} alignItems="center">
			<Icon
				sx={{
					fontSize: 60,
					color,
				}}
				color="disabled"
			/>
			<span>
				<Typography color={color} variant="h5" textTransform="uppercase">
					{name}
				</Typography>
				<Typography fontSize={30}>{counter.toLocaleString()}</Typography>
			</span>
		</Stack>
	);
}

export default StatsSection;
