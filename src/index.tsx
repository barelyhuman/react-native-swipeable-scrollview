import React, { ReactNode, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Dimensions,
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

const DEFAULT_VALUES = {
  friction: 100,
  windowOffset: 10,
  scrollYOffset: 50,
};

const normalizeBreakpoints = (breakpoint: string | number): number => {
  if (typeof breakpoint === 'string' && breakpoint.indexOf('%') > -1) {
    const asInt = Number(breakpoint.replace('%', '').trim());
    const deviceHeight = Dimensions.get('window').height;

    return deviceHeight * (asInt / 100);
  }
  return Number(breakpoint);
};

type SwipableScrollViewProps = {
  breakpoints?: (string | number)[];
  containerStyles?: ViewStyle;
  children: ReactNode;
  friction?: number;
  windowOffset?: number;
  scrollYOffset?: number;
};

function SwipableScrollView({
  breakpoints,
  children,
  friction = DEFAULT_VALUES.friction,
  windowOffset = DEFAULT_VALUES.windowOffset,
  containerStyles,
  scrollYOffset = DEFAULT_VALUES.scrollYOffset,
}: SwipableScrollViewProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const windowHeight = useWindowDimensions().height;
  const containerHeight: Animated.Value = useRef(
    new Animated.Value(200)
  ).current;

  const topValue = useRef(
    new Animated.Value(
      windowHeight - (containerHeight as any)._value - windowOffset
    )
  ).current;

  const minPoint = (breakpoints && normalizeBreakpoints(breakpoints[0])) || 200;
  const maxPoint =
    (breakpoints && normalizeBreakpoints(breakpoints[1])) || windowHeight;

  const animateHeight = (height: number) => {
    Animated.spring(topValue, {
      toValue: windowHeight - height,
      friction,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      Animated.spring(containerHeight, {
        toValue: height,
        friction,
        useNativeDriver: true,
      }).start();
    }, 1000);
  };

  const handleScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y <= 0) {
      animateHeight(minPoint);
    }
  };

  const _handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (
      e.nativeEvent &&
      e.nativeEvent.contentOffset &&
      e.nativeEvent.contentOffset.y > scrollYOffset
    ) {
      setSheetOpen(true);
      animateHeight(maxPoint);
    }
  };

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          containerStyles,
          {
            height: sheetOpen ? maxPoint : minPoint,
            top: topValue,
          },
        ]}
      >
        <ScrollView
          style={{
            height: maxPoint,
          }}
          onScroll={_handleScroll}
          contentContainerStyle={[styles.scrollViewContainer]}
          scrollEventThrottle={10}
          onScrollEndDrag={handleScrollEndDrag}
        >
          {children}
        </ScrollView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    overflow: 'visible',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  scrollViewContainer: { flexGrow: 1 },
});

export default SwipableScrollView;
