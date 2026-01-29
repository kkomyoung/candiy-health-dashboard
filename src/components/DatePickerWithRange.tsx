import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldLabel } from '@/components/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

interface DatePickerWithRangeProps {
	startDate: Date;
	endDate: Date;
	setStartDate: (date: Date) => void;
	setEndDate: (date: Date) => void;
}

export function DatePickerWithRange({ startDate, endDate, setStartDate, setEndDate }: DatePickerWithRangeProps) {
	const today = new Date();
	const tenYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());

	const handleStartDateChange = (date: Date) => {
		setStartDate(date);
	};

	const handleEndDateChange = (date: Date) => {
		setEndDate(date);
	};

	return (
		<div className="flex flex-col md:flex-row items-end gap-4">
			<Field>
				<FieldLabel htmlFor="start-date" className="text-base">
					시작일
				</FieldLabel>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline" id="start-date" className="justify-start px-3 py-5 text-lg font-normal">
							<CalendarIcon className="w-4 h-4" />
							{startDate ? format(startDate, 'yyyy년 M월 d일', { locale: ko }) : <span>시작일 선택</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="single"
							captionLayout="dropdown"
							locale={ko}
							selected={startDate}
							onSelect={handleStartDateChange}
							defaultMonth={startDate}
							disabled={(date) => date > new Date() || date < tenYearsAgo || (endDate ? date > endDate : false)}
							required
						/>
					</PopoverContent>
				</Popover>
			</Field>
			<Field>
				<FieldLabel htmlFor="end-date" className="text-base">
					종료일
				</FieldLabel>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline" id="end-date" className="justify-start px-3 py-5 text-lg font-normal">
							<CalendarIcon className="w-4 h-4" />
							{endDate ? format(endDate, 'yyyy년 M월 d일', { locale: ko }) : <span>종료일 선택</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="single"
							captionLayout="dropdown"
							locale={ko}
							selected={endDate}
							onSelect={handleEndDateChange}
							defaultMonth={endDate}
							disabled={(date) => date > new Date() || date < tenYearsAgo || (startDate ? date < startDate : false)}
							required
						/>
					</PopoverContent>
				</Popover>
			</Field>
		</div>
	);
}
