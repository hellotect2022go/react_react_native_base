import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export function Card({ children, style }) {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.card, { backgroundColor: theme.cardBg, shadowColor: theme.shadow }, style]}>
      {children}
    </View>
  );
}

export function Avatar({ emoji, size = 64, online = false, style }) {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.avatarContainer, { width: size, height: size }, style]}>
      <View style={[styles.avatar, { backgroundColor: theme.primary + '20' }]}>
        <Text style={[styles.avatarEmoji, { fontSize: size * 0.5 }]}>
          {emoji}
        </Text>
      </View>
      {online && (
        <View style={[styles.onlineBadge, { backgroundColor: '#10B981', borderColor: theme.cardBg }]} />
      )}
    </View>
  );
}

export function Badge({ children, variant = 'default', style }) {
  const { theme } = useTheme();
  
  const backgroundColor = variant === 'primary' ? theme.primary : theme.inputBg;
  const textColor = variant === 'primary' ? '#FFFFFF' : theme.textSecondary;
  
  return (
    <View style={[styles.badge, { backgroundColor }, style]}>
      <Text style={[styles.badgeText, { color: textColor }]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    textAlign: 'center',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
