# 수영구 세입·세출예산 운영정보공개

부산광역시 수영구의 누적 세입·세출 현황, 최신 일자별 금액, 빠른 재정 서비스와 예산·결산 공시 링크를 제공하는 반응형 메인 페이지입니다.

현재 구현은 화면 검토용 Mock 데이터를 사용합니다. 실제 운영 API, 라우터, 인증 또는 공시 시스템과의 연동은 포함되어 있지 않습니다.

## 주요 화면 구성

1. **공통 헤더**
   - 수영구 및 서비스 식별 정보
   - 데스크톱 주요 메뉴
   - 모바일 메뉴 버튼과 `Esc` 닫기 지원
   - 키보드 사용자를 위한 `본문 바로가기` 링크
2. **재정정보 Hero**
   - 서비스 소개 문구
   - 누적 세입·세출 총액
   - 최신 일자의 세입·세출 금액
   - 세입·세출 상세 페이지 링크
3. **빠른 서비스**
   - 자금운용현황
   - 세입정보
   - 예산집행현황
   - 사업및예산정보
   - 지출현황
   - 사업별세부설명
4. **재정공시**
   - 예산공시
   - 결산공시
5. **공통 푸터**
   - 운영기관 식별 정보
   - 주소, 대표전화, 저작권 정보

데스크톱 첫 화면은 `헤더 → 재정정보 Hero → 빠른 서비스` 순서로 구성됩니다. 예산·결산 공시는 다음 섹션에 배치되며, 모바일에서는 콘텐츠가 잘리지 않도록 고정 화면 높이를 사용하지 않습니다.

## 기술 스택

- React 19
- TypeScript 5.7
- Vite 7
- Lucide React
- 컴포넌트 단위 일반 CSS

## 실행 방법

의존성을 설치하고 개발 서버를 실행합니다.

```bash
npm install
npm run dev
```

프로덕션 빌드와 빌드 결과 미리보기는 다음 명령을 사용합니다.

```bash
npm run build
npm run preview
```

`npm run build`는 TypeScript 타입 검사(`tsc --noEmit`)와 Vite 프로덕션 빌드를 순서대로 수행합니다.

## 프로젝트 구조

```text
src/
├─ main.tsx                            # React 애플리케이션 진입점
├─ App.tsx                             # 최상위 애플리케이션 컴포넌트
└─ index.css                           # 전역 초기 스타일

components/suyeong/
├─ suyeong-home.tsx                    # 전체 페이지와 첫 화면 섹션 조합
├─ suyeong-home.css                    # 공통 토큰, 레이아웃, Hero 스타일
├─ suyeong-header.tsx                  # 데스크톱·모바일 헤더
├─ suyeong-header.css                  # 헤더 및 모바일 메뉴 스타일
├─ suyeong-footer.tsx                  # 운영기관 정보 푸터
├─ suyeong-footer.css                  # 푸터 스타일
├─ suyeong-finance-summary.tsx         # 세입·세출 데이터 조합
├─ suyeong-finance-card.tsx            # 세입·세출 공통 카드
├─ suyeong-finance-summary.css         # 재정 카드 및 요약 영역 스타일
├─ suyeong-services.tsx                # 빠른 서비스·재정공시 조합
├─ suyeong-main-services-card.tsx      # 6개 빠른 서비스 메뉴
├─ suyeong-disclosure-card.tsx         # 예산·결산 공시 공통 카드
├─ suyeong-services.css                # 빠른 서비스·공시 영역 스타일
├─ suyeong-data.ts                     # Mock 재정 데이터와 타입
├─ suyeong-links.ts                    # 메뉴·공시 URL 통합 관리
├─ suyeong-formatters.ts               # 원화 금액 표시 유틸리티
└─ suyeong-daily-finance-ticker.tsx    # 현재 화면에서 사용하지 않는 일별 현황 컴포넌트
```

수영구 브랜드 이미지는 프로젝트 루트의 `수영구 아이콘.svg`를 사용합니다.

## 데이터 관리

### 누적 재정정보

`suyeong-data.ts`의 `cumulativeFinanceSnapshot`에서 관리합니다.

```ts
export const cumulativeFinanceSnapshot = {
  referenceDate: "2026.08.09",
  budget: 699_960_898_560,
  income: 420_183_759_670,
  expense: 367_707_320_700,
  balance: 52_476_438_970,
}
```

