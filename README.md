# 수영구 세입·세출예산 운영정보공개

부산광역시 수영구의 자금운용, 세입, 예산 집행, 사업별 예산과 지출 정보를 조회하는 React 기반 반응형 웹 애플리케이션입니다.

현재 데이터는 UI 검토를 위한 로컬 fixture이며 실제 운영 API, 인증, 데이터베이스 연동은 포함되어 있지 않습니다.

## 구현 화면

| 경로 | 화면 | 주요 기능 |
| --- | --- | --- |
| `/` | 홈 | 세입·세출 요약, 빠른 서비스, 예산·결산 공시 |
| `/funds` | 자금운용현황 | 현재 예산 집행률 도넛, 월별 누계 추이, 기간 검색, 자금 내역 |
| `/income` | 세입정보 | 회계·기간 검색, 회계별 세입 집계 |
| `/budget-execution` | 예산집행현황 | 분야별 예산현액, 지출액, 집행 비율 |
| `/business-budget` | 사업및예산정보 | 사업 검색, 재원별 예산현액과 집행 내역 |
| `/expenditure` | 지출현황 | 부서·통계목·사업·기간별 지출 검색 |
| `/business-details` | 사업별세부설명 | 분야·사업기간 검색, 사업 목적과 총사업비 |
| `/notices` | 알림글 | 제목·작성자·내용·작성일자 검색, 첨부파일 목록 |

목록 화면은 공통적으로 다음 기능을 제공합니다.

- 검색 조건 적용 및 초기화
- 전체 결과 건수와 페이지당 표시 건수 선택
- 페이지네이션
- UTF-8 BOM이 포함된 CSV 다운로드
- 인쇄 버튼
- 모바일 검색 폼 재배치
- 열이 많은 표의 반응형 표시 및 필요한 경우 표 영역 가로 스크롤

## 기술 스택

- React 19
- TypeScript 5.7
- Vite 7
- Lucide React
- 컴포넌트 단위 일반 CSS

React Router는 사용하지 않습니다. `src/App.tsx`가 `window.location.pathname`을 기준으로 화면을 선택하며 각 페이지는 `React.lazy`로 지연 로딩됩니다.

## 실행 방법

```bash
npm install
npm run dev
```

프로덕션 빌드와 빌드 결과 미리보기:

```bash
npm run build
npm run preview
```

`npm run build`는 아래 작업을 순서대로 수행합니다.

1. `tsc --noEmit`: 타입, 미사용 변수 및 미사용 매개변수 검사
2. `vite build`: 프로덕션 번들 생성

현재 별도의 단위·통합 테스트 스크립트는 없습니다.

## 프로젝트 구조

```text
src/
├─ main.tsx                  # React 진입점
├─ App.tsx                   # 경로 매핑과 페이지 지연 로딩
└─ index.css                 # 전역 초기 스타일과 로딩 화면

components/suyeong/
├─ home/                     # 홈 화면과 재정 요약·서비스 카드
├─ funds/                    # 자금운용현황, 집행률 도넛·월별 누계 차트
├─ income/                   # 세입정보
├─ budget-execution/         # 예산집행현황
├─ business-budget/          # 사업및예산정보
├─ expenditure/              # 지출현황
├─ business-details/         # 사업별세부설명
├─ notices/                  # 공지사항 알림글
├─ shared/                   # 공통 레이아웃·검색·표·페이지네이션
├─ config/links.ts           # 내부 경로와 외부 서비스 URL
└─ utils/
   ├─ csv.ts                 # 공통 CSV 생성·다운로드
   ├─ currency.ts            # 숫자·원화 포맷
   └─ date.ts                # 날짜 입력 포맷
```

수영구 브랜드 이미지는 프로젝트 루트의 `수영구 아이콘.svg`를 사용합니다.

## 기능 폴더 구성

기능에 따라 필요한 파일만 두며 일반적인 구성은 다음과 같습니다.

```text
feature/
├─ index.ts                  # 지연 로딩용 기본 export
├─ FeaturePage.tsx           # 화면 조합
├─ FeatureSearch.tsx/css     # 기능 전용 검색 조건
├─ FeatureTable.tsx/css      # 기능 전용 표와 열 너비
├─ feature.data.ts           # fixture와 초기 검색 조건
├─ feature.types.ts          # 검색 조건·레코드 타입
├─ feature.csv.ts            # CSV 헤더와 행 매핑
└─ useFeature.ts             # 기능별 필터 정의
```

