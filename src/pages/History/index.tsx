import { useEffect, useState, useMemo } from 'react';
import { DatePickerWithRange } from '@/components/DatePickerWithRange.tsx';
import { useCheckupData } from '@/hooks/useCheckupData.ts';
import { useNavigate } from 'react-router-dom';
import { parse, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import type { CheckupResult } from '@/types/checkupData';
import { ClipboardList } from 'lucide-react';
import { getCheckupTypeBadge } from '@/utils';
import { ROUTES } from '@/constants/routes';

export default function History() {
	const today = new Date();
	const tenYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
	const [startDate, setStartDate] = useState<Date>(tenYearsAgo);
	const [endDate, setEndDate] = useState<Date>(today);
	const navigate = useNavigate();
	const { data, hasData } = useCheckupData();

	// 데이터가 없으면 홈으로 리다이렉트
	useEffect(() => {
		if (!hasData) {
			navigate(ROUTES.HOME, { replace: true });
		}
	}, [hasData, navigate]);

	// 날짜 범위에 맞게 필터링 및 정렬
	const filteredResultList = useMemo(() => {
		if (!data) return [];

		return data.resultList
			.filter((item: CheckupResult) => {
				const dateStr = item.checkupDate.split('-').join('');
				const checkupDate = parse(dateStr, 'yyyyMMdd', new Date());

				return isWithinInterval(checkupDate, {
					start: startOfDay(startDate),
					end: endOfDay(endDate),
				});
			})
			.sort((a: CheckupResult, b: CheckupResult) => b.checkupDate.localeCompare(a.checkupDate));
	}, [data, startDate, endDate]);

	if (!data) {
		return null;
	}

	return (
		<div className="max-w-7xl mx-auto">
			<h2 className="text-2xl md:text-3xl font-bold mb-2 break-keep">건강검진 이력 조회</h2>
			<p className="text-sm md:text-base text-gray-600 mb-8 break-keep">
				최대 10년간의 건강검진 이력을 조회할 수 있습니다
			</p>

			<div className="max-w-lg mb-8">
				<DatePickerWithRange
					startDate={startDate}
					endDate={endDate}
					setStartDate={setStartDate}
					setEndDate={setEndDate}
				/>
			</div>

			<section>
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-xl font-semibold">검진 이력</h3>
					<p className="text-lg text-gray-600">
						총 <strong className="text-rose-600">{filteredResultList.length}</strong>건
					</p>
				</div>

				{filteredResultList.length === 0 ? (
					<div className="flex flex-col gap-6 py-12 justify-center items-center">
						<ClipboardList className="w-12 h-12 text-gray-400" />
						<p className="text-lg text-gray-500">해당 기간에 검진 이력이 없습니다.</p>
					</div>
				) : (
					<ul className="space-y-4">
						{filteredResultList.map((item, index) => (
							<li
								key={item.checkupDate + item.organizationName + index}
								className="bg-white rounded-xl border shadow-sm p-6"
							>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										{/* 검진 기관 */}
										<div className="flex items-center gap-2 mb-2">
											<p className="text-xl md:text-2xl font-bold text-gray-900">{item.organizationName}</p>
										</div>

										{/* 검진일 & 검진타입 */}
										<div className="flex flex-wrap items-center gap-4 text-base md:text-lg">
											<div className="flex items-center gap-1.5 text-gray-600">
												<span>{item.checkupDate}</span>
											</div>
											<div className="flex items-center gap-1.5">
												<span className={`px-3 py-0.5 rounded-full text-sm ${getCheckupTypeBadge(item.checkupType)}`}>
													{item.checkupType}
												</span>
											</div>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</section>
		</div>
	);
}
