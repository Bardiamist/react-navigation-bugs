import React, {
  memo,
  useCallback,
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
  createAppContainer,
} from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  modalScreenContentContainer: {
    height: 120,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MainScreen = memo(({
  navigation: {
    navigate,
  },
}) => {
  const onPress = useCallback(() => {
    navigate('modalScreen');
  }, []);

  return (
    <View style={styles.container}>
      <Text>Main screen content</Text>
      <Button title="Open modal" onPress={onPress} />
    </View>
  );
});

const ModalScreen = memo(() => {
  return (
    <View style={styles.modalScreenContainer}>
      <View style={styles.modalScreenContentContainer}>
        <Text>Modal screen content</Text>
      </View>
    </View>
  );
});

ModalScreen.navigationOptions = { cardStyle: { backgroundColor: 'transparent' } };

const StackNavigator = createStackNavigator(
  {
    mainScreen: {
      screen: MainScreen,
    },
    modalScreen: {
      screen: ModalScreen,
    },
  },
  {
    initialRouteName: 'mainScreen',
  },
);

const AppContainer = createAppContainer(StackNavigator);

export default memo(() => {
  return <AppContainer />;
});
