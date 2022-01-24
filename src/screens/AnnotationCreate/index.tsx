import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import {
  Text,
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';

import AnnonationService from '../../services/AnnonationService';
import { Annotation } from '../../services/Controllers/AnnotationsController';
import { styles } from './styles';
import Toast from 'react-native-toast-message';

import { CategorySelect } from '../../components/CategorySelect';
import { Background } from '../../components/Background';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/auth';

type responseType = {
  message?: string;
  error?: string;
};

export default function AnnotationCreate() {
  const { user } = useAuth();

  const [category, setCategory] = useState('1');
  const [person, setPerson] = useState('');

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const navigation = useNavigation();

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  async function handleSave() {
    const newAnnotation = {
      id: uuid.v4(),
      person,
      category,
      email,
      name,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description,
    } as Annotation;

    let userId = user?.id;
    const response = (await AnnonationService.post(
      userId,
      newAnnotation
    )) as responseType;

    ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT);

    if (response && response?.message) {
      let type = 'sucess';
      showMessage(response.message, type);

      // setTimeout(() => {
      //   navigation.navigate('Home');
      // }, 500);
    }

    if (response?.error) {
      let type = 'error';
      showMessage(response.error, type);
    }
  }

  function showMessage(message: string, type: string) {
    Toast.show({
      type: 'sucess',
      text1: 'Help!Student',
      text2: `${message}`,
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Background>
        <ScrollView>
          <Header title="Cadastro" />

          <Text
            style={[
              styles.label,
              { marginLeft: 24, marginTop: 36, marginBottom: 18 },
            ]}
          >
            Selecione
          </Text>

          <CategorySelect
            hasCheckBox
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={styles.form}>
            {category === '1' && (
              <>
                <View style={styles.field}>
                  <View>
                    <Text style={[styles.label, { marginBottom: 12 }]}>
                      Dia e mês
                    </Text>

                    <View style={styles.column}>
                      <SmallInput maxLength={2} onChangeText={setDay} />
                      <Text style={styles.divider}>/</Text>
                      <SmallInput maxLength={2} onChangeText={setMonth} />
                    </View>
                  </View>

                  <View>
                    <Text style={[styles.label, { marginBottom: 12 }]}>
                      Hora e minuto
                    </Text>

                    <View style={styles.column}>
                      <SmallInput maxLength={2} onChangeText={setHour} />
                      <Text style={styles.divider}>:</Text>
                      <SmallInput maxLength={2} onChangeText={setMinute} />
                    </View>
                  </View>
                </View>

                <View style={[styles.field, { marginBottom: 12 }]}>
                  <Text style={styles.label}>Descrição da atividade</Text>

                  <Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
                </View>

                <TextArea
                  multiline
                  maxLength={100}
                  numberOfLines={5}
                  autoCorrect={false}
                  onChangeText={setDescription}
                />

                <View style={styles.footer}>
                  <Button title="Agendar" onPress={handleSave} />
                </View>
              </>
            )}

            {category === '2' && (
              <>
                <View style={styles.field}>
                  <View>
                    <Text style={[styles.label, { marginBottom: 12 }]}>
                      Dia e mês
                    </Text>

                    <View style={styles.column}>
                      <SmallInput maxLength={2} onChangeText={setDay} />
                      <Text style={styles.divider}>/</Text>
                      <SmallInput maxLength={2} onChangeText={setMonth} />
                    </View>
                  </View>

                  <View>
                    <Text style={[styles.label, { marginBottom: 12 }]}>
                      Hora e minuto
                    </Text>

                    <View style={styles.column}>
                      <SmallInput maxLength={2} onChangeText={setHour} />
                      <Text style={styles.divider}>:</Text>
                      <SmallInput maxLength={2} onChangeText={setMinute} />
                    </View>
                  </View>
                </View>

                <View style={[styles.field, { marginBottom: -15 }]}>
                  <Text style={styles.label}>Estudante / Professor</Text>
                </View>

                <View style={[styles.field]}>
                  <Input onChangeText={setPerson} />
                </View>

                <View style={[styles.field, { marginBottom: 12 }]}>
                  <Text style={styles.label}>Descrição</Text>

                  <Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
                </View>

                <TextArea
                  multiline
                  maxLength={100}
                  numberOfLines={5}
                  autoCorrect={false}
                  onChangeText={setDescription}
                />

                <View style={styles.footer}>
                  <Button title="Agendar" onPress={handleSave} />
                </View>
              </>
            )}

            {category === '3' && (
              <>
                <View style={[styles.field, { marginBottom: -15 }]}>
                  <Text style={styles.label}>E-mail</Text>
                </View>

                <View style={[styles.field]}>
                  <Input onChangeText={setEmail} />
                </View>

                <View style={[styles.field, { marginBottom: -15 }]}>
                  <Text style={styles.label}>Nome</Text>
                </View>

                <View style={[styles.field, { marginBottom: 12 }]}>
                  <Input onChangeText={setName} />
                </View>

                <View style={styles.footer}>
                  <Button title="Cadastrar" onPress={handleSave} />
                </View>
              </>
            )}

            {category === '4' && (
              <>
                <View style={[styles.field, { marginBottom: -15 }]}>
                  <Text style={styles.label}>Nome</Text>
                </View>

                <View style={[styles.field]}>
                  <Input onChangeText={setName} />
                </View>

                <View style={[styles.field, { marginBottom: 12 }]}>
                  <Text style={styles.label}>Descrição</Text>

                  <Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
                </View>

                <TextArea
                  multiline
                  maxLength={100}
                  numberOfLines={5}
                  autoCorrect={false}
                  onChangeText={setDescription}
                />

                <View style={styles.footer}>
                  <Button title="Cadastrar" onPress={handleSave} />
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </Background>
    </KeyboardAvoidingView>
  );
}