### 최신 일자별 정보

`dailyFinanceRecords`의 첫 번째 항목을 메인 화면의 최신 세입·세출 금액으로 사용합니다. API 연결 시에는 배열 순서에 의존하지 않고 기준일로 정렬하거나 서버 응답에 최신 항목을 명시하는 방식으로 교체해야 합니다.

### 금액 표시

`formatKoreanCurrency()`는 원 단위 숫자를 `억`, `만원` 단위의 한국어 금액으로 변환합니다. 전체 원 단위 값은 요소의 `title` 속성으로도 제공합니다.

## 링크 관리

모든 메뉴와 공시 URL은 `suyeong-links.ts`에서 통합 관리합니다. 링크를 변경할 때 개별 컴포넌트가 아니라 이 파일의 값만 수정합니다.

현재 컴포넌트는 일반 `<a href>` 기반입니다. React Router를 도입할 경우 내부 링크는 라우터의 Link 컴포넌트로 교체하되, 외부 시스템 링크는 앵커 요소로 유지합니다.

## 스타일 관리 원칙

- 모든 페이지 전용 클래스는 `sy-` 접두사를 사용합니다.
- 공통 색상, 간격, 반경 토큰은 `suyeong-home.css`의 `.sy-page`에서 관리합니다.
- Header, 재정현황, 서비스, Footer 스타일은 각 컴포넌트 CSS에 둡니다.
- 데스크톱 콘텐츠 최대 폭은 `1440px`, 주요 재정 콘텐츠 최대 폭은 `1400px`입니다.
- 세입은 Blue, 세출은 Orange 계열을 사용하되 텍스트 레이블을 함께 제공하여 색상에만 의존하지 않습니다.
- 모바일에서는 재정 카드와 공시 카드를 1열로 전환하고 빠른 서비스는 3열 그리드로 제공합니다.
- `prefers-reduced-motion` 환경에서는 불필요한 전환 시간을 최소화합니다.

## KRDS 적용 방향

