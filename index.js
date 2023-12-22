/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

AppRegistry.registerComponent(appName, () => App);

const onTaskUpdate = async () => {
  const counter = await AsyncStorage.getItem('awesomeappTestKey');
  // resets every 20 iterations.
  const correctData = counter
    ? isNaN(Number.parseInt(counter, 10))
      ? 0
      : Number.parseInt(counter, 10) > 20
      ? 0
      : Number.parseInt(counter, 10)
    : 0;
  await AsyncStorage.setItem('awesomeappTestKey', String(correctData + 1));
  // Your logic for handling task updates
  console.log('counter', counter, 'correctData', correctData);
  return correctData;
};

notifee.registerForegroundService(notification => {
  return new Promise(() => {
    const setInter = setInterval(() => {
      const currentCount = onTaskUpdate();
      notifee.displayNotification({
        id: notification.id,
        body: notification.body,
        android: {
          ...notification.android,
        },
      });
    }, 2000);

    setTimeout(() => {
      clearInterval(setInter);
      notifee.stopForegroundService();
      notifee.cancelAllNotifications();
    }, 20000);
  });
});
