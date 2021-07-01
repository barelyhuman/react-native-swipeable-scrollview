import React, { ReactNode } from 'react';
import { View } from 'react-native';

type PaddingProps = {
  x?: number;
  y?: number;
  all?: number;
  spread?: boolean;
  children: ReactNode;
};

export default function Padding({
  children,
  x = 0,
  y = 0,
  all = 0,
  spread,
}: PaddingProps) {
  const multiplier = 8;

  if (all && typeof all !== 'number') {
    all = 0;
  }

  if (x && typeof x !== 'number') {
    x = 0;
  }

  if (y && typeof y !== 'number') {
    y = 0;
  }

  const paddingStyle = {
    paddingTop: all * multiplier || y * multiplier || 0,
    paddingRight: all * multiplier || x * multiplier || 0,
    paddingLeft: all * multiplier || x * multiplier || 0,
    paddingBottom: all * multiplier || x * multiplier || 0,
    flexGrow: spread ? 1 : 0,
  };

  return (
    <>
      <View style={paddingStyle}>{children}</View>
    </>
  );
}
