import ValueWithUnit from '@/components/ValueWithUnit.tsx';

const CheckupCard = ({ label, value, unit }: { label: string; value: string; unit: string }) => {
	return (
		<dl>
			<dt className="text-base">{label}</dt>
			<dd className="text-right">
				<ValueWithUnit value={value} unit={unit} />
			</dd>
		</dl>
	);
};

export default CheckupCard;
