# 가평군청 계약정보포털 디자인

가평군청 계약·입찰 정보를 보여주는 포털 화면 디자인입니다. 실제 계약 데이터나 서버 API에는 연결되어 있지 않으며, 화면 구성과 사용자 경험을 확인하기 위한 React 프로젝트입니다.

## 사용 기술

- React 19
- Vite
- TypeScript
- Tailwind CSS 4
- Base UI
- Lucide 아이콘

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

## 폴더 구성

```text
src/
  main.tsx       React가 시작되는 파일
  App.tsx        전체 화면의 구성 순서
  index.css      공통 스타일과 색상 설정
components/
  portal-header.tsx       상단 메뉴
  intro-section.tsx       소개 및 검색 영역
  service-board.tsx       주요 서비스 영역
  portal-information.tsx  최근 계약과 자주 찾는 정보 영역
  portal-data.ts          화면에 표시하는 예시 데이터
  chatbot.tsx             AI 도우미 디자인
  ui/                     버튼, 배지, 입력창 등 공통 UI
public/                브라우저 파비콘
```

## 화면 내용을 수정하려면

- 최근 계약과 자주 찾는 정보 문구: `components/portal-data.ts`
- 상단 메뉴: `components/portal-header.tsx`
- 메인 화면 구성 순서: `src/App.tsx`
- 주요 서비스 카드: `components/service-board.tsx`
- 챗봇 화면: `components/chatbot.tsx`
- 색상과 전체 스타일: `src/index.css`

파일을 저장하면 실행 중인 브라우저 화면에 변경 내용이 자동으로 반영됩니다.

## 현재 구현 범위

현재 프로젝트는 디자인 확인용입니다.

- 검색창은 실제 검색을 수행하지 않습니다.
- 계약과 공지 내용은 예시 데이터입니다.
- 챗봇은 예시 답변만 표시합니다.
- 로그인, 음성 입력, 상세 페이지 이동은 연결되어 있지 않습니다.

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
