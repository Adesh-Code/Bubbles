import notifee, { AndroidColor, AndroidImportance } from '@notifee/react-native';
import React from 'react';
import { Button, NativeModules, View } from 'react-native';

const {BubbleModule} = NativeModules;

export default function Screen() {
  //   function timeout(delay: number) {
  //     return new Promise( res => setTimeout(res, delay) );
  // }
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    // const channelId = await notifee.createChannel({
    //   id: 'Bubble',
    //   name: 'Bubbles',
    //   importance: AndroidImportance.HIGH,
    // });

    // await timeout(1000);
    // BubbleModule.showBubble();

    notifee.displayNotification({
      title: 'Foreground service',
      body: 'This notification will exist for the lifetime of the service runner',
      android: {
        channelId: 'Bubble',
        color: AndroidColor.RED,
        colorized: true,
      },
    });
  }

  return (
    <View>
      <Button
        title="Display Notification"
        onPress={() => onDisplayNotification()}
      />
    </View>
  );
}
