import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.ts';
import { ROUTES } from '@/constants/routes';
import logo from '@/assets/img/logo.webp';

export default function Login() {
	const [name, setName] = useState('');
	const { login, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	// 이미 로그인된 사용자의 로그인 페이지 접근을 방지
	if (isAuthenticated()) {
		return <Navigate to={ROUTES.HOME} replace />;
	}

	const handleSubmit = () => {
		if (name.trim()) {
			login(name.trim());
			navigate(ROUTES.HOME);
		}
	};

	return (
		<div className="bg-gradient-to-br from-sky-100 via-white to-rose-100">
			<div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
				<div className="mb-10 text-center">
					<img className="inline-block w-18 mb-10" src={logo} alt="logo" />
					<h1 className="text-4xl font-bold text-gray-900 mb-2">건강검진 대시보드</h1>
					<p className="text-lg text-gray-600">나의 건강 데이터를 한눈에 확인하세요</p>
				</div>
				<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
					<form
						className="space-y-4"
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit();
						}}
					>
						<label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
							이름
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all outline-none"
							placeholder="이름을 입력하세요"
						/>
						<button
							type="submit"
							className="w-full rounded-lg bg-sky-500 py-3 text-white font-semibold text-lg hover:bg-sky-600 transition cursor-pointer"
						>
							로그인
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
