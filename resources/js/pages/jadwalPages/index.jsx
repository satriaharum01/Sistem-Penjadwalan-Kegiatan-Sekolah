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
		id: 'hari',
		numeric: false,
		disablePadding: false,
		label: 'hari',
	},
	{
		id: 'periode',
		numeric: false,
		disablePadding: false,
		label: 'Periode',
	},
	{
		id: 'options',
		numeric: true,
		disablePadding: false,
		label: 'Aksi',
	},
];

function JadwalPage() {
	return (
		<>
			<PageHeader title="Jadwal Kelas">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Typography color="text.tertiary">Jadwal</Typography>
					<Link underline="hover" href="/">
						Home
					</Link>
				</Breadcrumbs>
			</PageHeader>

			<Stack spacing={5}>
				<DataTableSection name="Jadwal Kelas" props={{ dense: true }} />
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
		await api.delete(`/jadwal/delete/${id}`).then(() => {});
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
			const response = await api.get('/jadwal/get'); // Ganti dengan endpoint yang sesuai
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
				<Button variant="contained" disableElevation endIcon={<AddIcon />} onClick={() => navigate('../jadwal/add/time')}>
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
						<TableCell align="left">{row.hari}</TableCell>
						<TableCell align="left">{row?.periode}</TableCell>
						<TableCell align="right">
							<Tooltip title="Edit Data" arrow>
								<IconButton
									aria-label="edit"
									color="warning"
									size="small"
									sx={{ fontSize: 2 }}
									onClick={() => navigate(`../jadwal/edit/${row.id}`)}
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

export default JadwalPage;
