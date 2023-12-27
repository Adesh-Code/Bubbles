/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee from '@notifee/react-native';
import { InspectorService } from './src/Services/background_service';
import * as asyncService from './src/Services/async_storage_service';

AppRegistry.registerComponent(appName, () => App);

notifee.requestPermission();

notifee.registerForegroundService(notification => {
  return new Promise(async () => {
    const setInter = setInterval(async () => {
      const didTaskComplete = await InspectorService();

      if (didTaskComplete) {
        // wait until 5 seconds else stop the notification task
        setTimeout(() => {
          asyncService.removeBackgroundServiceData();
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

