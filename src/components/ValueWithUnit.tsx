const ValueWithUnit = ({ value, unit }: { value?: string | null; unit: string }) => {
	return value ? (
		<span className="text-xl">
			{value}
			{unit}
		</span>
	) : (
		<span className="inline-flex text-base bg-gray-200 rounded-full px-3 py-0.5">정보없음</span>
	);
};

export default ValueWithUnit;
