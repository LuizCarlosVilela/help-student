import React from 'react';
import { Image, View } from 'react-native';

import { SvgProps } from 'react-native-svg';

import { styles } from './styles';
import DiscordSvg from '../../assets/class-educational.svg';

type Props = {
  icon: React.FC<SvgProps>;
};

export default function CategoryIcon({ icon: Icon }: Props) {
  return (
    <View style={styles.container}>
      {Icon ? (
        <Icon width={40} height={40} />
      ) : (
        <DiscordSvg width={40} height={40} />
      )}
    </View>
  );
}
