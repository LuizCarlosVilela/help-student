import React from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgProps } from 'react-native-svg';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = {
  title: string;
  icon: React.FC<SvgProps>;
  hasCheckBox?: boolean;
  checked?: boolean;
  onPress: () => void;
};

export function Category({
  title,
  icon: Icon,
  checked = false,
  hasCheckBox = false,
  onPress,
}: Props) {
  const { secondary40, secondary50, secondary60, secondary85 } = theme.colors;

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <LinearGradient
        style={styles.container}
        colors={[secondary50, secondary60]}
      >
        <LinearGradient
          style={[styles.content, { opacity: checked ? 2 : 1 }]}
          colors={[checked ? secondary85 : secondary50, secondary40]}
        >
          {hasCheckBox && (
            <View style={checked ? styles.checked : styles.check} />
          )}

          <Icon width={48} height={48} />

          <Text style={styles.title}>{title}</Text>
        </LinearGradient>
      </LinearGradient>
    </TouchableNativeFeedback>
  );
}
