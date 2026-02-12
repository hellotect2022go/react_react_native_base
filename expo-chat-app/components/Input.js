import { TextInput, View, StyleSheet, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker';

export function SearchInput({ value, onChangeText, placeholder, style }) {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.inputWrapper, { backgroundColor: theme.inputBg }, style]}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={[styles.input, { color: theme.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textTertiary}
      />
    </View>
  );
}

export function Select({ value, onValueChange, items, style }) {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.selectWrapper, { backgroundColor: theme.inputBg }, style]}>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={[styles.picker, { color: theme.text }]}
        dropdownIconColor={theme.textSecondary}
      >
        {items.map((item) => (
          <Picker.Item 
            key={item.value} 
            label={item.label} 
            value={item.value}
            color={theme.text}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 4,
  },
  selectWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
  },
});
