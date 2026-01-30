import { useState } from 'react';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { SearchIcon } from 'lucide-react';
import { LOGIN_TYPE_OPTIONS, TELECOM_OPTIONS } from '@/constants/auth';

export interface UserInfoFormData {
	loginTypeLevel: string;
	legalName: string;
	birthdate: string;
	phoneNo: string;
	telecom: string;
}

export default function UserInfoForm({ onSubmit }: { onSubmit: (data: UserInfoFormData) => void }) {
	const [formData, setFormData] = useState<UserInfoFormData>({
		loginTypeLevel: '',
		legalName: '',
		birthdate: '',
		phoneNo: '',
		telecom: '',
	});

	const handleChange = (field: keyof UserInfoFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				const { loginTypeLevel, telecom } = formData;
				if (!loginTypeLevel && !telecom) {
					alert('통신사와 간편인증 방식을 선택해주세요.');
					return;
				}

				if (!loginTypeLevel) {
					alert('간편인증 방식을 선택해주세요.');
					return;
				}

				if (!telecom) {
					alert('통신사를 선택해주세요.');
					return;
				}

				onSubmit(formData);
			}}
			className="w-full space-y-4"
		>
			<div className="space-y-2">
				<Label htmlFor="legalName">이름</Label>
				<Input
					id="legalName"
					type="text"
					placeholder="본명을 입력하세요"
					value={formData.legalName}
					onChange={(e) => handleChange('legalName', e.target.value)}
					required
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="birthdate">생년월일 (숫자 8자리 입력)</Label>
				<Input
					id="birthdate"
					type="text"
					placeholder="YYYYMMDD"
					minLength={8}
					maxLength={8}
					value={formData.birthdate}
					onChange={(e) => handleChange('birthdate', e.target.value.replace(/\D/g, ''))}
					required
				/>
			</div>

			<div className="flex flex-col md:flex-row gap-2">
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
				<div className="space-y-2 flex-1">
					<Label htmlFor="phoneNo">전화번호 ('-'없이 숫자만 입력)</Label>
					<Input
						id="phoneNo"
						type="tel"
						placeholder="01012345678"
						value={formData.phoneNo}
						maxLength={11}
						minLength={10}
						onChange={(e) => handleChange('phoneNo', e.target.value.replace(/\D/g, ''))}
						required
					/>
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
				className="mt-8 shadow-lg w-full flex items-center justify-center bg-rose-500 text-white px-10 py-4 rounded-lg gap-2 text-xl font-semibold cursor-pointer"
			>
				<SearchIcon className="w-6" />
				건강검진 조회하기
			</button>
		</form>
	);
}
