import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import * as asyncService from './Services/async_storage_service';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { ServiceData } from "./Types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as constant from './Constants/constant';   

const Frontend = () => {
    const [imageCount, setImageCount] = useState(1);
    const [videoCount, setVideoCount] = useState(1);
    const testURI = 'ftp://test';

    const startService = async () => {
        // This contains current Service Details which can be used to abort this functionality outside of this service.
        const serviceData : ServiceData | null = await AsyncStorage.getItem(constant.ASYNC_KEY_BACKGROUND_SERVICE).then(data => data ? JSON.parse(data) : null);

        if (serviceData === null || serviceData.id === null) {
            await asyncService.saveBackgroundServiceData({id: constant.BACKGROUND_SERVICE_UNIQUE_ID});
            await notifee.displayNotification({
                id: constant.BACKGROUND_SERVICE_UNIQUE_ID,
                title: 'Data is Uploading Please Wait...',
                body: 'Please keep internet connectivity active!',
                android: {
                  asForegroundService: true,
                  autoCancel: false,
                  channelId: 'Bubble',
                  ongoing: true,
                  onlyAlertOnce: true,
                  importance: AndroidImportance.HIGH,
                  showTimestamp: true,
                  progress: {
                    current: 0,
                    max: 10,
                  },
                },
              });
        } else {
            console.log('There is already one service runnning please wait....')
        }
    }

    return(
        <View>
            <Text style={{textAlign: 'center'}}>Async Storage Stuffs</Text>
            <Button onPress={asyncService.initializeAsync} title="Initialize" />
            <Button onPress={asyncService.getAsyncData} title="Get Data" />
            <Button onPress={asyncService.removeBackgroundServiceData} title="Remove Background Service" />
            
            <Button onPress={async () => {
                await asyncService.removeImageData(imageCount);
                setImageCount(imageCount - 1);
            }} title="Remove Image" />
            
            <Button onPress={async () => {
                await asyncService.removeVideoData(videoCount);
                setVideoCount(videoCount - 1);
            }} title="Remove Video" />
            {/* <Button onPress={async.toggleInspector} title="Toggle Inspector" /> */}
            <Button onPress={async() => {
                await asyncService.flushAsync();
                setImageCount(1);
            }} title="Flush Async" color={'red'} />
            <View style={{height: 30}} />
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <Button onPress={async () => {
                await asyncService.saveImageData(imageCount, `${testURI}/image/${imageCount}`);
                setImageCount(imageCount+ 1);
                startService();
            }} title="Capture Image" />
            <Button onPress={async () => {
                await asyncService.saveVideoData(videoCount, `${testURI}/video/${videoCount}`);
                setVideoCount(videoCount + 1);
                startService();
            }} title="Capture Video" />
            </View>
        </View>
    )
}

export default Frontend;
