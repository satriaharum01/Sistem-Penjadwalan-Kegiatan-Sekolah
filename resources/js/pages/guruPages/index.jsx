//MUI
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
//Components
import PageHeader from '@/components/pageHeader';
import CardHeader from '@/components/cardHeader';
import DataTable from '@/components/dataTable';
//React
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const getHeadCells = [
	{
		id: 'id',
		numeric: false,
		disablePadding: false,
		label: '',
	},
	{
		id: 'nama_guru',
		numeric: false,
		disablePadding: false,
		label: 'Nama Guru',
	},
	{
		id: 'kode',
		numeric: false,
		disablePadding: false,
		label: 'Kode',
	},
	{
		id: 'jam_kerja',
		numeric: false,
		disablePadding: false,
		label: 'Jam Kerja',
	},
	{
		id: 'jabatan',
		numeric: false,
		disablePadding: false,
		label: 'Jabatan',
	},
	{
		id: 'tugas_tambahan',
		numeric: false,
		disablePadding: false,
		label: 'Tugas Tambahan',
	},
	{
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'Status',
	},
	{
		id: 'options',
		numeric: true,
		disablePadding: false,
		label: 'Aksi',
	},
];

function GuruPage() {
	return (
		<>
			<PageHeader title="Guru">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Typography color="text.tertiary">Guru</Typography>
					<Link underline="hover" href="/">
						Home
					</Link>
				</Breadcrumbs>
			</PageHeader>

			<Stack spacing={5}>
				<DataTableSection name="Guru" props={{ dense: true }} />
			</Stack>
		</>
	);
}

function DataTableSection({ name, props }) {
	const navigate = useNavigate();
	const [dataList, setDataList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const deletePost = async (id) => {
		await api.delete(`/guru/delete/${id}`).then(() => {});
		setDataList((prev) => prev.filter((item) => item.id !== id)); // Hapus dari state
	};

	const handleDelete = (id) => {
		Swal.fire({
			title: 'Hapus Data ?',
			text: 'Data yang dihapus tidak dapat dikembalikan !',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
			cancelButtonText: 'Tidak',
		}).then((result) => {
			if (result.isConfirmed) {
				deletePost(id);
				Swal.fire({
					title: 'Hapus Berhasil!',
					text: 'Data Berhasil dihapus !',
					icon: 'success',
				});
			}
		});
	};

	const fetchDataList = async () => {
		try {
			const response = await api.get('/guru/get'); // Ganti dengan endpoint yang sesuai
			setDataList(response.data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDataList();
	}, []);

	{
		loading && <Typography>Loading...</Typography>;
	}
	{
		error && <Typography color="error">{error}</Typography>;
	}

	return (
		<Card component="section" type="section">
			<CardHeader title={`List Data ${name} `} subtitle="">
				<Button variant="contained" disableElevation endIcon={<AddIcon />} onClick={() => navigate('new')}>
					New entry
				</Button>
			</CardHeader>
			<DataTable
				{...props}
				headCells={getHeadCells}
				rows={dataList.slice(0, 27)}
				emptyRowsHeight={{ default: 66.8, dense: 46.8 }}
				render={(row) => (
					<TableRow hover tabIndex={-1} key={row.id}>
						<TableCell size="small">{row.DT_RowIndex}</TableCell>
						<TableCell>{row.nama_guru}</TableCell>
						<TableCell>{row.kode}</TableCell>
						<TableCell>{row.jam_kerja}</TableCell>
						<TableCell>{row.jabatan}</TableCell>
						<TableCell>{row.tugas_tambahan}</TableCell>
						<TableCell>{row.status}</TableCell>
						<TableCell align="right">
							<Tooltip title="Edit Data" arrow>
								<IconButton
									aria-label="edit"
									color="warning"
									size="small"
									sx={{ fontSize: 2 }}
									onClick={() => navigate(`../guru/edit/${row.id}`)}
								>
									<ModeEditOutlineOutlinedIcon fontSize="medium" />
								</IconButton>
							</Tooltip>

							<Tooltip title="Hapus Data" arrow>
								<IconButton
									aria-label="edit"
									color="error"
									size="small"
									sx={{ fontSize: 2 }}
									onClick={() => handleDelete(row.id)}
								>
									<DeleteOutlineIcon fontSize="medium" />
								</IconButton>
							</Tooltip>
						</TableCell>
					</TableRow>
				)}
			/>
		</Card>
	);
}

export default GuruPage;
