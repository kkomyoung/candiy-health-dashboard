# 건강검진 대시보드
url : https://candiy-health-dashboard-pearl.vercel.app

## 기술 스택

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Query (TanStack Query)
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

## 프로젝트 구조

```
  src/                                                                                                                                                                                                                             
  ├── components/        # 공통 컴포넌트 (특정 페이지에서만 사용되는 컴포넌트는 pages 하위에 위치함)                                                                                                                                                                               
  │   └── ui/            # shadcn UI 컴포넌트                                                                                                                                                                                      
  ├── constants/         # 상수 (라우트 포함)                                                                                                                                                                                
  ├── hooks/             # 커스텀 훅                                                                                                                                                                                               
  ├── layouts/           # 레이아웃 컴포넌트                                                                                                                                                                                       
  ├── lib/               # 라이브러리 유틸리티                                                                                                                                                                                     
  ├── pages/             # 페이지 컴포넌트                                                                                                                                                                                         
  │   ├── Home/          # 홈 (본인인증 폼)                                                                                                                                                                                               
  │   ├── Dashboard/     # 대시보드                                                                                                                                                                                                
  │   ├── History/       # 검진 이력                                                                                                                                                                                               
  │   └── Login/         # 로그인                                                                                                                                                                                                  
  ├── router/            # 라우터 설정                                                                                                                                                                                             
  ├── services/          # API 호출                                                                                                                                                                                                
  ├── types/             # TypeScript 타입 정의                                                                                                                                                                                    
  └── utils/             # 유틸리티 함수  
```

## 주요 기능
- 간편인증을 통한 건강검진 데이터 조회
- 최근 건강검진 결과 대시보드
- 날짜별 건강검진 이력 조회


## 참고 레퍼런스
- [shadcn/ui](https://ui.shadcn.com/docs/components) : 폼 요소 구현시 활용
- [Recharts](https://recharts.github.io/en-US/examples/PieChartWithNeedle/) : BMI 차트 구현시 활용
- 건강보험공단 앱 : 검진 결과 화면 참고


## 강조하고 싶은 부분
- 건강검진 데이터를 초기 세션스토리지 저장 방식에서 React Query 캐시로 변경
    - 민감한 의료 정보 특성을 고려하여 브라우저 스토리지 저장 지양
    - React Query로 SPA 내 페이지 이동 시 데이터 유지
    - 탭 종료 시 자동 삭제되어 보안성 향상
- 본인인증 대기 중 타이머 및 로딩 스피너 구현으로 인증 진행 상태 시각화
- 데이터 부재 시나리오별 예외 처리 화면 구현 (검진 이력 없음, 상세 내역 없음 등)

## 보완하고 싶은 부분
- 전역에서 재사용 가능한 모달 컴포넌트를 제작하여 기존 브라우저의 confirm/alert을 대체하고 디자인 일관성을 확보
- AuthModal.tsx 내 에러 처리 로직을 유틸 함수로 분리하여 컴포넌트 책임 단순화

## 추후 개선 사항
- 연도별 검진 수치 비교 차트 구현
  - 현재 대시보드는 특정 날짜 검진 결과만 표시하여 연속된 검진 수치를 한눈에 비교할 수 있는 차트 구현이 불가
- 검진 이력 클릭 시 상세 결과 화면 추가
  - 사용자가 특정 검진 항목을 클릭하면 세부 항목까지 확인 할 수 있게 하여 사용성 개선