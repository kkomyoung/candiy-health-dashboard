import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckupData } from '@/hooks/useCheckupData';
import { ROUTES } from '@/constants/routes';
import { SearchIcon } from 'lucide-react';
import EvaluationLabel from '@/components/EvaluationLabel.tsx';
import BmiChart from '@/pages/Dashboard/BmiChart.tsx';
import CheckupCard from '@/components/CheckupCard.tsx';

export default function Dashboard() {
	const navigate = useNavigate();
	const { data, hasData, clearData } = useCheckupData();

	// 데이터가 없으면 홈으로 리다이렉트
	useEffect(() => {
		if (!hasData) {
			navigate(ROUTES.HOME, { replace: true });
		}
	}, [hasData, navigate]);

	if (!data) {
		return null;
	}

	// 환자 이름
	const patientName = data.patientName;
	// 가장 최근 건강검진
	const latestCheckup = data.overviewList?.length
		? [...data.overviewList].sort((a, b) => b.checkupDate.localeCompare(a.checkupDate))[0]
		: null;

	// 건강검진 데이터가 없을 경우
	if (!latestCheckup) {
		return (
			<div className="max-w-7xl mx-auto text-center mt-20">
				<p className="text-xl md:text-2xl mb-4">
					<strong className="text-2xl md:text-3xl">{patientName}님,</strong> 최근 건강검진 결과가 없습니다.
				</p>

				<button
					className="mx-auto mt-8 shadow-lg flex items-center justify-center bg-rose-500 text-white px-10 py-4 rounded-lg gap-2 text-xl font-semibold cursor-pointer"
					type="button"
					onClick={clearData}
				>
					<SearchIcon className="w-6" />
					다른 사용자로 재조회하기
				</button>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto">
			<h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-6 break-keep">
				{patientName}님의 최근 건강검진 결과입니다
			</h2>
			<dl className="mb-6 space-y-2">
				<div className="text-lg">
					<dt className="inline">검진일: </dt>
					<dd className="inline">{latestCheckup.checkupDate}</dd>
				</div>
				<div className="text-lg">
					<dt className="inline">판정: </dt>
					<dd className="inline">
						<EvaluationLabel value={latestCheckup.evaluation} />
					</dd>
				</div>
			</dl>
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
				<li className="bg-white border rounded-xl shadow-md p-6">
					<CheckupCard label={'키'} value={latestCheckup.height} unit={'cm'} />
				</li>
				<li className="bg-white border rounded-xl shadow-md p-6">
					<CheckupCard label={'혈압'} value={latestCheckup.bloodPressure} unit={'mmHg'} />
				</li>
				<li className="bg-white border rounded-xl shadow-md p-6">
					<CheckupCard label={'식전혈당'} value={latestCheckup.fastingBloodGlucose} unit={'mg/dL'} />
				</li>
				<li className="bg-white border rounded-xl shadow-md p-6">
					<CheckupCard label={'총콜레스테롤'} value={latestCheckup.totalCholesterol} unit={'mg/dL'} />
				</li>
				{latestCheckup.BMI && (
					<li className="col-span-1 md:col-span-2 lg:col-span-4">
						<BmiChart bmi={Number(latestCheckup.BMI)} />
					</li>
				)}
				<li className="bg-white border rounded-xl shadow-md p-6">
					<CheckupCard label={'HDL콜레스테롤'} value={latestCheckup.HDLCholesterol} unit={'mg/dL'} />
				</li>
				<li className="bg-white border rounded-xl shadow-md p-6">
					<CheckupCard label={'요단백'} value={latestCheckup.proteinuria} unit={''} />
				</li>
				<li className="bg-white border rounded-xl shadow-md p-6">
					<CheckupCard label={'혈청크레아티닌'} value={latestCheckup.serumCreatinine} unit={'mg/dL'} />
				</li>
				<li className="bg-white border rounded-xl shadow-md p-6">
					<CheckupCard label={'트리글리세라이드'} value={latestCheckup.triglyceride} unit={'mg/dL'} />
				</li>
			</ul>
		</div>
	);
}
