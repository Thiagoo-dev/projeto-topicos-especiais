import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Input, Button } from '@/components/common';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { typography, layout } from '@/constants';
import { isValidEmail } from '@/utils/validators';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { register, isLoading } = useAuth();
  const { theme } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleRegister = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'Informe seu nome completo';
    if (!email.trim()) newErrors.email = 'Informe seu e-mail';
    else if (!isValidEmail(email)) newErrors.email = 'E-mail inválido';

    if (!password) newErrors.password = 'Informe sua senha';
    else if (password.length < 6) newErrors.password = 'Mínimo de 6 caracteres';

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await register({ name, email, password });
    } catch (error) {
      Alert.alert('Erro', 'Falha ao criar conta. Tente novamente.');
    }
  };

  return (
    <ScreenContainer scrollable contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Criar Conta</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Preencha os dados abaixo para começar
        </Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Nome completo"
          placeholder="Ex: João da Silva"
          value={name}
          onChangeText={(v) => {
            setName(v);
            if (errors.name) setErrors({ ...errors, name: '' });
          }}
          error={errors.name}
        />

        <Input
          label="E-mail"
          placeholder="seuemail@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(v) => {
            setEmail(v);
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          error={errors.email}
        />

        <Input
          label="Senha"
          placeholder="No mínimo 6 caracteres"
          isPassword
          value={password}
          onChangeText={(v) => {
            setPassword(v);
            if (errors.password) setErrors({ ...errors, password: '' });
          }}
          error={errors.password}
        />

        <Input
          label="Confirmar Senha"
          placeholder="Repita sua senha"
          isPassword
          value={confirmPassword}
          onChangeText={(v) => {
            setConfirmPassword(v);
            if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
          }}
          error={errors.confirmPassword}
        />

        <Button
          title="Cadastrar"
          onPress={handleRegister}
          loading={isLoading}
          style={styles.submitButton}
        />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          Já possui conta?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.footerLink, { color: theme.primary }]}>Faça Login</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: layout.spacing.xl,
  },
  header: {
    marginBottom: layout.spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    marginBottom: layout.spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.md,
  },
  form: {
    marginVertical: layout.spacing.md,
  },
  submitButton: {
    marginTop: layout.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: layout.spacing.xl,
  },
  footerText: {
    fontSize: typography.sizes.sm,
  },
  footerLink: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
  },
});
