import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';

import EditIcon from '@mui/icons-material/Edit';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ReplayIcon from '@mui/icons-material/Replay';

import CardHeader from '@/components/cardHeader';

import defatulAvatar from '@/assets/images/avatars/default.png';

//Custom Component
import api, { initCsrf } from '@/api';
import Swal from 'sweetalert2';
import { useAuth } from '@/context/AuthContext';
import React, { useRef, useState, useEffect } from 'react';

function Account() {
	return (
		<Stack spacing={6}>
			<GeneralSettingsSection />
		</Stack>
	);
}

function GeneralSettingsSection() {
	const fileInputRef = useRef(null);
	const { user } = useAuth();
	const [dataUser, setDataUser] = useState([]);
	const [avatar, setAvatar] = useState(null);
	const [preview, setPreview] = useState(null);
	const [file, setFile] = useState(null);
	const [form, setForm] = useState({
		id: '',
		username: '',
		email: '',
		password: '',
		faces: '',
	});

	const handleChangeImage = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			setFile(selectedFile);
			setPreview(URL.createObjectURL(selectedFile));
		}
	};

	useEffect(() => {
		if (!user) return;
		setDataUser(user);
		setForm(user);

		const imagePath = user.faces;
		const avatarUrl = `${import.meta.env.VITE_AVATARS_URL}${imagePath}`;
		// Dinamis mengimpor gambar dari folder
		const img = new Image();
		img.src = avatarUrl;

		img.onload = () => setAvatar(avatarUrl); // valid image
		img.onerror = () => setAvatar(defatulAvatar); // fallback if image fails to load
	
	}, [dataUser]);

	const avatarPath = dataUser?.faces ? avatar : defatulAvatar;

	const handleReset = (e) => {
		setForm(user);
		setPreview(null);
	};

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	const handleUploadClick = () => {
		fileInputRef.current.click(); // trigger hidden input
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		Swal.fire({
			title: 'Update Profile ?',
			text: 'Data yang diupdate tidak dapat dikembalikan !',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
			cancelButtonText: 'Tidak',
		}).then((result) => {
			if (result.isConfirmed) {
				submitData();
			}
		});
	};

	const imageUploader = async (e) => {
		await initCsrf();

		Swal.fire({
			title: 'Upload Foto...',
			text: 'Mengupload Foto anda..',
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});
		const data = new FormData();

		data.append('photos', file);
		data.append('username', form.username);
		await api.post(`admin/profile/update/${form.id}`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		Swal.close();
	};
	const submitData = async (e) => {
		if (form.id) {
			if (preview) {
				imageUploader();
			}

			Swal.fire({
				title: 'Menyimpan...',
				text: 'Mohon tunggu',
				allowOutsideClick: false,
				didOpen: () => {
					Swal.showLoading();
				},
			});
			await api
				.post(`/admin/profile/update/${form.id}`, form)
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

		window.location.reload();
	};
	return (
		<Card type="section">
			<CardHeader title="General Settings" />
			<Stack spacing={6}>
				<Stack direction="row" spacing={6} alignItems="center" justifyContent="center">
					{preview ? (
						<Avatar
							alt="User Img"
							src={preview}
							sx={{
								width: 150,
								height: 150,
								border: 3,
								borderColor: 'primary.light',
								borderStyle: 'dotted',
								boxShadow: (theme) =>
									`0px 0px 0px 4px ${theme.palette.background.paper} ,0px 0px 0px 6px ${theme.palette.primary[300]}`,
							}}
						/>
					) : (
						<Avatar
							alt="User Img"
							src={avatarPath}
							sx={{
								width: 150,
								height: 150,
								border: 3,
								borderColor: 'primary.light',
								borderStyle: 'dotted',
								boxShadow: (theme) =>
									`0px 0px 0px 4px ${theme.palette.background.paper} ,0px 0px 0px 6px ${theme.palette.primary[300]}`,
							}}
						/>
					)}
					<div>
						<Typography variant="caption" display="block">
							Image size Limit should be 1mb Max.
							<ErrorOutlineIcon fontSize="small" />
						</Typography>
						<Button
							size="medium"
							variant="contained"
							endIcon={<AccountBoxOutlinedIcon />}
							onClick={handleUploadClick}
						>
							Change Image
						</Button>
					</div>
				</Stack>
				<Divider />
				<form onSubmit={handleSubmit} encType="multipart/form-data">
					{/* Hidden File Input */}
					<input
						type="file"
						name="faces"
						accept="image/*"
						ref={fileInputRef}
						style={{ display: 'none' }}
						onChange={handleChangeImage}
					/>
					<Grid container rowSpacing={2} columnSpacing={4}>
						<Grid item xs={12} sm={6} md={6}>
							<TextField
								label="Username"
								name="username"
								variant="outlined"
								defaultValue="elizabeth_123"
								value={form.username}
								fullWidth
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<TextField
								readOnly
								type="email"
								label="Account Email"
								variant="outlined"
								defaultValue="demo@sample.com"
								value={dataUser.email}
								fullWidth
							/>
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
							<Button
								type="submit"
								variant="contained"
								endIcon={<EditIcon />}
								sx={{
									float: 'right',
								}}
							>
								Update Account
							</Button>
							<Button
								onClick={handleReset}
								color="error"
								variant="contained"
								endIcon={<ReplayIcon />}
								sx={{
									float: 'right',
									marginRight: '0.5rem',
								}}
							>
								Reset
							</Button>
						</Grid>
					</Grid>
				</form>
			</Stack>
		</Card>
	);
}
function ProfileSettingsSection() {
	return (
		<Card type="section">
			<CardHeader title="Public Profile" />
			<Stack spacing={3}>
				<SettingItem
					title="Make Contact Info Public"
					subtitle="Means that anyone viewing your profile will be able to see your contacts details."
				/>

				<Divider />
				<SettingItem
					title="Available to hire"
					subtitle="Toggling this will let your teammates know that you are available for acquiring new projects."
					value
				/>
			</Stack>
		</Card>
	);
}
function AdvancedSettingsSection() {
	return (
		<Card type="section">
			<CardHeader title="Advanced Settings" />
			<Grid
				container
				spacing={0}
				sx={{
					width: '100%',
					'--Grid-borderWidth': '1px',
					borderTop: 'var(--Grid-borderWidth) solid',
					borderLeft: 'var(--Grid-borderWidth) solid',
					borderColor: 'border',
					'& > div': {
						borderRight: 'var(--Grid-borderWidth) solid',
						borderBottom: 'var(--Grid-borderWidth) solid',
						borderColor: 'border',
						p: 2,
					},
				}}
			>
				<Grid item xs={12} sm={6} md={6}>
					<SettingItem title="Secure Browsing" subtitle="Browsing Securely ( https ) when it's necessary" />
				</Grid>
				<Grid item xs={12} sm={6} md={6}>
					<SettingItem title="Login Notifications" subtitle="Notify when login attempted from other place" />
				</Grid>
				<Grid item xs={12} sm={6} md={6}>
					<SettingItem
						title="Login approvals"
						subtitle="Approvals is not required when login from unrecognized devices."
						value
					/>
				</Grid>
			</Grid>
		</Card>
	);
}
function DeleteAccountSection() {
	return (
		<Stack
			sx={{
				borderRadius: 1,
				border: 2,
				borderColor: 'red',
				borderStyle: 'dotted',
				bgcolor: 'background.paper',
				p: 3,
			}}
		>
			<CardHeader title="Delete Account" />
			<Typography mb={2}>
				To desactivate your account, first delete its resources. If you are the only owner of any teams, either
				assign another owner or desactivate the team.
			</Typography>
			<Button variant="outlined" color="error">
				Desactivate Account
			</Button>
		</Stack>
	);
}

function SettingItem({ title, subtitle, value }) {
	return (
		<Stack direction="row" justifyContent="space-between">
			<div>
				<Typography variant="h6" gutterBottom>
					{title}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					{subtitle}
				</Typography>
			</div>
			<Switch defaultChecked={value} />
		</Stack>
	);
}

export default Account;
