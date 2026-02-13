import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { UIButton } from '@/components/ui/button';
import { UITextInput } from '@/components/ui/textinput';
import { fetchAuth, selectAuthError, selectAuthLoadingState } from '@/features/authSlice';
import i18n from '@/i18n';
import { useAppDispatch } from '@/store';
import { useTheme } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const loadingState = useSelector(selectAuthLoadingState);
  const error = useSelector(selectAuthError);

  const [submitted, setSubmitted] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setSubmitted(true);
    dispatch(fetchAuth({ username, password }));
  };

  useEffect(() => {
    if (submitted && loadingState === 'error' && error) {
      Alert.alert(i18n.t('login.error'), error);
    }
  }, [submitted, loadingState, error]);

  const backgroundColor = useMemo(() => {
    if (theme.dark) {
      return theme.colors.background;
    }
    return theme.colors.background;
  }, [theme]);

  const source = theme.dark
    ? require('@/assets/images/logo-dark.png')
    : require('@/assets/images/logo-light.png');

  const isButtonDisabled = useMemo(() => {
    return loadingState === 'loading' || username === '' || password === '';
  }, [loadingState, username, password]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, { backgroundColor }]}
      >
        <Image source={source} style={styles.logo} resizeMode="contain" />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ThemedView style={[styles.content, { backgroundColor: theme.colors.card }]}>
            <ThemedText type="title">{i18n.t('login.login')}</ThemedText>
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
              disabled={isButtonDisabled}
            />
          </ThemedView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
  },
  safeArea: {
    flex: 1,
  },
  logo: {
    width: 240,
    marginTop: 32,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
});
