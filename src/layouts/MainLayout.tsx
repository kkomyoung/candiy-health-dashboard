import { Outlet, useNavigate } from 'react-router-dom';
import logo from '@/assets/img/logo.webp';
import { useAuth } from '@/hooks/useAuth.ts';

export default function MainLayout() {
	const { logout } = useAuth();
	const navigate = useNavigate();

	return (
		<div className="bg-sky-50 min-h-screen">
			<header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-40">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<img className="inline-block w-9" src={logo} alt="logo" />
						<h1 className="text-xl font-bold text-gray-900">건강검진 대시보드</h1>
					</div>
					<button
						className="cursor-pointer"
						onClick={() => {
							navigate('/login');
							logout();
						}}
					>
						로그아웃
					</button>
					{/*<nav>*/}
					{/*	<ul>*/}
					{/*		<li>*/}
					{/*			<Link to="/dashboard">대시보드</Link>*/}
					{/*		</li>*/}
					{/*		<li>*/}
					{/*			<Link to="/history">건강검진 이력</Link>*/}
					{/*		</li>*/}
					{/*	</ul>*/}
					{/*</nav>*/}
				</div>
			</header>
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<Outlet />
			</main>
		</div>
	);
}
