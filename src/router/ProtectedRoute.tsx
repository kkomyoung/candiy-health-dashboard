import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.ts';
import { ROUTES } from '@/constants/routes';

export default function ProtectedRoute() {
	const { isAuthenticated } = useAuth();

	// 인증되지 않은 경우 로그인 페이지로 이동
	if (!isAuthenticated()) {
		return <Navigate to={ROUTES.LOGIN} replace />;
	}

	return <Outlet />;
}
