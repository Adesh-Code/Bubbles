import { useEffect, useState } from "react";
import {Button, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { openPicker, openCamera } from "react-native-image-crop-picker";
import { InspectorData, ServiceData, SiteData } from "./Types/types";
import * as constant from './Constants/constant';
import * as asyncService from './Services/async_storage_service';
import notifee, { AndroidImportance } from '@notifee/react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
  
const NewFrontend = () => {
    const [siteData, setSiteData] = useState<SiteData[]>(constant.dummyData);
    const [asyncData, setAsyncData] = useState<{ key: string; value: any; }[]>();

    const handleCamera = async <K extends keyof typeof siteData[0]>(siteId: string, contentKey: K, contentType: string) => {
        try {
          const result = await openCamera({
            mediaType: contentType === 'photo' ? 'photo' : 'video',
          });
      
          // Find the index of the siteData entry with the matching siteId
          const index = siteData.findIndex((data) => data.siteId === siteId);
      
          if (index !== -1) {
      
            // Check if the contentKey has a value in the current siteData entry
            siteData[index][contentKey] = result.path;
           
            // Update the state with the modified siteData
            setSiteData([...siteData]);
            await asyncService.updateSiteDataByKey(siteId, contentKey, result.path);
            await startService();
          }
        } catch (error) {
          console.log(error, 'when capturing camera');
        }
      };

      const startService = async () => {
        // This contains current Service Details which can be used to abort this functionality outside of this service.
        const serviceData : ServiceData | null = await AsyncStorage.getItem(constant.ASYNC_KEY_BACKGROUND_SERVICE).then(data => JSON.parse(data ?? 'null'));
        const inspectorData : InspectorData | null = await AsyncStorage.getItem(constant.ASYNC_KEY_INSPECTOR).then(data => data ? JSON.parse(data) : null);
        const siteData : SiteData[] | null = await AsyncStorage.getItem(constant.ASYNC_KEY_SITE_DATA).then(data => data ? JSON.parse(data) : null);

        if (serviceData !== null && inspectorData !== null) {
            // there is no service running
           if (serviceData.id === null) {
             // inspector says go ahead
                if (inspectorData.canProceed === true) {
                    if (siteData !== null && siteData.length > 0) {
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
                        console.log('There is no data to work on...');
                    }
                } else {
                    console.log('Inspector is responding! please wait....');
                }
           } else {
                console.log('There is already one service runnning please wait....');
           }
        } else {
            await asyncService.initializeAsync();
            await startService();
        }
    }
        const getData = async () => {
            const newData = await asyncService.getAsyncData().then(val => val);
            setAsyncData(newData);
        }
      
        useEffect(() => {
            // start inspector Service at start
            startService();

            setTimeout(async () => {
                const serviceData : ServiceData | null = await AsyncStorage.getItem(constant.ASYNC_KEY_BACKGROUND_SERVICE).then(data => JSON.parse(data ?? 'null'));
                const currentTime = new Date();
                const twentyFourHoursAgo = new Date(currentTime);
                twentyFourHoursAgo.setHours(currentTime.getHours() - 24);

                if (serviceData !== null && serviceData.timeStarted !== null && serviceData.timeStarted < twentyFourHoursAgo) {
                    await asyncService.removeBackgroundServiceData();
                }   
            }, 100000);

        }, []);

    return (
        <SafeAreaView style={{marginTop: 50}}>
            <ScrollView>
            <View style={{ marginHorizontal: 10 }}>
            {
                siteData?.map((siteDataElement) => {
                const contentKeys: Array<keyof typeof siteDataElement> = ['img1', 'img2', 'img3', 'img4', 'videoUrl', 'videoUrl1'];

                return (
                    <View key={siteDataElement.siteId} style={{ flexDirection: 'row', marginBottom: 50, justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: 'white', alignSelf:'center' }}>Site : {siteDataElement.siteId}</Text>
                    {
                        contentKeys.map((contentKey) => {

                        const contentType = contentKey.startsWith('img')
                            ? 'photo'
                            : 'video';

                            let icon = contentType === 'photo' ? 'insert-photo' : 'video-file';

                        return (
                            <TouchableOpacity
                                style={contentType === 'video' ? {paddingLeft: 20}: {paddingLeft: 10}}
                                key={contentKey}
                                onPress={() => handleCamera(siteDataElement.siteId, contentKey, contentType)}
                            >
                                <Icon name={icon} size={40} color={'grey'} />
                            </TouchableOpacity>
                        );
                        })
                    }
                    </View>
                );
                })
            }
            </View>
            <Button onPress={getData} title="Get Data"/>
            <Button onPress={async() => {
                await asyncService.flushAsync();
            }} title="Flush Async" color={'red'} />
            <View>
                <Text>{JSON.stringify(siteData, null, 1)}</Text>
            </View>
            <View style={{marginTop: 20}}>
                <Text>{JSON.stringify(asyncData, null, 1)}</Text>
            </View>
            </ScrollView>
        </SafeAreaView> 
    );

}

export default NewFrontend;