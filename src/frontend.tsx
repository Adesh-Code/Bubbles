import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import * as asyncService from './Services/async_storage_service';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { ServiceData } from "./Types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as constant from './Constants/constant';   

const Frontend = () => {
    const [siteId, setSiteId] = useState('1');
    const testURI = 'ftp://test';

    const startService = async () => {
        // This contains current Service Details which can be used to abort this functionality outside of this service.
        const serviceData : ServiceData | null = await AsyncStorage.getItem(constant.ASYNC_KEY_BACKGROUND_SERVICE).then(data => JSON.parse(data ?? 'null'));

        
        if (serviceData == null || serviceData.id == null) {
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
                    indeterminate: true
                  },
                },
              });
            await asyncService.saveBackgroundServiceData(constant.BACKGROUND_SERVICE_UNIQUE_ID);
        } else {
            console.log('There is already one service runnning please wait....');
        }
    }

    const submitSite = async () => {
        await asyncService.updateSiteDataByKey(siteId, 'isSubmitted', true);
        await startService();
    }

    useEffect(() => {
        // start inspector Service at start
        startService();
    }, []);

    return(
        <View>
            <Text style={{textAlign: 'center'}}>Async Storage Stuffs</Text>
            <Button onPress={asyncService.initializeAsync} title="Initialize" />
            <Button onPress={asyncService.getAsyncData} title="Get Data" />
            <Button onPress={asyncService.removeBackgroundServiceData} title="Remove Background Service" />
            
            {/* <Button onPress={async () => {
                await asyncService.removeImageData(siteId, imageCount);
            }} title="Remove Image" />
            
            <Button onPress={async () => {
                await asyncService.removeVideoData(siteId, videoCount);
            }} title="Remove Video" /> */}
            {/* <Button onPress={async.toggleInspector} title="Toggle Inspector" /> */}
            <Button onPress={async() => {
                await asyncService.flushAsync();
            }} title="Flush Async" color={'red'} />
            <View style={{height: 30}} />
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <Button onPress={ () => {
                    setSiteId('1');
                }} title="Site 1" />
                <Button onPress={ () => {
                    setSiteId('2');
                }} title="Site 2" />
                <Button onPress={ () => {
                    setSiteId('3');
                }} title="Site 3" />
            </View>
            <View style={{height: 30}} />
            <Text>Images:</Text>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <Button onPress={async () => {
                    await asyncService.updateSiteDataByKey(siteId,'img1', `${testURI}/image/1`);
                    startService();
                }} title="1" />
                <Button onPress={async () => {
                    await asyncService.updateSiteDataByKey(siteId,'img2', `${testURI}/image/2`);
                    startService();
                }} title="2" />
                <Button onPress={async () => {
                    await asyncService.updateSiteDataByKey(siteId,'img3', `${testURI}/image/3`);
                    startService();
                }} title="3" />
                <Button onPress={async () => {
                    await asyncService.updateSiteDataByKey(siteId,'img4', `${testURI}/image/4`);
                    startService();
                }} title="4" />
            </View>
            <View style={{height: 30}} />
            <Text>Videos</Text>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <Button onPress={async () => {
                    await asyncService.updateSiteDataByKey(siteId,'videoUrl', `${testURI}/video/1`);
                    startService();
                }} title="Capture Video" />
                <Button onPress={async () => {
                    await asyncService.updateSiteDataByKey(siteId,'videoUrl1', `${testURI}/video/2`);
                    startService();
                }} title="Capture Video2" />
            </View>
            <View style={{height: 30}} />
            <Text style={{textAlign: 'center'}}>current SiteId: {siteId}</Text>
            <View style={{height: 30}} />
            <Button onPress={submitSite} title="Submit" />
            
        </View>
    )
}

export default Frontend;
