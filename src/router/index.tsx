import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '@/router/ProtectedRoute.tsx';
import MainLayout from '@/layouts/MainLayout.tsx';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import History from '@/pages/History';
import { ROUTES } from '@/constants/routes';

export const router = createBrowserRouter([
	{
		path: ROUTES.LOGIN,
		element: <Login />,
	},
	{
		element: <ProtectedRoute />,
		children: [
			{
				element: <MainLayout />,
				children: [
					{
						path: ROUTES.HOME,
						element: <Home />,
					},
					{
						path: ROUTES.DASHBOARD,
						element: <Dashboard />,
					},
					{
						path: ROUTES.HISTORY,
						element: <History />,
					},
				],
			},
		],
	},
]);
