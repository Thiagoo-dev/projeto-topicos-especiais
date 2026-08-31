import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { typography, layout } from '@/constants';

export interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
  fullScreen?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Loading: React.FC<LoadingProps> = ({
  message,
  size = 'large',
  fullScreen = false,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        fullScreen && [styles.fullScreen, { backgroundColor: theme.background }],
        style,
      ]}
    >
      <ActivityIndicator size={size} color={theme.primary} />
      {message ? (
        <Text style={[styles.message, { color: theme.textSecondary }]}>
          {message}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: layout.spacing.lg,
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  message: {
    marginTop: layout.spacing.sm,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
});
