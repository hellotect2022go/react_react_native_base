import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export default function List2Screen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          리스트2 화면
        </Text>
        
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          두 번째 리스트 페이지입니다
        </Text>

        {[1, 2, 3, 4].map((item) => (
          <View key={item} style={[styles.card, { backgroundColor: theme.cardBg }]}>
            <Text style={[styles.cardText, { color: theme.text }]}>
              항목 {item}
            </Text>
          </View>
        ))}
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
  cardText: {
    fontSize: 16,
  },
});
