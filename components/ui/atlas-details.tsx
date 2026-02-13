import { ThemedText } from "@/components/themed-text";
import i18n from "@/i18n";
import { formatDate } from "@/utils/format";
import { useTheme } from "@react-navigation/native";
import {
  BatteryFullIcon,
  BatteryHighIcon,
  BatteryLowIcon,
  BatteryMediumIcon,
  BatteryWarningIcon,
  CellSignalFullIcon,
  CellSignalHighIcon,
  CellSignalLowIcon,
  CellSignalMediumIcon,
  CellSignalXIcon,
  SimCardIcon,
} from "phosphor-react-native";
import { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

export function AtlasDetails({ atlas }: { atlas: AtlasDetails }) {
  const theme = useTheme();

  const batteryPercentage = useMemo(() => {
    return Math.round(atlas.batteryPercentage);
  }, [atlas.batteryPercentage]);

  const signalPercentage = useMemo(() => {
    return Math.round(atlas.signalPercentage);
  }, [atlas.signalPercentage]);

  const getColorFromPercentage = useCallback((percentage: number) => {
    if (percentage > 80) return "green";
    if (percentage > 60) return undefined;
    if (percentage > 40) return "red";
    return "red";
  }, []);

  const batteryIcon = useMemo(() => {
    const commonProps = { color: getColorFromPercentage(batteryPercentage) };
    if (batteryPercentage > 80) return <BatteryFullIcon {...commonProps} />;
    if (batteryPercentage > 60) return <BatteryHighIcon {...commonProps} />;
    if (batteryPercentage > 40) return <BatteryMediumIcon {...commonProps} />;
    if (batteryPercentage > 20) return <BatteryLowIcon {...commonProps} />;
    return <BatteryWarningIcon {...commonProps} />;
  }, [batteryPercentage, getColorFromPercentage]);

  const signalIcon = useMemo(() => {
    const commonProps = { color: getColorFromPercentage(signalPercentage) };
    if (signalPercentage > 80) return <CellSignalFullIcon {...commonProps} />;
    if (signalPercentage > 60) return <CellSignalHighIcon {...commonProps} />;
    if (signalPercentage > 40) return <CellSignalMediumIcon {...commonProps} />;
    if (signalPercentage > 20) return <CellSignalLowIcon {...commonProps} />;
    return <CellSignalXIcon {...commonProps} />;
  }, [signalPercentage, getColorFromPercentage]);

  return (
    <View style={[styles.item, { backgroundColor: theme.colors.card }]}>
      <SimCardIcon size={42} weight="light" color={theme.colors.primary} />
      <View style={styles.content}>
        <ThemedText style={styles.contentText}>
          {i18n.t("atlas.imei")}: {atlas.imei}
        </ThemedText>
        <ThemedText style={styles.contentText}>
          {i18n.t("atlas.expiredDate")}: {formatDate(atlas.expiredDate)}
        </ThemedText>
      </View>
      <View style={styles.status}>
        <View style={styles.statusItem}>
          <ThemedText
            style={[
              styles.contentText,
              { color: getColorFromPercentage(batteryPercentage) },
            ]}
          >
            {batteryPercentage}%
          </ThemedText>
          {batteryIcon}
        </View>
        <View style={styles.statusItem}>
          <ThemedText
            style={[
              styles.contentText,
              { color: getColorFromPercentage(signalPercentage) },
            ]}
          >
            {signalPercentage}%
          </ThemedText>
          {signalIcon}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
    marginHorizontal: 16,
    gap: 16,
    borderRadius: 32,
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
  contentText: {
    fontSize: 14,
  },
});
