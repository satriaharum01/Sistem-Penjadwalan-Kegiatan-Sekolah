//MUI
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
//Components
import PageHeader from '@/components/pageHeader';
import CardHeader from '@/components/cardHeader';
import DataTable from '@/components/dataTable';
//React
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../api';
import Swal from 'sweetalert2';

function NewFormEskul() {
	return (
		<>
			<PageHeader title="Eskul">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Typography color="text.tertiary">Eskul</Typography>
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
		nama_eskul: '',
		hari: '',
		pembina: '',
		pelatih: '',
		ruangan: '',
	});

	// Untuk edit: load data by ID
	useEffect(() => {
		if (id) {
			api.get(`/eskul/find/${id}`).then((res) => {
				setForm({
					nama_eskul: res.data.nama_eskul,
					hari: res.data.hari,
					pembina: res.data.pembina,
					pelatih: res.data.pelatih,
					ruangan: res.data.ruangan,
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
				.post(`/eskul/update/${id}`, form)
				.then(() => {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil!',
						text: 'Data berhasil disimpan',
						timer: 1500,
						showConfirmButton: false,
					});
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
				.post('/eskul/store', form)
				.then(() => {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil!',
						text: 'Data berhasil disimpan',
						timer: 1500,
						showConfirmButton: false,
					});
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
		navigate('../eskul');
	};

	return (
		<Card type="section">
			<form onSubmit={handleSubmit}>
				<CardHeader title={`Form Input Data ${title}`} />
				<Grid container rowSpacing={2} columnSpacing={4}>
					<Grid item xs={12} sm={4}>
						<TextField
							label="Nama Ekstarkulikuler"
							variant={variant}
							fullWidth
							name="nama_eskul"
							value={form.nama_eskul}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							label="Jadwal"
							variant={variant}
							fullWidth
							name="hari"
							value={form.hari}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							label="Ruangan"
							variant={variant}
							fullWidth
							name="ruangan"
							value={form.ruangan}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Pembina"
							variant={variant}
							fullWidth
							name="pembina"
							value={form.pembina}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Pelatih"
							variant={variant}
							fullWidth
							name="pelatih"
							value={form.pelatih}
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
									onClick={() => navigate('../eskul/')}
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

export default NewFormEskul;
