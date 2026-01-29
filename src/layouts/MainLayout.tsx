import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import logo from '@/assets/img/logo.webp';
import { useAuth } from '@/hooks/useAuth.ts';
import { useCheckupData } from '@/hooks/useCheckupData.ts';
import { ROUTES } from '@/constants/routes';
import SideMenu from '@/components/SideMenu.tsx';

export default function MainLayout() {
	const { logout } = useAuth();
	const { hasData } = useCheckupData();
	const navigate = useNavigate();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleLogout = () => {
		navigate(ROUTES.LOGIN);
		logout();
		setSidebarOpen(false);
	};

	return (
		<div className="bg-sky-50 min-h-screen">
			{/* 헤더 */}
			<header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-30">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
					<div className="flex items-center gap-4">
						{hasData && (
							<button
								type="button"
								onClick={() => setSidebarOpen(true)}
								className="p-1 rounded hover:bg-gray-100 cursor-pointer"
							>
								<Menu className="w-6 h-6" />
							</button>
						)}

						<img className="inline-block w-9" src={logo} alt="logo" />
						<h1 className="text-xl font-bold text-gray-900 hidden sm:block">건강검진 대시보드</h1>
					</div>
					<button
						className="text-sm hover:underline cursor-pointer text-gray-700 hover:text-gray-900"
						onClick={handleLogout}
					>
						로그아웃
					</button>
				</div>
			</header>

			{/* 사이드 메뉴 */}
			<SideMenu sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* 메인 콘텐츠 */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pb-20">
				<Outlet />
			</main>
		</div>
	);
}
