import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Card } from '@/components/common';
import { useTheme } from '@/hooks/useTheme';
import { typography, layout } from '@/constants';

export const SettingsScreen: React.FC = () => {
  const { theme, themeMode, setThemeMode, isDark, toggleTheme } = useTheme();

  return (
    <ScreenContainer scrollable>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Aparência</Text>
      <Card>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons name={isDark ? 'moon' : 'sunny'} size={22} color={theme.primary} />
            <Text style={[styles.settingLabel, { color: theme.text }]}>Modo Escuro</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.border, true: theme.primary }}
          />
        </View>

        <View style={[styles.divider, { backgroundColor: theme.divider }]} />

        <View style={styles.themeSelector}>
          <TouchableOpacity
            style={[
              styles.themeOption,
              themeMode === 'light' && { borderColor: theme.primary, backgroundColor: theme.primaryLight },
            ]}
            onPress={() => setThemeMode('light')}
          >
            <Text style={[styles.optionText, { color: theme.text }]}>Claro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.themeOption,
              themeMode === 'dark' && { borderColor: theme.primary, backgroundColor: theme.primaryLight },
            ]}
            onPress={() => setThemeMode('dark')}
          >
            <Text style={[styles.optionText, { color: theme.text }]}>Escuro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.themeOption,
              themeMode === 'system' && { borderColor: theme.primary, backgroundColor: theme.primaryLight },
            ]}
            onPress={() => setThemeMode('system')}
          >
            <Text style={[styles.optionText, { color: theme.text }]}>Sistema</Text>
          </TouchableOpacity>
        </View>
      </Card>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Sobre o Aplicativo</Text>
      <Card>
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: theme.text }]}>Versão</Text>
          <Text style={[styles.settingValue, { color: theme.textSecondary }]}>1.0.0</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.divider }]} />
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: theme.text }]}>Plataforma</Text>
          <Text style={[styles.settingValue, { color: theme.textSecondary }]}>React Native + Expo</Text>
        </View>
      </Card>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    marginVertical: layout.spacing.sm,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: layout.spacing.sm,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.sm,
  },
  settingLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  settingValue: {
    fontSize: typography.sizes.sm,
  },
  divider: {
    height: 1,
    marginVertical: layout.spacing.xs,
  },
  themeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: layout.spacing.sm,
    gap: layout.spacing.sm,
  },
  themeOption: {
    flex: 1,
    paddingVertical: layout.spacing.sm,
    alignItems: 'center',
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semiBold,
  },
});
