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
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { MenuItem } from '@mui/material';
import { IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
//Components
import PageHeader from '@/components/pageHeader';
import CardHeader from '@/components/cardHeader';
//React
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import api from '../../api';
import Swal from 'sweetalert2';

function NewFormKelasMapel() {
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
	const [mapelForms, setMapelForms] = useState([]);
	const [mapelList, setMapelList] = useState([]);

	const navigate = useNavigate();

	const [form, setForm] = useState({
		tingkat: '',
		nama_kelas: '',
	});

	// Untuk edit: load data by ID
	useEffect(() => {
		if (id) {
			api.get(`/kelas/find/${id}`).then((res) => {
				setForm({
					tingkat: res.data.tingkat || '',
					nama_kelas: res.data.nama_kelas || '',
				});
			});
			api.get(`/mapel/get`).then((res) => setMapelList(res.data));
		}
	}, [id]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [mapelRes, kelasMapelRes] = await Promise.all([
					api.get('/mapel/get'),
					api.get(`/kelas/kelas-mapel/get/${id}`),
				]);

				setMapelList(mapelRes.data);

				const prefilledForms = kelasMapelRes.data.map((item) => ({
					...item,
					guruList: [], // akan diisi di item, satu per satu
					mapelOptions: mapelRes.data,
				}));

				setMapelForms(prefilledForms);
			} catch (err) {
				console.error('Gagal load data:', err);
			}
		};
		fetchData();
	}, []);

	const handleChange = (index, field, value) => {
		const updated = [...mapelForms];
		updated[index][field] = value;
		setMapelForms(updated);
	};

	const handleGuruChange = (index, guruId) => {
		const updated = [...mapelForms];
		const selected = updated[index].guru_ids;
		updated[index].guru_ids = selected.includes(guruId)
			? selected.filter((id) => id !== guruId)
			: [...selected, guruId];
		setMapelForms(updated);
	};

	const addMapelForm = () => {
		setMapelForms([
			...mapelForms,
			{
				mapel_id: '',
				total_jam: '',
				min_pertemuan: '',
				max_pertemuan: '',
				guru_ids: [],
				mapelOptions: mapelList,
			},
		]);
	};

	const removeMapelForm = (index) => {
		const updated = [...mapelForms];
		updated.splice(index, 1);
		setMapelForms(updated);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		Swal.fire({
			title: 'Menyimpan...',
			text: 'Mohon tunggu',
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});

		api.post('/kelas/kelas-mapel/store', {
			kelas_id: id,
			forms: mapelForms,
		})
			.then(() => {
				Swal.fire({
					icon: 'success',
					title: 'Berhasil!',
					text: 'Data berhasil disimpan',
					timer: 1500,
					showConfirmButton: false,
				});
				navigate('/admin/kelas');
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

	return (
		<Card type="section">
			<form onSubmit={handleSubmit}>
				<CardHeader title={`Form Input Data ${title}`} />
				<Grid container rowSpacing={2} columnSpacing={4}>
					<Grid item xs={12} sm={6}>
						<TextField
							slotprops={{
								input: {
									readOnly: true,
								},
							}}
							label="Nama Kelas"
							variant={variant}
							fullWidth
							name="nama_kelas"
							value={form.nama_kelas}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							slotprops={{
								input: {
									readOnly: true,
								},
							}}
							label="Tingkatan"
							variant={variant}
							fullWidth
							name="tingkat"
							value={form.tingkat}
						/>
					</Grid>

					<Grid item xs={12} sm={12} mt={1}>
						{/* Dynamic Mapel Select */}
						{mapelForms.map((mapelForms, index) => (
							<MapelFormItem
								key={index}
								index={index}
								form={mapelForms}
								onChange={handleChange}
								onGuruChange={handleGuruChange}
								onRemove={removeMapelForm}
								setMapelForms={setMapelForms} // Passing setMapelForms to MapelFormItem
							/>
						))}
					</Grid>
					<Grid item xs={12} sm={4}>
						<Button variant="outlined" onClick={addMapelForm}>
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
									onClick={() => navigate('../kelas')}
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

const MapelFormItem = ({ index, form, onChange, onGuruChange, onRemove, setMapelForms }) => {
	const [guruList, setGuruList] = useState([]);

	const updateGuruList = (index, guruList) => {
		setMapelForms((prev) => {
			const updated = [...prev];
			if (updated[index]) {
				updated[index].guruList = guruList;
			}
			return updated;
		});
	};

	useEffect(() => {
		if (form.mapel_id) {
			api.get(`/guru/guru-by-mapel/${form.mapel_id}`)
				.then((res) => {
					updateGuruList(index, res.data); // ⬅️ panggil ke parent untuk set guruList per index
					setGuruList(res.data);
				})
				.catch(() => updateGuruList(index, []));
		}
	}, [form.mapel_id]);

	const handleMapelChange = async (e) => {
		const value = e.target.value;
		onChange(index, 'mapel_id', value);

		if (value) {
			try {
				const res = await api.get(`/guru/guru-by-mapel/${value}`);
				setGuruList(res.data);
			} catch (err) {
				console.error('Failed to fetch guru:', err);
				setGuruList([]);
			}
		}
	};

	return (
		<Grid container spacing={2} sx={{ border: '1px solid #ccc', mb: 2, p: 2, borderRadius: 2 }}>
			<Grid item xs={6} sm={3}>
				<TextField
					select
					fullWidth
					label={`Mapel ${index + 1}`}
					value={form.mapel_id}
					onChange={handleMapelChange}
				>
					<MenuItem value="">-- Pilih Mapel --</MenuItem>
					{/* mapelList dari parent prop */}
					{(form.mapelOptions || []).map((m) => (
						<MenuItem key={m.id} value={m.id}>
							{m.nama_mapel}
						</MenuItem>
					))}
				</TextField>
			</Grid>

			<Grid item xs={1} sm={1}>
				<TextField
					type="number"
					label="Total Jam"
					fullWidth
					value={form.total_jam}
					onChange={(e) => onChange(index, 'total_jam', e.target.value)}
				/>
			</Grid>

			<Grid item xs={4} sm={2}>
				<TextField
					type="number"
					label="Min Pertemuan"
					fullWidth
					value={form.min_pertemuan}
					onChange={(e) => onChange(index, 'min_pertemuan', e.target.value)}
				/>
			</Grid>

			<Grid item xs={4} sm={2}>
				<TextField
					type="number"
					label="Max Pertemuan"
					fullWidth
					value={form.max_pertemuan}
					onChange={(e) => onChange(index, 'max_pertemuan', e.target.value)}
				/>
			</Grid>
			<Grid item xs={12} sm={3}>
				<TextField select fullWidth label={`Guru Pengajar`}>
					{guruList && guruList.length > 0 ? (
						<FormGroup row>
							{guruList.map((g) => (
								<FormControlLabel
									sx={{ p: 1 }}
									key={g.id}
									control={
										<Checkbox
											checked={form.guru_ids.includes(g.id)}
											onChange={() => onGuruChange(index, g.id)} // Pastikan `g.id` yang dipakai
										/>
									}
									label={g.nama_guru}
								/>
							))}
						</FormGroup>
					) : (
						<MenuItem value="">-- Pilih Mapel --</MenuItem>
					)}
				</TextField>
			</Grid>
			<Grid item xs={12} sm={1}>
				<IconButton color="error" onClick={() => onRemove(index)}>
					<Delete />
				</IconButton>
			</Grid>
		</Grid>
	);
};
export default NewFormKelasMapel;
