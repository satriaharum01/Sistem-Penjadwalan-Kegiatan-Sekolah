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
import { useNavigate } from 'react-router-dom';

function NewFormKelas() {
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
	const navigate = useNavigate();

	return (
		<Card type="section">
			<CardHeader title={`Form Input Data ${title}`} />
			<Grid container rowSpacing={2} columnSpacing={4}>
				<Grid item xs={12} sm={8}>
					<TextField label="Nama Kelas" variant={variant} fullWidth />
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField label="Tingkatan" variant={variant} fullWidth />
				</Grid>
				<Grid item xs={12}>
					<Grid container justifyContent="flex-end" spacing={1}>
						<Grid item>
							<Button variant="contained" color='error' disableElevation endIcon={<KeyboardBackspaceIcon />} onClick={() => navigate('../mapel')}>
								Kembali
							</Button>
						</Grid>
						<Grid item>
							<Button variant="contained" disableElevation endIcon={<SaveAltIcon />}>
								Simpan
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Card>
	);
}

export default NewFormKelas;
