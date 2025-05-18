// MUI
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import PageHeader from '@/components/pageHeader';

function WelcomeSection() {
	return (
		<PageHeader title="Dashboard">
			<Breadcrumbs
				aria-label="breadcrumb"
				sx={{
					textTransform: 'uppercase',
				}}
			>
				<Typography color="text.tertiary">Dashboard</Typography>
			</Breadcrumbs>
		</PageHeader>
	);
}

export default WelcomeSection;
