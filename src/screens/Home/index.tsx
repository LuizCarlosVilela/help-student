import React, { useState, useCallback } from 'react';
import { View, FlatList, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AnnonationService from '../../services/AnnonationService';
import { Annotation as AnnotationType } from '../../services/Controllers/AnnotationsController';

import { CategorySelect } from '../../components/CategorySelect';
import { Annotation, AnnotationProps } from '../../components/Annotation';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Profile } from '../../components/Profile';
import { Load } from '../../components/Load';
import { useAuth } from '../../hooks/auth';

import logo from '../../assets/logo.png';

import { styles } from './styles';
import { COLLECTION_ANNOTATIONS } from '../../configs/database';

export default function Home() {
  const { user } = useAuth();
  const [category, setCategory] = useState('1');
  const [loading, setLoading] = useState(true);
  const [annotations, setAnnotations] = useState<AnnotationProps[]>([]);

  const navigation = useNavigation();

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAnnotationDetails(guildSelected: AnnotationProps) {
    console.log(guildSelected);
  }

  function handleAnnotationCreate() {
    navigation.navigate('AnnotationCreate');
  }

  async function loadAnnotations() {
    let userId = user?.id;
    const response = await AnnonationService.list(userId);

    if (response) {
      if (category) {
        setAnnotations(response.filter((item) => item.category === category));
      } else {
        setAnnotations(response);
      }
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadAnnotations();
    }, [category])
  );

  return (
    <Background>
      <View style={styles.header}>
        <Image source={logo} />
        <View style={styles.contentHeader}>
          <Profile />
          <ButtonAdd onPress={handleAnnotationCreate} />
        </View>
      </View>

      <CategorySelect
        hasCheckBox
        setCategory={handleCategorySelect}
        categorySelected={category}
      />

      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Cadastrados"
            subtitle={`Total ${annotations.length}`}
          />

          <FlatList
            data={annotations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Annotation
                data={item}
                onPress={() => handleAnnotationDetails(item)}
              />
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            contentContainerStyle={{ paddingBottom: 69 }}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </Background>
  );
}
