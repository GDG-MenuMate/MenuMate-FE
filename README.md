# MenuMate FE

사용자 인터페이스(UI)로 식단/메뉴 추천 결과를 보여주는 프론트엔드 애플리케이션입니다.  
백엔드 API(`/recommend`)와 연동하여 사용자 입력에 따른 메뉴 추천 결과를 화면에 렌더링합니다.

---

## 기술 스택
- **React** – UI 컴포넌트 기반 개발
- **Zustand** – 전역 상태 관리 (`useMenuStore`)
- **Google Maps Static API** – 지도 및 위치 시각화
- **Vite** – 개발 서버 및 번들링
- **Axios** – 백엔드 API 요청
- **Tailwind CSS** – 스타일링

---

## 폴더 구조 & 역할
```text
src/
┣ assets/        # 아이콘, 이미지(.svg, .png 등)
┣ components/    # UI 컴포넌트
    ┗ base/      # 컴포넌트를 구성하는 기반
┣ pages/         # 화면 단위 컴포넌트
┗ store/         # Zustand 상태 관리 (useMenuStore.js)
```

---

## 실행 방법
### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
```bash
cp .env.example .env
```
* .env 파일에 API 키 입력

### 3. 개발 서버 실행
```bash
npm run dev
```
* 개발 모드로 실행
* 기본적으로 http://localhost:5173에서 확인

### 4. 빌드 (배포용)
```bash
npm run build
```
* dist/ 폴더에 배포용 최적화 번들 생성