페이지 컴포넌트에 검색, 필터, 테이블 구현을 한 파일로 합치지 않습니다. 데이터 타입과 화면, 상태 로직, 스타일을 분리하여 API 교체와 열 수정의 영향을 제한합니다.

## 공통 모듈

### 목록 페이지

`shared/SuyeongListPage.tsx`가 다음 구조를 공통으로 제공합니다.

- Header
- Breadcrumb
- Page heading과 인쇄 버튼
- 결과 건수·표시 건수·CSV 다운로드 툴바
- Pagination
- Footer

각 기능 페이지에는 검색 컴포넌트, 테이블, 기능별 상태 연결만 남깁니다.

### 검색과 페이지 상태

- `shared/SuyeongFinancialSearch.tsx`: 회계연도·회계구분·기간을 사용하는 공통 검색 폼
- `shared/SuyeongQuickRangeButtons.tsx`: 일간·주간·월간·연간 빠른 기간 설정 버튼
- `shared/SuyeongSearchActions.tsx`: 초기화·조회 버튼
- `shared/SuyeongFinancialSearch.css`: 공통 재정 검색 조건의 그리드와 기간 입력 배치
- `shared/SuyeongSearch.css`: 검색 카드, 입력 요소, 빠른 기간·초기화·조회 버튼 공통 스타일
- `shared/usePaginatedSearch.ts`: 검색 조건 적용, 초기화, 필터링, 페이지 크기와 현재 페이지 관리

데스크톱에서는 빠른 기간 버튼을 종료일 입력 위에 같은 너비로 배치하고, 회계연도·회계구분·기간 입력의 기준선을 맞춥니다. 모바일에서는 버튼과 날짜 입력을 한 열로 재배치합니다.

기능별 훅은 레코드 필터 조건만 정의하고 공통 상태 로직은 `usePaginatedSearch`에 위임합니다.

### 표

- `shared/SuyeongDataTable.css`: 표 헤더, 본문, 경계선, 행 상태 공통 스타일
- 각 `*Table.css`: 기능별 열 너비, 정렬, 강조와 말줄임 처리

금액 열은 우측 정렬하고 `font-variant-numeric: tabular-nums`를 사용합니다. 사업명처럼 길이가 달라지는 텍스트 열은 기능별 CSS에서 말줄임 또는 두 줄 제한을 적용합니다.

### CSV

`utils/csv.ts`가 셀 이스케이프, UTF-8 BOM, Blob 생성과 다운로드를 담당합니다. 기능별 `*.csv.ts`에는 헤더와 레코드 매핑만 작성합니다.

## 데이터와 API 연결

현재 각 기능 폴더의 `*.data.ts`가 2026년 기준 fixture를 제공합니다. API를 연결할 때는 아래 순서를 권장합니다.

1. `*.types.ts`를 실제 응답 스키마에 맞게 조정
2. `*.data.ts`의 fixture 대신 API 클라이언트 또는 조회 함수 연결
3. `useFeature.ts`에서 로딩·오류·재시도 상태 처리
4. 서버 페이지네이션을 사용할 경우 `usePaginatedSearch` 대신 서버의 전체 건수와 페이지 정보를 연결
5. CSV를 서버에서 생성한다면 기능별 다운로드 함수만 API 호출로 교체

금액은 계산 과정에서 문자열로 변환하지 않고 `number`로 유지하며, 화면에 표시할 때만 `utils/currency.ts`를 사용합니다.

## 링크와 라우팅

내부 경로와 외부 서비스 URL은 `components/suyeong/config/links.ts`에서 관리합니다.

- 내부 페이지: `/funds`, `/income`과 같은 상대 경로
- 외부 서비스: 예산공시, 결산공시 URL

현재 내부 이동도 일반 `<a href>`를 사용하므로 페이지가 새로 로드됩니다. React Router를 도입할 경우 내부 링크만 `Link`로 교체하고 외부 URL은 앵커 요소로 유지합니다.

