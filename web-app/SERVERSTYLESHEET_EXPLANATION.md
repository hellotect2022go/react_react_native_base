# ServerStyleSheet API 상세 설명

## 🔥 문제 상황: SSR에서 왜 문제가 생기나?

### 일반적인 CSR 방식 (우리 프로젝트)
```
1. 브라우저가 빈 HTML 받음
   <div id="root"></div>

2. JavaScript 다운로드 & 실행

3. React 컴포넌트 렌더링하면서 styled-components가:
   - 스타일 생성
   - <style> 태그를 <head>에 삽입
   - 클래스명을 컴포넌트에 적용

4. 화면 표시 (스타일 적용됨)
```

**문제 없음!** 브라우저에서 처음부터 끝까지 다 처리하므로 순서가 보장됨.

---

### SSR 방식 (Next.js)의 문제

```
서버:
1. React 컴포넌트 렌더링
   const html = renderToString(<App />)
   
2. HTML 생성:
   <div class="sc-abc123">Hello</div>
   
3. 하지만! styled-components는 브라우저 API를 사용함
   - document.createElement('style') ❌ 서버엔 없음!
   - document.head.appendChild() ❌ 서버엔 없음!
   
4. 결과: HTML만 있고 스타일은 없음!
   <div class="sc-abc123">Hello</div>  ← 스타일 없는 HTML

클라이언트:
5. 브라우저가 스타일 없는 HTML 받음
   → 화면이 깨져서 보임 (FOUC)
   
6. JavaScript 실행
   
7. styled-components가 스타일 생성
   → 깜빡이며 스타일 적용됨
```

**문제 발생!**
- 처음엔 스타일 없이 표시 (깜빡임)
- 서버 HTML과 클라이언트 HTML이 달라짐 (Hydration 에러)

---

## 💡 해결책: ServerStyleSheet

### ServerStyleSheet가 하는 일

**"서버에서도 스타일을 모을 수 있는 가상의 저장소를 만든다"**

```javascript
import { ServerStyleSheet } from 'styled-components';

// 1단계: 스타일 저장소 생성
const sheet = new ServerStyleSheet();
```

`sheet`는 무엇인가?
- 브라우저의 `document.head`를 흉내낸 가짜 저장소
- 서버 환경에서 스타일을 메모리에 모으는 공간
- `document`가 없어도 작동함!

---

## 🔍 collectStyles() 동작 원리

```javascript
// 2단계: 스타일 수집하며 렌더링
const html = renderToString(
  sheet.collectStyles(<App />)
);
```

### collectStyles가 하는 일:

#### 1. App 컴포넌트를 특별한 Provider로 감싸기

```javascript
// 내부적으로 이렇게 됨:
<StyleSheetManager sheet={sheet.instance}>
  <App />
</StyleSheetManager>
```

#### 2. 컴포넌트 렌더링 과정에서 스타일 가로채기

```javascript
// App 컴포넌트 내부에서:
const Title = styled.h1`
  color: blue;
  font-size: 24px;
`;

// 렌더링될 때:
<Title>Hello</Title>

// collectStyles가 감지:
"아! Title이라는 styled-component가 사용됐네!"
"스타일: color: blue; font-size: 24px;"
"클래스명: sc-abc123"

// sheet에 저장:
sheet.styles.push({
  className: 'sc-abc123',
  css: 'color: blue; font-size: 24px;'
});
```

#### 3. 모든 styled-components의 스타일을 sheet에 모음

```javascript
// App 전체를 렌더링하면서:
<Header>  → sheet에 Header 스타일 저장
  <Title> → sheet에 Title 스타일 저장
  <Logo>  → sheet에 Logo 스타일 저장
</Header>
<Button>  → sheet에 Button 스타일 저장

// sheet 내부 상태:
sheet.styles = [
  { className: 'sc-abc123', css: '...' },  // Header
  { className: 'sc-abc124', css: '...' },  // Title
  { className: 'sc-abc125', css: '...' },  // Logo
  { className: 'sc-abc126', css: '...' },  // Button
]
```

