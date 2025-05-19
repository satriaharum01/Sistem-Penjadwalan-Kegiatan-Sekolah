import useAutoCounter from '@hooks/useAutoCounter';

import Chart from 'react-apexcharts';
import getDefaultChartsColors from '@helpers/getDefaultChartsColors';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AutoCounter from '@/components/utils/AutoCounter';
//ICON
import SyncIcon from '@mui/icons-material/Sync';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
//REACT
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
//Utils
import api from '../../api';

function GraphsSection() {
	const [jam, setJam] = useState(0);
	const [series, setSeries] = useState([]);
	const [jamBerat, setJamBerat] = useState(null);
	const [jamRingan, setJamRingan] = useState(null);

	useEffect(() => {
		api.get('dashboard/get/jam-tingkatan').then((res) => {
			const data = res.data;
			setSeries(data.series); // array of { name, data }
			if (data.categories) {
				setCategories(data.categories);
			}
		});
		api.get('dashboard/get/jam-tingkatan-counter').then((res) => {
			setJam(res.data); // array of { data }
		});
		api.get('dashboard/get/jam-mapel-counter').then((res) => {
			setJamBerat(res.data.berat); // array of { data }
			setJamRingan(res.data.ringan); // array of { data }
		});
	}, []);

	return (
		<section>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={6}>
					<JamPelajaranSection jam={jam} series={series} />
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={12} md={12}>
							<JamGuruSection />
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<JamBeratSection jam={jamBerat}/>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<JamRinganSection jam={jamRingan}/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</section>
	);
}

function SectionContainer({ children, background }) {
	return (
		<Card
			sx={{
				position: 'relative',
				height: '100%',
			}}
		>
			<Box position="absolute" top="0" bottom="0" left="0" right="0">
				{background}
			</Box>
			{children}
		</Card>
	);
}

const bitcoinGraphConfig = {
	options: {
		colors: getDefaultChartsColors(3),
		chart: {
			toolbar: {
				show: false,
			},
			sparkline: {
				enabled: true,
			},
			parentHeightOffset: 0,
		},
		stroke: {
			width: 2,
		},
		markers: {
			size: 5,
		},
		grid: {
			show: false,
		},
		xaxis: {
			categories: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
			show: false,
		},
		tooltip: {
			enabled: true,
		},
		yaxis: {
			max: 70,
			show: false,
		},
	},
};

function JamPelajaranSection({ jam, series }) {
	const [loadingGraph, setLoadingGraph] = useState(true);

	useEffect(() => {
		if (jam > 0) {
			setLoadingGraph(false);
		}
	}, [jam]);

	return (
		<SectionContainer
			background={
				<Chart
					options={bitcoinGraphConfig.options}
					series={series}
					type="area"
					style={{
						position: 'absolute',
						bottom: '-5px',
						left: '10px',
						right: '10px',
					}}
					width="100%"
					height="70%"
				/>
			}
		>
			<Stack
				spacing={1}
				direction="column"
				height="100%"
				width={{
					xs: '100%',
					md: '70%',
				}}
				pb={{
					xs: 30,
					md: 0,
				}}
			>
				<Typography variant="subtitle1" fontSize={55}>
					{loadingGraph ? (
						<SyncIcon
							sx={{
								'@keyframes width-increase': {
									'100%': {
										WebkitTransform: 'rotate(360deg)',
										transform: 'rotate(360deg)',
									},
								},
								animation: 'width-increase 3s ease infinite',
							}}
						/>
					) : (
						<AutoCounter limiter={jam} increment={1} interval={10} />
					)}{' '}
					<Typography variant="subtitle1" component="span">
						Jam
					</Typography>
				</Typography>
				<Typography variant="subtitle1">Total Jam Pelajaran</Typography>
				<Typography variant="body2" color="text.secondary" pb={2}>
					Data jam pelajaran setiap tingkatan kelas
				</Typography>
			</Stack>
		</SectionContainer>
	);
}

