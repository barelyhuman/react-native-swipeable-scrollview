# react-native-swipeable-scrollview

Simpler bottom sheet using scrollviews

## Why?

This is an extracted piece of code from most of my simple bottom sheet implementations where heavy libraries for a simple scroll set animation isn't required. This library **doesn't use gesture-handler or reanimated** and is based off of the default views from react-native instead. If you do need something extensive, consider using the below alternative(s):

- https://jeremybarbet.github.io/react-native-modalize/#/
- https://github.com/gorhom/react-native-bottom-sheet

## Installation

```sh
npm install react-native-swipeable-scrollview
```

## Usage

```js
import SwipeableScrollview from "react-native-swipeable-scrollview";

// ...

return ()
<SwipeableScrollview
  breakpoints={['40%', '92%']}
  containerStyles={styles.bottomSheet} >
  <View>
    <Text>hello world</Text>
  </View>
</SwipeableScrollview>
```

## Demo

![](static/demo.gif)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
