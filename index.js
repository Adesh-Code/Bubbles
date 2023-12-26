/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee from '@notifee/react-native';
import { BackgroundTask } from './src/Services/background_service';

AppRegistry.registerComponent(appName, () => App);

notifee.requestPermission();

notifee.registerForegroundService(notification => {
  return new Promise(() => {
    const setInter = setInterval(() => {
      const didTaskComplete = BackgroundTask();
      if (didTaskComplete) {
        // wait until 5 seconds else stop the notification task
        setTimeout(() => {
          clearInterval(setInter);
          notifee.stopForegroundService();
          notifee.cancelAllNotifications();
        }, 5000);
      } else {
        notifee.displayNotification({
          id: notification.id,
          body: notification.body,
          title: notification.title,
          android: {
            ...notification.android,
          },
        });
      }
      
    }, 2000);
  });
});
