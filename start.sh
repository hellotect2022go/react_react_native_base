#!/bin/bash

echo "🚀 Vite 웹 앱과 Expo 앱 시작하기"
echo "=================================="
echo ""
echo "이 스크립트는 두 개의 터미널 창을 열어야 합니다:"
echo ""
echo "1️⃣  첫 번째 터미널 - Vite 웹 앱:"
echo "   cd web-app && npm run dev"
echo ""
echo "2️⃣  두 번째 터미널 - Expo 앱:"
echo "   cd expo-app && npm start"
echo ""
echo "=================================="
echo ""
echo "자동으로 시작하려면 Y를 누르세요 (권장하지 않음)"
echo "수동으로 시작하려면 N을 누르세요 (권장)"
echo ""
read -p "자동 시작? (y/N): " choice

case "$choice" in 
  y|Y )
    echo ""
    echo "📱 웹 앱 시작 중..."
    cd web-app
    npm run dev &
    WEB_PID=$!
    cd ..
    
    echo "⏳ 5초 대기 중..."
    sleep 5
    
    echo "📱 Expo 앱 시작 중..."
    cd expo-app
    npm start
    
    # Cleanup
    trap "kill $WEB_PID" EXIT
    ;;
  * )
    echo ""
    echo "✅ 수동 시작 모드"
    echo ""
    echo "다음 명령어들을 각각 다른 터미널에서 실행하세요:"
    echo ""
    echo "터미널 1:"
    echo "  cd web-app"
    echo "  npm run dev"
    echo ""
    echo "터미널 2:"
    echo "  cd expo-app"
    echo "  npm start"
    ;;
esac
