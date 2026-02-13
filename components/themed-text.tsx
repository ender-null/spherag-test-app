import { primaryColor } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'defaultBold';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'defaultBold' ? styles.defaultBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'NunitoMedium',
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontFamily: 'NunitoSemiBold',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  defaultBold: {
    fontFamily: 'NunitoBold',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  title: {
    fontFamily: 'Nunito',
    fontSize: 32,
    fontWeight: '500',
    lineHeight: 36,
  },
  subtitle: {
    fontFamily: 'NunitoBold',
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    fontFamily: 'NunitoMedium',
    lineHeight: 30,
    fontSize: 16,
    color: primaryColor,
  },
});
