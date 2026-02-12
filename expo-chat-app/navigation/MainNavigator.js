import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/main/HomeScreen';
import ListScreen from '../screens/main/ListScreen';
import List2Screen from '../screens/main/List2Screen';
import SettingsScreen from '../screens/main/SettingsScreen';
import { useTheme } from '../contexts/ThemeContext';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.headerBg,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: theme.cardBg,
          borderTopColor: theme.border,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textTertiary,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: '홈',
          tabBarLabel: '홈',
        }}
      />
      <Tab.Screen 
        name="List" 
        component={ListScreen}
        options={{ 
          title: '리스트',
          tabBarLabel: '리스트',
        }}
      />
      <Tab.Screen 
        name="List2" 
        component={List2Screen}
        options={{ 
          title: '리스트2',
          tabBarLabel: '리스트2',
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ 
          title: '설정',
          tabBarLabel: '설정',
        }}
      />
    </Tab.Navigator>
  );
}
