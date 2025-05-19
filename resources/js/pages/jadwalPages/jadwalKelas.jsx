//MUI
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
//Components
import PageHeader from '@/components/pageHeader';
import CardHeader from '@/components/cardHeader';
//React
import api from '../../api';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const getHeadCells = [
	{
		id: 'id',
		numeric: false,
		disablePadding: false,
		label: '',
	},
	{
		id: 'jam',
		numeric: false,
		disablePadding: false,
		label: 'Jam',
	},
	{
		id: 'mapel',
		numeric: false,
		disablePadding: false,
		label: 'Mata Pelajaran',
	},
	{
		id: 'guru',
		numeric: false,
		disablePadding: false,
		label: 'Guru',
	},
];

function jadwalKelas() {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [kelas, setKelas] = useState(null);

	useEffect(() => {
		if (id) {
			api.get(`/kelas/find/${id}`).then((res) => {
				setKelas(res.data.nama_kelas);
			});
		}
	}, []);

	return (
		<>
			<PageHeader title={`Roster Kelas ${kelas}`}>
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
				<DataTableSection name={`Jadwal Kelas ${kelas}`} props={{ dense: true }} />
			</Stack>
		</>
	);
}

function DataTableSection({ name, props }) {
	const { id } = useParams();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [dataList, setDataList] = useState([]);

	const fetchDataList = async () => {
		try {
			const response = await api.get(`/jadwal/kelas/agenda/${id}`); // Ganti dengan endpoint yang sesuai
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

	const renderRow = (row, i) => {
		if (row.isHari) {
			return (
				<TableRow key={`hari-${i}`}>
					<TableCell colSpan={5} sx={{ fontWeight: 'bold', backgroundColor: '#eee' }}>
						{row.hari}
					</TableCell>
				</TableRow>
			);
		}
		return (
			<TableRow hover key={`row-${i}`}>
				<TableCell>{row.index}</TableCell>
				<TableCell>
					{row.mulai} - {row.selesai}
				</TableCell>
				<TableCell>{row.mapel}</TableCell>
				<TableCell>{row.guru}</TableCell>
			</TableRow>
		);
	};

	return (
		<Card component="section" type="section">
			<CardHeader title={`List Data ${name} `} subtitle="">
			</CardHeader>

			<TableContainer>
				<Table size="small" aria-label="custom table">
					<TableHead>
						<TableRow>
							{getHeadCells.map(({ id, label, align = 'left' }) => (
								<TableCell key={id} align={align}>
									{label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>{dataList.map((row, i) => renderRow(row, i))}</TableBody>
				</Table>
			</TableContainer>
		</Card>
	);
}

export default jadwalKelas;
