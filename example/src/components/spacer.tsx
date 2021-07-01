import React from 'react';
import { StyleSheet, View } from 'react-native';

type SpacerProps = {
  x?: number;
  y?: number;
  percent?: boolean;
};

export default function Spacer({ percent, x, y }: SpacerProps) {
  const spacingMultiplier = 8;

  const toPercentage = (value: number | string): number | string => {
    if (percent) {
      return value + '%';
    }
    return value;
  };

  const style = StyleSheet.create({
    spacer: {
      height: 1,
      width: 1,
      marginLeft: x ? toPercentage(spacingMultiplier * x) : undefined,
      marginTop: y ? toPercentage(spacingMultiplier * y) : undefined,
    },
  });

  return <View style={style.spacer} />;
}
