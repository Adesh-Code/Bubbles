import AsyncStorage from "@react-native-async-storage/async-storage";
import * as constant from "../Constants/constant";
import { InspectorData, SiteData } from "../Types/types";

export const initializeAsync = async () => {
    const siteDummyData: SiteData[] = [
        {
            "siteId": '1',
            "img1": null,
            "img2": null,
            "img3": null,
            "img4": null,
            "videoUrl": null,
            "videoUrl1": null,
            "vendorRemark": "",
            "reportingTime": '',
            "problemWithSite": '',
            "lat": 0,
            "long": 0,
            "isSubmitted": false,
        },
        {
            "siteId": '2',
            "img1": null,
            "img2": null,
            "img3": null,
            "img4": null,
            "videoUrl": null,
            "videoUrl1": null,
            "vendorRemark": "",
            "reportingTime": '',
            "problemWithSite": '',
            "lat": 0,
            "long": 0,
            "isSubmitted": false,
        },
        {
            "siteId": '3',
            "img1": null,
            "img2": null,
            "img3": null,
            "img4": null,
            "videoUrl": null,
            "videoUrl1": null,
            "vendorRemark": "",
            "reportingTime": '',
            "problemWithSite": '',
            "lat": 0,
            "long": 0,
            "isSubmitted": false,
        }
    ]

    const serviceDummyData = {
        id : null,
    }

    const inspectorDummyData: InspectorData = {
        canProceed: true,
    }

    if (await AsyncStorage.getItem(constant.ASYNC_KEY_INSPECTOR) == null) {
        await AsyncStorage.setItem(constant.ASYNC_KEY_INSPECTOR, JSON.stringify(inspectorDummyData));
    }

    if (await AsyncStorage.getItem(constant.ASYNC_KEY_SITE_DATA) == null) {
        await AsyncStorage.setItem(constant.ASYNC_KEY_SITE_DATA, JSON.stringify(siteDummyData));
    }

    if (await AsyncStorage.getItem(constant.ASYNC_KEY_BACKGROUND_SERVICE) == null) {
        await AsyncStorage.setItem(constant.ASYNC_KEY_BACKGROUND_SERVICE, JSON.stringify(serviceDummyData));
    }
    console.log('Successfully initialized the asyncStorage');
}

export const updateSiteDataByKey = async (siteId: string, contentKey: string, value: any) => {
    const siteDummyData : SiteData = {
            "siteId": '3',
            "img1": null,
            "img2": null,
            "img3": null,
            "img4": null,
            "videoUrl": null,
            "videoUrl1": null,
            "vendorRemark": "",
            "reportingTime": '',
            "problemWithSite": '',
            "lat": 0,
            "long": 1,
            "isSubmitted": false,
        }
    
        const tempData = await AsyncStorage.getItem(constant.ASYNC_KEY_SITE_DATA);
        const allSiteData: SiteData[] = JSON.parse(tempData ?? "[]");

        // Find the index of the site based on siteId
        const siteIndex = allSiteData.findIndex((site) => site.siteId === siteId);

        if (siteIndex !== -1) {
        // Update the object at the found index
        allSiteData[siteIndex] = {
            ...allSiteData[siteIndex],
            [contentKey]: value,
        };}
        else {
            const newElement = {...siteDummyData, siteId: siteId, [contentKey]: value}
              allSiteData.push(newElement);
        }
        // Save the updated array back to AsyncStorage
        await AsyncStorage.setItem(constant.ASYNC_KEY_SITE_DATA, JSON.stringify(allSiteData));

        console.log('Saved Image', contentKey);
    
}

export const getAsyncData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const data = await AsyncStorage.multiGet(keys);
    const result = data.map(([key, value]) => ({ key, value: JSON.parse(value ?? 'null') }));
    console.log('All data from Async:');
    result.forEach(({ key, value }) => {
        console.log(`${key} ===>`);
        if (Array.isArray(value)) {
          // If the value is an array, display each element on a new line
          value.forEach((element, index) => {
            console.log(`  - ${index + 1}: ${JSON.stringify(element)}`);
          });
        } else {
          console.log(`  ${JSON.stringify(value)}`);
        }
        console.log('\n');
      });                              
    return result;
}

export const flushAsync = async () => {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    console.log('Removed all data from Async');
}

export const setInspector = async (val: boolean) => {
    await AsyncStorage.mergeItem(constant.ASYNC_KEY_INSPECTOR, JSON.stringify({canProceed: val}));
}

export const saveBackgroundServiceData = async (id: string) => {
    const backgroundService =  await AsyncStorage.getItem(constant.ASYNC_KEY_BACKGROUND_SERVICE);
    const data = JSON.parse(backgroundService ?? 'null');
    const dataJson = {id}
    if (data === null || data.id == null) {
        await AsyncStorage.setItem(constant.ASYNC_KEY_BACKGROUND_SERVICE, JSON.stringify(dataJson));
    }
    else {
        console.log('Background Service is Running please remove it or stop it before creating new one');
    }
}

export const removeBackgroundServiceData = async () => {
    const backgroundService =  await AsyncStorage.getItem(constant.ASYNC_KEY_BACKGROUND_SERVICE);
    console.log('data for background remove', backgroundService);
    await AsyncStorage.setItem(constant.ASYNC_KEY_BACKGROUND_SERVICE, JSON.stringify({
        id: null,
    }));
}

export const removeSiteData = async (siteId: string) => {
    try {
      const existingData = await AsyncStorage.getItem(constant.ASYNC_KEY_SITE_DATA);
  
      if (existingData) {
        const parsedData: SiteData[] = JSON.parse(existingData);
  
        // Remove the site data with the specified siteId
        const updatedData = parsedData.filter((siteData) => siteData.siteId !== siteId);
  
        // Save the updated data back to AsyncStorage
        await AsyncStorage.setItem(constant.ASYNC_KEY_SITE_DATA, JSON.stringify(updatedData));
  
        console.log(`Site data with siteId ${siteId} removed successfully.`);
      } else {
        console.log('No site data found in AsyncStorage.');
      }
    } catch (error) {
      console.error('Error removing site data:', error);
    }
  };