운영 서버는 `/business-budget` 같은 경로를 직접 요청해도 `index.html`을 반환하도록 SPA fallback을 설정해야 합니다.

## 스타일 관리 원칙

- 모든 프로젝트 전용 클래스는 `sy-` 접두사를 사용합니다.
- 공통 색상·간격·반경 토큰은 `shared/SuyeongLayout.css`의 `.sy-page`에서 관리합니다.
- 공통 레이아웃과 컨트롤 스타일은 `shared/`에 둡니다.
- 검색 조건과 열 배치처럼 기능에 종속된 스타일은 해당 기능 폴더에 둡니다.
- 데스크톱 콘텐츠 최대 폭은 `1440px`입니다.
- 모바일에서는 검색 조건을 한 열로 재배치하고 넓은 표는 표 컨테이너 안에서 처리합니다.
- `prefers-reduced-motion` 환경에서는 전환 효과를 최소화합니다.

## 접근성 적용 사항

- `본문 바로가기` 링크
- `header`, `main`, `nav`, `section`, `footer` 랜드마크
- 현재 메뉴와 페이지의 `aria-current`
- 모바일 메뉴의 `aria-expanded`, `aria-controls`, `aria-hidden`
- `Esc` 키로 모바일 메뉴 닫기 및 버튼으로 포커스 복귀
- 표의 `caption`, `scope`, 스크롤 영역 레이블
- 장식 아이콘의 `aria-hidden="true"`
- 키보드 탐색을 위한 `:focus-visible`
- 모션 감소 환경 지원

이 구현은 KRDS의 일관성·가독성·접근성 방향을 참고한 커스텀 UI이며 KRDS 공식 컴포넌트 키트를 직접 사용하지 않습니다. 배포 전에는 KWCAG 2.2 기준의 별도 수동·자동 검사가 필요합니다.

## 유지보수 원칙

- 새 페이지는 `SuyeongListPage`와 `SuyeongResultsSection`을 우선 사용합니다.
- 동일한 포맷·다운로드·페이지 상태 코드를 기능 폴더에 복사하지 않습니다.
- 새 CSS를 만들기 전에 `shared/`의 공통 클래스 사용 가능 여부를 확인합니다.
- 사용하지 않는 export, 파일과 CSS 클래스는 빌드 전 제거합니다.
- `npm run build`가 통과하지 않은 변경은 완료 상태로 취급하지 않습니다.
- 기존 fixture의 `TODO`는 실제 API 연결 후 제거합니다.

## 배포 전 확인 사항

- [ ] fixture를 실제 API 데이터로 교체
- [ ] 로딩·오류·빈 결과 상태 확정
- [ ] 기준일과 데이터 갱신 주기 표시
- [ ] 외부 URL과 운영기관 정보 검증
- [ ] SPA fallback 설정
- [ ] CSV 또는 엑셀 다운로드 정책 확정
- [ ] 키보드 전체 탐색 및 200% 확대 검사
- [ ] 색상 대비와 색상 비의존 정보 전달 검사
- [ ] 데스크톱·태블릿·모바일 회귀 테스트
- [ ] KWCAG 2.2 및 기관 웹 접근성 점검
- [ ] 개인정보처리방침과 웹 접근성 정책 링크 연결

## DB 서버 기준시각 연결

화면에서 사용하는 현재 기준일, 조회 종료일 초기값, 회계연도는 브라우저 시간이 아니라
`DatabaseTimeProvider`가 제공하는 DB 서버 기준시각을 사용합니다. DB 연결 전에는
`.env.example`의 mock 값으로 동일한 응답 계약을 확인할 수 있습니다.

백엔드 연결 시 환경값을 다음과 같이 변경합니다.

```env
VITE_DATABASE_TIME_SOURCE=api
VITE_DATABASE_TIME_ENDPOINT=/api/system/database-time
```

시간 API는 애플리케이션 서버 시간이 아니라 DB의 현재 날짜·시각 함수를 한 번의 쿼리에서
조회하고, 아래 형식으로 반환해야 합니다. `currentDate`를 별도로 반환하므로 사용자 브라우저의
시간대 변환으로 기준일이 달라지지 않습니다.

```json
{
  "currentDate": "2026-08-11",
  "currentDateTime": "2026-08-11T14:30:00+09:00"
}
```
