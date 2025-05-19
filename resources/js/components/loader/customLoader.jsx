import { Grid, Stack, Typography } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';

const LoadingComponent = () => {
	return (
		<Grid
			container
			xs={12}
			sm={12}
			p={5}
			sx={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Stack direction="column" spacing={2} alignItems="center">
				<SyncIcon
					sx={{
						fontSize: 48,
						color: 'primary.main',
						animation: 'spin 1.5s linear infinite',
						'@keyframes spin': {
							from: {
								transform: 'rotate(0deg)',
							},
							to: {
								transform: 'rotate(360deg)',
							},
						},
					}}
				/>
				<Typography
					sx={{
						fontWeight: 500,
						color: 'text.secondary',
						animation: 'fadein 1.5s ease-in-out infinite',
						'@keyframes fadein': {
							'0%': { opacity: 0 },
							'50%': { opacity: 1 },
							'100%': { opacity: 0 },
						},
					}}
				>
					Loading data...
				</Typography>
			</Stack>
		</Grid>
	);
};

export default LoadingComponent;
