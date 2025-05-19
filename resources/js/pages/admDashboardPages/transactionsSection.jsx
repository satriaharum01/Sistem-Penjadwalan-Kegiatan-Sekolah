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
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LoadingComponent from '@/components/loader/customLoader';
//REACT
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
//Utils
import api from '../../api';

function TransactionsSection() {
	return (
		<Card type="none">
			<Stack direction="column" alignItems="flex-start">
				<Typography variant="h5" textTransform="uppercase" m={2}>
					Data Jam Kerja Guru
				</Typography>
				<TransactionsTable />
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

function TransactionsTable() {
	const [dataList, setDataList] = useState([]);
	const [loadingGraph, setLoadingGraph] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		await api.get('dashboard/get/distributed-worktime').then((res) => {
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
						<TableCell> </TableCell>
						<TableCell align="left">Guru</TableCell>
						<TableCell align="left">Status</TableCell>
						<TableCell align="left">Rasio</TableCell>
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
	const { avatarImg, guru_kode, kesimpulan, guru_nama, jam_kerja, kerja } = data;
	return (
		<TableRow hover>
			<TableCell>
				<Avatar
					alt="User Img"
					src={avatarImg}
					sx={{
						width: 40,
						height: 40,
					}}
				/>
			</TableCell>
			<TableCell align="left">
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
					{guru_nama}
				</Link>
				<Typography variant="caption">Kode: {guru_kode}</Typography>
			</TableCell>
			<TableCell align="left">
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
			<TableCell align="left" size="small">
				<Typography variant="body1" color="text.tertiary">
					{kerja}
					{'/'}
					{jam_kerja}
					{' Jam'}
				</Typography>
			</TableCell>
		</TableRow>
	);
}

export default TransactionsSection;
