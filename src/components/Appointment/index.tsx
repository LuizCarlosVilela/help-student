import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';

import CategoryIcon from '../CategoryIcon';
import { categories } from '../../utils/categories';

export type AppointmentProps = {
  id: string;
  category: string;
  date: string;
  description: string;
  person: string;
};

type Props = RectButtonProps & {
  data: AppointmentProps;
};

export function Appointment({ data, ...rest }: Props) {
  const [category] = categories.filter((item) => item.id === data.category);
  const { primary, on, secondary50, secondary70 } = theme.colors;

  return (
    <RectButton {...rest}>
      <View style={styles.container}>
        <LinearGradient
          style={styles.guildIconContainer}
          colors={[secondary50, secondary70]}
        >
          <CategoryIcon icon={category.icon} />
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.category}>{category.title}</Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <CalendarSvg />

              <Text style={styles.date}>{data.date}</Text>
            </View>

            {data.person != '' && (
              <View style={styles.playersInfo}>
                <PlayerSvg fill={data.person ? primary : on} />

                <Text
                  style={[styles.player, { color: data.person ? primary : on }]}
                >
                  {data.person}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </RectButton>
  );
}
