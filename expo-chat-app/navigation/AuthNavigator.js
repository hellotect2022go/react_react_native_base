import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhoneAuthScreen from '../screens/auth/PhoneAuthScreen';
import VerifyCodeScreen from '../screens/auth/VerifyCodeScreen';
import GoogleAuthScreen from '../screens/auth/GoogleAuthScreen';
import ProfileSetupScreen from '../screens/auth/ProfileSetupScreen';
import { useTheme } from '../contexts/ThemeContext';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.headerBg,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="PhoneAuth" 
        component={PhoneAuthScreen}
        options={{ title: '로그인' }}
      />
      <Stack.Screen 
        name="VerifyCode" 
        component={VerifyCodeScreen}
        options={{ title: '인증 코드' }}
      />
      <Stack.Screen 
        name="GoogleAuth" 
        component={GoogleAuthScreen}
        options={{ title: '구글 연동' }}
      />
      <Stack.Screen 
        name="ProfileSetup" 
        component={ProfileSetupScreen}
        options={{ title: '프로필 설정' }}
      />
    </Stack.Navigator>
  );
}
