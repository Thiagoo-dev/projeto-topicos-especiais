import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Card } from '@/components/common';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { typography, layout } from '@/constants';
import { formatDate } from '@/utils/formatters';

export const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <ScreenContainer scrollable>
      {/* Welcome Banner */}
      <Card style={[styles.bannerCard, { backgroundColor: theme.primary }]}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerGreeting}>Olá, {user?.name || 'Desenvolvedor'} 👋</Text>
          <Text style={styles.bannerDate}>{formatDate(new Date())}</Text>
          <Text style={styles.bannerDescription}>
            Sua base React Native com suporte a Android e iOS está pronta para desenvolvimento!
          </Text>
        </View>
      </Card>

      {/* Quick Stats Grid */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Visão Geral</Text>
      <View style={styles.grid}>
        <Card style={styles.gridItem}>
          <Ionicons name="phone-portrait-outline" size={28} color={theme.primary} />
          <Text style={[styles.cardTitle, { color: theme.text }]}>Cross-Platform</Text>
          <Text style={[styles.cardSub, { color: theme.textSecondary }]}>Android & iOS</Text>
        </Card>

        <Card style={styles.gridItem}>
          <Ionicons name="code-slash-outline" size={28} color={theme.secondary} />
          <Text style={[styles.cardTitle, { color: theme.text }]}>TypeScript</Text>
          <Text style={[styles.cardSub, { color: theme.textSecondary }]}>100% Tipado</Text>
        </Card>
      </View>

      <View style={styles.grid}>
        <Card style={styles.gridItem}>
          <Ionicons name="color-palette-outline" size={28} color={theme.accent} />
          <Text style={[styles.cardTitle, { color: theme.text }]}>Temas</Text>
          <Text style={[styles.cardSub, { color: theme.textSecondary }]}>Light & Dark</Text>
        </Card>

        <Card style={styles.gridItem}>
          <Ionicons name="cube-outline" size={28} color={theme.success} />
          <Text style={[styles.cardTitle, { color: theme.text }]}>Módulos</Text>
          <Text style={[styles.cardSub, { color: theme.textSecondary }]}>Clean Architecture</Text>
        </Card>
      </View>

      {/* Resources Card */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Recursos Configurados</Text>
      <Card>
        <View style={styles.featureRow}>
          <Ionicons name="checkmark-circle" size={22} color={theme.success} />
          <Text style={[styles.featureText, { color: theme.text }]}>React Navigation (Stacks + Tabs)</Text>
        </View>
        <View style={styles.featureRow}>
          <Ionicons name="checkmark-circle" size={22} color={theme.success} />
          <Text style={[styles.featureText, { color: theme.text }]}>AsyncStorage e Interceptors de API</Text>
        </View>
        <View style={styles.featureRow}>
          <Ionicons name="checkmark-circle" size={22} color={theme.success} />
          <Text style={[styles.featureText, { color: theme.text }]}>Path Aliases (@/components, etc)</Text>
        </View>
        <View style={styles.featureRow}>
          <Ionicons name="checkmark-circle" size={22} color={theme.success} />
          <Text style={[styles.featureText, { color: theme.text }]}>Safe Area & Keyboard Handling</Text>
        </View>
      </Card>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  bannerCard: {
    padding: layout.spacing.lg,
    borderRadius: layout.borderRadius.lg,
    marginBottom: layout.spacing.lg,
  },
  bannerContent: {},
  bannerGreeting: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerDate: {
    fontSize: typography.sizes.xs,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: layout.spacing.sm,
  },
  bannerDescription: {
    fontSize: typography.sizes.sm,
    color: '#FFFFFF',
    lineHeight: typography.lineHeights.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    marginVertical: layout.spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: layout.spacing.md,
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: layout.spacing.lg,
  },
  cardTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    marginTop: layout.spacing.sm,
  },
  cardSub: {
    fontSize: typography.sizes.xs,
    marginTop: 2,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: layout.spacing.xs + 2,
    gap: layout.spacing.sm,
  },
  featureText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
});
