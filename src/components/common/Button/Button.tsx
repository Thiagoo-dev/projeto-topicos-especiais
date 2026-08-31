import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  View,
  StyleProp,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { typography, layout } from '@/constants';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  style,
  textStyle,
  ...rest
}) => {
  const { theme } = useTheme();

  const getVariantStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case 'secondary':
        return {
          container: {
            backgroundColor: theme.secondary,
            borderWidth: 0,
          },
          text: {
            color: '#FFFFFF',
          },
        };
      case 'outline':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderColor: theme.primary,
          },
          text: {
            color: theme.primary,
          },
        };
      case 'ghost':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 0,
          },
          text: {
            color: theme.primary,
          },
        };
      case 'danger':
        return {
          container: {
            backgroundColor: theme.error,
            borderWidth: 0,
          },
          text: {
            color: '#FFFFFF',
          },
        };
      case 'primary':
      default:
        return {
          container: {
            backgroundColor: theme.primary,
            borderWidth: 0,
          },
          text: {
            color: '#FFFFFF',
          },
        };
    }
  };

  const getSizeStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (size) {
      case 'sm':
        return {
          container: {
            paddingVertical: layout.spacing.xs + 2,
            paddingHorizontal: layout.spacing.md,
            borderRadius: layout.borderRadius.sm,
          },
          text: {
            fontSize: typography.sizes.sm,
          },
        };
      case 'lg':
        return {
          container: {
            paddingVertical: layout.spacing.md,
            paddingHorizontal: layout.spacing.xl,
            borderRadius: layout.borderRadius.lg,
          },
          text: {
            fontSize: typography.sizes.lg,
          },
        };
      case 'md':
      default:
        return {
          container: {
            paddingVertical: layout.spacing.sm + 4,
            paddingHorizontal: layout.spacing.lg,
            borderRadius: layout.borderRadius.md,
          },
          text: {
            fontSize: typography.sizes.md,
          },
        };
    }
  };

  const variantStyle = getVariantStyles();
  const sizeStyle = getSizeStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || loading}
      style={[
        styles.baseContainer,
        variantStyle.container,
        sizeStyle.container,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? theme.primary : '#FFFFFF'}
        />
      ) : (
        <View style={styles.contentRow}>
          {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}
          <Text
            style={[
              styles.baseText,
              variantStyle.text,
              sizeStyle.text,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon ? <View style={styles.rightIcon}>{rightIcon}</View> : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontWeight: typography.weights.semiBold,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  leftIcon: {
    marginRight: layout.spacing.sm,
  },
  rightIcon: {
    marginLeft: layout.spacing.sm,
  },
});
