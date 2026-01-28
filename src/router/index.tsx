import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '@/router/ProtectedRoute.tsx';
import MainLayout from '@/layouts/MainLayout.tsx';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import History from '@/pages/History';

export const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />,
	},
	{
		element: <ProtectedRoute />,
		children: [
			{
				element: <MainLayout />,
				children: [
					{
						path: '/',
						element: <Home />,
					},
					{
						path: '/dashboard',
						element: <Dashboard />,
					},
					{
						path: '/history',
						element: <History />,
					},
				],
			},
		],
	},
]);
