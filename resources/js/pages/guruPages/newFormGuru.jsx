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
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { MenuItem } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
//Dummy Data
import employeesData from '@/_mocks/employees';
//Components
import PageHeader from '@/components/pageHeader';
import CardHeader from '@/components/cardHeader';
import DataTable from '@/components/dataTable';
import statusMenuItems from './statusMenuItems';
//React
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../api';

function NewFormGuru() {
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
				<FormSection variant="standard" title="Guru" />
			</Stack>
		</>
	);
}

function FormSection({ variant, title }) {
	const { id } = useParams(); // id dari URL, misal edit/:id
	const navigate = useNavigate();

	const [form, setForm] = useState({
		kode: '',
		nama_guru: '',
		jam_kerja: '',
		jabatan: '',
		tugas_tambahan: '',
		status: '',
	});

	// Untuk edit: load data by ID
	useEffect(() => {
		if (id) {
			api.get(`/guru/find/${id}`).then((res) => {
				setForm({
					kode: res.data.kode || '',
					nama_guru: res.data.nama_guru || '',
					jam_kerja: res.data.jam_kerja || '',
					jabatan: res.data.jabatan || '',
					tugas_tambahan: res.data.tugas_tambahan || '',
					status: res.data.status || '',
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
			await api.put(`/guru/update/${id}`, form);
		} else {
			await api.post('/guru/store', form);
		}
		navigate('/admin/guru');
	};

	return (
		<Card type="section">
			<form onSubmit={handleSubmit}>
				<CardHeader title={`Form Input Data ${title}`} />
				<Grid container rowSpacing={2} columnSpacing={4}>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Nama Guru"
							variant={variant}
							fullWidth
							name="nama_guru"
							value={form.nama_guru}
							onChange={handleChange}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							label="Kode"
							variant={variant}
							fullWidth
							name="kode"
							value={form.kode}
							onChange={handleChange}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							label="Jam Kerja"
							type="number"
							variant={variant}
							fullWidth
							name="jam_kerja"
							value={form.jam_kerja}
							onChange={handleChange}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							label="Jabatan"
							variant={variant}
							fullWidth
							name="jabatan"
							value={form.jabatan}
							onChange={handleChange}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							label="Tugas Tambahan"
							variant={variant}
							fullWidth
							name="tugas_tambahan"
							value={form.tugas_tambahan}
							onChange={handleChange}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							select
							label="Status"
							variant={variant}
							fullWidth
							name="status"
							value={form.status}
							onChange={handleChange}
						>
							<MenuItem value="">-- Pilih Status --</MenuItem>
							{statusMenuItems.map((item) => (
								<MenuItem key={item.value} value={item.value}>
									{item.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<Grid container justifyContent="flex-end" spacing={1}>
							<Grid item>
								<Button
									variant="contained"
									color="error"
									disableElevation
									endIcon={<KeyboardBackspaceIcon />}
									onClick={() => navigate('../guru')}
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

export default NewFormGuru;
