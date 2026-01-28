import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import ProtectedRoute from '@/router/ProtectedRoute.tsx';
import MainLayout from '@/layouts/MainLayout.tsx';
import Home from '@/pages/Home.tsx';
import Dashboard from '@/pages/Dashboard.tsx';
import History from '@/pages/History.tsx';

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
