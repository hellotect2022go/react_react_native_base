@echo off
echo 🚀 Vite 웹 앱과 Expo 앱 시작하기
echo ==================================
echo.
echo 이 스크립트는 두 개의 명령 프롬프트 창을 엽니다:
echo.
echo 1️⃣  첫 번째 창 - Vite 웹 앱
echo 2️⃣  두 번째 창 - Expo 앱
echo.
echo ==================================
echo.
pause

start "Vite 웹 앱" cmd /k "cd web-app && npm run dev"
timeout /t 5 /nobreak >nul
start "Expo 앱" cmd /k "cd expo-app && npm start"

echo.
echo ✅ 두 개의 창이 열렸습니다!
echo.
echo 웹 앱: http://localhost:5173
echo Expo: QR 코드를 스캔하거나 'a' 또는 'i'를 눌러 에뮬레이터 실행
echo.
pause
