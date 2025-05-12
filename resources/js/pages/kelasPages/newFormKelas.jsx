//MUI
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { MenuItem } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
//Dummy Data
import employeesData from '@/_mocks/employees';
//Components
import PageHeader from '@/components/pageHeader';
import CardHeader from '@/components/cardHeader';
import DataTable from '@/components/dataTable';
//React
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../api';
import tingkatanMenuItems from './tingkatanMenuItems';

function NewFormJadwal() {
	return (
		<>
			<PageHeader title="Kelas">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Typography color="text.tertiary">Kelas</Typography>
					<Link underline="hover" href="/">
						Home
					</Link>
				</Breadcrumbs>
			</PageHeader>

			<Stack spacing={5}>
				<FormSection variant="standard" title="Kelas" />
			</Stack>
		</>
	);
}

function FormSection({ variant, title }) {
	const { id } = useParams(); // id dari URL, misal edit/:id
	const navigate = useNavigate();

	const [form, setForm] = useState({
		hari: '',
		mulai: '',
		selesai: '',
		jenis: '',
	});

	// Untuk edit: load data by ID
	useEffect(() => {
		if (id) {
			api.get(`/jadwal/find/${id}`).then((res) => {
				setForm({
					nama_kelas: res.data.nama_kelas,
					tingkat: res.data.tingkat,
				});
			});
		}
	}, [id]);

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (id) {
			await api.post(`/kelas/update/${id}`, form);
		} else {
			await api.post('/kelas/store', form);
		}
		navigate('/admin/kelas');
	};

	return (
		<Card type="section">
			<form onSubmit={handleSubmit}>
				<CardHeader title={`Form Input Data ${title}`} />
				<Grid container rowSpacing={2} columnSpacing={4}>
					<Grid item xs={12} sm={4}>
						<TextField
							select
							label="Tingkatan"
							variant={variant}
							fullWidth
							name="tingkat"
							value={form.tingkat}
							onChange={handleChange}
						>
							<MenuItem value="">-- Pilih Tingkatan --</MenuItem>
							{tingkatanMenuItems.map((item) => (
								<MenuItem key={item.value} value={item.value}>
									{item.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12} sm={8}>
						<TextField
							label="Nama Kelas"
							variant={variant}
							fullWidth
							name="nama_kelas"
							value={form.nama_kelas}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<Grid container justifyContent="flex-end" spacing={1}>
							<Grid item>
								<Button
									variant="contained"
									color="error"
									disableElevation
									endIcon={<KeyboardBackspaceIcon />}
									onClick={() => navigate('../jadwal/setup')}
								>
									Kembali
								</Button>
							</Grid>
							<Grid item>
								<Button
									type="submit"
									variant="contained"
									color={id ? 'success' : 'primary'}
									disableElevation
									endIcon={<SaveAltIcon />}
								>
									{id ? 'Update' : 'Simpan'}
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</Card>
	);
}

export default NewFormJadwal;
