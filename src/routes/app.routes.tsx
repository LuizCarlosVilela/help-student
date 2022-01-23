import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { theme } from '../global/styles/theme';

import Home from '../screens/Home';
import AnnotationCreate from '../screens/AnnotationCreate';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.colors.secondary100,
        },
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="AnnotationCreate" component={AnnotationCreate} />
    </Navigator>
  );
}
