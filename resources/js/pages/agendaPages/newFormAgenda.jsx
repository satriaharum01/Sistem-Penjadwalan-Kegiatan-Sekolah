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
//Components
import PageHeader from '@/components/pageHeader';
import CardHeader from '@/components/cardHeader';
import DataTable from '@/components/dataTable';
//React
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../api';
import kegiatanMenuItems from './kegiatanMenuItems';
import Swal from 'sweetalert2';

function NewFormAgenda() {
	return (
		<>
			<PageHeader title="Agenda">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Typography color="text.tertiary">Agenda</Typography>
					<Link underline="hover" href="/">
						Home
					</Link>
				</Breadcrumbs>
			</PageHeader>

			<Stack spacing={5}>
				<FormSection variant="standard" title="Agenda" />
			</Stack>
		</>
	);
}

function FormSection({ variant, title }) {
	const { id } = useParams(); // id dari URL, misal edit/:id
	const navigate = useNavigate();

	const [form, setForm] = useState({
		nama_agenda: '',
		tanggal: Date(),
		mulai: '00:00',
		selesai: '00:00',
		jenis: 'null',
	});

	// Untuk edit: load data by ID
	useEffect(() => {
		if (id) {
			api.get(`/agenda/find/${id}`).then((res) => {
				setForm({
					nama_agenda: res.data.nama_agenda,
					tanggal: res.data.tanggal,
					mulai: res.data.mulai,
					selesai: res.data.selesai,
					jenis: res.data.jenis,
				});
			});
		}
	}, [id]);

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});

		console.log(form);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		Swal.fire({
			title: 'Menyimpan...',
			text: 'Mohon tunggu',
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});
		if (id) {
			await api
				.post(`/agenda/update/${id}`, form)
				.then(() => {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil!',
						text: 'Data berhasil disimpan',
						timer: 1500,
						showConfirmButton: false,
					});
					navigate('/admin/agenda');
				})
				.catch((err) => {
					console.error(err);
					Swal.fire({
						icon: 'error',
						title: 'Gagal!',
						text: 'Gagal menyimpan data',
					});
				});
		} else {
			await api
				.post('/agenda/store', form)
				.then(() => {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil!',
						text: 'Data berhasil disimpan',
						timer: 1500,
						showConfirmButton: false,
					});
					navigate('/admin/agenda');
				})
				.catch((err) => {
					console.error(err);
					Swal.fire({
						icon: 'error',
						title: 'Gagal!',
						text: 'Gagal menyimpan data',
					});
				});
		}
		navigate('/admin/agenda');
	};

	return (
		<Card type="section">
			<form onSubmit={handleSubmit}>
				<CardHeader title={`Form Input Data ${title}`} />
				<Grid container rowSpacing={2} columnSpacing={4}>
					<Grid item xs={12} sm={4}>
						<TextField
							select
							label="Jenis Kegiatan"
							variant={variant}
							fullWidth
							name="jenis"
							value={form.jenis}
							onChange={handleChange}
						>
							<MenuItem value="null" key="null">
								-- Pilih Kegiatan --
							</MenuItem>
							{kegiatanMenuItems.map((item) => (
								<MenuItem key={item.value} value={item.value}>
									{item.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12} sm={8}>
						<TextField
							label="Nama Agenda"
							variant={variant}
							fullWidth
							name="nama_agenda"
							value={form.nama_agenda}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							label="Tanggal"
							variant={variant}
							fullWidth
							type="date"
							name="tanggal"
							value={form.tanggal}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							label="Mulai"
							variant={variant}
							fullWidth
							name="mulai"
							type="time"
							value={form.mulai}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							label="Selesai"
							variant={variant}
							fullWidth
							name="selesai"
							type="time"
							value={form.selesai}
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
									onClick={() => navigate('../agenda/')}
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

export default NewFormAgenda;
