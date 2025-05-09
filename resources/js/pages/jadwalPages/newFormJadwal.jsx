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
import hariMenuItems from './hariMenuItems';

function NewFormJadwal() {
	return (
		<>
			<PageHeader title="Jam Pelajaran">
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
				<FormSection variant="standard" title="Jam Pelajaran" />
			</Stack>
		</>
	);
}

function FormSection({ variant, title }) {
	const { id } = useParams(); // id dari URL, misal edit/:id
	const navigate = useNavigate();

	const [form, setForm] = useState({
		hari: '',
		jam_mulai: '',
		jam_akhir: '',
	});

	// Untuk edit: load data by ID
	useEffect(() => {
		if (id) {
			api.get(`/jadwal/find/${id}`).then((res) => {
				setForm({
					hari: res.data.hari,
					jam_mulai: res.data.jam_mulai,
					jam_akhir: res.data.jam_akhir,
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
			await api.put(`/jadwal/update/${id}`, form);
		} else {
			await api.post('/jadwal/store', form);
		}
		navigate('/admin/jadwal/setup');
	};

	return (
		<Card type="section">
			<form onSubmit={handleSubmit}>
				<CardHeader title={`Form Input Data ${title}`} />
				<Grid container rowSpacing={2} columnSpacing={4}>
					<Grid item xs={12} sm={4}>
						<TextField
							select
							label="Hari"
							variant={variant}
							fullWidth
							name="hari"
							value={form.hari}
							onChange={handleChange}
						>
							<MenuItem value="">-- Pilih Hari --</MenuItem>
							{hariMenuItems.map((item) => (
								<MenuItem key={item.value} value={item.value}>
									{item.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							label="Jam Mulai"
							variant={variant}
							type="time"
							fullWidth
							name="jam_mulai"
							value={form.jam_mulai}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							label="Jam Selesai"
							variant={variant}
							type="time"
							fullWidth
							name="jam_akhir"
							value={form.jam_akhir}
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
