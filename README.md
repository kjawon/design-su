# 수영구 세입·세출예산 운영정보공개

부산광역시 수영구의 세입·세출, 예산·결산 공시와 주요 재정정보를 제공하는 반응형 메인 화면입니다.

## 실행

```bash
npm install
npm run dev
```

프로덕션 빌드는 아래 명령으로 확인할 수 있습니다.

```bash
npm run build
npm run preview
```

## 구조

- `components/suyeong/suyeong-home.tsx`: 메인 콘텐츠, 실제 서비스 링크와 일별 재정정보
- `components/suyeong/suyeong-header.tsx`: 데스크톱·모바일 내비게이션
- `components/suyeong/suyeong-home.css`: 수영구 전용 반응형 스타일
- `수영구 아이콘.svg`: 헤더, 푸터, 파비콘에서 사용하는 브랜드 자산

공식 `contract.suyeong.go.kr` 호스트에서 실행할 때는 기존 `/revtes/main/ajaxMainInfo.do` API를 호출해 일별 세입·세출 데이터를 갱신하며, 다른 개발 환경에서는 확인된 최신 데이터를 초기값으로 표시합니다.
