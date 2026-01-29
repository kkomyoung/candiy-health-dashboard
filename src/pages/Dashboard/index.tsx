import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckupData } from '@/hooks/useCheckupData';
import { SearchIcon } from 'lucide-react';
import EvaluationLabel from '@/components/EvaluationLabel.tsx';

export default function Dashboard() {
	const navigate = useNavigate();
	const { data, hasData, clearData } = useCheckupData();

	// 데이터가 없으면 홈으로 리다이렉트
	useEffect(() => {
		if (!hasData) {
			navigate('/', { replace: true });
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
				<p className="text-2xl mb-4">
					<strong className="text-3xl">{patientName}님,</strong> 최근 건강검진 결과가 없습니다.
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
			<h1 className="text-3xl font-bold mb-6">{patientName}님의 최근 건강검진 결과입니다</h1>
			<p className="text-lg font-semibold mb-2">검진일: {latestCheckup.checkupDate}</p>
			<p className="text-lg font-semibold mb-4">
				판정: <EvaluationLabel value={latestCheckup.evaluation} />
			</p>
			<ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
				<li className="bg-white border rounded-xl shadow-md p-6">
					<dl>
						<dt className="text-base">키</dt>
						<dd className="text-2xl text-right">{latestCheckup.height}cm</dd>
					</dl>
				</li>
				<li className="bg-white border rounded-xl shadow-md p-6">
					<dl>
						<dt className="text-base">몸무게</dt>
						<dd className="text-2xl text-right">{latestCheckup.weight}kg</dd>
					</dl>
				</li>
				<li className="bg-white border rounded-xl shadow-md p-6">
					<dl>
						<dt className="text-base">혈압</dt>
						<dd className="text-2xl text-right">{latestCheckup.bloodPressure}mmHg</dd>
					</dl>
				</li>
				<li className="bg-white border rounded-xl shadow-md p-6">
					<dl>
						<dt className="text-base">식전혈당</dt>
						<dd className="text-2xl text-right">{latestCheckup.fastingBloodGlucose}mg/dL</dd>
					</dl>
				</li>
			</ul>
		</div>
	);
}
