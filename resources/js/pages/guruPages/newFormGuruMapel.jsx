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
import { MenuItem } from '@mui/material';
import { IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
//Components
import PageHeader from '@/components/pageHeader';
import CardHeader from '@/components/cardHeader';
import statusMenuItems from './statusMenuItems';
//React
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import api from '../../api';
import Swal from 'sweetalert2';

function NewFormGuruMapel() {
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
	const [mapels, setMapels] = useState([]);
	const [selectedMapels, setSelectedMapels] = useState([{ mapel_id: '' }]);

	const navigate = useNavigate();

	const [form, setForm] = useState({
		kode: '',
		nama_guru: '',
	});

	// Untuk edit: load data by ID
	useEffect(() => {
		if (id) {
			api.get(`/guru/find/${id}`).then((res) => {
				setForm({
					kode: res.data.kode || '',
					nama_guru: res.data.nama_guru || '',
				});
			});
			api.get(`/mapel/get`).then((res) => setMapels(res.data));
		}
	}, [id]);

	// Ganti value mapel
	const handleMapelChange = (index, value) => {
		const updated = [...selectedMapels];
		updated[index].mapel_id = value;
		setSelectedMapels(updated);
	};

	// Tambah field mapel
	const addMapelField = () => {
		setSelectedMapels([...selectedMapels, { mapel_id: '' }]);
	};

	// Hapus field mapel
	const removeMapelField = (index) => {
		const updated = [...selectedMapels];
		updated.splice(index, 1);
		setSelectedMapels(updated);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const mapel_ids = selectedMapels.map((item) => item.mapel_id);
		Swal.fire({
			title: 'Menyimpan...',
			text: 'Mohon tunggu',
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});

		api.post('/guru/guru-mapel/store', {
			guru_id: id,
			mapel_id: mapel_ids,
		})
			.then(() => {
				Swal.fire({
					icon: 'success',
					title: 'Berhasil!',
					text: 'Data berhasil disimpan',
					timer: 1500,
					showConfirmButton: false,
				});
				navigate('/admin/guru');
			})
			.catch((err) => {
				console.error(err);
				Swal.fire({
					icon: 'error',
					title: 'Gagal!',
					text: 'Gagal menyimpan data',
				});
			});
	};

	//const handleSubmit = async (e) => {
	//	e.preventDefault();
	//	if (id) {
	//		await api.post(`/guru/update/${id}`, form);
	//	} else {
	//		await api.post('/guru/store', form);
	//	}
	//	navigate('/admin/guru');
	//};

	return (
		<Card type="section">
			<form onSubmit={handleSubmit}>
				<CardHeader title={`Form Input Data ${title}`} />
				<Grid container rowSpacing={2} columnSpacing={4}>
					<Grid item xs={12} sm={6}>
						<TextField
							slotProps={{
								input: {
									readOnly: true,
								},
							}}
							label="Nama Guru"
							variant={variant}
							fullWidth
							name="nama_guru"
							value={form.nama_guru}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							slotProps={{
								input: {
									readOnly: true,
								},
							}}
							label="Kode"
							variant={variant}
							fullWidth
							name="kode"
							value={form.kode}
						/>
					</Grid>
					{/* Dynamic Mapel Select */}
					{selectedMapels.map((item, index) => (
						<React.Fragment key={index}>
							<Grid item xs={10} sm={5}>
								<TextField
									select
									label={`Mapel ${index + 1}`}
									variant="outlined"
									fullWidth
									value={item.mapel_id}
									onChange={(e) => handleMapelChange(index, e.target.value)}
								>
									<MenuItem value="">-- Pilih Mapel --</MenuItem>
									{mapels.map((mapel) => (
										<MenuItem key={mapel.id} value={mapel.id}>
											{mapel.nama_mapel}
										</MenuItem>
									))}
								</TextField>
							</Grid>

							<Grid item xs={2} sm={1}>
								<IconButton
									onClick={() => removeMapelField(index)}
									disabled={selectedMapels.length === 1}
									color="error"
								>
									<Delete />
								</IconButton>
							</Grid>
						</React.Fragment>
					))}

					<Grid item xs={12}>
						<Button onClick={addMapelField} startIcon={<Add />} variant="outlined">
							Tambah Mapel
						</Button>
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
									{id ? 'Simpan' : 'Simpan'}
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</Card>
	);
}

export default NewFormGuruMapel;
