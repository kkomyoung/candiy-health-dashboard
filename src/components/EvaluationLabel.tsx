const bgColor = (text: string) => {
	switch (text) {
		case '정A':
		case '정B':
			return 'bg-green-600';
		case '주의':
		case '의심':
		case '고∙당':
			return 'bg-orange-500';
		case '유질':
			return 'bg-red-500';
		default:
			return 'bg-gray-500';
	}
};

const EvaluationLabel = ({ value }: { value: string }) => {
	return (
		<span className={`inline-flex px-3 py-0.5 text-white text-base font-semibold rounded-lg ${bgColor(value)}`}>
			{value}
		</span>
	);
};

export default EvaluationLabel;
