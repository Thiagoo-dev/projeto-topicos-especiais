import { ColorTheme } from '@/constants/colors';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: ColorTheme;
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}
