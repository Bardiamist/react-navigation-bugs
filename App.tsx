import React, {
  memo,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation-stack';
import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import {
  createNavigation,
  setNavigationContainer,
} from './navigationHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdScreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  thirdScreenContentContainer: {
    height: 120,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mainNavigationKey = 'mainNavigation';

export const mainNavigation = createNavigation(mainNavigationKey);

const FirstScreen = memo(() => {
  return (
    <View style={styles.container}>
      <Text>First screen content</Text>
    </View>
  );
});

const SecondScreen = memo(({
  navigation: {
    navigate,
  },
}) => {
  const onPress = useCallback(() => {
    navigate('thirdScreen');
  }, []);

  return (
    <View style={styles.container}>
      <Text>Second screen content</Text>
      <Button title="Push" onPress={onPress} />
    </View>
  );
});

const ThirdScreen = memo(({
  navigation: {
    push,
  },
}) => {
  const onPress = useCallback(() => {
    // push('main');
    mainNavigation.push('secondScreen');
  }, []);

  return (
    <View style={styles.thirdScreenContainer}>
      <View style={styles.thirdScreenContentContainer}>
        <Text>Third screen content</Text>
      </View>
    </View>
  );
});

ThirdScreen.navigationOptions = { cardStyle: { backgroundColor: 'transparent' } };

const StackNavigator = createStackNavigator(
  {
    firstScreen: {
      screen: FirstScreen,
    },
    secondScreen: {
      screen: SecondScreen,
    },
    thirdScreen: {
      screen: ThirdScreen,
    },
  },
  {
    initialRouteName: 'firstScreen',
  },
);

const SwitchNavigator = createSwitchNavigator(
  {
    splash: {
      screen: View,
    },
    mainStackNavigator: {
      screen: StackNavigator,
    },
    anotherStack: {
      screen: View,
    },
  },
  {
    initialRouteName: 'splash',
  },
);

const AppContainer = createAppContainer(SwitchNavigator);

export default memo(() => {
  const appContainerRef = useRef(null);

  useLayoutEffect(() => {
    setNavigationContainer(mainNavigationKey, appContainerRef);
    mainNavigation.reset('secondScreen');
  }, []);

  return <AppContainer ref={appContainerRef} />;
});
