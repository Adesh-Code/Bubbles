import AsyncStorage from "@react-native-async-storage/async-storage";
import * as constant from "./../Constants/constant";
import { SiteData, ServiceData } from "../Types/types";

export const UploadSiteData = async (siteId: string) => {
    const asyncData = await AsyncStorage.getItem(constant.ASYNC_KEY_SITE_DATA);
    const dataToBeUploaded : SiteData[] = await JSON.parse(asyncData ?? 'null');

    if (dataToBeUploaded !== null) {
        const siteIndex = dataToBeUploaded.findIndex((siteData) => siteData.siteId === siteId);
        if (siteIndex >= 0) {
            const contentURI = dataToBeUploaded[siteIndex];
            if (contentURI !== null) {
                // TODO: add service here and return url for content
                return new Promise((resolve) => setTimeout(() => resolve(true), 2000));
            } 
            else {
                console.log(`No data found for ${siteId} Site in AsyncStorage`);
            }
        } else {
            console.log(`No data found for ${siteId} Site in AsyncStorage`);
        }
    } else {
        console.log('No data found');
    }

}

