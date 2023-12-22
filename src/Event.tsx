import {
  ActivityIndicator,
  NativeModules,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
// import floatingBubble from '@fabithub/react-native-floating-bubble';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Screen from './notifee';

const {PipModule} = NativeModules;

const PiPExample = () => {
  // const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>();
  // const [bubbleInitialized, setBubbleInitialized] = useState<boolean>(false);
  // const [counter, setCounter] = useState<number>(0);

  const enterPiPMode = () => {
    PipModule.enterPipMode();
  };

  // const initializeBubble = async () => {
  //   if (!bubbleInitialized) {
  //     setBubbleInitialized(true);
  //     await floatingBubble
  //       .requestPermission()
  //       .then(() => console.log('Permission Granted'))
  //       .catch(() => console.log('Permission is not granted'));

  //     await floatingBubble.reopenApp();

  //     await floatingBubble
  //       .initialize()
  //       .then(() => console.log('Initialized the bubble mange'));
  //   }
  // };

  // const showButtonToUser = async (x: number, y: number) => {
  //   await floatingBubble.showFloatingBubble(x, y).then(() => {
  //     const intervalIdCurrent = setInterval(() => {
  //       console.log('hello');
  //     }, 3000);

  //     setIntervalId(intervalIdCurrent);
  //   });
  // };

  // const hideButtonFromUser = async () => {
  //   await floatingBubble
  //     .hideFloatingBubble()
  //     .then(() => console.log('Floating Bubble Removed'));

  //   if (intervalId != null) {
  //     clearInterval(intervalId);
  //     setIntervalId(null);
  //   }
  // };

  // const getAsync = async () => {
  //   const data = await AsyncStorage.getItem('awesomeappTestKey');
  //   console.log('counter in async', data);
  // };

  useEffect(() => {
    // initializeBubble();
    // const subscriptionPress = DeviceEventEmitter.addListener(
    //   'floating-bubble-press',
    //   async (e) => {
    //     setCounter(counter + 1);
    //     await AsyncStorage.setItem('awesomeappTestKey', String(counter + 1));
    //     // What to do when user press the bubble
    //     console.log('Press Bubble');
    //   },
    // );
    // const subscriptionRemove = DeviceEventEmitter.addListener(
    //   'floating-bubble-remove',
    //   e => {
    //     // What to do when user removes the bubble
    //     console.log('Remove Bubble');
    //     if (intervalId != null) {
    //       clearInterval(intervalId);
    //       setIntervalId(null);
    //     }
    //   },
    // );
    // return () => {
    //   subscriptionPress.remove();
    //   subscriptionRemove.remove();
    // };

  }, []);

  return (
    <TouchableOpacity onPress={enterPiPMode}>
      <Text>Enter Picture-in-Picture Mode</Text>
      <ActivityIndicator animating />
      <Screen />
      {/* <Button title="show" onPress={() => showButtonToUser(10, 10)} />
      <Button title="hide" onPress={hideButtonFromUser} />
      <Button title="async counter" onPress={getAsync} />
      <Text>{counter}: Counter</Text> */}
    </TouchableOpacity>
  );
};

export default PiPExample;
