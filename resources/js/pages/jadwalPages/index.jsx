//MUI
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import SyncIcon from '@mui/icons-material/Sync';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
//Components
import PageHeader from '@/components/pageHeader';
import CardHeader from '@/components/cardHeader';
import DataTable from '@/components/dataTable';
//React
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const getHeadCells = [
	{
		id: 'id',
		numeric: false,
		disablePadding: false,
		label: '',
	},
	{
		id: 'tingkatan',
		numeric: false,
		disablePadding: false,
		label: 'Tingkatan',
	},
	{
		id: 'nama_kelas',
		numeric: false,
		disablePadding: false,
		label: 'Kelas',
	},
	{
		id: 'mapel',
		numeric: false,
		disablePadding: false,
		label: 'Agenda',
	},
	{
		id: 'options',
		numeric: true,
		disablePadding: false,
		label: 'Aksi',
	},
];

function JadwalPage() {
	return (
		<>
			<PageHeader title="Jadwal Kelas">
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
				<DataTableSection name="Jadwal Kelas" props={{ dense: true }} />
			</Stack>
		</>
	);
}

function DataTableSection({ name, props }) {
	const navigate = useNavigate();
	const [dataList, setDataList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchDataList = async () => {
		try {
			const response = await api.get('/jadwal/agenda'); // Ganti dengan endpoint yang sesuai
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

const generateJadwal = async () => {
    let logText = '';
    try {
        const eventSource = new EventSource('../../api/stream-jadwal-log');

        Swal.fire({
            title: '<div style="white-space: normal; word-wrap: break-word;">Membuat Jadwal...</div>',
            html: `
			<div id="swal-log" style="
				text-align: left; 
				font-size: 10pt; 
				white-space: pre-wrap; 
				line-height: 1.8; /* <<< tambahkan ini untuk jarak baris lebih renggang */
				max-height: 300px; 
				overflow-y: auto; 
				font-family: 'Courier New', monospace; 
				background: #f8f9fa; 
				border: 1px solid #ddd; 
				padding: 10px; 
				border-radius: 5px;
			"></div>
            `,
            allowOutsideClick: false,
            width: 600,
            customClass: {
                container: 'swal2-front-inline'
            },
            didOpen: () => {
                // tambahkan z-index langsung lewat JS (inline)
                const swalContainer = document.querySelector('.swal2-front-inline');
                if (swalContainer) {
                    swalContainer.style.zIndex = '2000';
                }

                Swal.showLoading();
                const logContainer = Swal.getHtmlContainer().querySelector('#swal-log');

                const appendLog = (message) => {
                    let styledMessage = message;
                    if (message.includes('✅')) styledMessage = `<span style="color: green;">${message}</span>`;
                    else if (message.includes('❌') || message.toLowerCase().includes('gagal'))
                        styledMessage = `<span style="color: red;">${message}</span>`;
                    else if (message.toLowerCase().includes('berhasil'))
                        styledMessage = `<span style="color: blue;">${message}</span>`;

                    logText += styledMessage + '\n';
                    logContainer.innerHTML = logText;
                    logContainer.scrollTop = logContainer.scrollHeight;
                };

                eventSource.onmessage = (event) => {
                    appendLog(event.data);
                };

                eventSource.onerror = () => {
                    appendLog('❌ Terjadi kesalahan.');
                    eventSource.close();
                    Swal.hideLoading();
                };

                eventSource.addEventListener('done', () => {
                    appendLog('✅ Jadwal selesai dibuat.');
                    eventSource.close();
                    Swal.hideLoading();
                    navigate('/admin/jadwal');
                });
            },
        });
    } catch (err) {
        setError(err.message);
    }
};

	const handleJadwal = (id) => {
		Swal.fire({
			title: 'Buat Jadwal ?',
			text: 'Membuat jadwal akan menghapus jadwal yang sebelumnya !',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
			cancelButtonText: 'Tidak',
		}).then((result) => {
			if (result.isConfirmed) {
				generateJadwal();
			}
		});
	};

	{
		loading && <Typography>Loading...</Typography>;
	}
	{
		error && <Typography color="error">{error}</Typography>;
	}

	return (
		<Card component="section" type="section">
			<CardHeader title={`List Data ${name} `} subtitle="">
				<Button
					variant="contained"
					color="success"
					disableElevation
					endIcon={<SyncIcon />}
					onClick={() => handleJadwal()}
				>
					Generate Jadwal
				</Button>
			</CardHeader>
			<DataTable
				{...props}
				headCells={getHeadCells}
				rows={dataList}
				emptyRowsHeight={{ default: 66.8, dense: 46.8 }}
				render={(row) => (
					<TableRow hover tabIndex={-1} key={row.id}>
						<TableCell size="small">{row.DT_RowIndex}</TableCell>
						<TableCell align="left">{row.tingkat}</TableCell>
						<TableCell align="left">{row?.nama_kelas}</TableCell>
						<TableCell align="left">{row?.agenda}</TableCell>
						<TableCell align="right" sx={{ width: 150 }}>
							<Tooltip title="Lihat Roster" arrow>
								{row.agenda !== 'Belum di Set' ? (
									<IconButton
										aria-label="roster"
										color="success"
										size="small"
										sx={{ fontSize: 2 }}
										onClick={() => navigate(`../jadwal/kelas/${row.id}`)}
									>
										<EditCalendarIcon fontSize="medium" />
									</IconButton>
								) : (
									<IconButton
										aria-label="roster"
										color="error"
										size="small"
										sx={{ fontSize: 2, cursor: 'not-allowed' }}
									>
										<EventBusyIcon fontSize="medium" />
									</IconButton>
								)}
							</Tooltip>
						</TableCell>
					</TableRow>
				)}
			/>
		</Card>
	);
}

export default JadwalPage;
