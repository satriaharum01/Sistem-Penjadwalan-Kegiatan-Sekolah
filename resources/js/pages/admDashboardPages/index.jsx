import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import WelcomeSection from './welcomeSection';
import StatsSection from './statsSection';
import GraphsSection from './graphsSection';
import ConstraintsSection from './constraintsSection';
import ProductsSection from './productsSection';
import TransactionsSection from './transactionsSection';

function DashboardPage() {
	return (
		<>
			<WelcomeSection />
			<Stack spacing={3}>
				<GraphsSection />
				<StatsSection />
				<section>
					<Grid container spacing={3}>
						<Grid item xs={12} md={12} lg={6}>
							<ProductsSection />
						</Grid>
						<Grid item xs={12} md={12} lg={6}>
							<TransactionsSection />
						</Grid>
					</Grid>
				</section>
			</Stack>
		</>
	);
}

export default DashboardPage;
