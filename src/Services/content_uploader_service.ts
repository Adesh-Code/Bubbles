import AsyncStorage from "@react-native-async-storage/async-storage";
import * as constant from "./../Constants/constant";
import { SiteData, ServiceData } from "../Types/types";
import * as asyncService from './async_storage_service';

export const UploadContentToS3: (siteId: string, contentKey: string) => Promise<string> = async (siteId: string, contentKey: string) => {
    const asyncData = await AsyncStorage.getItem(constant.ASYNC_KEY_SITE_DATA);
    const dataToBeUploaded : SiteData[] = await JSON.parse(asyncData ?? 'null');

    if (dataToBeUploaded !== null) {
        const siteIndex = dataToBeUploaded.findIndex((siteData) => siteData.siteId === siteId);
        if (siteIndex >= 0) {
            const contentURI = dataToBeUploaded[siteIndex][contentKey as keyof typeof dataToBeUploaded[0]];
            if (contentURI !== null) {
                // TODO: add service here and return url for content
                return new Promise((resolve) => setTimeout(() => resolve(`https://${contentURI}`), 2000));
            } 
            else {
                console.log(`No data found at ${contentKey} for ${siteId} Site in AsyncStorage`);
            }
        } else {
            console.log(`No data found for ${siteId} Site in AsyncStorage`);
        }
    } else {
        console.log('No data found');
    }
    return 'ss';
}