[KRDS(대한민국 정부 디자인 시스템)](https://www.krds.go.kr/html/site/utility/utility_01.html)는 디지털 정부 서비스의 편의성, 일관성, 접근성과 사용성을 높이기 위한 원칙, 스타일, 컴포넌트, 패턴 및 도구를 제공합니다.

이 프로젝트는 **KRDS 공식 HTML Component Kit이나 공식 디자인 토큰을 직접 설치한 구현은 아닙니다.** 수영구 브랜드와 재정정보 과업에 맞춘 커스텀 React UI이며, 다음 KRDS 원칙과 가이드를 설계·개발 기준으로 참고합니다.

| KRDS 기준 | 현재 구현 | 추가 검증 또는 개선 항목 |
| --- | --- | --- |
| 사용자 중심의 서비스 | 첫 화면에서 핵심 세입·세출 금액과 주요 진입 메뉴를 우선 제공 | 실제 사용자 과업 테스트 및 메뉴 우선순위 검증 |
| 모든 사용자를 포용하는 서비스 | 본문 건너뛰기, 시맨틱 랜드마크, 키보드 메뉴, 대체 텍스트, 포커스 표시 제공 | KWCAG 2.2 기반 수동·자동 접근성 검사 |
| 공통 경험과 기관 특성의 조화 | 공공서비스형 Header·Footer 구조와 수영구 브랜드 색상 병행 | KRDS 확장형 스타일 세부 규칙 대조 |
| 빠르고 간단한 서비스 | 6개 빠른 서비스와 공시 링크를 직접 노출 | 실제 방문 통계를 통한 항목 재정렬 |
| 쉽게 이해하고 사용할 수 있는 서비스 | 금액을 `억/만원`으로 변환하고 세입·세출을 텍스트로 구분 | 용어 이해도 및 숫자 읽기 테스트 |
| 신뢰할 수 있는 서비스 | 운영기관 로고·연락처를 Header와 Footer에 표시 | 실 API 기준일, 갱신 주기, 데이터 출처 명시 |
| 일관된 스타일 | `sy-` 클래스와 CSS 사용자 정의 속성으로 색상·간격 관리 | 공식 KRDS primitive/semantic/component token 구조로 매핑 |

### KRDS 스타일 참고 범위

KRDS의 [디자인 스타일](https://www.krds.go.kr/html/site/style/style_01.html)은 색상, 타이포그래피, 형태, 레이아웃, 아이콘, 엘리베이션과 디자인 토큰을 주요 관리 범위로 정의합니다. 이 프로젝트에서는 다음 항목을 우선 점검합니다.

- 색상: 본문·배경·경계선·포커스 링의 명도 대비
- 타이포그래피: 정보 위계, 가독성, 글자 확대 시 레이아웃 유지
- 레이아웃: 넓은 화면과 모바일의 그리드 전환, 콘텐츠 순서 유지
- 아이콘: 장식 아이콘의 `aria-hidden`, 의미 있는 이미지의 대체 텍스트
- 엘리베이션: 그림자보다 경계선과 배경색을 우선 사용
- 디자인 토큰: 반복 색상·간격·반경 값을 CSS 변수로 중앙 관리

현재 스타일에는 `px` 단위가 다수 남아 있습니다. KRDS 정합성을 강화할 때는 타이포그래피를 `rem` 기반으로 전환하고, 색상·간격·반경을 공식 토큰 체계에 맞춰 단계적으로 매핑해야 합니다.

### 접근성 적용 현황

- 최상단 `본문 바로가기` 링크 제공
- `header`, `main`, `nav`, `article`, `footer` 랜드마크 사용
- 모바일 메뉴의 `aria-expanded`, `aria-controls`, `aria-hidden` 상태 제공
- 모바일 메뉴에서 `Esc` 입력 시 닫기 및 메뉴 버튼으로 포커스 복귀
- 장식용 아이콘에 `aria-hidden="true"` 적용
- 로고 및 운영기관 이미지에 용도에 맞는 대체 텍스트 제공
- 키보드 포커스에 `:focus-visible` 스타일 제공
- 메뉴와 공시 이동에는 링크 요소 사용
- 모바일 메뉴가 닫혔을 때 내부 링크를 탭 순서에서 제외

KRDS는 접근성 구현을 지원하지만, KRDS를 참고했다는 사실만으로 접근성 준수가 자동 보장되지는 않습니다. 배포 전 [KRDS 디지털 포용 및 접근성 안내](https://www.krds.go.kr/html/site/utility/utility_04.html)와 KWCAG 2.2를 기준으로 별도 검증해야 합니다.

## 배포 전 확인 사항

- [ ] Mock 데이터를 실제 API 데이터로 교체
- [ ] 최신 데이터의 기준일과 갱신 주기 표시 정책 확정
- [ ] 모든 내부·외부 링크의 실제 목적지 검증
- [ ] 키보드만으로 전체 메뉴와 링크 이용 가능 여부 확인
- [ ] 200% 이상 글자 확대 및 브라우저 확대 테스트
- [ ] 색상 대비 및 색상 비의존 정보 전달 확인
- [ ] 데스크톱·태블릿·모바일 주요 브레이크포인트 테스트
- [ ] KWCAG 2.2 및 기관 웹 접근성 점검 수행
- [ ] 실 운영기관 주소, 전화번호, 저작권 문구 확인
- [ ] 실제 개인정보처리방침·웹 접근성 정책 링크 연결 검토

## KRDS 공식 참고 자료

- [KRDS 소개](https://www.krds.go.kr/html/site/utility/utility_01.html)
- [KRDS 시작하기](https://www.krds.go.kr/html/site/outline/outline_01.html)
- [KRDS 디자인 원칙](https://www.krds.go.kr/html/site/utility/utility_02.html)
- [KRDS 디자인 스타일](https://www.krds.go.kr/html/site/style/style_01.html)
- [KRDS 디지털 포용](https://www.krds.go.kr/html/site/utility/utility_04.html)

## 개발 참고

- Chrome 화면 검증용 프로필은 프로젝트 밖의 시스템 임시 디렉터리를 사용합니다.
- 실수로 생성된 `.chrome-*` 폴더는 Git과 Vite 파일 감시 대상에서 제외합니다.
- 현재 화면에서 사용하지 않는 컴포넌트를 다시 연결할 때는 데이터 중복 노출과 접근성 상태를 먼저 확인합니다.
