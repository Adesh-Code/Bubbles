import AsyncStorage from "@react-native-async-storage/async-storage";
import * as constant from "./../Constants/constant";
import { SiteData, ServiceData, InspectorData } from "../Types/types";
import * as asyncService from './async_storage_service';
import { UploadContentToS3 } from "./content_uploader_service";
import { UploadSiteData } from "./site_uploader_service";

/// returns whether the task is complete or not
export const InspectorService = async () => {
    // This contains data which may or may not be posted to server.
    const siteData: SiteData[] | null = await AsyncStorage.getItem(constant.ASYNC_KEY_SITE_DATA).then(data => data ? JSON.parse(data) : null);
    // This contains current Service Details which can be used to abort this functionality outside of this service.
    const serviceData : ServiceData | null = await AsyncStorage.getItem(constant.ASYNC_KEY_BACKGROUND_SERVICE).then(data => data ? JSON.parse(data) : null);
    // This is a flag used to determine whether current service is completed (true) or not (false).
    const inspectorData = await AsyncStorage.getItem(constant.ASYNC_KEY_INSPECTOR).then(data => data ? JSON.parse(data) : null);

    const currentTime = new Date();
    const twentyFourHoursAgo = new Date(currentTime);
    twentyFourHoursAgo.setHours(currentTime.getHours() - 24);

    if (inspectorData !== null && inspectorData.canProceed === true) {
        if (siteData !== null && siteData.length > 0) {
          await asyncService.setInspector(false);
      
          const contentKeys = ['img1', 'img2', 'img3', 'img4', 'videoUrl', 'videoUrl1'];
      
          for (const siteDataElement of siteData) {
            const siteId = siteDataElement.siteId;
      
            for (const contentKey of contentKeys) {
              const currentContent = siteDataElement[contentKey as keyof typeof siteDataElement];
      
              // Check if currentContent is a string
              if (typeof currentContent === 'string' && !currentContent.startsWith(constant.IMAGE_SERVER_HOST)) {
                const returnUri = await UploadContentToS3(siteId, contentKey);
                await asyncService.updateSiteDataByKey(siteId, contentKey, returnUri);
                await asyncService.setInspector(true);
                console.log('uploaded', contentKey);
                return false;
              }
            }
      
            // Check if site is already submitted
            if (siteDataElement.isSubmitted === true) {
              console.log('Site already submitted. Skipping content upload. ', siteId);
              await UploadSiteData(siteDataElement.siteId);
              await asyncService.setInspector(true);
              await asyncService.removeSiteData(siteDataElement.siteId);
              return false; // or handle accordingly
            }


            if (siteDataElement !== null && siteDataElement.timeUpdated !== null && siteDataElement.timeUpdated < twentyFourHoursAgo) {
              await asyncService.removeSiteData(siteDataElement.siteId);
              console.log('Site data was seating in asyncStorage for 24 hrs and more...')
            }   
          }
      
          await asyncService.setInspector(true);
        } else {
          console.log("There is no data for Images in Async");
          return false;
        }
      } else {
        console.log("Waiting for Inspector ....");
        return false;
      }
      await asyncService.removeBackgroundServiceData();
    return true;
}
