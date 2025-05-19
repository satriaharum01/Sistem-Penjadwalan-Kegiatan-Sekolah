import { v4 as uuid } from 'uuid';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LoadingComponent from '@/components/loader/customLoader';
//REACT
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
//Utils
import api from '../../api';

function ProductsSection() {
	return (
		<Card type="none">
			<Stack direction="column" alignItems="flex-start">
				<Typography variant="h5" textTransform="uppercase" m={2}>
					Distribusi Mata Pelajaran
				</Typography>
				<ProductsTable />
				<Button
					size="small"
					startIcon={<KeyboardArrowDownIcon />}
					sx={{
						m: 1,
					}}
				>
					View All
				</Button>
			</Stack>
		</Card>
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

function ProductsTable() {
	const [dataList, setDataList] = useState([]);
	const [loadingGraph, setLoadingGraph] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		await api.get('dashboard/get/distributed-mapel').then((res) => {
			setDataList(res.data);
			setLoadingGraph(false);
			console.log(dataList);
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<TableContainer>
			<Table aria-label="products purchases table" size="medium">
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
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
						dataList.slice(0, 5).map((data) => <ProductsTableRow key={data.id} data={data} />)
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

function ProductsTableRow({ data }) {
	const { mapel_nama, mapel_kode, kesimpulan, terisi, total_jam } = data;
	return (
		<TableRow hover>
			<TableCell align="center"><AutoStoriesIcon  sx={{height: 40, color: STATUS_CONFIG[kesimpulan?.status]?.color || '#d3d3d3'}}/></TableCell>
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

export default ProductsSection;
