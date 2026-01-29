import logo from '@/assets/img/logo.webp';
import { Activity, ClipboardList, X, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

type sideMenuProps = { sidebarOpen: boolean; setSidebarOpen: (value: boolean) => void };

type typeMenuItems = {
	path: string;
	label: string;
	icon: LucideIcon;
};

const MENU_ITEMS: typeMenuItems[] = [
	{ path: ROUTES.DASHBOARD, label: '최근 건강검진', icon: Activity },
	{ path: ROUTES.HISTORY, label: '건강검진 이력 조회', icon: ClipboardList },
];

const SideMenu = ({ sidebarOpen, setSidebarOpen }: sideMenuProps) => {
	return (
		<>
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
					<button
						type="button"
						onClick={() => setSidebarOpen(false)}
						className="p-1 rounded hover:bg-gray-100 cursor-pointer"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				<nav className="p-4">
					<ul className="space-y-2">
						{MENU_ITEMS.map((item) => {
							const Icon = item.icon;
							const isActive = location.pathname === item.path;
							return (
								<li key={item.path}>
									<Link
										to={item.path}
										onClick={() => setSidebarOpen(false)}
										className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
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
			</aside>
		</>
	);
};

export default SideMenu;
