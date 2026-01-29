export interface User {
	name: string;
}

/**
 * localStorage 기반의 mock 로그인 hook
 */
export function useAuth() {
	const getUser = (): User | null => {
		const user = localStorage.getItem('user');
		return user ? JSON.parse(user) : null;
	};

	const login = (name: string) => {
		localStorage.setItem('user', JSON.stringify({ name }));
	};

	const logout = () => {
		localStorage.removeItem('user');
		sessionStorage.removeItem('checkupData'); // 건강검진 데이터도 삭제
	};

	const isAuthenticated = (): boolean => {
		return localStorage.getItem('user') !== null;
	};

	return { getUser, login, logout, isAuthenticated };
}
