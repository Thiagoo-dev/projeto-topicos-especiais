import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigation';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Input, Button, Chip } from '@/components/common';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { typography, layout } from '@/constants';
import { isValidEmail } from '@/utils/validators';
import {
  genderLabels,
  trainingLocationLabels,
  experienceLevelLabels,
  goalLabels,
  weeklyFrequencyLabels,
} from '@/utils/fitnessLabels';
import {
  Gender,
  TrainingLocation,
  ExperienceLevel,
  TrainingGoal,
  WeeklyFrequency,
} from '@/types/user';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const TOTAL_STEPS = 3;
const STEP_TITLES = ['Sua conta', 'Seus dados', 'Seu treino'];
const STEP_SUBTITLES = [
  'Preencha os dados abaixo para começar',
  'Isso nos ajuda a te conhecer melhor',
  'Vamos montar o treino ideal para você',
];

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { register, isLoading } = useAuth();
  const { theme } = useTheme();

  const [step, setStep] = useState(0);

  // Etapa 1 - conta
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Etapa 2 - dados pessoais
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [weightKg, setWeightKg] = useState('');
  const [heightCm, setHeightCm] = useState('');

  // Etapa 3 - perfil de treino
  const [trainingLocation, setTrainingLocation] = useState<TrainingLocation | ''>('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | ''>('');
  const [goal, setGoal] = useState<TrainingGoal | ''>('');
  const [weeklyFrequency, setWeeklyFrequency] = useState<WeeklyFrequency | ''>('');
  const [restrictions, setRestrictions] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const clearError = (field: string) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'Informe seu nome completo';
    if (!email.trim()) newErrors.email = 'Informe seu e-mail';
    else if (!isValidEmail(email)) newErrors.email = 'E-mail inválido';

    if (!password) newErrors.password = 'Informe sua senha';
    else if (password.length < 6) newErrors.password = 'Mínimo de 6 caracteres';

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    const ageNum = Number(age);
    const weightNum = Number(weightKg.replace(',', '.'));
    const heightNum = Number(heightCm);

    if (!age.trim()) newErrors.age = 'Informe sua idade';
    else if (isNaN(ageNum) || ageNum < 12 || ageNum > 100) {
      newErrors.age = 'Informe uma idade válida';
    }

    if (!gender) newErrors.gender = 'Selecione uma opção';

    if (!weightKg.trim()) newErrors.weightKg = 'Informe seu peso';
    else if (isNaN(weightNum) || weightNum <= 0) newErrors.weightKg = 'Peso inválido';

    if (!heightCm.trim()) newErrors.heightCm = 'Informe sua altura';
    else if (isNaN(heightNum) || heightNum <= 0) newErrors.heightCm = 'Altura inválida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!trainingLocation) newErrors.trainingLocation = 'Selecione onde você vai treinar';
    if (!experienceLevel) newErrors.experienceLevel = 'Selecione seu nível de experiência';
    if (!goal) newErrors.goal = 'Selecione seu objetivo principal';
    if (!weeklyFrequency) newErrors.weeklyFrequency = 'Selecione a frequência semanal';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    const isValid = step === 0 ? validateStep1() : validateStep2();
    if (isValid) {
      setErrors({});
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step === 0) {
      navigation.goBack();
      return;
    }
    setErrors({});
    setStep((prev) => prev - 1);
  };

  const handleRegister = async () => {
    if (!validateStep3()) return;

    try {
      await register({
        name,
        email,
        password,
        confirmPassword,
        age: Number(age),
        gender: gender as Gender,
        weightKg: Number(weightKg.replace(',', '.')),
        heightCm: Number(heightCm),
        trainingLocation: trainingLocation as TrainingLocation,
        experienceLevel: experienceLevel as ExperienceLevel,
        goal: goal as TrainingGoal,
        weeklyFrequency: weeklyFrequency as WeeklyFrequency,
        restrictions: restrictions.trim() || undefined,
      });
    } catch (error) {
      Alert.alert('Erro', 'Falha ao criar conta. Tente novamente.');
    }
  };

  return (
    <ScreenContainer scrollable contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>{STEP_TITLES[step]}</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {STEP_SUBTITLES[step]}
        </Text>

        <View style={styles.progressRow}>
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                {
                  backgroundColor: index <= step ? theme.primary : theme.border,
                  width: index === step ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.form}>
        {step === 0 && (
          <>
            <Input
              label="Nome completo"
              placeholder="Ex: João da Silva"
              value={name}
              onChangeText={(v) => {
                setName(v);
                clearError('name');
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
                clearError('email');
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
                clearError('password');
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
                clearError('confirmPassword');
              }}
              error={errors.confirmPassword}
            />
          </>
        )}

        {step === 1 && (
          <>
            <View style={styles.row}>
              <Input
                label="Idade"
                placeholder="Ex: 28"
                keyboardType="numeric"
                value={age}
                onChangeText={(v) => {
                  setAge(v);
                  clearError('age');
                }}
                error={errors.age}
                containerStyle={styles.halfInput}
              />
              <Input
                label="Peso (kg)"
                placeholder="Ex: 70"
                keyboardType="numeric"
                value={weightKg}
                onChangeText={(v) => {
                  setWeightKg(v);
                  clearError('weightKg');
                }}
                error={errors.weightKg}
                containerStyle={styles.halfInput}
              />
            </View>

            <Input
              label="Altura (cm)"
              placeholder="Ex: 175"
              keyboardType="numeric"
              value={heightCm}
              onChangeText={(v) => {
                setHeightCm(v);
                clearError('heightCm');
              }}
              error={errors.heightCm}
            />

            <Text style={[styles.fieldLabel, { color: theme.text }]}>Sexo</Text>
            <View style={styles.chipRow}>
              {(Object.keys(genderLabels) as Gender[]).map((option) => (
                <Chip
                  key={option}
                  label={genderLabels[option]}
                  selected={gender === option}
                  onPress={() => {
                    setGender(option);
                    clearError('gender');
                  }}
                />
              ))}
            </View>
            {errors.gender ? (
              <Text style={[styles.errorText, { color: theme.error }]}>{errors.gender}</Text>
            ) : null}
          </>
        )}

        {step === 2 && (
          <>
            <Text style={[styles.fieldLabel, { color: theme.text }]}>
              Onde você vai treinar?
            </Text>
            <View style={styles.chipRow}>
              {(Object.keys(trainingLocationLabels) as TrainingLocation[]).map((option) => (
                <Chip
                  key={option}
                  label={trainingLocationLabels[option]}
                  icon={
                    option === 'academia'
                      ? 'barbell-outline'
                      : option === 'casa'
                      ? 'home-outline'
                      : 'swap-horizontal-outline'
                  }
                  selected={trainingLocation === option}
                  onPress={() => {
                    setTrainingLocation(option);
                    clearError('trainingLocation');
                  }}
                />
              ))}
            </View>
            {errors.trainingLocation ? (
              <Text style={[styles.errorText, { color: theme.error }]}>
                {errors.trainingLocation}
              </Text>
            ) : null}

            <Text style={[styles.fieldLabel, styles.fieldSpacing, { color: theme.text }]}>
              Qual seu nível de experiência?
            </Text>
            <View style={styles.chipRow}>
              {(Object.keys(experienceLevelLabels) as ExperienceLevel[]).map((option) => (
                <Chip
                  key={option}
                  label={experienceLevelLabels[option]}
                  selected={experienceLevel === option}
                  onPress={() => {
                    setExperienceLevel(option);
                    clearError('experienceLevel');
                  }}
                />
              ))}
            </View>
            {errors.experienceLevel ? (
              <Text style={[styles.errorText, { color: theme.error }]}>
                {errors.experienceLevel}
              </Text>
            ) : null}

            <Text style={[styles.fieldLabel, styles.fieldSpacing, { color: theme.text }]}>
              Qual seu objetivo principal?
            </Text>
            <View style={styles.chipRow}>
              {(Object.keys(goalLabels) as TrainingGoal[]).map((option) => (
                <Chip
                  key={option}
                  label={goalLabels[option]}
                  selected={goal === option}
                  onPress={() => {
                    setGoal(option);
                    clearError('goal');
                  }}
                />
              ))}
            </View>
            {errors.goal ? (
              <Text style={[styles.errorText, { color: theme.error }]}>{errors.goal}</Text>
            ) : null}

            <Text style={[styles.fieldLabel, styles.fieldSpacing, { color: theme.text }]}>
              Quantos dias por semana?
            </Text>
            <View style={styles.chipRow}>
              {(Object.keys(weeklyFrequencyLabels) as WeeklyFrequency[]).map((option) => (
                <Chip
                  key={option}
                  label={weeklyFrequencyLabels[option]}
                  selected={weeklyFrequency === option}
                  onPress={() => {
                    setWeeklyFrequency(option);
                    clearError('weeklyFrequency');
                  }}
                />
              ))}
            </View>
            {errors.weeklyFrequency ? (
              <Text style={[styles.errorText, { color: theme.error }]}>
                {errors.weeklyFrequency}
              </Text>
            ) : null}

            <Input
              label="Lesões ou restrições (opcional)"
              placeholder="Ex: dor no joelho, problema na coluna..."
              value={restrictions}
              onChangeText={setRestrictions}
              multiline
              numberOfLines={3}
              containerStyle={styles.fieldSpacing}
              inputStyle={styles.multilineInput}
            />
          </>
        )}
      </View>

      <View style={styles.actions}>
        <Button title="Voltar" variant="outline" onPress={handleBack} style={styles.backButton} />
        {step < TOTAL_STEPS - 1 ? (
          <Button title="Continuar" onPress={handleNext} style={styles.nextButton} />
        ) : (
          <Button
            title="Concluir Cadastro"
            onPress={handleRegister}
            loading={isLoading}
            style={styles.nextButton}
          />
        )}
      </View>

      {step === 0 && (
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Já possui conta?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.footerLink, { color: theme.primary }]}>Faça Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: layout.spacing.xl,
  },
  header: {
    marginBottom: layout.spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    marginBottom: layout.spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    textAlign: 'center',
  },
  progressRow: {
    flexDirection: 'row',
    gap: layout.spacing.xs,
    marginTop: layout.spacing.md,
  },
  progressDot: {
    height: 8,
    borderRadius: layout.borderRadius.full,
  },
  form: {
    marginVertical: layout.spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: layout.spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    marginBottom: layout.spacing.sm,
  },
  fieldSpacing: {
    marginTop: layout.spacing.md,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  errorText: {
    fontSize: typography.sizes.xs,
    marginBottom: layout.spacing.sm,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
    paddingTop: layout.spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: layout.spacing.md,
    marginTop: layout.spacing.sm,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
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
