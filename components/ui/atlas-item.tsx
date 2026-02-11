import i18n from "@/i18n";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import {
  BatteryEmptyIcon,
  BatteryFullIcon,
  BatteryHighIcon,
  BatteryLowIcon,
  BatteryMediumIcon,
  CellSignalFullIcon,
  CellSignalHighIcon,
  CellSignalLowIcon,
  CellSignalMediumIcon,
  CellSignalNoneIcon,
  SimCardIcon,
} from "phosphor-react-native";
import { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { formatDate } from "../../utils/format";
import { ThemedText } from "../themed-text";

export function AtlasItem({
  atlas,
  fincaId,
}: {
  fincaId: string;
  atlas: Atlas;
}) {
  const router = useRouter();
  const theme = useTheme();

  const batteryPercentage = useMemo(() => {
    return Math.round(atlas.batteryPercentage);
  }, [atlas.batteryPercentage]);

  const signalPercentage = useMemo(() => {
    return Math.round(atlas.signalPercentage);
  }, [atlas.signalPercentage]);

  const batteryIcon = useMemo(() => {
    if (batteryPercentage > 80) return <BatteryFullIcon color="green" />;
    if (batteryPercentage > 60) return <BatteryHighIcon />;
    if (batteryPercentage > 40) return <BatteryMediumIcon color="yellow" />;
    if (batteryPercentage > 20) return <BatteryLowIcon color="red" />;
    return <BatteryEmptyIcon color="red" />;
  }, [batteryPercentage]);

  const signalIcon = useMemo(() => {
    if (signalPercentage > 80) return <CellSignalFullIcon color="green" />;
    if (signalPercentage > 60) return <CellSignalHighIcon />;
    if (signalPercentage > 40) return <CellSignalMediumIcon color="yellow" />;
    if (signalPercentage > 20) return <CellSignalLowIcon color="red" />;
    return <CellSignalNoneIcon color="red" />;
  }, [signalPercentage]);

  return (
    <TouchableOpacity
      onPress={() => router.push(`/${fincaId}/atlas/${atlas.imei}`)}
      style={styles.item}
    >
      <SimCardIcon size={42} weight="light" color={theme.colors.primary} />
      <View style={styles.content}>
        <ThemedText type="defaultSemiBold">{atlas.name}</ThemedText>
        <ThemedText>
          {i18n.t("atlas.imei")}: {atlas.imei}
        </ThemedText>
        <ThemedText>
          {i18n.t("atlas.expiredDate")}: {formatDate(atlas.expiredDate)}
        </ThemedText>
      </View>
      <View style={styles.status}>
        <View style={styles.statusItem}>
          <ThemedText>{batteryPercentage}%</ThemedText>
          {batteryIcon}
        </View>
        <View style={styles.statusItem}>
          <ThemedText>{signalPercentage}%</ThemedText>
          {signalIcon}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
    gap: 16,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  status: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
  },
});
