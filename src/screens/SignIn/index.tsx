import React from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';

import { useAuth } from '../../hooks/auth';

import IllustrationImg from '../../assets/illustration.png';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';

export function SignIn() {
  const { loading, signIn } = useAuth();

  async function handleSignIn() {
    try {
      await signIn();
    } catch (error: any) {
      Alert.alert(error);
    }
  }

  return (
    <Background>
      <ImageBackground
        style={styles.container}
        source={{
          uri: 'https://user-images.githubusercontent.com/57350762/149647028-13a25dcf-18f2-4551-bdda-15d5c3c8cbce.png',
        }}
        resizeMode="cover"
      >
        <Image
          source={IllustrationImg}
          style={styles.image}
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>Entre e organize sua vida acadêmica</Text>

          <Text style={styles.subtitle}>feito por alunos para alunos</Text>

          {loading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <ButtonIcon title="Entrar com Google" onPress={handleSignIn} />
          )}
        </View>
      </ImageBackground>
    </Background>
  );
}
