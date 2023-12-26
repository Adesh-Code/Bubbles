import AsyncStorage from "@react-native-async-storage/async-storage";
import * as constant from "./../Constants/constant";

export const initializeAsync = async () => {
    const imageDummyData = {
        "img1": null,
        "img2": null,
        "img3": null,
        "img4": null,
        "videoUrl": null,
        "videoUrl1": null,
        "vendorRemark": null,
        "reportingTime": '',
        "problemWithSite": '',
        "lat": '',
        "long": ''
    }

    const serviceDummyData = {
        id : null,
        didComplete: 'true',
    }

    if (await AsyncStorage.getItem(constant.ASYNC_KEY_INSPECTOR) == null) {
        await AsyncStorage.setItem(constant.ASYNC_KEY_INSPECTOR, 'true');
    }

    if (await AsyncStorage.getItem(constant.ASYNC_KEY_IMAGE_DATA) == null) {
        await AsyncStorage.setItem(constant.ASYNC_KEY_IMAGE_DATA, JSON.stringify(imageDummyData));
    }

    if (await AsyncStorage.getItem(constant.ASYNC_KEY_BACKGROUND_SERVICE) == null) {
        await AsyncStorage.setItem(constant.ASYNC_KEY_BACKGROUND_SERVICE, JSON.stringify(serviceDummyData));
    }
    console.log('Successfully initialized the asyncStorage');
}

export const saveImageData = async (count, uri) => {
    if (count > 0 && count < 5){
        var imageKey = `img${count}`;
        await AsyncStorage.mergeItem(constant.ASYNC_KEY_IMAGE_DATA, JSON.stringify({
            [imageKey] : uri,
        }))
        console.log('Saved Image', count);
    }
    else {
        console.log('key should be in range on 1 - 5', count);
    }
}

export const saveVideoData = async (count, uri) => {
    if (count > 0 && count < 3){
            var videoKey = `videoUrl${count == 1? '' : '2'}`;
        await AsyncStorage.mergeItem(constant.ASYNC_KEY_IMAGE_DATA, JSON.stringify({
            [videoKey] : uri,
        }))
        console.log('Saved Video', count);
    }
    else {
        console.log('key should be in range on 1 - 3', count);
    }
}

export const removeImageData = async (count) => {
    var tmp = count - 1;
    if (tmp > 0 && tmp < 5){
        var imageKey = `img${tmp}`;
        await AsyncStorage.mergeItem(constant.ASYNC_KEY_IMAGE_DATA, JSON.stringify({
            [imageKey] : null,
        }))
        console.log('Removed Image', tmp);
    }
    else {
        console.log('key should be in range on 1 - 5', count);
    }
}

export const removeVideoData = async (count, uri) => {
    var tmp = count - 1
    if (tmp > 0 && tmp < 3){
            var videoKey = `videoUrl${tmp == 1? '' : '2'}`;
        await AsyncStorage.mergeItem(constant.ASYNC_KEY_IMAGE_DATA, JSON.stringify({
            [videoKey] : null,
        }))
        console.log('Removed Video', tmp);
    }
    else {
        console.log('key should be in range on 1 - 3', count);
    }
}

export const getAsyncData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const data = await AsyncStorage.multiGet(keys);
    const result = data.map(([key, value]) => ({ key, value: JSON.parse(value) }));
    console.log('\nAll data from Async:');
    result.forEach(({ key, value }) => {
    console.log(`${key} ===> ${JSON.stringify(value)} \n`);
    });                                 
}

export const flushAsync = async () => {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    console.log('Removed all data from Async');
}

export const setInspector = async (val) => {
    const currentInspectorData = await AsyncStorage.getItem(constant.ASYNC_KEY_INSPECTOR);
    await AsyncStorage.setItem(constant.ASYNC_KEY_INSPECTOR, val);
}

export const saveBackgroundServiceData = async (id) => {
    const backgroundService =  await AsyncStorage.getItem(constant.ASYNC_KEY_BACKGROUND_SERVICE);
    const data = JSON.parse(backgroundService);
    console.log('data for background', data);
    if (data.id == null) {
        await AsyncStorage.setItem(constant.ASYNC_KEY_BACKGROUND_SERVICE, id);
    }
    else {
        console.log('Background Service is Running please remove it or stop it before creating new one');
    }
}

export const removeBackgroundServiceData = async () => {
    const backgroundService =  await AsyncStorage.getItem(constant.ASYNC_KEY_BACKGROUND_SERVICE);
    console.log('data for background remove', backgroundService);
    await AsyncStorage.setItem(constant.ASYNC_KEY_BACKGROUND_SERVICE, id);
}