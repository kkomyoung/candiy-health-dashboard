import { useState } from 'react';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { SearchIcon } from 'lucide-react';

const LOGIN_TYPE_OPTIONS = [
	{ value: '1', label: '카카오톡' },
	{ value: '3', label: '삼성패스' },
	{ value: '4', label: '국민은행(국민인증서)' },
	{ value: '5', label: '통신사(PASS)' },
	{ value: '6', label: '네이버' },
	{ value: '7', label: '신한은행(신한인증서)' },
	{ value: '8', label: '토스' },
	{ value: '9', label: '뱅크샐러드' },
	{ value: '10', label: '하나은행(하나인증서)' },
	{ value: '11', label: 'NH모바일인증서' },
	{ value: '12', label: '우리은행(우리인증서)' },
	{ value: '13', label: '카카오뱅크' },
];

const TELECOM_OPTIONS = [
	{ value: '0', label: 'SKT (SKT 알뜰폰)' },
	{ value: '1', label: 'KT (KT 알뜰폰)' },
	{ value: '2', label: 'LG U+ (LG U+ 알뜰폰)' },
];

export interface UserInfoFormData {
	loginTypeLevel: string;
	legalName: string;
	birthdate: string;
	phoneNo: string;
	telecom: string;
}

interface UserInfoFormProps {
	onSubmit: (data: UserInfoFormData) => void;
	isLoading?: boolean;
}

export default function UserInfoForm({ onSubmit, isLoading = false }: UserInfoFormProps) {
	const [formData, setFormData] = useState<UserInfoFormData>({
		loginTypeLevel: '',
		legalName: '',
		birthdate: '',
		phoneNo: '',
		telecom: '',
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(formData);
	};

	const handleChange = (field: keyof UserInfoFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<form onSubmit={handleSubmit} className="w-full space-y-4">
			<div className="space-y-2">
				<Label htmlFor="legalName">이름</Label>
				<Input
					id="legalName"
					type="text"
					placeholder="홍길동"
					value={formData.legalName}
					onChange={(e) => handleChange('legalName', e.target.value)}
					required
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="birthdate">생년월일</Label>
				<Input
					id="birthdate"
					type="text"
					placeholder="YYYYMMDD"
					maxLength={8}
					value={formData.birthdate}
					onChange={(e) => handleChange('birthdate', e.target.value.replace(/\D/g, ''))}
					required
				/>
				<p className="text-sm text-muted-foreground">숫자 8자리 (예: 19970101)</p>
			</div>

			<div className="flex gap-2">
				<div className="space-y-2 flex-1">
					<Label htmlFor="phoneNo">전화번호</Label>
					<Input
						id="phoneNo"
						type="tel"
						placeholder="01012345678"
						value={formData.phoneNo}
						onChange={(e) => handleChange('phoneNo', e.target.value.replace(/\D/g, ''))}
						required
					/>
					<p className="text-sm text-muted-foreground">'-' 없이 숫자만 입력</p>
				</div>

				<div className="space-y-2 flex-1">
					<Label htmlFor="telecom">통신사</Label>
					<Select value={formData.telecom} onValueChange={(value) => handleChange('telecom', value)} required>
						<SelectTrigger id="telecom" className="w-full">
							<SelectValue placeholder="통신사 선택" />
						</SelectTrigger>
						<SelectContent>
							{TELECOM_OPTIONS.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="loginTypeLevel">간편인증 방식</Label>
				<Select
					value={formData.loginTypeLevel}
					onValueChange={(value) => handleChange('loginTypeLevel', value)}
					required
				>
					<SelectTrigger id="loginTypeLevel" className="w-full">
						<SelectValue placeholder="인증 방식 선택" />
					</SelectTrigger>
					<SelectContent>
						{LOGIN_TYPE_OPTIONS.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				className="mt-8 shadow-lg w-full flex items-center justify-center bg-rose-500 text-white px-10 py-4 rounded-lg gap-2 text-xl font-semibold cursor-pointer"
			>
				<SearchIcon className="w-6" />
				건강검진 조회하기
			</button>
		</form>
	);
}
