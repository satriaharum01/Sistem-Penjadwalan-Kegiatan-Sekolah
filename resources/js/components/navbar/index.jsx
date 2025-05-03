// MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
// Icons
import NavLinks from './navLinks';

function Navbar({ navItems, position = 'sticky' }) {
	return (
		<AppBar position={position} elevation={26} sx={{ borderLeft: 0, borderRight: 0 }}>
			<Box bgcolor="background.paper" py={2}>
				<Grid container xs={8} lg={8} >
					<Container maxWidth="lg">
						<NavLinks navItems={navItems} />
					</Container>
				</Grid>
			</Box>
		</AppBar>
	);
}

export default Navbar;
