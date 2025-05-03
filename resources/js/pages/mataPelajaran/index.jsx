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
import AddIcon from '@mui/icons-material/Add';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
//Dummy Data
import employeesData from '@/_mocks/employees';
//Components
import PageHeader from '@/components/pageHeader';
import CardHeader from '@/components/cardHeader';
import DataTable from '@/components/dataTable';

const getHeadCells = [
	{
		id: 'id',
		numeric: false,
		disablePadding: false,
		label: 'Id',
	},
	{
		id: 'name',
		numeric: false,
		disablePadding: false,
		label: 'Nombre',
	},
	{
		id: 'position',
		numeric: false,
		disablePadding: false,
		label: 'Position',
	},
	{
		id: 'email',
		numeric: false,
		disablePadding: false,
		label: 'Email',
	},
	{
		id: 'salary',
		numeric: true,
		disablePadding: false,
		label: 'Salary',
	},
	{
		id: 'options',
		numeric: true,
		disablePadding: false,
		label: 'Opciones',
	},
];

function MapelPage() {
	return (
		<>
			<PageHeader title="Mata Pelajaran">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Typography color="text.tertiary">Mata Pelajaran</Typography>
					<Link underline="hover" href="/">
						Home
					</Link>
				</Breadcrumbs>
			</PageHeader>

			<Stack spacing={5}>
				<DataTableSection name="Mata Peljaran" props={{ dense: true }} />
			</Stack>
		</>
	);
}


function DataTableSection({ name, props }) {
	return (
		<Card component="section" type="section">
			<CardHeader
				title={`List Data ${name} `}
				subtitle=""
			>
				<Button variant="contained" disableElevation endIcon={<AddIcon />}>
					New entry
				</Button>
			</CardHeader>
			<DataTable
				{...props}
				headCells={getHeadCells}
				rows={employeesData.slice(0, 27)}
				emptyRowsHeight={{ default: 66.8, dense: 46.8 }}
				render={(row) => (
					<TableRow hover tabIndex={-1} key={row.id}>
						<TableCell>{row.id}</TableCell>
						<TableCell align="left">{row.name}</TableCell>
						<TableCell align="left">{row?.position}</TableCell>
						<TableCell align="left">{row?.email}</TableCell>
						<TableCell align="right">${row.salary.toLocaleString()}</TableCell>
						<TableCell align="right">
							<Tooltip title="Editar Información" arrow>
								<IconButton
									aria-label="edit"
									color="warning"
									size="small"
									sx={{ fontSize: 2 }}
									onClick={(e) => {
										e.stopPropagation();
									}}
								>
									<ModeEditOutlineOutlinedIcon fontSize="medium" />
								</IconButton>
							</Tooltip>

							<Tooltip title="Deshabilitar Usuario" arrow>
								<IconButton
									aria-label="edit"
									color="error"
									size="small"
									sx={{ fontSize: 2 }}
									onClick={(e) => {
										e.stopPropagation();
									}}
								>
									<PersonOffOutlinedIcon fontSize="medium" />
								</IconButton>
							</Tooltip>
						</TableCell>
					</TableRow>
				)}
			/>
		</Card>
	);
}

export default MapelPage;
