import { useAuth } from '@/hooks/useAuth.ts';
import { SearchIcon } from 'lucide-react';

export default function Home() {
	const { getUser } = useAuth();

	return (
		<div>
			<section className="pt-12 flex flex-col items-center mb-12">
				<div className="text-center mb-6">
					<h2 className="text-4xl font-bold mb-3">안녕하세요 {getUser()?.name}님!</h2>
					<p className="text-lg text-gray-600">개인정보를 입력하고 건강검진 결과를 조회해보세요</p>
				</div>
				<button className="shadow-lg flex items-center justify-between bg-rose-500 text-white px-10 py-4 rounded-xl gap-2 text-xl font-semibold cursor-pointer">
					<SearchIcon className="w-6" />
					건강검진 조회하기
				</button>
			</section>
		</div>
	);
}