#### 4. HTML은 정상적으로 생성됨

```javascript
const html = `
  <div class="sc-abc123">
    <h1 class="sc-abc124">Hello</h1>
    <img class="sc-abc125" />
  </div>
  <button class="sc-abc126">Click</button>
`;
```

**중요**: HTML에는 클래스명만 있고, 스타일은 아직 없음!

---

## 📤 getStyleElement() 동작 원리

```javascript
// 3단계: 수집한 스타일을 <style> 태그로 변환
const styleTags = sheet.getStyleElement();
```

### getStyleElement가 하는 일:

#### 1. sheet에 모인 스타일을 CSS로 변환

```javascript
// sheet.styles 배열을 순회하며:
const css = `
  .sc-abc123 { /* Header 스타일 */ }
  .sc-abc124 { color: blue; font-size: 24px; /* Title */ }
  .sc-abc125 { width: 100px; /* Logo */ }
  .sc-abc126 { background: blue; /* Button */ }
`;
```

#### 2. React 엘리먼트로 변환

```javascript
// 내부적으로:
const styleElement = (
  <style
    key="styled-components"
    data-styled="active"
    dangerouslySetInnerHTML={{ __html: css }}
  />
);

return styleElement;
```

#### 3. 반환값

```javascript
styleTags = [
  <style data-styled="active">
    .sc-abc123 { /* ... */ }
    .sc-abc124 { color: blue; font-size: 24px; }
    .sc-abc125 { width: 100px; }
    .sc-abc126 { background: blue; }
  </style>
];
```

---

## 🔄 전체 프로세스 흐름

### 서버에서:

```javascript
// 1. 저장소 생성
const sheet = new ServerStyleSheet();

// 2. 렌더링하며 스타일 수집
const html = renderToString(
  sheet.collectStyles(<App />)
);
// 결과: html = "<div class='sc-abc123'>...</div>"

// 3. 스타일을 <style> 태그로 변환
const styles = sheet.getStyleElement();
// 결과: styles = [<style>...CSS...</style>]

// 4. HTML 문서 생성
const document = `
  <!DOCTYPE html>
  <html>
    <head>
      ${ReactDOMServer.renderToStaticMarkup(styles)}
    </head>
    <body>
      <div id="root">${html}</div>
    </body>
  </html>
`;

// 5. 브라우저로 전송
response.send(document);
```

### 브라우저가 받는 HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- 서버에서 미리 만든 스타일! -->
    <style data-styled="active">
      .sc-abc123 { color: blue; }
      .sc-abc124 { font-size: 24px; }
    </style>
  </head>
  <body>
    <div id="root">
      <!-- 스타일이 적용된 HTML -->
      <div class="sc-abc123">
        <h1 class="sc-abc124">Hello</h1>
      </div>
    </div>
  </body>
</html>
```

### 브라우저에서:

```javascript
// 1. HTML 받자마자 스타일이 이미 있음
//    → 깨지지 않고 바로 표시됨! ✅

// 2. JavaScript 로드 & 실행

// 3. React Hydration 시작
ReactDOM.hydrate(<App />, document.getElementById('root'));

// 4. styled-components가 <style> 태그 확인
//    "어? 이미 스타일이 있네?"
//    "data-styled='active' 속성 발견!"
//    "서버에서 만든 스타일이구나, 재사용하자"

// 5. 기존 스타일을 그대로 사용
//    → 새로 생성 안 함
//    → 깜빡임 없음 ✅
//    → 클래스명 일치 ✅
```

---

## 🎯 Hydration 문제 해결 원리

### 문제: 클래스명 불일치

```
서버: <div class="sc-abc123">Hello</div>
클라이언트: <div class="sc-xyz789">Hello</div>
```

왜 다른가?
- 서버와 클라이언트가 각각 독립적으로 클래스명 생성
- 랜덤 해시가 달라질 수 있음

### 해결: 같은 클래스명 보장

```javascript
// 서버에서:
sheet.collectStyles(<App />)
// → "sc-abc123" 생성

// HTML에 포함:
<div class="sc-abc123">Hello</div>

