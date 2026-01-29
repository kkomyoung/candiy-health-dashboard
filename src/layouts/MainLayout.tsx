import { useState, useMemo } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { Menu, X, Activity, ClipboardList } from 'lucide-react';
import logo from '@/assets/img/logo.webp';
import { useAuth } from '@/hooks/useAuth.ts';

export default function MainLayout() {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	// location 변경 시마다 sessionStorage 체크
	const hasData = useMemo(() => {
		return sessionStorage.getItem('checkupData') !== null;
	}, [location.pathname]);

	const menuItems = [
		{ path: '/dashboard', label: '최근 건강검진', icon: Activity },
		{ path: '/history', label: '건강검진 이력 조회', icon: ClipboardList },
	];

	const handleLogout = () => {
		navigate('/login');
		logout();
		setSidebarOpen(false);
	};

	return (
		<div className="bg-sky-50 min-h-screen">
			{/* 사이드바 오버레이 */}
			{sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />}

			{/* 사이드바 */}
			<aside
				className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
					sidebarOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<div className="flex items-center justify-between p-4 border-b">
					<div className="flex items-center gap-2">
						<img className="w-8" src={logo} alt="logo" />
						<span className="font-bold text-gray-900">메뉴</span>
					</div>
					<button onClick={() => setSidebarOpen(false)} className="p-1 rounded hover:bg-gray-100">
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* 메뉴 - 데이터가 있을 때만 표시 */}
				{hasData && (
					<nav className="p-4">
						<ul className="space-y-2">
							{menuItems.map((item) => {
								const Icon = item.icon;
								const isActive = location.pathname === item.path;
								return (
									<li key={item.path}>
										<Link
											to={item.path}
											onClick={() => setSidebarOpen(false)}
											className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
												isActive ? 'bg-sky-100 text-sky-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'
											}`}
										>
											<Icon className="w-5 h-5" />
											{item.label}
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
				)}
			</aside>

			{/* 헤더 */}
			<header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-30">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
					<div className="flex items-center gap-4">
						{hasData && (
							<button onClick={() => setSidebarOpen(true)} className="p-1 rounded hover:bg-gray-100">
								<Menu className="w-6 h-6" />
							</button>
						)}

						<img className="inline-block w-9" src={logo} alt="logo" />
						<h1 className="text-xl font-bold text-gray-900 hidden sm:block">건강검진 대시보드</h1>
					</div>
					<button className="cursor-pointer text-gray-700 hover:text-gray-900" onClick={handleLogout}>
						로그아웃
					</button>
				</div>
			</header>

			{/* 메인 콘텐츠 */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
				<Outlet />
			</main>
		</div>
	);
}
