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

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login, isLoading } = useAuth();
  const { theme } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError('Informe seu e-mail');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Informe um e-mail válido');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Informe sua senha');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('A senha deve ter no mínimo 6 caracteres');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    try {
      await login({ email, password });
    } catch (error) {
      Alert.alert('Erro', 'Falha ao autenticar. Tente novamente.');
    }
  };

  return (
    <ScreenContainer scrollable contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={[styles.logoBadge, { backgroundColor: theme.primaryLight }]}>
          <Text style={[styles.logoText, { color: theme.primary }]}>RN</Text>
        </View>
        <Text style={[styles.title, { color: theme.text }]}>Bem-vindo de volta!</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Entre com sua conta para acessar o aplicativo
        </Text>
      </View>

      <View style={styles.form}>
        <Input
          label="E-mail"
          placeholder="seuemail@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
            if (emailError) setEmailError('');
          }}
          error={emailError}
        />

        <Input
          label="Senha"
          placeholder="Sua senha secreta"
          isPassword
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            if (passwordError) setPasswordError('');
          }}
          error={passwordError}
        />

        <Button
          title="Entrar"
          onPress={handleLogin}
          loading={isLoading}
          style={styles.submitButton}
        />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          Não tem uma conta?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.footerLink, { color: theme.primary }]}>Cadastre-se</Text>
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
    alignItems: 'center',
    marginBottom: layout.spacing.xl,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: layout.spacing.md,
  },
  logoText: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    marginBottom: layout.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sizes.md,
    textAlign: 'center',
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
