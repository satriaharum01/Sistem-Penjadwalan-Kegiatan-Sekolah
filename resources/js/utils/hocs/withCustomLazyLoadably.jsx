import { Suspense } from 'react';
import LoadingComponent from '@/components/loader/lazyLoader';

// eslint-disable-next-line react/function-component-definition
const Loadable = (Component) => (props) => (
	<Suspense fallback={<LoadingComponent />}>
		<Component {...props} />
	</Suspense>
);

/* function Loadable(Component) {
	return function Loadably(props) {
		return (
			<Suspense fallback={<Loader />}>
				<Component {...props} />
			</Suspense>
		);
	};
} */

export default Loadable;
