import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
	const [name, setName] = useState('');
	const { login, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	// 이미 로그인된 사용자의 로그인 페이지 접근을 방지
	if (isAuthenticated()) {
		return <Navigate to="/" replace />;
	}

	const handleSubmit = () => {
		if (name.trim()) {
			login(name.trim());
			navigate('/');
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
				<h1 className="mb-6 text-2xl font-bold text-center">로그인</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="이름을 입력하세요"
						className="w-full rounded-md border border-gray-300 px-4 py-2 mb-4 focus:border-blue-500 focus:outline-none"
					/>
					<button type="submit" className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700">
						로그인
					</button>
				</form>
			</div>
		</div>
	);
}
