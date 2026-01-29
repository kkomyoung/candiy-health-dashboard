import { useEffect, type ReactNode } from 'react';
import { Spinner } from '@/components/ui/spinner.tsx';
import { useCountdown } from '@/hooks/useCountdown';
import { ApiError } from '@/types/api';

const AUTH_TIMEOUT_SECONDS = 300;

const formatTime = (seconds: number) => {
	const min = Math.floor(seconds / 60);
	const sec = seconds % 60;
	return `${min}:${sec.toString().padStart(2, '0')}`;
};

interface AuthModalProps {
	isOpen: boolean;
	isRequestPending: boolean;
	isRequestSuccess: boolean;
	isConfirmPending: boolean;
	error: Error | null;
	onCancel: () => void;
	onConfirm?: () => void;
}

export const AuthModal = ({
	isOpen,
	isRequestPending,
	isRequestSuccess,
	isConfirmPending,
	error,
	onCancel,
	onConfirm,
}: AuthModalProps) => {
	const { remainingTime, start, reset } = useCountdown({
		initialSeconds: AUTH_TIMEOUT_SECONDS,
	});

	// 1차 인증 성공 시 타이머 시작
	useEffect(() => {
		if (isRequestSuccess) {
			start();
		}
	}, [isRequestSuccess, start]);

	// 모달 닫히면 타이머 리셋
	useEffect(() => {
		if (!isOpen) {
			reset();
		}
	}, [isOpen, reset]);

	if (!isOpen) return null;

	// 에러 정보 추출
	const errorCode = error instanceof ApiError ? error.code : undefined;
	const errorMessage = error?.message;

	// AE-003: 본인인증 미완료 에러 (재시도 가능)
	const isRetryableError = errorCode === 'AE-003';

	let message: ReactNode = '';
	let showConfirm = false;
	let showSpinner = false;
	let showTimer = false;

	if (isRequestPending) {
		message = '본인인증 요청 중 입니다';
		showSpinner = true;
	} else if (isRequestSuccess && !isConfirmPending) {
		if (isRetryableError) {
			message = (
				<>
					본인인증 절차가 완료되지 않았습니다.
					<br />
					먼저 본인인증을 완료해주세요.
				</>
			);
			showConfirm = true;
			showTimer = true;
		} else if (errorMessage) {
			message = errorMessage;
			showConfirm = false;
		} else {
			message = '간편인증 앱에서 인증을 완료한 후 버튼을 눌러주세요';
			showConfirm = true;
			showTimer = true;
		}
	} else if (isConfirmPending) {
		message = '건강검진 데이터를 불러오는 중...';
		showSpinner = true;
	}

	return (
		<div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center">
			<div className="min-w-md bg-white pt-10 pb-6 px-6 flex flex-col items-center rounded-xl">
				{showSpinner && <Spinner className="text-rose-400" />}
				{showTimer && (
					<p className={`text-3xl font-bold ${remainingTime <= 30 ? 'text-rose-500' : 'text-gray-700'}`}>
						{formatTime(remainingTime)}
					</p>
				)}
				<p className={`text-lg mt-4 text-center ${error ? 'text-rose-500' : ''}`}>{message}</p>

				<div className="w-full flex gap-2 justify-center mt-6">
					<button
						onClick={onCancel}
						className="flex-1 flex items-center justify-center border border-gray-500 rounded-md py-2 text-lg cursor-pointer"
					>
						취소
					</button>

					{showConfirm && onConfirm && (
						<button
							onClick={onConfirm}
							className="flex-1 flex items-center justify-center bg-rose-500 text-white rounded-md py-2 text-lg cursor-pointer"
						>
							인증 완료
						</button>
					)}
				</div>
			</div>
		</div>
	);
};