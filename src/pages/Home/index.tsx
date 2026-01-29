import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCheckup } from '@/hooks/useCheckup';
import { useCheckupData } from '@/hooks/useCheckupData';
import UserInfoForm from './UserInfoForm';
import { AuthModal } from '@/pages/Home/AuthModal.tsx';

export default function Home() {
	const navigate = useNavigate();
	const { getUser } = useAuth();
	const { hasData } = useCheckupData();
	const {
		isModalOpen,
		requestAuth,
		isRequestPending,
		isRequestSuccess,
		confirmAuth,
		isConfirmPending,
		error,
		cancelAuth,
	} = useCheckup();

	// 이미 건강검진 데이터가 있으면 대시보드로 이동
	useEffect(() => {
		if (hasData) {
			navigate('/dashboard', { replace: true });
		}
	}, [hasData, navigate]);

	return (
		<div>
			<section className="pt-4 flex flex-col items-center mb-6">
				<div className="text-center mb-6">
					<h2 className="text-3xl font-bold mb-3">안녕하세요 {getUser()?.name}님!</h2>
					<p className="text-lg text-gray-600">개인정보를 입력하고 건강검진 결과를 조회해보세요</p>
				</div>
			</section>

			<section className="max-w-lg mx-auto">
				<UserInfoForm onSubmit={requestAuth} isLoading={false} />
			</section>

			{/* 인증 관련 모달 */}
			<AuthModal
				isOpen={isModalOpen}
				isRequestPending={isRequestPending}
				isRequestSuccess={isRequestSuccess}
				isConfirmPending={isConfirmPending}
				error={error}
				onCancel={cancelAuth}
				onConfirm={confirmAuth}
			/>
		</div>
	);
}
