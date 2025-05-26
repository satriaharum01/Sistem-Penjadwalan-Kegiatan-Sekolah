
import { Grid, Stack } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';

const LoadingComponent = () => {
	return (
		<Grid
			container
			justifyContent="center"
			alignItems="center"
			p={5}
			sx={{ height: '100vh' }} // misal full tinggi layar
		>
			<Stack direction="column" spacing={2} alignItems="center">
				<SyncIcon
					sx={{
						fontSize: 48,
						color: 'primary.main',
						animation: 'spin 1.5s linear infinite',
						'@keyframes spin': {
							from: { transform: 'rotate(0deg)' },
							to: { transform: 'rotate(360deg)' },
						},
					}}
				/>
			</Stack>
		</Grid>
	);
};
export default LoadingComponent;
