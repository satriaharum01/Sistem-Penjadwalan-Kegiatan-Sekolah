import constants from '@/utils/constants';
// MUI
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

// Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import SchoolIcon from '@mui/icons-material/School';
import DomainIcon from '@mui/icons-material/Domain';
import BadgeIcon from '@mui/icons-material/Badge';

// assets
import logo from '@/assets/images/logo/png/logo_sekolah.png';

function Footer() {
	return (
		<Box bgcolor={(theme) => theme.palette.background.paper} py={3} borderTop={1} borderColor="cuaternary.300">
			<Container maxWidth="lg" component={Stack} direction="column" spacing={5}>
				<Grid container spacing={2} alignContent="center" justifyContent="space-between" alignItems="center">
					<Grid item xs={12} sm={6} md={4}>
						<Box component="img" src={logo} alt="slim logo" width="90%" />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Stack spacing={1} alignItems="center" direction="column">
							<Typography variant="h6">Media Sosial</Typography>
							<Stack direction="row" spacing={1}>
								<Link href={constants.siteData.siteFB} target="_blank" rel="noreferrer noopener">
									<IconButton aria-label="network" color="primary">
										<FacebookIcon />
									</IconButton>
								</Link>
								<Link href={constants.siteData.siteGovermentData} target="_blank" rel="noreferrer noopener">
									<IconButton aria-label="network" color="primary">
										<LocationCityIcon />
									</IconButton>
								</Link>
								<Link href={constants.siteData.siteInsta} target="_blank" rel="noreferrer noopener">
									<IconButton aria-label="network" color="primary">
										<InstagramIcon />
									</IconButton>
								</Link>
							</Stack>
						</Stack>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<Stack spacing={1}>
							<Typography variant="h6" my={1}>
								Kontak
							</Typography>
							<ContactLink Icon={LocalPhoneOutlinedIcon} text="+62 823 6074 3176" />
							<ContactLink Icon={EmailOutlinedIcon} text="smpn27medann@gmail.com" />
							<ContactLink Icon={LocationOnOutlinedIcon} text="Jl. Pancing Pasar IV No.2, Kenangan Baru, Kec. Percut Sei Tuan, Medan, Sumatera Utara 20371" />
						</Stack>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Stack spacing={1}>
							<Typography variant="h6" my={1}>
								Identitas Sekolah
							</Typography>
							<ContactLink Icon={SchoolIcon} text="UPT SMP NEGERI 27 MEDAN" />
							<ContactLink Icon={DomainIcon} text="Sekolah Negeri" />
							<ContactLink Icon={BadgeIcon} text="NPSN: 10210946" />
						</Stack>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						
					</Grid>
				</Grid>

				<Divider
					variant="middle"
					sx={{
						bgcolor: (theme) => theme.palette.secondary.main,
					}}
				/>
				<Stack direction={{ lg: 'row' }} justifyContent="space-between" alignItems="center" flexWrap="wrap">
					<Typography variant="body1" textAlign="center">
						Copyright 2025 © All Rights Reserved. Sistem Penjadwalan Sekolah
					</Typography>
					<Typography variant="subtitle1" textAlign="center">
						💻 - Developed By{' '}
						<Link
							underline="hover"
							sx={{
								cursor: 'pointer',
							}}
							href="https://www.instagram.com/satriaharumi/"
							target="_blank"
							rel="noreferrer noopener"
							fontWeight="medium"
						>
							Mr. Harumi 
						</Link>
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
}

function ContactLink({ Icon, text }) {
	return (
		<Stack spacing={1} alignItems="center" direction="row">
			<Icon
				color="primary"
				sx={{
					mr: 3,
				}}
			/>
			<Typography variant="body1">{text}</Typography>
		</Stack>
	);
}

function FooterLink({ text }) {
	return (
		<Link
			variant="body2"
			fontWeight="300"
			href="#!"
			underline="hover"
			sx={{
				color: 'text.primary',
				'&:hover': {
					'& svg': {
						opacity: '1',
						ml: 2,
					},
				},
				'&::before': {
					content: '""',
					display: 'inline-block',
					borderRadius: '50%',
					bgcolor: 'primary.main',
					width: '4px',
					height: '4px',
					mb: '2px',
					mr: 2,
				},
			}}
		>
			{/* <span style={{ marginRight: '15px' }}>•</span> */}
			{text}
			<ArrowForwardIosIcon
				color="primary"
				sx={{
					transition: '0.3s',
					fontSize: '11px',
					ml: 0,
					opacity: '0',
				}}
			/>
		</Link>
	);
}

export default Footer;
