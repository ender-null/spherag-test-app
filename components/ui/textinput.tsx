import { useTheme } from '@react-navigation/native';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export function UITextInput({ ...props }: TextInputProps) {
  const theme = useTheme();

  return <TextInput {...props} style={styles.input} placeholderTextColor={theme.colors.text} />;
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(229, 231, 234)',
    backgroundColor: 'rgb(255, 255, 255)',
    color: 'rgb(89, 96, 102)',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Nunito',
  },
});
