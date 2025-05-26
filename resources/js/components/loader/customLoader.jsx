import React from 'react';
import { Spinner } from 'react-bootstrap';
import { FaSyncAlt } from 'react-icons/fa'; // Gantikan SyncIcon dengan icon React

const LoadingComponent = () => {
	return (
		<div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
			<div className="text-center">
				<FaSyncAlt
					style={{
						fontSize: '3rem',
						color: '#0d6efd',
						animation: 'spin 1.5s linear infinite',
					}}
				/>
				<p
					className="mt-3 text-secondary"
					style={{
						fontWeight: 500,
						animation: 'fadein 1.5s ease-in-out infinite',
					}}
				>
					Loading data...
				</p>

				{/* Inline style for animation */}
				<style>
					{`
					@keyframes spin {
						from { transform: rotate(0deg); }
						to { transform: rotate(360deg); }
					}
					@keyframes fadein {
						0% { opacity: 0; }
						50% { opacity: 1; }
						100% { opacity: 0; }
					}
					`}
				</style>
			</div>
		</div>
	);
};

export default LoadingComponent;
