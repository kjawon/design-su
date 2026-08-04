# 가평군청 계약정보포털 디자인

가평군청 계약·입찰·대금지급 정보를 보여주는 포털 화면 디자인입니다. 실제 행정 데이터나 서버 API에는 연결되어 있지 않으며, 화면 구성과 사용자 경험을 확인하기 위한 React 프로젝트입니다.

## 사용 기술

| 기술 | 기본 역할 | 이 프로젝트에서의 사용 예시 |
| --- | --- | --- |
| React 19 | 화면을 재사용 가능한 컴포넌트 단위로 만들고, 사용자 입력이나 상태 변화에 따라 필요한 부분을 다시 렌더링합니다. | 헤더, 검색 패널, 사이드바, 목록, 상세 카드, 챗봇 등을 컴포넌트로 분리했습니다. 검색 조건, 현재 페이지, 상세검색 열림 여부와 같은 화면 상태도 React로 관리합니다. |
| Vite | 개발 서버를 실행하고 TypeScript·React 코드를 브라우저가 사용할 수 있는 파일로 변환합니다. 개발 중에는 빠른 새로고침을 제공하고, 배포 시에는 파일을 최적화해 `dist/` 폴더에 생성합니다. | `npm run dev`로 개발 화면을 실행하고, `npm run build`로 배포용 결과물을 만듭니다. `vite.config.ts`에서 React 플러그인과 `@` 경로 별칭도 설정합니다. |
| TypeScript | JavaScript에 데이터 타입 검사를 추가해 잘못된 속성이나 함수 사용을 개발 단계에서 발견하도록 돕습니다. | `ContractRecord`, `PaymentRecord`, 검색 조건, 페이지 설정, 컴포넌트 props의 구조를 타입으로 정의합니다. 예를 들어 지급 데이터에 필요한 금액이나 관서명 필드가 빠지면 빌드 전에 오류를 확인할 수 있습니다. |
| Tailwind CSS 4 | 미리 정의된 유틸리티 클래스를 JSX에 조합해 레이아웃, 간격, 글자, 색상, 반응형 화면을 빠르게 구성합니다. | 메인 화면, 헤더, 서비스 카드, 푸터와 공통 UI의 배치 및 반응형 스타일에 사용합니다. 색상과 디자인 토큰은 `src/index.css`의 `@theme`과 CSS 변수로 관리합니다. |
| Base UI | 접근성을 고려한 상태 관리와 동작을 제공하는 헤드리스 UI 컴포넌트 기반입니다. 디자인을 강제하지 않기 때문에 프로젝트 스타일을 입혀 사용할 수 있습니다. | 공통 UI 컴포넌트를 확장할 수 있는 기반 의존성으로 포함되어 있습니다. 현재 화면은 자체 버튼·입력 컴포넌트와 기본 HTML 요소를 주로 사용하며, 향후 팝업·선택 메뉴 같은 복잡한 UI를 추가할 때 활용할 수 있습니다. |
| Lucide 아이콘 | 일관된 선 형태의 SVG 아이콘을 React 컴포넌트로 제공합니다. 이미지 파일을 각각 관리하지 않고 크기, 색상, 선 굵기를 코드에서 조정할 수 있습니다. | 검색, 초기화, 다운로드, 인쇄, 달력, 메뉴 열기·닫기, 페이지 이동 아이콘에 사용합니다. 장식용 아이콘에는 `aria-hidden`을 적용해 스크린리더가 불필요하게 읽지 않도록 처리합니다. |

기술별로 역할이 나뉘지만 실제 개발에서는 함께 동작합니다. 예를 들어 대금지급 검색 화면은 React가 입력 상태를 관리하고, TypeScript가 데이터 구조를 검사하며, Tailwind CSS와 전용 CSS가 화면 모양을 담당합니다. Vite는 이 코드를 개발 서버에서 실행하거나 배포 파일로 변환하고, Lucide는 검색 버튼과 달력 등의 아이콘을 제공합니다.

## 처음 실행하기

Node.js가 설치되어 있다면 PowerShell에서 프로젝트 폴더로 이동한 뒤 아래 명령어를 실행하세요.

```powershell
npm install
npm run dev
```

터미널에 표시되는 주소(기본값 `http://localhost:5173`)를 브라우저에서 열면 화면을 확인할 수 있습니다.

개발 서버를 종료하려면 터미널에서 `Ctrl + C`를 누르세요.

## 자주 사용하는 명령어

```powershell
# 개발 화면 실행
npm run dev

# 배포용 파일 생성
npm run build

# 생성한 배포용 화면 미리보기
npm run preview
```

## 주요 화면 경로

개발 서버를 실행한 뒤 다음 경로에서 주요 화면을 확인할 수 있습니다.

| 화면 | 경로 |
| --- | --- |
| 메인 | `/` |
| 일반회계 계약현황 | `/contract/status` |
| 수의계약현황 | `/contract/private` |
| 계약 상세 예시 | `/contract/status/4352` |
| 일반회계 대금지급현황 | `/payment/status` |
| 대금지급 상세 예시 | `/payment/status/32897` |
| 일반회계 대금지급예고 | `/payment/notice` |
| 특별회계 대금지급현황 | `/payment/special/status` |
| 특별회계 대금지급예고 | `/payment/special/notice` |

라우팅 라이브러리 없이 `src/App.tsx`에서 현재 `pathname`을 기준으로 화면을 분기합니다.

## 폴더 구성

