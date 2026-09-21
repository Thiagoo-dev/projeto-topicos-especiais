import {
  Gender,
  TrainingGoal,
  ExperienceLevel,
  TrainingLocation,
  WeeklyFrequency,
} from '@/types/user';

export const genderLabels: Record<Gender, string> = {
  masculino: 'Masculino',
  feminino: 'Feminino',
  prefiro_nao_informar: 'Prefiro não informar',
};

export const trainingLocationLabels: Record<TrainingLocation, string> = {
  academia: 'Academia',
  casa: 'Em Casa',
  ambos: 'Academia e Casa',
};

export const experienceLevelLabels: Record<ExperienceLevel, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
};

export const goalLabels: Record<TrainingGoal, string> = {
  emagrecimento: 'Emagrecimento',
  hipertrofia: 'Ganho de Massa',
  condicionamento: 'Condicionamento Físico',
  saude_geral: 'Saúde Geral',
};

export const weeklyFrequencyLabels: Record<WeeklyFrequency, string> = {
  '1_2': '1 a 2 dias',
  '3_4': '3 a 4 dias',
  '5_6': '5 a 6 dias',
  todos_os_dias: 'Todos os dias',
};
