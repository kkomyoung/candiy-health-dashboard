import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckupData } from '@/hooks/useCheckupData';

export default function Dashboard() {
	const navigate = useNavigate();
	const { data, hasData } = useCheckupData();

	// 데이터가 없으면 홈으로 리다이렉트
	useEffect(() => {
		if (!hasData) {
			navigate('/', { replace: true });
		}
	}, [hasData, navigate]);

	if (!data) {
		return null;
	}

	return (
		<div className="max-w-4xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">건강검진 결과</h1>

			<pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
