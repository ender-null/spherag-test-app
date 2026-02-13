import { secondaryColor } from '@/constants/theme';
import { useTheme } from '@react-navigation/native';
import { type Icon } from 'phosphor-react-native';
import { StyleSheet, View } from 'react-native';

export function CircleIcon({ icon }: { icon: Icon }) {
  const theme = useTheme();
  const IconComponent = icon;

  return (
    <View style={[styles.circle, { backgroundColor: theme.colors.primary }]}>
      <IconComponent size={28} weight="fill" style={{ color: secondaryColor }} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 48,
    height: 48,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(229, 231, 234)',
  },
});
