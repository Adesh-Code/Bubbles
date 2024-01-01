import { useEffect, useState } from "react";
import {Button, PermissionsAndroid, SafeAreaView, Text, View } from "react-native";
import {moveFile, ExternalStorageDirectoryPath  } from "react-native-fs";
import { openPicker, openCamera } from "react-native-image-crop-picker";
import {PERMISSIONS, request} from 'react-native-permissions';

interface imageData {
    id: string,
    path: string,
}

const dummy = [
    {
        id: 'img1',
        path: '',
    },{
        id: 'img2',
        path: '',
    },{
        id: "img3",
        path: "",
    },{
        id: "img4",
        path: "",
    },{
        id: "videoUrl",
        path: "",
    },{
        id: "videoUrl1",
        path: "",
    },
]

const destinationPath = `${ExternalStorageDirectoryPath}/DCIM/AwesomeProject`;

const NewFrontend = () => {
    const [imageList, setImageList] = useState<imageData[]>(dummy);

    const handleCamera = async (id: string, type) => {
        try {
            const result = await openCamera({
                mediaType: type,
            })
            
            await moveFile(result.path, `${destinationPath}`)
            console.log(result, 'asdadada');
            const currImageList = imageList;
            const index = currImageList.findIndex((imageData) => imageData.id === id);
            const newImage = {
                id,
                path: `${destinationPath}/${result.filename}`
            }
        setImageList([...currImageList.slice(0,index), newImage, ...currImageList.slice(index + 1)]);
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        const requestPermissions = async () => {
          try {
            const granted = await request(
              PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission',
                message: 'This app needs access to your storage to save videos.',
                buttonPositive: 'OK',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('Storage permission granted');
            } else {
              console.log('Storage permission denied');
            }
          } catch (error) {
            console.error('Error requesting storage permission:', error);
          }
        };
    
        requestPermissions();
      }, []);

    return <SafeAreaView style={{marginTop: 144}}>
        <View>
            <Button onPress={()=> handleCamera('img1', 'photo')} title="1"/>
            <Button onPress={()=> handleCamera('img2', 'photo')} title="2"/>
            <Button onPress={()=> handleCamera('img3', 'photo')} title="3"/>
            <Button onPress={()=> handleCamera('img4', 'photo')} title="4"/>
            <Button onPress={()=> handleCamera('videoUrl', 'video')} title="1.1"/>
            <Button onPress={()=> handleCamera('videoUrl1', 'video')} title="1.2"/>
        </View>
        <View>
            <Text>{JSON.stringify(imageList)}</Text>
        </View>
    </SafeAreaView>
}

export default NewFrontend;