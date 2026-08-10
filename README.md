# 수영구 세입·세출예산 운영정보공개

부산광역시 수영구의 세입·세출 현황과 주요 재정 서비스를 보여주는 반응형 메인 페이지입니다. 현재 단계에서는 실제 API 대신 화면 검토용 Mock 데이터를 사용합니다.

## 실행 방법

```bash
npm install
npm run dev
```

프로덕션 빌드와 빌드 결과 확인은 다음 명령으로 실행합니다.

```bash
npm run build
npm run preview
```

## 프로젝트 구조

```text
components/suyeong/
├─ suyeong-home.tsx                    # 메인 페이지 섹션 조합
├─ suyeong-home.css                    # 공통 토큰, 기본 스타일, Hero 스타일
├─ suyeong-header.tsx                  # 데스크톱·모바일 헤더
├─ suyeong-header.css                  # 헤더 전용 스타일
├─ suyeong-footer.tsx                  # 사이트 정보 Footer
├─ suyeong-footer.css                  # Footer 전용 스타일
├─ suyeong-finance-summary.tsx         # 누적 재정현황 조합
├─ suyeong-finance-card.tsx            # 세입·세출 요약 카드
├─ suyeong-daily-finance-ticker.tsx    # 최근 일별 현황 슬라이드
├─ suyeong-finance-summary.css         # 재정현황 전용 스타일
├─ suyeong-services.tsx                # 주요 서비스 영역 조합
├─ suyeong-main-services-card.tsx      # 자주 찾는 6개 서비스
├─ suyeong-disclosure-card.tsx         # 예산·결산 공시 공통 카드
├─ suyeong-services.css                # 서비스 전용 스타일
├─ suyeong-data.ts                     # 화면 검토용 재정 Mock 데이터와 타입
├─ suyeong-links.ts                    # 내부 시스템·재정공시 링크 통합 관리
└─ suyeong-formatters.ts               # 원화 금액 표시 유틸리티
```

애플리케이션 진입점은 `src/main.tsx`, 최상위 React 컴포넌트는 `src/App.tsx`입니다. 수영구 브랜드 이미지는 루트의 `수영구 아이콘.svg`를 사용합니다.

## 데이터와 링크 수정

- 누적 세입·세출과 최근 일별 현황은 `suyeong-data.ts`의 Mock 데이터에서 관리합니다.
- 운영 시스템과 재정공시 링크는 `suyeong-links.ts`에서 한 번에 관리합니다.
- 실제 API를 연결할 때는 컴포넌트 마크업을 변경하지 않고 `suyeong-data.ts`를 대체하는 데이터 계층을 연결하면 됩니다.

## 스타일 관리 원칙

- 공통 색상·간격 토큰과 Hero 스타일은 `suyeong-home.css`에서 관리합니다.
- Header, 재정현황, 주요 서비스, Footer 스타일은 각 컴포넌트 전용 CSS에 둡니다.
- 모든 컴포넌트는 `sy-` 접두사를 사용해 전역 스타일 충돌을 방지합니다.
- 반응형 규칙은 해당 컴포넌트의 CSS 파일 안에서 함께 관리합니다.

## 개발 참고

- `npm run build`는 TypeScript 타입 검사 후 Vite 프로덕션 빌드를 실행합니다.
- Chrome 화면 테스트 프로필은 프로젝트 폴더 밖의 시스템 임시 디렉터리를 사용합니다.
- 실수로 생성된 `.chrome-*` 폴더는 Git과 Vite 파일 감시 대상에서 제외됩니다.
