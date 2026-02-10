# Vite + React 웹 앱 with 모바일 네비게이션

Expo WebView에서 실행되는 모던한 모바일 웹 애플리케이션입니다.

## 🎨 주요 기능

### 📱 모바일 하단 네비게이션 바
- **홈**: 대시보드, 통계, 빠른 실행, 최근 활동
- **목록**: 검색, 필터, 카드 리스트 뷰
- **목록2**: 그리드 카테고리 뷰
- **설정**: 프로필, 앱 설정, 계정 관리

### ✨ 최신 디자인 트렌드
- 글래스모피즘 효과 (Glassmorphism)
- 그라데이션 배경
- 부드러운 애니메이션
- iOS/Android 네이티브 느낌
- 반응형 터치 인터랙션

### 🚀 기술 스택
- **Vite** - 빠른 개발 서버
- **React** - UI 라이브러리
- **Styled-Components** - CSS-in-JS (최적화 적용)
- **React Icons** - 아이콘 라이브러리

## 📂 프로젝트 구조

```
src/
├── components/
│   ├── MainLayout.jsx          # 메인 레이아웃 + 하단 네비게이션
│   └── MainLayout.styled.js    # 레이아웃 스타일
├── pages/
│   ├── HomePage.jsx            # 홈 페이지
│   ├── ListPage.jsx            # 목록 페이지
│   ├── List2Page.jsx           # 목록2 페이지 (그리드)
│   └── SettingsPage.jsx        # 설정 페이지
├── App.jsx                     # 메인 앱 (페이지 라우팅)
├── GlobalStyles.js             # 전역 스타일
└── main.jsx                    # 엔트리 포인트
```

## 🎯 디자인 특징

### 하단 네비게이션
```
- Backdrop blur 효과
- Active 상태 애니메이션
- 상단 인디케이터
- 아이콘 + 라벨 조합
- 터치 피드백
```

### 페이지별 특징

#### 홈
- 통계 카드 (2x2 그리드)
- 빠른 실행 버튼 (3x2 그리드)
- 최근 활동 리스트

#### 목록
- 검색 바
- 필터 탭 (가로 스크롤)
- 그라데이션 아이콘 카드
- 태그 시스템

#### 목록2
- 2열 그리드 레이아웃
- 다양한 그라데이션 테마
- 카운트 배지

#### 설정
- 프로필 섹션
- 토글 스위치
- 그룹화된 설정 항목
- 로그아웃 버튼

## 🚀 실행 방법

```bash
npm run dev
```

## 🎨 색상 팔레트

```css
Primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Pink: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
Blue: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)
Green: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)
Orange: linear-gradient(135deg, #fa709a 0%, #fee140 100%)
```

## 📱 반응형

- 모바일 퍼스트 디자인
- 안전 영역 (Safe Area) 지원
- 터치 최적화
- 스크롤 최적화

## 🔧 최적화

- Styled-Components Babel 플러그인
- CSS-in-JS 성능 최적화
- Tree shaking
- 코드 스플리팅

## 📚 문서

- `STYLED_COMPONENTS_COMPLETE_GUIDE.md` - Styled-Components 완벽 가이드
- `SERVERSTYLESHEET_EXPLANATION.md` - SSR 이슈 설명

## 🎉 결과

최신 모바일 앱 디자인 트렌드를 반영한 네이티브 앱 수준의 UX를 제공합니다!
