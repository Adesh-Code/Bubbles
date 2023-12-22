import notifee, { AndroidImportance } from '@notifee/react-native';
import React from 'react';
import { Button, NativeModules, View } from 'react-native';

const {BubbleModule} = NativeModules;

export default function Screen() {
  function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}
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
    BubbleModule.showBubble();

    // Display a notification
    // await notifee.displayNotification({
    //   title: 'Notification Title',
    //   body: 'Main body content of the notification',
    //   android: {
    //     channelId: 'Bubble',
    //     // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
    //     // pressAction is needed if you want the notification to open the app when pressed
    //     pressAction: {
    //       id: 'default',
    //     },
    //   },
    // });
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
