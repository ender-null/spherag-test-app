import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { UIButton } from '@/components/ui/button';
import { UITextInput } from '@/components/ui/textinput';
import { secondaryColor } from '@/constants/theme';
import { fetchAuth, selectAuthError, selectAuthLoadingState } from '@/features/authSlice';
import i18n from '@/i18n';
import { useAppDispatch } from '@/store';
import { useTheme } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const loadingState = useSelector(selectAuthLoadingState);
  const error = useSelector(selectAuthError);

  const [username, setUsername] = useState('apppruebatecnica@spherag.com');
  const [password, setPassword] = useState('Usuario2026!');

  const handleLogin = async () => {
    dispatch(fetchAuth({ username, password }));
  };

  useEffect(() => {
    if (loadingState === 'error' && error) {
      Alert.alert(i18n.t('login.error'), error);
    }
  }, [loadingState, error]);

  const backgroundColor = useMemo(() => {
    if (theme.dark) {
      return theme.colors.background;
    }
    return secondaryColor;
  }, [theme]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor }]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={[styles.content, { backgroundColor: theme.colors.card }]}>
          <ThemedText type="title">Login</ThemedText>
          <UITextInput
            placeholder={i18n.t('login.username')}
            value={username}
            onChangeText={setUsername}
          />
          <UITextInput
            placeholder={i18n.t('login.password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <UIButton
            title={i18n.t('login.login')}
            onPress={handleLogin}
            disabled={loadingState === 'loading'}
          />
        </ThemedView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 24,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
    borderRadius: 32,
    marginBottom: 24,
  },
});
