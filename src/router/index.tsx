import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import ProtectedRoute from '@/router/ProtectedRoute.tsx';

export const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/',
		element: <ProtectedRoute />,
		children: [
			{
				index: true,
				element: <div>로그인 완료</div>,
			},
		],
	},
]);