```text
src/
  main.tsx                  React가 시작되는 파일
  App.tsx                   pathname 기반 화면 분기
  index.css                 공통 스타일과 색상 설정
components/
  contract/                 계약 페이지 기능
    contract-page.tsx       공통 계약 페이지 조립
    contract-page-config.ts 계약 페이지 경로와 설정
    contract-detail-page.tsx
    contract-detail-content.tsx
    contract-types.ts       계약 데이터 타입
    contract-mock-data.ts   임시 계약·준공검사 데이터
    contract-search-panel.tsx
    contract-sidebar.tsx
    contract-table.tsx
    completion-table.tsx
    styles/contract.css     계약 페이지 전용 스타일
    styles/contract-detail.css
  payment/                  대금지급 페이지 기능
    payment-page.tsx        대금지급 목록 화면 조립
    payment-page-config.ts  일반·특별회계 경로와 메뉴 설정
    payment-detail-page.tsx 대금지급 상세 화면 조립
    payment-detail-content.tsx
    payment-types.ts        대금지급 데이터 타입
    payment-mock-data.ts    원본 화면 기준 임시 데이터
    payment-search-panel.tsx
    payment-sidebar.tsx
    payment-table.tsx
    styles/payment.css      대금지급 전용 스타일
  navigation/               전역 내비게이션
    portal-header.tsx
    global-menu-data.ts
  intro-section.tsx         소개 및 검색 영역
  service-board.tsx         주요 서비스 영역
  portal-information.tsx    최근 계약과 자주 찾는 정보 영역
  portal-data.ts            메인 화면 예시 데이터
  chatbot.tsx               AI 도우미 디자인
  ui/                       버튼, 배지, 입력창 등 공통 UI
public/                      브라우저 파비콘
```

## 화면 내용을 수정하려면

- 최근 계약과 자주 찾는 정보 문구: `components/portal-data.ts`
- 상단 메뉴: `components/navigation/global-menu-data.ts`
- 계약 페이지 설정과 경로: `components/contract/contract-page-config.ts`
- 계약 페이지 임시 데이터: `components/contract/contract-mock-data.ts`
- 계약 페이지 스타일: `components/contract/styles/contract.css`
- 대금지급 페이지 설정과 경로: `components/payment/payment-page-config.ts`
- 대금지급 페이지 임시 데이터: `components/payment/payment-mock-data.ts`
- 대금지급 목록·상세 스타일: `components/payment/styles/payment.css`
- 메인 화면 구성 순서: `src/App.tsx`
- 주요 서비스 카드: `components/service-board.tsx`
- 챗봇 화면: `components/chatbot.tsx`
- 색상과 전체 스타일: `src/index.css`

파일을 저장하면 실행 중인 브라우저 화면에 변경 내용이 자동으로 반영됩니다.

## 현재 구현 범위

현재 프로젝트는 디자인 확인용이며 계약 및 대금지급 페이지는 로컬 mock 데이터를 사용합니다.

- 메인 검색창은 실제 검색을 수행하지 않습니다.
- 계약 페이지 검색은 현재 로컬 mock 데이터만 필터링합니다.
- 대금지급현황은 관서구분, 계약명, 계약금액, 계약일자로 로컬 데이터를 필터링합니다.
- 계약명 선택 시 계약 상세 또는 대금지급 상세 화면으로 이동합니다.
- 대금지급 상세 화면은 계약 상세 화면의 공통 디자인을 사용하고, 원본 대금지급 화면의 항목 구성과 예시 값을 표시합니다.
- 목록 개수 변경, 페이지네이션, 초기화, 엑셀 다운로드와 인쇄 UI를 확인할 수 있습니다.
- 대금지급예고 화면은 경로와 메뉴가 연결되어 있으며 현재 빈 결과 상태입니다.
- 계약과 공지 내용은 예시 데이터입니다.
- 챗봇은 예시 답변만 표시합니다.
- 로그인, 음성 입력, 실제 파일 서버 및 백엔드 저장 기능은 연결되어 있지 않습니다.

실제 서비스로 확장하려면 별도의 API, 데이터베이스, 로그인 기능을 연결해야 합니다.

## KRDS v0.4 접근성 체크리스트

메인 화면은 대한민국 디지털 정부서비스 UI/UX 가이드라인(KRDS v0.4)의 구조와 상호작용 원칙을 기준으로 다음 항목을 반영합니다.

- [x] 키보드로 접근 가능한 `본문 바로가기` 링크 제공
- [x] `header`, `nav`, `main`, `section`, `footer` 랜드마크와 제목 계층 적용
- [x] 데스크톱 주요 메뉴 및 `aria-expanded`, `aria-controls`를 사용하는 모바일 메뉴 제공
- [x] 검색 입력에 명시적인 `label`, 검색 폼 역할, 44px 이상 검색 버튼 적용
- [x] 동작 요소는 `button`, 화면 이동 요소는 `a` 요소로 구분
- [x] 서비스 카드의 중첩 링크 제거 및 링크 목적을 구체적인 문구로 제공
- [x] 최근 계약정보를 유형 → 계약명 → 계약금액 → 계약일 순서의 구조화 목록으로 제공
- [x] 데이터가 비어 있을 때 `-` 대체값 제공
- [x] 장식 아이콘에 `aria-hidden` 적용 및 링크 터치 영역 44px 이상 확보
- [x] 공통 `focus-visible` 표시와 hover/focus 동등 피드백 적용
- [x] AI drawer 열림 시 입력창으로 포커스 이동, ESC 닫기, 닫힌 뒤 실행 버튼으로 포커스 복귀
- [x] `prefers-reduced-motion` 환경에서 AI 버튼 부유 애니메이션 비활성화
- [x] 본문 텍스트와 인터랙션 색상은 WCAG AA 대비를 고려한 짙은 색상 토큰 사용

검수 시에는 키보드 Tab/Shift+Tab/Enter/Escape 탐색, 200% 확대, 모바일 메뉴, 스크린리더의 링크 목적 안내를 함께 확인합니다.
