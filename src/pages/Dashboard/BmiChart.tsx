import { PieChart, Pie } from 'recharts';

interface DashboardChartProps {
	bmi: number;
}

// BMI 구간별 데이터 (대한비만학회 기준)
const BMI_SEGMENTS = [
	{ name: '저체중', range: '18.5 미만', value: 18.5, fill: '#60A5FA' },
	{ name: '정상', range: '18.5~22.9', value: 4.5, fill: '#34D399' },
	{ name: '과체중', range: '23~24.9', value: 2, fill: '#FBBF24' },
	{ name: '1단계 비만', range: '25~29.9', value: 5, fill: '#FB923C' },
	{ name: '2단계 비만', range: '30~34.9', value: 5, fill: '#F87171' },
	{ name: '3단계 비만', range: '35 이상', value: 5, fill: '#DC2626' },
];

// 차트 설정
const CX = 160;
const CY = 160;
const INNER_RADIUS = 80;
const OUTER_RADIUS = 140;
const NEEDLE_COLOR = '#374151'; // gray-700

// BMI 값을 각도로 변환
function bmiToRadians(bmi: number): number {
	const minBmi = 0;
	const maxBmi = 40;
	const clampedBmi = Math.max(minBmi, Math.min(maxBmi, bmi));
	const degrees = 180 - (clampedBmi / maxBmi) * 180;
	return (degrees * Math.PI) / 180;
}

// BMI 상태 판정
function getBmiStatus(bmi: number): { label: string; color: string } {
	if (bmi < 18.5) return { label: '저체중', color: '#60A5FA' };
	if (bmi < 23) return { label: '정상', color: '#34D399' };
	if (bmi < 25) return { label: '과체중', color: '#FBBF24' };
	if (bmi < 30) return { label: '1단계 비만', color: '#FB923C' };
	if (bmi < 35) return { label: '2단계 비만', color: '#F87171' };
	return { label: '3단계 비만', color: '#DC2626' };
}

// Needle 컴포넌트
function NeedleComponent({ bmi }: { bmi: number }) {
	const radians = bmiToRadians(bmi);
	const needleLength = INNER_RADIUS + (OUTER_RADIUS - INNER_RADIUS) / 2;

	const x2 = CX + needleLength * Math.cos(radians);
	const y2 = CY - needleLength * Math.sin(radians);

	return (
		<g>
			<circle cx={CX} cy={CY} r={8} fill={NEEDLE_COLOR} />
			<line x1={CX} y1={CY} x2={x2} y2={y2} stroke={NEEDLE_COLOR} strokeWidth={4} strokeLinecap="round" />
		</g>
	);
}

export default function BmiChart({ bmi }: DashboardChartProps) {
	const status = getBmiStatus(bmi);

	return (
		<div className="bg-white border rounded-xl shadow-md p-6">
			<h2 className="text-xl font-semibold mb-2 text-center">체질량지수 (BMI)</h2>

			<div className="relative w-full max-w-[320px] mx-auto aspect-[320/180]">
				<PieChart width={320} height={180} className="absolute left-1/2 -translate-x-1/2 max-w-full h-auto">
					<Pie
						data={BMI_SEGMENTS}
						dataKey="value"
						cx={CX}
						cy={CY}
						innerRadius={INNER_RADIUS}
						outerRadius={OUTER_RADIUS}
						startAngle={180}
						endAngle={0}
						stroke="none"
						isAnimationActive={false}
					/>
				</PieChart>

				<svg
					className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[320px]"
					viewBox="0 0 320 180"
					preserveAspectRatio="xMidYMid meet"
				>
					<NeedleComponent bmi={bmi} />
				</svg>
			</div>

			<div className="text-center">
				<p className="text-4xl font-bold" style={{ color: status.color }}>
					{bmi.toFixed(1)}
				</p>
				<p className="text-base font-medium" style={{ color: status.color }}>
					{status.label}
				</p>
			</div>

			<div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-4 text-xs">
				{BMI_SEGMENTS.map((segment) => (
					<span key={segment.name} className="flex items-center gap-1">
						<span className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.fill }} />
						{segment.name}
					</span>
				))}
			</div>
		</div>
	);
}
