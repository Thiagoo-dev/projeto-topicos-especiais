import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  THEME_MODE: '@theme_mode',
} as const;

export const storage = {
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`[Storage] Error reading key "${key}":`, error);
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`[Storage] Error writing key "${key}":`, error);
      return false;
    }
  },

  async removeItem(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`[Storage] Error removing key "${key}":`, error);
      return false;
    }
  },

  async getObject<T>(key: string): Promise<T | null> {
    try {
      const json = await AsyncStorage.getItem(key);
      return json ? (JSON.parse(json) as T) : null;
    } catch (error) {
      console.error(`[Storage] Error parsing JSON for key "${key}":`, error);
      return null;
    }
  },

  async setObject<T>(key: string, value: T): Promise<boolean> {
    try {
      const json = JSON.stringify(value);
      await AsyncStorage.setItem(key, json);
      return true;
    } catch (error) {
      console.error(`[Storage] Error storing object for key "${key}":`, error);
      return false;
    }
  },

  async clear(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('[Storage] Error clearing storage:', error);
      return false;
    }
  },
};
