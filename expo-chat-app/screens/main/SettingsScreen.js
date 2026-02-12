import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          설정
        </Text>
        
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          앱 설정을 관리하세요
        </Text>

        <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>
              다크 모드
            </Text>
            <TouchableOpacity
              style={[styles.switch, { backgroundColor: isDark ? theme.primary : theme.border }]}
              onPress={toggleTheme}
            >
              <View style={[styles.switchThumb, { alignSelf: isDark ? 'flex-end' : 'flex-start' }]} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.themeText, { color: theme.textSecondary }]}>
            현재: {isDark ? '다크 모드 🌙' : '라이트 모드 ☀️'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  switch: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  themeText: {
    fontSize: 14,
  },
});
