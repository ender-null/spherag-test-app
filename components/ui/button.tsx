import { ThemedText } from '@/components/themed-text';
import { secondaryColor } from '@/constants/theme';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface UIButtonProps extends TouchableOpacityProps {
  title: string;
  autoSize?: boolean;
}

export function UIButton({ title, autoSize, ...props }: UIButtonProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.button,
        { backgroundColor: theme.colors.primary, width: autoSize ? 'auto' : '100%' },
      ]}
    >
      <ThemedText type="defaultSemiBold" style={[styles.text, { color: secondaryColor }]}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});
