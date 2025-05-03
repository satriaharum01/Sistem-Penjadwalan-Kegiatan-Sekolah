import React from 'react';
import Modal from '@/components/modal';
import Button from '@mui/material/Button';
import { Stack, Typography, Divider } from '@mui/material';


const LogoutModal = ({ show, onClose, onLogout }) => {
	return (
		<>
			<Modal
				type="contained"
				openModal={show}
				fnCloseModal={onClose}
				title="Akan Logout?"
				TransitionComponent="collapse"
			>
				<Stack p={3} spacing={3}>
					<Typography variant="body2" color="textSecondary">
						Pilih "Logout" Untuk Mengakhiri Sesi.
					</Typography>
					<Divider />
					<Stack direction="row" spacing={3} justifyContent="flex-end">
						<Button variant='contained' color='error' size="small" onClick={onLogout}>
							Log Out
						</Button>
						<Button size="small" onClick={onClose}>
							Close
						</Button>
					</Stack>
				</Stack>
			</Modal>
		</>
	);
};

export default LogoutModal;
