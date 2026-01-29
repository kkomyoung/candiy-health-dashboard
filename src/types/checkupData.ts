/** 건강검진 한눈에보기 항목 */
export interface CheckupOverview {
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

/** 건강검진 참고치 항목 */
export interface CheckupReference {
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

/** 건강검진 결과 항목 */
export interface CheckupResult {
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
export interface CheckupData {
	patientName: string;
	overviewList: CheckupOverview[];
	referenceList: CheckupReference[];
	resultList: CheckupResult[];
}