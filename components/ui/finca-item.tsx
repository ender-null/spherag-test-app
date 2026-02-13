import { CircleIcon } from '@/components/circle-icon';
import { ThemedText } from '@/components/themed-text';
import { formatDate } from '@/utils/format';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { FarmIcon, StarIcon } from 'phosphor-react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export function FincaItem({ finca }: { finca: Finca }) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/${finca.id}`)}
      style={[styles.item, { backgroundColor: theme.colors.card }]}
    >
      <CircleIcon icon={FarmIcon} />
      <View style={styles.content}>
        <ThemedText type="defaultBold">{finca.name}</ThemedText>
        <ThemedText style={styles.contentText}>{formatDate(finca.createdDate, true)}</ThemedText>
      </View>
      {finca.favourite && <StarIcon weight="fill" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginHorizontal: 16,
    gap: 16,
    borderRadius: 16,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentText: {
    fontSize: 14,
  },
});
