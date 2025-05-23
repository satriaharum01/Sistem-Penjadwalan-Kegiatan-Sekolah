//MUI
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TableContainer, Table, TableCell, TableRow, TableHead, TableBody } from '@mui/material';
//Components
import useAutoCounter from '@hooks/useAutoCounter';
import LoadingComponent from '@/components/loader/customLoader';
import PageHeader from '@/components/pageHeader';
import CardHeader from '@/components/cardHeader';
//ICON
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
//React
import api from '@/api';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function MainSection() {
	const [dataList, setDataList] = useState([]);
	const [statList, setStatList] = useState([]);
	const [loadingGraph, setLoadingGraph] = useState(true);
	const [loadingStats, setLoadingStats] = useState(true);

	const fetchData = async () => {
		await api.get('dashboard/get/distributed-mapel/all').then((res) => {
			setDataList(res.data.all);
			setStatList(res.data.stats);
		});
	};
	useEffect(() => {
		if (dataList.length > 0) {
			// lakukan sesuatu setelah dataList di-set
			setLoadingGraph(false);
			setLoadingStats(false);
		}
	}, [dataList]);
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<PageHeader title="Study Time">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Typography color="text.tertiary">Studytime</Typography>
					<Link underline="hover" href="/admin/dashboard">
						Home
					</Link>
				</Breadcrumbs>
			</PageHeader>

			<Stack spacing={5}>
				<Card component="section" type="section">
					<CardHeader title={`Study Time Data`} subtitle="" />
					<Grid container spacing={3}>
						<Grid item xs={12} md={12} lg={12}>
							{loadingStats ? (
								<LoadingComponent />
							) : (
								<StatsSection statList={statList} loadingStats={loadingStats} />
							)}
						</Grid>
						<Grid item xs={12} md={12} lg={12}>
							<DataTableSection dataList={dataList} loadingGraph={loadingGraph} />
						</Grid>
					</Grid>
				</Card>
			</Stack>
		</>
	);
}

const STATUS_CONFIG = {
	success: {
		color: 'success.main',
	},
	error: {
		color: 'error.main',
	},
	warning: {
		color: 'warning.light',
	},
};

function DataTableSection({ dataList, loadingGraph }) {
	return (
		<TableContainer>
			<Table aria-label="products purchases table" size="medium">
				<TableHead>
					<TableRow>
						<TableCell> </TableCell>
						<TableCell align="left" padding="none">
							Mata Pelajaran
						</TableCell>
						<TableCell align="right">Rasio</TableCell>
						<TableCell align="center">Kode</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{loadingGraph ? (
						<LoadingComponent />
					) : (
						dataList.map((data) => <TransactionRow key={data.id} data={data} />)
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

function TransactionRow({ data }) {
	const { mapel_nama, mapel_kode, kesimpulan, terisi, total_jam } = data;
	return (
		<TableRow hover>
			<TableCell align="center">
				<AutoStoriesIcon sx={{ height: 40, color: STATUS_CONFIG[kesimpulan?.status]?.color || '#d3d3d3' }} />
			</TableCell>
			<TableCell align="left" padding="none">
				<Link
					href="#!"
					variant="subtitle1"
					underline="hover"
					color="text.primary"
					sx={{
						display: 'block',
						'&:hover': {
							color: 'primary.main',
						},
					}}
				>
					{mapel_nama}
				</Link>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Box
						component="span"
						width={8}
						height={8}
						bgcolor={STATUS_CONFIG[kesimpulan?.status]?.color || '#d3d3d3'}
						borderRadius="50%"
					/>
					<Typography variant="caption" color="text.tertiary">
						{kesimpulan?.title}
					</Typography>
				</Stack>
			</TableCell>
			<TableCell align="right">
				<Typography variant="body1" color="text.tertiary">
					{terisi}
					{'/'}
					{total_jam}
					{' Jam'}
				</Typography>
			</TableCell>
			<TableCell align="center">
				<Typography variant="h5" color="text.tertiary">
					{mapel_kode}
				</Typography>
			</TableCell>
		</TableRow>
	);
}

const ICON_MAP = {
	Time: AccessTimeIcon,
	'On Time': RemoveCircleOutlineIcon,
	Undertime: ArrowCircleDownIcon,
	Overtime: ArrowCircleUpIcon,
};

function StatsSection({ statList, loadingStats }) {
	const [data, setData] = useState([]);
	const [loadingData, setLoadingData] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = () => {
		try {
			if (!statList?.statistik) throw new Error('Data statistik tidak tersedia');

			const mapped = [
				{
					id: 1,
					color: 'cuaternary.main',
					name: 'Rata Rata StudyTime',
					total: statList['rata_rata_kerja'],
					Icon: ICON_MAP['Time'],
				},
				{
					id: 2,
					color: 'success.main',
					name: 'Terpenuhi',
					total: statList.statistik['Terpenuhi'] ?? 0,
					Icon: ICON_MAP['On Time'],
				},
				{
					id: 3,
					color: 'tertiary.400',
					name: 'Tidak Terpenuhi',
					total: statList.statistik['Tidak Terpenuhi'] ?? 0,
					Icon: ICON_MAP['Undertime'],
				},
				{
					id: 4,
					color: 'secondary.main',
					name: 'Overtime',
					total: statList.statistik['Overtime'] ?? 0,
					Icon: ICON_MAP['Overtime'],
				},
			];

			setData(mapped);
			setLoadingData(false);
		} catch (err) {
			setError(err.message);
		}
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
			{loadingData ? (
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

export default MainSection;