// 브라우저에서:
// styled-components가 data-styled 속성을 보고:
"서버에서 만든 스타일이 있네, 이걸 재사용하자"
// → 같은 "sc-abc123" 사용 ✅
```

### 해결: 스타일 일치

```javascript
// 서버에서 만든 스타일:
<style>
  .sc-abc123 { color: blue; }
</style>

// 브라우저에서:
// 새로 만들지 않고 기존 스타일 재사용
// → 스타일 100% 일치 ✅
```

---

## 📊 비교: SSR 최적화 전/후

### ❌ 최적화 전 (ServerStyleSheet 없이)

```
1. 서버: HTML 생성
   <div class="sc-abc123">Hello</div>
   (스타일 없음)

2. 브라우저 받음: 화면 깨짐 😱

3. JS 로드: 0.5초 소요

4. styled-components 실행: 
   <style>.sc-xyz789 { color: blue; }</style>
   
5. 스타일 적용: 깜빡임 발생 ⚠️

6. Hydration 에러 발생:
   "서버: sc-abc123 vs 클라이언트: sc-xyz789" ❌
```

### ✅ 최적화 후 (ServerStyleSheet 사용)

```
1. 서버: HTML + CSS 생성
   <style>.sc-abc123 { color: blue; }</style>
   <div class="sc-abc123">Hello</div>

2. 브라우저 받음: 즉시 정상 표시 ✅

3. JS 로드: 0.5초 소요

4. styled-components 실행:
   "어? 스타일 이미 있네, 재사용"
   
5. 스타일 재사용: 깜빡임 없음 ✅

6. Hydration 성공:
   "서버: sc-abc123 vs 클라이언트: sc-abc123" ✅
```

---

## 🔧 ServerStyleSheet의 핵심 기술

### 1. StyleSheetManager
- Context API를 사용해 sheet를 전달
- 모든 하위 styled-components가 sheet에 접근 가능

### 2. 가상 DOM 스타일 수집
```javascript
// 실제로 DOM에 삽입하지 않고
// 메모리에만 저장
sheet.styles = [...]
```

### 3. 클래스명 해시 동기화
```javascript
// 서버와 클라이언트가 같은 알고리즘 사용
// → 같은 입력 → 같은 클래스명
hash('color: blue;') → 'sc-abc123' (항상 동일)
```

### 4. data-styled 속성
```html
<style data-styled="active">
  <!-- 브라우저에서 이 속성으로 서버 스타일 인식 -->
</style>
```

---

## 💭 왜 복잡한가?

### 근본적인 문제
- **styled-components는 브라우저를 위해 설계됨**
- **서버에는 `document`, `window`가 없음**
- **억지로 서버에서 동작하게 만들려면 우회 필요**

### ServerStyleSheet = 우회 기술
```
브라우저 API 없이 → 메모리에 스타일 저장 → 나중에 HTML로 변환
```

---

## 🎯 결론

### ServerStyleSheet API 요약

1. **`new ServerStyleSheet()`**
   - 서버 환경에서 스타일을 모을 가상 저장소

2. **`sheet.collectStyles(<App />)`**
   - 컴포넌트를 렌더링하며 모든 styled-components의 스타일 수집
   - Provider로 감싸서 모든 스타일을 가로챔

3. **`sheet.getStyleElement()`**
   - 수집한 스타일을 `<style>` 태그로 변환
   - HTML에 삽입할 수 있는 형태로 반환

4. **결과**
   - 서버에서 생성한 HTML과 스타일이 100% 일치
   - 브라우저가 받자마자 정상 표시 (FOUC 없음)
   - Hydration 에러 없음 (클래스명 일치)

### 우리 프로젝트는?

**Vite = CSR 전용**
- ServerStyleSheet 불필요 ✅
- 브라우저에서 처음부터 끝까지 처리 ✅
- 설정 간단 ✅

**Next.js = SSR**
- ServerStyleSheet 필수 ⚠️
- 서버 설정 복잡 ⚠️
- Hydration 관리 필요 ⚠️