const ethereumGraphConfig = {
	options: {
		colors: getDefaultChartsColors(2),
		plotOptions: {
			bar: {
				columnWidth: '95%',
			},
		},
		chart: {
			toolbar: {
				show: false,
			},
			sparkline: {
				enabled: true,
			},
			parentHeightOffset: 0,
		},
		grid: {
			show: false,
		},
		xaxis: {
			show: false,

			categories: [1],
		},
		tooltip: {
			enabled: false,
		},
		yaxis: {
			show: false,
		},
	},
	series: [
		{
			name: 'series-1',
			data: [20, 25, 10, 20, 15, 18, 15, 3, 2, 5, 3, 2, 4, 5, 1, 2],
		},
		{
			name: 'series-2',
			data: [10, 30, 45, 30, 25, 15, 10, 4, 3, 2, 5, 2, 3, 2, 4, 5],
		},
	],
};
function JamGuruSection({ jam }) {
	const navigate = useNavigate();
	const [jamGuru, setJamGuru] = useState(0);
	const [loadingGraph, setLoadingGraph] = useState(true);
	const [error, setError] = useState(null);

	const fetchJamGuru = async () => {
		const res = await api.get('dashboard/get/jam-guru-counter');
		setJamGuru(res.data); // Pastikan ini nilainya benar
	};

	useEffect(() => {
		fetchJamGuru();
	}, []);

	// Aktifkan counter setelah jamGuru tersedia (bukan 0/null)
	useEffect(() => {
		if (jamGuru > 0) {
			setLoadingGraph(false);
		}
	}, [jamGuru]);

	return (
		<SectionContainer
			background={
				<Chart
					options={ethereumGraphConfig.options}
					series={ethereumGraphConfig.series}
					type="bar"
					style={{
						position: 'absolute',
						bottom: '0',
						left: '0',
						right: '0',
					}}
					width="100%"
					height="90%"
				/>
			}
		>
			<Stack ml="auto" width="50%" spacing={0}>
				<Typography variant="subtitle1" fontSize={35}>
					{loadingGraph ? (
						<SyncIcon
							sx={{
								'@keyframes width-increase': {
									'100%': {
										WebkitTransform: 'rotate(360deg)',
										transform: 'rotate(360deg)',
									},
								},
								animation: 'width-increase 3s ease infinite',
							}}
						/>
					) : (
						<AutoCounter limiter={jamGuru} increment={1} interval={10} />
					)}{' '}
					<Typography variant="subtitle1" component="span">
						Jam
					</Typography>
				</Typography>
				<Typography variant="subtitle1">JAM MENGAJAR GURU TERSEDIA</Typography>
				<Typography variant="subtitle2">
					Jam mengajar guru yang tersedia untuk melihat proses penjadwalan...
				</Typography>
				<Button
					variant="text"
					size="small"
					endIcon={<ChevronRightIcon />}
					sx={{
						width: 'fit-content',
						textTransform: 'uppercase',
					}}
					onClick={() => navigate(`../admin/guru/jam`)}
				>
					Lihat Data
				</Button>
			</Stack>
		</SectionContainer>
	);
}

const maleVisitorsGraphConfig = {
	options: {
		colors: getDefaultChartsColors(3),
		chart: {
			toolbar: {
				show: false,
			},
			sparkline: {
				enabled: true,
			},
			parentHeightOffset: 0,
		},
		stroke: {
			curve: 'straight',
			width: 1,
		},
		markers: {
			size: 4,
		},
		grid: {
			show: false,
		},
		xaxis: {
			show: false,
		},
		tooltip: {
			enabled: false,
		},
		yaxis: {
			show: false,
		},
	},
	series: [
		{
			name: 'series-1',
			data: [5, 7, 7, 9, 8, 10, 11, 8, 7, 6, 9, 7, 10, 11],
		},
	],
};

function JamBeratSection({jam}) {
	return (
		<SectionContainer
			background={
				<Chart
					options={maleVisitorsGraphConfig.options}
					series={maleVisitorsGraphConfig.series}
					type="area"
					style={{
						position: 'absolute',
						bottom: '-10px',
						left: '-10px',
						right: '-10px',
					}}
					width="100%"
					height="30%"
				/>
			}
		>
			<Stack spacing={0} direction="column" width="100%" justifyContent="center" alignItems="center">
				<Typography variant="subtitle1" fontSize={35}>
					{!jam ? (
						<SyncIcon
							sx={{
								'@keyframes width-increase': {
									'100%': {
										WebkitTransform: 'rotate(360deg)',
										transform: 'rotate(360deg)',
									},
								},
								animation: 'width-increase 3s ease infinite',
							}}
						/>
					) : (
						<AutoCounter limiter={jam} increment={1} interval={10} />
					)}
				</Typography>
				<Typography variant="subtitle1">JAM BERAT</Typography>
				<Typography variant="subtitle2" color="text.secondary" pb={2}>
					Jam mata pelajaran diatas 4 jam seminggu...
				</Typography>
			</Stack>
		</SectionContainer>
	);
}
const femaleVisitorsGraphConfig = {
	options: {
		colors: getDefaultChartsColors(4),
		chart: {
			toolbar: {
				show: false,
			},
			sparkline: {
				enabled: true,
			},
			parentHeightOffset: 0,
		},
		stroke: {
			curve: 'straight',
			width: 1,
		},
		markers: {
			size: 4,
		},
		grid: {
			show: false,
		},
		xaxis: {
			show: false,
		},
		tooltip: {
			enabled: false,
		},
		yaxis: {
			show: false,
		},
	},
	series: [
		{
			name: 'series-1',
			data: [5, 7, 7, 10, 8, 10, 7, 6, 7, 7, 8, 7, 11, 10],
		},
	],
};

function JamRinganSection({ jam }) {
	return (
		<SectionContainer
			background={
				<Chart
					options={femaleVisitorsGraphConfig.options}
					series={femaleVisitorsGraphConfig.series}
					type="area"
					style={{
						position: 'absolute',
						bottom: '-10px',
						left: '-10px',
						right: '-10px',
					}}
					width="100%"
					height="30%"
				/>
			}
		>
			<Stack spacing={0} direction="column" width="100%" justifyContent="center" alignItems="center">
				<Typography variant="subtitle1" fontSize={35}>
					{!jam ? (
						<SyncIcon
							sx={{
								'@keyframes width-increase': {
									'100%': {
										WebkitTransform: 'rotate(360deg)',
										transform: 'rotate(360deg)',
									},
								},
								animation: 'width-increase 3s ease infinite',
							}}
						/>
					) : (
						<AutoCounter limiter={jam} increment={1} interval={10} />
					)}
				</Typography>
				<Typography variant="subtitle1">JAM RINGAN</Typography>
				<Typography variant="subtitle2" color="text.secondary" pb={2}>
					Jam mata pelajaran dibawah 4 jam seminggu...
				</Typography>
			</Stack>
		</SectionContainer>
	);
}

export default GraphsSection;
