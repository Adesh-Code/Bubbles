import AsyncStorage from "@react-native-async-storage/async-storage";
import * as constant from "./../Constants/constant";
import { ImageData, ServiceData } from "../Types/types";
import * as asyncService from './async_storage_service';

/// returns whether the task is complete or not
export const BackgroundTask = async () => {
    // This contains data which may or may not be posted to server.
    const imageData: ImageData | null = await AsyncStorage.getItem(constant.ASYNC_KEY_IMAGE_DATA).then(data => data ? JSON.parse(data) : null);
    // This contains current Service Details which can be used to abort this functionality outside of this service.
    const serviceData : ServiceData | null = await AsyncStorage.getItem(constant.ASYNC_KEY_BACKGROUND_SERVICE).then(data => data ? JSON.parse(data) : null);
    // This is a flag used to determine whether current service is completed (true) or not (false).
    const inspectorData: boolean | null = await AsyncStorage.getItem(constant.ASYNC_KEY_INSPECTOR).then(data => data ? JSON.parse(data) : null);

    // whether to start service
    if (inspectorData) {
        // if there is data to be send
        if (imageData?.hasOwnProperty('img1')) {
            // checking wheather current image is published or not, if not then
            if ( imageData.img1 !== null && !imageData.img1?.startsWith(constant.IMAGE_SERVER_HOST)) {
                await asyncService.setInspector('false');
                // TODO: Post Image to Server.
                await asyncService.saveImageData(1, constant.IMAGE_SERVER_HOST);
                return false;
            }
            if ( imageData.img2 !== null && !imageData.img2?.startsWith(constant.IMAGE_SERVER_HOST)) {
                await asyncService.setInspector('false');
                // TODO: Post Image to Server.
                await asyncService.saveImageData(2, constant.IMAGE_SERVER_HOST);
                return false;
            }
            if ( imageData.img3 !== null && !imageData.img3?.startsWith(constant.IMAGE_SERVER_HOST)) {
                await asyncService.setInspector('false');
                // TODO: Post Image to Server.
                await asyncService.saveImageData(3, constant.IMAGE_SERVER_HOST);
                return false;
            }
            if ( imageData.img4 !== null && !imageData.img4?.startsWith(constant.IMAGE_SERVER_HOST)) {
                await asyncService.setInspector('false');
                // TODO: Post Image to Server.
                await asyncService.saveImageData(4, constant.IMAGE_SERVER_HOST);
                return false;
            }
            if ( imageData.videoUrl !== null && !imageData.videoUrl?.startsWith(constant.VIDEO_SERVER_HOST)) {
                await asyncService.setInspector('false');
                // TODO: Post Video to Server.
                await new Promise(resolve => setTimeout(resolve, 5000));
                console.log('Video uploaded 1');
                await asyncService.saveVideoData(1, constant.VIDEO_SERVER_HOST);
                return false;
            }
            if ( imageData.videoUrl1 !== null && !imageData.videoUrl1?.startsWith(constant.VIDEO_SERVER_HOST)) {
                await asyncService.setInspector('false');
                // TODO: Post Video to Server.
                await new Promise(resolve => setTimeout(resolve, 5000));
                console.log('Video uploaded 2');
                await asyncService.saveVideoData(2, constant.VIDEO_SERVER_HOST);
                return false;
            }
            await asyncService.setInspector('true');
        } else {
            console.log("There is no data for Images in Async");
            return false;
        }
    } else {
        console.log("Waiting for Inspector ....")
        return false;
    }
    return true;
}
