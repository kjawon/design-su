# 성남시 계약정보포털 디자인

성남시 계약·입찰 정보를 보여주는 포털 화면 디자인입니다. 실제 계약 데이터나 서버 API에는 연결되어 있지 않으며, 화면 구성과 사용자 경험을 확인하기 위한 React 프로젝트입니다.

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
  portal-header.tsx    상단 메뉴
  portal-sections.tsx  메인 화면의 각 영역
  portal-data.ts       화면에 표시하는 예시 데이터
  chatbot.tsx          AI 도우미 디자인
  ui/                  버튼, 카드, 입력창 등 공통 UI
public/                브라우저 파비콘
```

## 화면 내용을 수정하려면

- 계약, 공지, 서비스 문구: `components/portal-data.ts`
- 상단 메뉴: `components/portal-header.tsx`
- 메인 화면 구성: `components/portal-sections.tsx`
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
