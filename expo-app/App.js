import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function App() {
  // 개발 환경에서는 로컬 서버 주소를 사용
  // 프로덕션에서는 배포된 웹 앱 주소를 사용
  const webAppUrl = __DEV__ 
    ? Platform.OS === 'android'
      ? 'http://192.168.10.218:5173/' // Android 에뮬레이터
      : 'http://192.168.10.218:5173/' // iOS 시뮬레이터 또는 실제 기기
    : 'https://your-deployed-web-app.com'; // 프로덕션 URL

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar style="light" />
      <WebView
        source={{ uri: webAppUrl }}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea', // 상태바 영역 배경색
  },
  webview: {
    flex: 1,
  },
});
