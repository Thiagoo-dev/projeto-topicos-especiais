import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Card } from '@/components/common';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { typography, layout } from '@/constants';
import { formatDate } from '@/utils/formatters';
import {
  goalLabels,
  experienceLevelLabels,
  trainingLocationLabels,
  weeklyFrequencyLabels,
} from '@/utils/fitnessLabels';

export const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const firstName = user?.name?.split(' ')[0] || 'Atleta';

  return (
    <ScreenContainer scrollable>
      {/* Banner de boas-vindas */}
      <Card style={[styles.bannerCard, { backgroundColor: theme.primary }]}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerGreeting}>Olá, {firstName} 💪</Text>
          <Text style={styles.bannerDate}>{formatDate(new Date())}</Text>
          <Text style={styles.bannerDescription}>
            {user?.goal
              ? `Seu foco atual é ${goalLabels[user.goal].toLowerCase()}. Vamos treinar hoje?`
              : 'Complete seu perfil para receber treinos personalizados.'}
          </Text>
        </View>
      </Card>

      {/* Resumo do perfil de treino */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Seu Perfil de Treino</Text>
      <View style={styles.grid}>
        <Card style={styles.gridItem}>
          <Ionicons name="location-outline" size={26} color={theme.primary} />
          <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={1}>
            {user?.trainingLocation ? trainingLocationLabels[user.trainingLocation] : '—'}
          </Text>
          <Text style={[styles.cardSub, { color: theme.textSecondary }]}>Local de treino</Text>
        </Card>

        <Card style={styles.gridItem}>
          <Ionicons name="trending-up-outline" size={26} color={theme.secondary} />
          <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={1}>
            {user?.experienceLevel ? experienceLevelLabels[user.experienceLevel] : '—'}
          </Text>
          <Text style={[styles.cardSub, { color: theme.textSecondary }]}>Nível</Text>
        </Card>
      </View>

      <View style={styles.grid}>
        <Card style={styles.gridItem}>
          <Ionicons name="calendar-outline" size={26} color={theme.accent} />
          <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={1}>
            {user?.weeklyFrequency ? weeklyFrequencyLabels[user.weeklyFrequency] : '—'}
          </Text>
          <Text style={[styles.cardSub, { color: theme.textSecondary }]}>Frequência semanal</Text>
        </Card>

        <Card style={styles.gridItem}>
          <Ionicons name="flag-outline" size={26} color={theme.success} />
          <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={1}>
            {user?.goal ? goalLabels[user.goal] : '—'}
          </Text>
          <Text style={[styles.cardSub, { color: theme.textSecondary }]}>Objetivo</Text>
        </Card>
      </View>

      {/* Estado vazio do treino do dia */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Treino de Hoje</Text>
      <Card style={styles.emptyStateCard}>
        <Ionicons name="barbell-outline" size={32} color={theme.textMuted} />
        <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
          Nenhum treino gerado ainda. Em breve a IA vai montar seu plano com base no seu perfil.
        </Text>
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
    textAlign: 'center',
  },
  cardSub: {
    fontSize: typography.sizes.xs,
    marginTop: 2,
  },
  emptyStateCard: {
    alignItems: 'center',
    paddingVertical: layout.spacing.xl,
  },
  emptyStateText: {
    fontSize: typography.sizes.sm,
    textAlign: 'center',
    marginTop: layout.spacing.sm,
    paddingHorizontal: layout.spacing.md,
  },
});
