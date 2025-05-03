import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
// MUI
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
// Icons
import LoginIcon from '@mui/icons-material/Login';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

function LoginSimple() {
	return (
		<Card
			hover={false}
			elevation={20}
			sx={{
				display: 'block',
				width: {
					xs: '95%',
					sm: '55%',
					md: '35%',
					lg: '25%',
				},
			}}
		>
			<Stack direction="column" spacing={2}>
				<div>
					<Typography variant="h1">SIGN IN</Typography>
					<Typography variant="body2" color="textSecondary">
						Signin using your account credentials.
					</Typography>
				</div>

				<LoginForm />
			</Stack>
		</Card>
	);
}

function LoginForm() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);
		try {
			await login(email, password);
			setError(null);
			setSuccess('Login Berhasil !');
			setTimeout(() => {
				setIsLoading(true);
				navigate('/');
			}, 5000);
		} catch (err) {
			console.log(err);
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	/*const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('submit');
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			navigate('/');
		}, 1000);
	};*/
	return (
		<>
			<form onSubmit={handleSubmit}>
				{(error || success) && (
					<Typography variant="subtitle2" sx={{ mt: 0 }} align="center" color={error ? 'error' : 'green'}>
						{error || success}
					</Typography>
				)}

				<TextField
					autoFocus
					color="primary"
					name="Email"
					label="Email"
					margin="normal"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					variant="outlined"
					fullWidth
				/>
				<TextField
					color="primary"
					name="password"
					type="password"
					margin="normal"
					label="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					variant="outlined"
					fullWidth
				/>
				<Button
					sx={{
						mt: 2,
						textTransform: 'uppercase',
						color: 'primary.contrastText',
						' &:not(:disabled)': {
							background: (theme) =>
								`linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.tertiary.main} 100%)`,
						},
						'&:hover': {
							background: (theme) =>
								`linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.tertiary.dark} 100%)`,
						},
					}}
					type="submit"
					variant="contained"
					disabled={isLoading}
					endIcon={
						isLoading ? (
							<CircularProgress
								color="secondary"
								size={25}
								sx={{
									my: 'auto',
								}}
							/>
						) : (
							<LoginIcon />
						)
					}
					fullWidth
					color="primary"
				>
					{success ? 'Redirecting' : 'Sign In'}
				</Button>
			</form>
		</>
	);
}

export default LoginSimple;
