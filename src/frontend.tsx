import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import * as async from './Services/async_storage_service';

const Frontend = () => {
    const [imageCount, setImageCount] = useState(1);
    const [videoCount, setVideoCount] = useState(1);
    const testURI = 'ftp://test';

    return(
        <View>
            <Text style={{textAlign: 'center'}}>Async Storage Stuffs</Text>
            <Button onPress={async.initializeAsync} title="Initialize" />
            <Button onPress={async.getAsyncData} title="Get Data" />
            <Button onPress={async.removeBackgroundServiceData} title="Remove Background" />
            
            <Button onPress={async () => {
                await async.removeImageData(imageCount);
                setImageCount(imageCount - 1);
            }} title="Remove Image" />
            
            <Button onPress={async () => {
                await async.removeVideoData(videoCount);
                setVideoCount(videoCount - 1);
            }} title="Remove Video" />
            {/* <Button onPress={async.toggleInspector} title="Toggle Inspector" /> */}
            <Button onPress={async.flushAsync} title="Flush Async" color={'red'} />
            <View style={{height: 30}} />
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <Button onPress={async () => {
                await async.saveImageData(imageCount, `${testURI}/image/${imageCount}`);
                setImageCount(imageCount+ 1);
            }} title="Capture Image" />
            <Button onPress={async () => {
                await async.saveVideoData(videoCount, `${testURI}/video/${videoCount}`);
                setVideoCount(videoCount + 1);
            }} title="Capture Video" />
            </View>
        </View>
    )
}

export default Frontend;
