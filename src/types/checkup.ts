/** 한번에보기 아이템 */
export interface OverviewItem {
	checkupDate: string;
	height: string;
	weight: string;
	waists: string;
	BMI: string;
	vision: string;
	hearing: string;
	bloodPressure: string;
	proteinuria: string;
	hemoglobin: string;
	fastingBloodGlucose: string;
	totalCholesterol: string;
	HDLCholesterol: string;
	triglyceride: string;
	LDLCholesterol: string;
	serumCreatinine: string;
	GFR: string;
	AST: string;
	ALT: string;
	yGPT: string;
	chestXrayResult: string;
	osteoporosis: string;
	evaluation: string;
}

/** 참고치 아이템 */
export interface ReferenceItem {
	refType: string;
	height: string;
	weight: string;
	waists: string;
	BMI: string;
	vision: string;
	hearing: string;
	bloodPressure: string;
	proteinuria: string;
	hemoglobin: string;
	fastingBloodGlucose: string;
	totalCholesterol: string;
	HDLCholesterol: string;
	LDLCholesterol: string;
	triglyceride: string;
	serumCreatinine: string;
	GFR: string;
	AST: string;
	ALT: string;
	yGPT: string;
	chestXrayResult: string;
	osteoporosis: string;
}

/** 검진 결과 아이템 */
export interface ResultItem {
	caseType: number;
	checkupType: string;
	checkupDate: string;
	organizationName: string;
	pdfData?: string;
	questionnaire?: unknown[];
	infantsCheckupList?: unknown[];
	infantsDentalList?: unknown[];
}

/** 건강검진 전체 데이터 */
export interface NhisCheckupData {
	patientName: string;
	overviewList: OverviewItem[];
	referenceList: ReferenceItem[];
	resultList: ResultItem[];
}
