import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Card, Button } from '@/components/common';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { typography, layout } from '@/constants';
import {
  genderLabels,
  goalLabels,
  experienceLevelLabels,
  trainingLocationLabels,
  weeklyFrequencyLabels,
} from '@/utils/fitnessLabels';

export const ProfileScreen: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const { theme } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza de que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: logout },
      ]
    );
  };

  return (
    <ScreenContainer scrollable>
      <Card style={styles.profileCard}>
        <View style={[styles.avatar, { backgroundColor: theme.primaryLight }]}>
          <Ionicons name="person" size={48} color={theme.primary} />
        </View>
        <Text style={[styles.userName, { color: theme.text }]}>{user?.name || 'Usuário'}</Text>
        <Text style={[styles.userEmail, { color: theme.textSecondary }]}>
          {user?.email || 'email@exemplo.com'}
        </Text>
        <View style={[styles.roleBadge, { backgroundColor: theme.primaryLight }]}>
          <Text style={[styles.roleText, { color: theme.primary }]}>
            {user?.experienceLevel ? experienceLevelLabels[user.experienceLevel] : 'Membro'}
          </Text>
        </View>
      </Card>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Dados Pessoais</Text>
      <Card>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Idade</Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>
            {user?.age ? `${user.age} anos` : 'N/A'}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.divider }]} />
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Sexo</Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>
            {user?.gender ? genderLabels[user.gender] : 'N/A'}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.divider }]} />
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Peso</Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>
            {user?.weightKg ? `${user.weightKg} kg` : 'N/A'}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.divider }]} />
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Altura</Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>
            {user?.heightCm ? `${user.heightCm} cm` : 'N/A'}
          </Text>
        </View>
      </Card>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Perfil de Treino</Text>
      <Card>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Local de treino</Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>
            {user?.trainingLocation ? trainingLocationLabels[user.trainingLocation] : 'N/A'}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.divider }]} />
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Objetivo</Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>
            {user?.goal ? goalLabels[user.goal] : 'N/A'}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.divider }]} />
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Frequência semanal</Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>
            {user?.weeklyFrequency ? weeklyFrequencyLabels[user.weeklyFrequency] : 'N/A'}
          </Text>
        </View>
        {user?.restrictions ? (
          <>
            <View style={[styles.divider, { backgroundColor: theme.divider }]} />
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Restrições</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>{user.restrictions}</Text>
            </View>
          </>
        ) : null}
      </Card>

      <Button
        title="Encerrar Sessão"
        variant="danger"
        onPress={handleLogout}
        loading={isLoading}
        leftIcon={<Ionicons name="log-out-outline" size={20} color="#FFFFFF" />}
        style={styles.logoutButton}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    alignItems: 'center',
    paddingVertical: layout.spacing.xl,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: layout.spacing.md,
  },
  userName: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  userEmail: {
    fontSize: typography.sizes.sm,
    marginTop: 2,
  },
  roleBadge: {
    paddingHorizontal: layout.spacing.md,
    paddingVertical: 4,
    borderRadius: layout.borderRadius.full,
    marginTop: layout.spacing.sm,
  },
  roleText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semiBold,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    marginVertical: layout.spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: layout.spacing.sm,
  },
  infoLabel: {
    fontSize: typography.sizes.sm,
  },
  infoValue: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semiBold,
  },
  divider: {
    height: 1,
    marginVertical: layout.spacing.xs,
  },
  logoutButton: {
    marginTop: layout.spacing.lg,
  },
});
