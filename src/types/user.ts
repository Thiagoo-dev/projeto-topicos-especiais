export type Gender = 'masculino' | 'feminino' | 'prefiro_nao_informar';

export type TrainingLocation = 'academia' | 'casa' | 'ambos';

export type ExperienceLevel = 'iniciante' | 'intermediario' | 'avancado';

export type TrainingGoal = 'emagrecimento' | 'hipertrofia' | 'condicionamento' | 'saude_geral';

export type WeeklyFrequency = '1_2' | '3_4' | '5_6' | 'todos_os_dias';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
  createdAt?: string;
  age?: number;
  gender?: Gender;
  weightKg?: number;
  heightCm?: number;
  trainingLocation?: TrainingLocation;
  experienceLevel?: ExperienceLevel;
  goal?: TrainingGoal;
  weeklyFrequency?: WeeklyFrequency;
  restrictions?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  age: number;
  gender: Gender;
  weightKg: number;
  heightCm: number;
  trainingLocation: TrainingLocation;
  experienceLevel: ExperienceLevel;
  goal: TrainingGoal;
  weeklyFrequency: WeeklyFrequency;
  restrictions?: string;
}
