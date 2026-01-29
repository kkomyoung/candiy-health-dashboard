# 건강검진 대시보드

## 기술 스택

- React 19
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- React Router
- shadcn ui

## 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
npm install
```

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 변수를 설정하세요:

```
VITE_API_KEY=your_api_key_here
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

### 빌드

```bash
npm run build
```

### 빌드 결과 미리보기

```bash
npm run preview
```

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 검사 |
| `npm run lint:fix` | ESLint 자동 수정 |
| `npm run format` | Prettier 포맷팅 |

## 주요 기능

- 간편인증을 통한 건강검진 데이터 조회
- 최근 건강검진 결과 대시보드 (BMI 차트 시각화)
- 날짜별 건강검진 이력 조회

## 프로젝트 구조

src/                                                                                                                                                                                                                             
├── components/     # 공통 컴포넌트                                                                                                                                                                                              
├── constants/      # 상수 (라우트, 인증 옵션)                                                                                                                                                                                   
├── hooks/          # 커스텀 훅                                                                                                                                                                                                  
├── layouts/        # 레이아웃 컴포넌트                                                                                                                                                                                          
├── pages/          # 페이지 컴포넌트                                                                                                                                                                                            
├── router/         # 라우터 설정                                                                                                                                                                                                
├── services/       # API 호출                                                                                                                                                                                                   
├── types/          # TypeScript 타입 정의                                                                                                                                                                                       
└── utils/          # 유틸리티 함수


